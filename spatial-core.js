(function () {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function injectSpatialSection() {
    const anchor = $('.break-section');
    if (!anchor || $('#spatial-core')) return;
    const section = document.createElement('section');
    section.className = 'spatial-core section-pad';
    section.id = 'spatial-core';
    section.innerHTML = `
      <div class="section-head spatial-head"><span>04.5 / SPATIAL CORE</span><span>INTERACTIVE CONCEPT VISUALIZATION</span></div>
      <div class="spatial-layout">
        <div class="spatial-copy">
          <p class="micro-label">ONE CONTEXT GRAPH</p>
          <h2>THINK IN<br /><span>CONTEXT.</span><br />ACT THROUGH<br /><em>SYSTEMS.</em></h2>
          <p class="spatial-lede">A visual concept for how Jarvis could keep projects, memory, specialist agents and tools connected around one working objective.</p>
          <div class="spatial-flow" data-spatial-flow>
            <button class="active" type="button" data-spatial-step="0"><small>01</small><strong>INTENT</strong><span>Start with the goal</span></button>
            <button type="button" data-spatial-step="1"><small>02</small><strong>CONTEXT</strong><span>Restore project state</span></button>
            <button type="button" data-spatial-step="2"><small>03</small><strong>ROUTE</strong><span>Select specialist + tool</span></button>
            <button type="button" data-spatial-step="3"><small>04</small><strong>ACTION</strong><span>Return verified output</span></button>
          </div>
          <div class="spatial-disclaimer">CONCEPTUAL INTERACTION — NOT A CLAIM OF COMPLETED RUNTIME CAPABILITY</div>
        </div>
        <div class="spatial-stage" data-spatial-stage>
          <canvas data-spatial-canvas aria-hidden="true"></canvas>
          <div class="spatial-vignette"></div><div class="spatial-scan"></div>
          <div class="spatial-stage-top"><span>JARVIS / CONTEXT GRAPH</span><span data-spatial-state>INTENT LOCKED</span></div>
          <div class="spatial-center-label"><small>ACTIVE OBJECTIVE</small><strong data-spatial-title>BUILD JARVIS OS</strong><span data-spatial-subtitle>Goal enters the system as one continuous thread.</span></div>
          <div class="spatial-node node-project"><small>PROJECT</small><strong>Jarvis OS</strong></div>
          <div class="spatial-node node-memory"><small>MEMORY</small><strong>Decisions</strong></div>
          <div class="spatial-node node-agent"><small>AGENT</small><strong>Builder</strong></div>
          <div class="spatial-node node-tool"><small>TOOL</small><strong>Workspace</strong></div>
          <div class="spatial-coordinates"><span>X 042.8</span><span>Y 118.4</span><span>Z 009.2</span></div>
          <div class="spatial-stage-foot"><span>MOVE POINTER TO EXPLORE</span><span>SCROLL / SELECT A STEP</span></div>
        </div>
      </div>`;
    anchor.insertAdjacentElement('beforebegin', section);
  }

  function setupSpatialSteps() {
    const buttons = $$('[data-spatial-step]');
    const stage = $('[data-spatial-stage]');
    const state = $('[data-spatial-state]');
    const title = $('[data-spatial-title]');
    const subtitle = $('[data-spatial-subtitle]');
    if (!buttons.length || !stage) return;
    const scenes = [
      ['INTENT LOCKED', 'BUILD JARVIS OS', 'Goal enters the system as one continuous thread.'],
      ['CONTEXT RESTORED', 'PROJECT STATE ONLINE', 'Relevant memory, files and unresolved decisions move into view.'],
      ['ROUTE SELECTED', 'BUILDER + WORKSPACE', 'The right specialist and tool are selected around the same objective.'],
      ['ACTION READY', 'VERIFY BEFORE DONE', 'The system returns evidence and preserves the useful state for what comes next.']
    ];
    function activate(index) {
      const i = Math.max(0, Math.min(index, scenes.length - 1));
      buttons.forEach((button, n) => button.classList.toggle('active', n === i));
      stage.dataset.scene = String(i);
      state.textContent = scenes[i][0]; title.textContent = scenes[i][1]; subtitle.textContent = scenes[i][2];
    }
    buttons.forEach((button) => button.addEventListener('click', () => activate(Number(button.dataset.spatialStep || 0))));
    const section = $('#spatial-core');
    if (section && !reduceMotion) {
      let ticking = false;
      const syncToScroll = () => {
        ticking = false;
        const rect = section.getBoundingClientRect();
        const progress = Math.max(0, Math.min(0.999, (innerHeight - rect.top) / (innerHeight + rect.height)));
        activate(Math.floor(progress * 4));
      };
      addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(syncToScroll); } }, { passive: true });
    }
    activate(0);
  }

  function setupSpatialCanvas() {
    const canvas = $('[data-spatial-canvas]');
    const stage = $('[data-spatial-stage]');
    if (!canvas || !stage || reduceMotion) return;
    const ctx = canvas.getContext('2d');
    const pointCount = 150, points = [], golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < pointCount; i++) {
      const y = 1 - (i / (pointCount - 1)) * 2, radius = Math.sqrt(1 - y * y), theta = golden * i;
      points.push({ x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius, seed: Math.random() * Math.PI * 2 });
    }
    let width = 0, height = 0, pointerX = 0, pointerY = 0, targetX = 0, targetY = 0, rotation = 0;
    function resize() {
      const rect = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height; canvas.width = Math.max(1, Math.floor(width * dpr)); canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function rotatePoint(point, angleY, angleX) {
      const cy = Math.cos(angleY), sy = Math.sin(angleY), cx = Math.cos(angleX), sx = Math.sin(angleX);
      const x1 = point.x * cy - point.z * sy, z1 = point.x * sy + point.z * cy;
      return { x: x1, y: point.y * cx - z1 * sx, z: point.y * sx + z1 * cx };
    }
    function project(point, scale, centerX, centerY) {
      const perspective = 2.6 / (3.1 + point.z);
      return { x: centerX + point.x * scale * perspective, y: centerY + point.y * scale * perspective, z: point.z, perspective };
    }
    function draw() {
      pointerX += (targetX - pointerX) * .045; pointerY += (targetY - pointerY) * .045; rotation += .0024;
      ctx.clearRect(0, 0, width, height);
      const centerX = width * .52, centerY = height * .52, scale = Math.min(width, height) * .38, scene = Number(stage.dataset.scene || 0);
      const projected = points.map((point) => project(rotatePoint(point, rotation + pointerX * .65 + scene * .16, -.18 + pointerY * .35 + scene * .03), scale, centerX, centerY));
      const glow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, scale * 1.15);
      glow.addColorStop(0, 'rgba(120,169,255,.14)'); glow.addColorStop(.48, 'rgba(120,169,255,.035)'); glow.addColorStop(1, 'rgba(120,169,255,0)');
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(centerX, centerY, scale * 1.15, 0, Math.PI * 2); ctx.fill();
      ctx.lineWidth = .6;
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        for (const j of [(i + 8) % pointCount, (i + 21) % pointCount]) {
          const b = projected[j], dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < scale * .55 && a.z > -.88 && b.z > -.88) {
            const alpha = Math.max(0, .12 * (1 - dist / (scale * .55))) * (.55 + scene * .08);
            ctx.strokeStyle = `rgba(120,169,255,${alpha})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      projected.map((point, index) => ({ ...point, index })).sort((a, b) => a.z - b.z).forEach((point) => {
        const depthAlpha = Math.max(.15, (point.z + 1.35) / 2.35), pulse = .7 + Math.sin(rotation * 11 + points[point.index].seed) * .3;
        ctx.fillStyle = `rgba(189,213,255,${.18 + depthAlpha * .68})`; ctx.beginPath(); ctx.arc(point.x, point.y, (1.05 + point.perspective * .75) * pulse, 0, Math.PI * 2); ctx.fill();
      });
      const ringRadius = scale * (.47 + scene * .035);
      ctx.strokeStyle = 'rgba(120,169,255,.24)'; ctx.lineWidth = 1; ctx.setLineDash([3, 9]); ctx.beginPath(); ctx.ellipse(centerX, centerY, ringRadius * 1.1, ringRadius * .34, rotation * .4, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
      for (let satellite = 0; satellite < 3; satellite++) {
        const angle = rotation * (.7 + satellite * .16) + satellite * 2.1, x = centerX + Math.cos(angle) * ringRadius * 1.1, y = centerY + Math.sin(angle) * ringRadius * .34;
        ctx.fillStyle = 'rgba(120,169,255,.95)'; ctx.shadowBlur = 15; ctx.shadowColor = 'rgba(120,169,255,.85)'; ctx.beginPath(); ctx.arc(x, y, 2.4, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
      }
      requestAnimationFrame(draw);
    }
    stage.addEventListener('pointermove', (event) => { const rect = stage.getBoundingClientRect(); targetX = ((event.clientX - rect.left) / rect.width - .5) * 2; targetY = ((event.clientY - rect.top) / rect.height - .5) * 2; });
    stage.addEventListener('pointerleave', () => { targetX = 0; targetY = 0; });
    resize(); addEventListener('resize', resize); draw();
  }

  function init() { injectSpatialSection(); setupSpatialSteps(); setupSpatialCanvas(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
