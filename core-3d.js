/* A real WebGL signed-distance-field sculpture. No 3D library or remote asset is required. */
(() => {
  'use strict';
  const canvas = document.getElementById('jarvis-core');
  const stage = document.getElementById('core-stage');
  if (!canvas || !stage) return;
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, powerPreference: 'low-power' });
  if (!gl) {
    canvas.setAttribute('aria-label', 'Jarvis core. Interactive 3D is unavailable in this browser.');
    document.getElementById('rotate-left').disabled = true;
    document.getElementById('rotate-right').disabled = true;
    stage.querySelector('.core-controls .eyebrow').textContent = 'JARVIS / OS';
    return;
  }
  const vertexSource = 'attribute vec2 position; void main(){gl_Position=vec4(position,0.0,1.0);}';
  const fragmentSource = [
    'precision highp float;',
    'uniform vec2 resolution;',
    'uniform vec2 pointer;',
    'uniform float clock;',
    'uniform float energy;',
    'uniform float turn;',
    'const float PI=3.14159265359;',
    'mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}',
    'float field(vec3 p){',
    '  p.xy=rot(-0.50)*p.xy;',
    '  p.xz=rot(0.30+turn+clock*0.095+pointer.x*0.20)*p.xz;',
    '  p.yz=rot(1.03+pointer.y*0.18)*p.yz;',
    '  float angle=atan(p.z,p.x);',
    '  float radius=0.86+0.065*sin(angle*3.0+clock*0.11);',
    '  vec2 q=vec2(length(p.xz)-radius,p.y+0.08*sin(angle*3.0));',
    '  q=rot(angle*1.5)*q;',
    '  float tube=length(q*vec2(1.0,1.13))-0.265;',
    '  float ribs=0.0085*sin(angle*92.0+atan(q.y,q.x)*2.0);',
    '  return (tube+ribs)*0.74;',
    '}',
    'vec3 normalAt(vec3 p){',
    '  vec2 e=vec2(0.0015,0.0);',
    '  return normalize(vec3(field(p+e.xyy)-field(p-e.xyy),field(p+e.yxy)-field(p-e.yxy),field(p+e.yyx)-field(p-e.yyx)));',
    '}',
    'vec3 environment(vec3 r){',
    '  vec3 color=vec3(0.075,0.085,0.115);',
    '  color+=vec3(1.1,1.13,1.2)*pow(max(dot(r,normalize(vec3(-1.4,1.8,1.7))),0.0),5.0);',
    '  color+=vec3(2.5,2.5,2.6)*pow(max(dot(r,normalize(vec3(-0.9,0.6,1.8))),0.0),40.0);',
    '  color+=vec3(0.35,0.42,0.75)*pow(max(dot(r,normalize(vec3(1.7,-0.5,0.6))),0.0),8.0);',
    '  color+=vec3(1.2,1.25,1.4)*pow(max(dot(r,normalize(vec3(0.5,-1.8,-0.5))),0.0),22.0);',
    '  color+=vec3(0.32)*smoothstep(0.82,0.98,r.y);',
    '  return color;',
    '}',
    'void main(){',
    '  vec2 uv=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);',
    '  uv.x-=0.025;',
    '  vec3 ro=vec3(0.0,0.0,4.3);',
    '  vec3 rd=normalize(vec3(uv,-3.6));',
    '  float t=0.0; float d=0.0;',
    '  for(int i=0;i<100;i++){',
    '    d=field(ro+rd*t);',
    '    if(d<0.0011||t>7.0)break;',
    '    t+=d;',
    '  }',
    '  vec3 background=vec3(0.03137,0.03529,0.04314);',
    '  float halo=exp(-dot(uv,uv)*2.1);',
    '  background+=vec3(0.009,0.011,0.022)*halo;',
    '  vec3 color=background;',
    '  if(t<7.0&&d<0.005){',
    '    vec3 p=ro+rd*t;',
    '    vec3 n=normalAt(p);',
    '    vec3 reflected=reflect(rd,n);',
    '    float facing=max(dot(n,-rd),0.0);',
    '    float fresnel=0.5+0.5*pow(1.0-facing,4.0);',
    '    float ao=clamp(field(p+n*0.11)/0.085,0.35,1.0);',
    '    vec3 metal=vec3(0.72,0.75,0.84);',
    '    vec3 light=normalize(vec3(-1.5,2.2,3.0));',
    '    float diffuse=max(dot(n,light),0.0);',
    '    color=metal*(0.045+diffuse*0.23)*ao;',
    '    color+=environment(reflected)*metal*fresnel*ao;',
    '    float rim=pow(1.0-facing,3.0);',
    '    color+=vec3(0.18,0.22,0.4)*rim*(0.25+energy*0.35);',
    '    color=color/(vec3(1.0)+color*0.35);',
    '    color=pow(color,vec3(0.84));',
    '  }',
    '  float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-0.5;',
    '  color+=grain*0.004;',
    '  gl_FragColor=vec4(color,1.0);',
    '}'
  ].join('\n');
  let program, buffer, uniforms;
  function shader(type, source) {
    const s = gl.createShader(type);
    gl.shaderSource(s, source); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(s); gl.deleteShader(s); throw new Error(info);
    }
    return s;
  }
  function setup() {
    const vertex = shader(gl.VERTEX_SHADER, vertexSource);
    const fragment = shader(gl.FRAGMENT_SHADER, fragmentSource);
    program = gl.createProgram();
    gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
    gl.deleteShader(vertex); gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    uniforms = {};
    ['resolution','pointer','clock','energy','turn'].forEach(name => uniforms[name] = gl.getUniformLocation(program, name));
  }
  let frame = 0, visible = true, enabled = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lost = false, time = 0, previous = 0, previousDraw = 0;
  let px = 0, py = 0, tx = 0, ty = 0, turn = 0, targetTurn = 0, energy = 0, targetEnergy = 0;
  let dragging = false, dragStart = 0, dragTurn = 0;
  const mobile = matchMedia('(pointer: coarse)').matches;
  function resize() {
    const bounds = canvas.getBoundingClientRect();
    const factor = Math.min(devicePixelRatio || 1, mobile ? 1 : 1.25, 840 / Math.max(1, bounds.width));
    canvas.width = Math.max(1, Math.floor(bounds.width * factor));
    canvas.height = Math.max(1, Math.floor(bounds.height * factor));
    gl.viewport(0, 0, canvas.width, canvas.height);
    draw(performance.now(), true);
  }
  function draw(now, force = false) {
    if (lost || !program || (!force && (!visible || document.hidden))) return;
    const dt = previous ? Math.min((now - previous) / 1000, .05) : 0;
    previous = now;
    if (enabled) time += dt;
    px += (tx - px) * (enabled ? .08 : 1);
    py += (ty - py) * (enabled ? .08 : 1);
    turn += (targetTurn - turn) * (enabled ? .085 : 1);
    energy += (targetEnergy - energy) * .05;
    gl.useProgram(program);
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform2f(uniforms.pointer, px, py);
    gl.uniform1f(uniforms.clock, time);
    gl.uniform1f(uniforms.energy, energy);
    gl.uniform1f(uniforms.turn, turn);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    canvas.classList.add('is-ready');
    stage.classList.add('has-webgl');
  }
  function loop(now) {
    frame = 0;
    if (!enabled || !visible || document.hidden || lost) { previous = 0; return; }
    // Cap the expensive ray-march at 30 fps. Other UI animations stay browser-native.
    if (now - previousDraw >= 32) { draw(now); previousDraw = now; }
    frame = requestAnimationFrame(loop);
  }
  function start() {
    if (frame || lost) return;
    if (enabled && visible && !document.hidden) frame = requestAnimationFrame(loop);
    else draw(performance.now(), true);
  }
  function stop() { cancelAnimationFrame(frame); frame = 0; previous = 0; }
  function degrade() {
    stop(); lost = true;
    canvas.classList.remove('is-ready'); stage.classList.remove('has-webgl');
    canvas.setAttribute('aria-label', 'Jarvis core. Interactive 3D is unavailable in this browser.');
    document.getElementById('rotate-left').disabled = true;
    document.getElementById('rotate-right').disabled = true;
    stage.querySelector('.core-controls .eyebrow').textContent = 'JARVIS / OS';
  }
  try { setup(); resize(); start(); } catch (_) { degrade(); return; }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(stage);
  else addEventListener('resize', resize, { passive: true });
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) start(); else stop();
  }, { rootMargin: '100px' }).observe(stage);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  addEventListener('jarvis:motion', event => {
    enabled = event.detail.enabled;
    if (enabled) start(); else { stop(); draw(performance.now(), true); }
  });
  addEventListener('jarvis:state', event => {
    targetEnergy = event.detail.state === 'ready' ? .2 : 1;
    if (!enabled) draw(performance.now(), true);
  });
  canvas.addEventListener('pointerdown', event => {
    dragging = true; dragStart = event.clientX; dragTurn = targetTurn;
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', event => {
    const r = canvas.getBoundingClientRect();
    tx = (event.clientX - r.left) / r.width * 2 - 1;
    ty = (event.clientY - r.top) / r.height * 2 - 1;
    if (dragging) targetTurn = dragTurn + (event.clientX - dragStart) * .008;
    if (!enabled) draw(performance.now(), true);
  });
  function endDrag(event) {
    dragging = false;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  }
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('pointerleave', () => { if (!dragging) { tx = 0; ty = 0; } });
  document.getElementById('rotate-left').addEventListener('click', () => { targetTurn -= .55; if (!enabled) draw(performance.now(), true); });
  document.getElementById('rotate-right').addEventListener('click', () => { targetTurn += .55; if (!enabled) draw(performance.now(), true); });
  canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); degrade(); });
  canvas.addEventListener('webglcontextrestored', () => {
    try {
      lost = false; setup(); resize(); start();
      document.getElementById('rotate-left').disabled = false;
      document.getElementById('rotate-right').disabled = false;
      canvas.setAttribute('aria-label', 'Interactive rotating three-dimensional Jarvis core. Use the arrow buttons to rotate it.');
      stage.querySelector('.core-controls .eyebrow').textContent = 'DRAG TO EXPLORE';
    } catch (_) { degrade(); }
  });
  addEventListener('pagehide', stop);
  addEventListener('pageshow', () => { if (!lost) start(); });
})();

