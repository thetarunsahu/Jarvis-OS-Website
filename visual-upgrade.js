(function(){
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  function injectShowcase() {
    const ticker = $('.ticker');
    if (!ticker || $('#showcase')) return;

    const section = document.createElement('section');
    section.className = 'showcase section-pad';
    section.id = 'showcase';
    section.innerHTML = `
      <div class="section-head reveal"><span>02.5 / INTERFACE PREVIEWS</span><span>DESIGNED SCREENS. CLEAR PRODUCT DIRECTION.</span></div>
      <div class="showcase-layout">
        <div class="showcase-copy reveal">
          <p class="micro-label">PRODUCT VISUALS</p>
          <h2>SEE THE<br /><em>INTERFACE</em><br />TAKE SHAPE.</h2>
          <p>These are conceptual interface previews for Jarvis OS. They are here to make the product feel tangible without pretending the whole system already exists.</p>
          <div class="showcase-tabs" data-showcase-tabs>
            <button type="button" class="active" data-showcase-target="0">Command Center</button>
            <button type="button" data-showcase-target="1">Memory Thread</button>
            <button type="button" data-showcase-target="2">Agent Routing</button>
            <button type="button" data-showcase-target="3">File Intelligence</button>
          </div>
          <div class="showcase-meta"><span data-showcase-label>CONCEPT SCREEN</span><span data-showcase-index>01 / 04</span></div>
        </div>

        <div class="showcase-stage reveal" data-showcase-stage>
          <div class="showcase-beam"></div>
          <article class="mockup-screen active" data-showcase-panel="0">
            <div class="mockup-bar"><span>JARVIS / COMMAND CENTER</span><span>ACTIVE THREAD</span></div>
            <div class="mockup-command-header">
              <small>PRIMARY INTENT</small>
              <h3>Continue the website from where we stopped.</h3>
            </div>
            <div class="mockup-command-grid">
              <div class="mockup-card large">
                <small>RESTORED CONTEXT</small>
                <strong>Jarvis OS Website</strong>
                <p>Recent decisions, relevant files and unfinished design work gathered into one live thread.</p>
                <div class="chip-row"><span>4 changed files</span><span>visual upgrade</span><span>next action selected</span></div>
              </div>
              <div class="mockup-card side">
                <small>STATE</small>
                <ul class="metric-list"><li><span>Context</span><b>Loaded</b></li><li><span>Agents</span><b>Ready</b></li><li><span>Priority</span><b>Hero V3</b></li></ul>
              </div>
              <div class="mockup-card side wave"><small>VOICE</small><div class="mini-wave"></div></div>
            </div>
          </article>

          <article class="mockup-screen" data-showcase-panel="1">
            <div class="mockup-bar"><span>JARVIS / MEMORY THREAD</span><span>PERSISTENCE LAYER</span></div>
            <div class="timeline-ui">
              <div class="timeline-rail"></div>
              <div class="timeline-item done"><span>YESTERDAY</span><strong>Architecture locked</strong><p>Separated the desktop shell from agent runtime.</p></div>
              <div class="timeline-item current"><span>TODAY</span><strong>Website V3 started</strong><p>Hero needs a more premium visual identity and product previews.</p></div>
              <div class="timeline-item"><span>NEXT</span><strong>Generate product assets</strong><p>Replace abstract placeholders with higher-fidelity Jarvis screens.</p></div>
            </div>
          </article>

          <article class="mockup-screen" data-showcase-panel="2">
            <div class="mockup-bar"><span>JARVIS / AGENT ROUTING</span><span>ORCHESTRATION VIEW</span></div>
            <div class="routing-shell">
              <div class="routing-core"><span>JARVIS</span><small>ORCHESTRATOR</small></div>
              <div class="route-node a"><span>Builder</span><small>Implement interface changes</small></div>
              <div class="route-node b"><span>Designer</span><small>Shape the product language</small></div>
              <div class="route-node c"><span>Researcher</span><small>Check current references</small></div>
              <div class="route-node d"><span>Archivist</span><small>Retrieve project memory</small></div>
              <svg viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
                <path d="M500 300 C370 300 325 120 170 120" />
                <path d="M500 300 C650 300 700 130 845 130" />
                <path d="M500 300 C365 300 320 500 160 500" />
                <path d="M500 300 C640 300 690 500 840 500" />
              </svg>
            </div>
          </article>

          <article class="mockup-screen" data-showcase-panel="3">
            <div class="mockup-bar"><span>JARVIS / FILE INTELLIGENCE</span><span>RANKED CONTEXT</span></div>
            <div class="files-ui">
              <div class="files-sidebar">
                <small>RELEVANCE</small>
                <button class="active">index.html</button>
                <button>styles.css</button>
                <button>script.js</button>
                <button>truth-layer.js</button>
              </div>
              <div class="files-panel">
                <small>MOST RELEVANT FILE</small>
                <strong>styles.css</strong>
                <p>Contains the visual language that controls the premium feel of the landing page, motion rhythm and component identity.</p>
                <div class="code-lines">
                  <span></span><span></span><span class="short"></span><span></span><span class="short"></span>
                </div>
                <div class="chip-row"><span>visual system</span><span>hero layout</span><span>motion</span></div>
              </div>
            </div>
          </article>
        </div>
      </div>`;

    ticker.insertAdjacentElement('afterend', section);
  }

  function enhanceHero() {
    const hero = $('.hero');
    const heroCore = $('.hero-core', hero || document);
    if (!hero || !heroCore || $('.hero-hud', hero)) return;

    const hud = document.createElement('div');
    hud.className = 'hero-hud';
    hud.innerHTML = `
      <div class="hud-chip chip-a reveal"><small>VOICE</small><strong>ON-DEMAND</strong></div>
      <div class="hud-chip chip-b reveal"><small>THREAD</small><strong>RESTORABLE</strong></div>
      <div class="hud-chip chip-c reveal"><small>AGENTS</small><strong>ROUTED</strong></div>
      <div class="hud-chip chip-d reveal"><small>FILES</small><strong>CONTEXTUAL</strong></div>`;
    hero.appendChild(hud);

    const halo = document.createElement('div');
    halo.className = 'core-halo';
    const beam = document.createElement('div');
    beam.className = 'core-beam';
    const badge = document.createElement('div');
    badge.className = 'hero-core-note';
    badge.innerHTML = '<small>INTERFACE STATE</small><strong>JARVIS CORE / ONLINE</strong>';

    heroCore.appendChild(halo);
    heroCore.appendChild(beam);
    heroCore.appendChild(badge);
  }

  function setupShowcaseInteraction() {
    const tabs = $$('[data-showcase-target]');
    const panels = $$('[data-showcase-panel]');
    const index = $('[data-showcase-index]');
    const label = $('[data-showcase-label]');
    if (!tabs.length || !panels.length) return;

    const labels = [
      'CONCEPT SCREEN',
      'MEMORY PREVIEW',
      'ORCHESTRATION PREVIEW',
      'FILE RANKING PREVIEW'
    ];

    let active = 0;
    let timer;

    function setActive(next) {
      active = next;
      tabs.forEach((tab, i) => tab.classList.toggle('active', i === active));
      panels.forEach((panel, i) => panel.classList.toggle('active', i === active));
      if (index) index.textContent = `0${active + 1} / 04`;
      if (label) label.textContent = labels[active];
    }

    function restartAuto() {
      clearInterval(timer);
      timer = setInterval(() => setActive((active + 1) % panels.length), 3200);
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        setActive(Number(tab.dataset.showcaseTarget || 0));
        restartAuto();
      });
    });

    setActive(0);
    restartAuto();
  }

  function revealNewNodes() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.18 });

    $$('.showcase .reveal, .hero-hud .reveal').forEach((el) => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else init();

  function init() {
    injectShowcase();
    enhanceHero();
    setupShowcaseInteraction();
    revealNewNodes();
  }
})();