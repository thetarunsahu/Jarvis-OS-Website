const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const body = document.body;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Boot sequence
const boot = $('[data-boot]');
const bootPercent = $('[data-boot-percent]');
const bootTrack = $('[data-boot-track]');
const bootLog = $('[data-boot-log]');
const bootMessages = [
  'Loading interface layer...',
  'Restoring context engine...',
  'Mapping agent runtime...',
  'Checking memory layer...',
  'Jarvis interface ready.'
];

if (boot && !reduceMotion) {
  let progress = 0;
  const bootTimer = setInterval(() => {
    progress += Math.ceil(Math.random() * 7);
    progress = Math.min(progress, 100);
    bootPercent.textContent = `${String(progress).padStart(2, '0')}%`;
    bootTrack.style.width = `${progress}%`;
    bootLog.textContent = bootMessages[Math.min(Math.floor(progress / 22), bootMessages.length - 1)];
    if (progress >= 100) {
      clearInterval(bootTimer);
      setTimeout(() => boot.classList.add('is-done'), 360);
    }
  }, 55);
} else if (boot) {
  boot.classList.add('is-done');
}

// Clock
const clock = $('[data-clock]');
function updateClock() {
  if (!clock) return;
  clock.textContent = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).format(new Date());
}
updateClock();
setInterval(updateClock, 1000);

// Scroll progress and smart header
const progressBar = $('[data-progress]');
const header = $('[data-header]');
let lastScroll = window.scrollY;
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  if (progressBar) progressBar.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
  if (header && scrollY > 180) {
    header.classList.toggle('is-hidden', scrollY > lastScroll && scrollY - lastScroll > 6);
  } else if (header) header.classList.remove('is-hidden');
  lastScroll = scrollY;
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal system
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
$$('.reveal, .reveal-text').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min((i % 4) * 55, 165)}ms`;
  observer.observe(el);
});

// Custom cursor
const cursor = $('[data-cursor]');
const cursorLabel = $('[data-cursor-label]');
if (cursor && matchMedia('(pointer:fine)').matches) {
  let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
  addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  function renderCursor() {
    cx += (mx - cx) * 0.17; cy += (my - cy) * 0.17;
    cursor.style.left = `${cx}px`; cursor.style.top = `${cy}px`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();
  $$('[data-cursor-text]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('has-label');
      cursorLabel.textContent = el.dataset.cursorText || 'VIEW';
    });
    el.addEventListener('mouseleave', () => cursor.classList.remove('has-label'));
  });
}

// Magnetic buttons
if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
  $$('[data-magnetic]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * .11}px, ${y * .11}px)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });
}

// Navigation drawer
const menu = $('[data-menu]');
const menuOpen = $('[data-menu-open]');
function setMenu(open) {
  if (!menu) return;
  menu.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open));
  if (menuOpen) menuOpen.setAttribute('aria-expanded', String(open));
  body.classList.toggle('is-locked', open || $('.command-center.open'));
}
$$('[data-menu-open]').forEach(el => el.addEventListener('click', () => setMenu(true)));
$$('[data-menu-close], [data-menu-link]').forEach(el => el.addEventListener('click', () => setMenu(false)));

// Command center
const commandCenter = $('[data-command-center]');
const commandInput = $('[data-command-input]');
const commandForm = $('[data-command-form]');
const responseState = $('[data-response-state]');
const responseText = $('[data-response-text]');
const responseSteps = $('[data-response-steps]');

function setCommandCenter(open) {
  if (!commandCenter) return;
  commandCenter.classList.toggle('open', open);
  commandCenter.setAttribute('aria-hidden', String(!open));
  body.classList.toggle('is-locked', open || (menu && menu.classList.contains('open')));
  if (open) setTimeout(() => commandInput?.focus(), 260);
}
$$('[data-command-open]').forEach(el => el.addEventListener('click', () => setCommandCenter(true)));
$$('[data-command-close]').forEach(el => el.addEventListener('click', () => setCommandCenter(false)));
addEventListener('keydown', (e) => {
  if ((e.key === 'j' || e.key === 'J') && !/input|textarea/i.test(document.activeElement?.tagName)) {
    e.preventDefault(); setCommandCenter(true);
  }
  if (e.key === 'Escape') { setCommandCenter(false); setMenu(false); }
});

const responses = [
  {
    match: /continue|resume|last|yesterday/i,
    text: 'I found the active Jarvis OS thread. Restoring the latest project state, recent decisions and unfinished website work before choosing the next action.',
    steps: ['PROJECT CONTEXT', 'RECENT CHANGES', 'NEXT ACTION']
  },
  {
    match: /file|find|robot|weed/i,
    text: 'I would search the project context first, rank files by relevance and return only the material connected to the current objective — not a raw folder dump.',
    steps: ['SEARCH CONTEXT', 'RANK FILES', 'RETURN EVIDENCE']
  },
  {
    match: /plan|day|college|today/i,
    text: 'I would combine calendar constraints, unfinished project work and priority signals into one executable plan, then preserve changes as the day evolves.',
    steps: ['READ CONSTRAINTS', 'PRIORITIZE', 'BUILD PLAN']
  },
  {
    match: /change|changed|update/i,
    text: 'I would compare the last known state with the current workspace, summarize meaningful changes and show the exact evidence behind each update.',
    steps: ['COMPARE STATE', 'SUMMARIZE', 'VERIFY']
  }
];

function runCommand(value) {
  const command = (value || '').trim();
  if (!command) return;
  const chosen = responses.find(r => r.match.test(command)) || {
    text: `I understand the goal: “${command}”. In the full Jarvis system, I would restore context, choose the right specialist and execute through the appropriate tools.`,
    steps: ['UNDERSTAND', 'ROUTE', 'ACT']
  };
  responseState.textContent = 'PROCESSING';
  responseText.textContent = 'Restoring context…';
  responseSteps.innerHTML = '<span>INTENT</span><span>CONTEXT</span>';
  setTimeout(() => {
    responseState.textContent = 'READY';
    responseText.textContent = chosen.text;
    responseSteps.innerHTML = chosen.steps.map(s => `<span>${s}</span>`).join('');
  }, reduceMotion ? 0 : 620);
}
commandForm?.addEventListener('submit', (e) => { e.preventDefault(); runCommand(commandInput.value); });
$$('[data-command]').forEach(btn => btn.addEventListener('click', () => {
  commandInput.value = btn.dataset.command;
  runCommand(btn.dataset.command);
}));

// Experience step sync
const experienceSteps = $$('[data-experience-step]');
const stagePrompt = $('[data-stage-prompt]');
const stageIndex = $('[data-stage-index]');
const stageNodes = $('[data-stage-nodes]');
const stageCopy = [
  '“Continue Jarvis OS from where we stopped.”',
  'Restoring project state, recent decisions and relevant files…',
  'Routing implementation to Builder while preserving one shared context…',
  'Session state saved. Tomorrow can begin from this exact point.'
];
const expObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const idx = Number(entry.target.dataset.experienceStep || 0);
    experienceSteps.forEach((s, i) => s.classList.toggle('active', i === idx));
    if (stagePrompt) stagePrompt.textContent = stageCopy[idx];
    if (stageIndex) stageIndex.textContent = `0${idx + 1} / 04`;
    if (stageNodes) stageNodes.style.transform = `rotate(${idx % 2 ? .6 : -.4}deg) scale(${1 + idx * .008})`;
  });
}, { threshold: .55 });
experienceSteps.forEach(s => expObserver.observe(s));

// Card tilt
if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
  $$('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - .5) * -6;
      const ry = ((e.clientX - r.left) / r.width - .5) * 6;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
}

// Hero parallax
const heroCore = $('[data-hero-core]');
if (heroCore && !reduceMotion && matchMedia('(pointer:fine)').matches) {
  addEventListener('mousemove', (e) => {
    const x = (e.clientX / innerWidth - .5) * 18;
    const y = (e.clientY / innerHeight - .5) * 18;
    heroCore.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Canvas particle field
function createParticleCanvas(canvas, options = {}) {
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, particles = [];
  const count = options.count || 42;
  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = rect.width; h = rect.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    particles = Array.from({length:count}, () => ({
      x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12,r:Math.random()*1.2+.35
    }));
  }
  function draw() {
    ctx.clearRect(0,0,w,h);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x<0||p.x>w) p.vx*=-1; if (p.y<0||p.y>h) p.vy*=-1;
      ctx.fillStyle='rgba(160,195,255,.45)';
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
    }
    for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){
      const a=particles[i],b=particles[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);
      if(d<130){ctx.strokeStyle=`rgba(120,169,255,${(1-d/130)*.09})`;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
    }
    requestAnimationFrame(draw);
  }
  resize(); draw(); addEventListener('resize', resize);
}
createParticleCanvas($('[data-neural-canvas]'), {count:52});
createParticleCanvas($('[data-finale-canvas]'), {count:32});

// Command waveform
const waveform = $('[data-waveform]');
if (waveform && !reduceMotion) {
  const ctx = waveform.getContext('2d');
  let phase = 0;
  function drawWave() {
    const r = waveform.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1,2);
    if (waveform.width !== Math.floor(r.width*dpr) || waveform.height !== Math.floor(r.height*dpr)) {
      waveform.width = r.width*dpr; waveform.height = r.height*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    ctx.clearRect(0,0,r.width,r.height);
    ctx.strokeStyle='rgba(120,169,255,.72)';ctx.lineWidth=1;
    ctx.beginPath();
    for(let x=0;x<r.width;x++){
      const envelope=Math.sin((x/r.width)*Math.PI);
      const y=r.height/2+Math.sin(x*.13+phase)*11*envelope+Math.sin(x*.043-phase*.7)*7*envelope;
      x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.stroke();phase+=.045;requestAnimationFrame(drawWave);
  }
  drawWave();
}

// Subtle finale / break parallax
if (!reduceMotion) {
  const breakCopy = $('[data-break-copy]');
  addEventListener('scroll', () => {
    if (breakCopy) {
      const r = breakCopy.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) {
        const p = (innerHeight - r.top) / (innerHeight + r.height) - .5;
        breakCopy.style.transform = `rotate(${p * 1.2}deg) scale(${1 + Math.abs(p)*.018})`;
      }
    }
  }, {passive:true});
}

// Load the build-in-public product truth lens as an isolated progressive enhancement.
const truthLayerScript = document.createElement('script');
truthLayerScript.src = 'truth-layer.js';
truthLayerScript.defer = true;
document.head.appendChild(truthLayerScript);

// Load the V3 cinematic product showcase as a progressive enhancement.
const visualUpgradeStyle = document.createElement('link');
visualUpgradeStyle.rel = 'stylesheet';
visualUpgradeStyle.href = 'visual-upgrade.css';
document.head.appendChild(visualUpgradeStyle);

const visualUpgradeScript = document.createElement('script');
visualUpgradeScript.src = 'visual-upgrade.js';
visualUpgradeScript.defer = true;
document.head.appendChild(visualUpgradeScript);

// Load the V3.2 interactive spatial context scene.
const spatialCoreStyle = document.createElement('link');
spatialCoreStyle.rel = 'stylesheet';
spatialCoreStyle.href = 'spatial-core.css';
document.head.appendChild(spatialCoreStyle);

const spatialCoreScript = document.createElement('script');
spatialCoreScript.src = 'spatial-core.js';
spatialCoreScript.defer = true;
document.head.appendChild(spatialCoreScript);
