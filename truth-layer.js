(() => {
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'truth-layer.css';
  document.head.appendChild(css);

  const sectionNames = [
    ['top', 'HERO / PRODUCT VISION'],
    ['manifesto', 'MANIFESTO / PROBLEM'],
    ['experience', 'EXPERIENCE / SIMULATION'],
    ['agents', 'AGENTS / TARGET CAPABILITY'],
    ['memory', 'CONTINUITY / PRODUCT DIRECTION'],
    ['system', 'SYSTEM / ARCHITECTURE DIRECTION'],
    ['roadmap', 'ROADMAP / BUILD IN PUBLIC']
  ];

  const hud = document.createElement('aside');
  hud.className = 'truth-hud';
  hud.setAttribute('aria-label', 'Jarvis product truth lens');
  hud.innerHTML = `
    <div class="truth-hud-head"><span><i class="truth-hud-dot"></i> PRODUCT TRUTH LENS</span><span>BUILD 0.2</span></div>
    <div class="truth-hud-body">
      <span>VIEWING</span><strong data-truth-section>HERO / PRODUCT VISION</strong>
      <span>WEBSITE</span><strong>INTERACTIVE SHOWCASE</strong>
      <span>JARVIS OS</span><strong>IN DEVELOPMENT</strong>
      <span>CLAIMS MODE</span><strong data-truth-state>STANDARD</strong>
    </div>
    <div class="truth-hud-actions"><button class="truth-toggle" type="button" data-truth-toggle>Reveal what is simulated</button><span class="truth-key">R</span></div>`;
  document.body.appendChild(hud);

  const toast = document.createElement('div');
  toast.className = 'truth-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);

  const truthTargets = [
    ['.experience-stage', 'SIMULATED EXPERIENCE'],
    ['.agent-card', 'TARGET CAPABILITY'],
    ['.memory-stage', 'PRODUCT DIRECTION'],
    ['.system-map', 'ARCHITECTURE DIRECTION'],
    ['.command-shell', 'SIMULATED COMMAND UI'],
    ['.hero-core', 'VISUAL METAPHOR']
  ];

  truthTargets.forEach(([selector, label]) => {
    document.querySelectorAll(selector).forEach((node) => {
      node.dataset.truthTarget = label;
      if (getComputedStyle(node).position === 'static') node.style.position = 'relative';
      const marker = document.createElement('span');
      marker.className = 'truth-marker';
      marker.textContent = label;
      node.appendChild(marker);
    });
  });

  const toggle = hud.querySelector('[data-truth-toggle]');
  const state = hud.querySelector('[data-truth-state]');
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1700);
  }
  function setTruthMode(force) {
    const active = typeof force === 'boolean' ? force : !document.body.classList.contains('truth-mode');
    document.body.classList.toggle('truth-mode', active);
    hud.classList.toggle('is-active', active);
    state.textContent = active ? 'REVEALED' : 'STANDARD';
    toggle.textContent = active ? 'Hide product labels' : 'Reveal what is simulated';
    showToast(active ? 'Truth lens enabled — vision and simulation are labelled' : 'Truth lens hidden');
  }
  toggle.addEventListener('click', () => setTruthMode());
  addEventListener('keydown', (event) => {
    if ((event.key === 'r' || event.key === 'R') && !/input|textarea/i.test(document.activeElement?.tagName)) {
      setTruthMode();
    }
  });

  const currentSection = hud.querySelector('[data-truth-section]');
  const sections = sectionNames.map(([id, label]) => [document.getElementById(id), label]).filter(([node]) => node);
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const found = sections.find(([node]) => node === visible.target);
    if (found) currentSection.textContent = found[1];
  }, { threshold: [0.16, 0.35, 0.58] });
  sections.forEach(([node]) => sectionObserver.observe(node));

  const commandCenter = document.querySelector('[data-command-center]');
  if (commandCenter) {
    const commandObserver = new MutationObserver(() => {
      if (commandCenter.classList.contains('open')) currentSection.textContent = 'COMMAND CENTER / SIMULATION';
    });
    commandObserver.observe(commandCenter, { attributes: true, attributeFilter: ['class'] });
  }
})();