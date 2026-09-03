(function () {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function injectSignalWall() {
    const anchor = $('.experience') || $('#spatial-core') || $('.break-section');
    if (!anchor || $('#signal-wall')) return;
    const section = document.createElement('section');
    section.id = 'signal-wall';
    section.className = 'signal-wall section-pad';
    section.innerHTML = `
      <div class="section-head"><span>03.2 / SIGNAL WALL</span><span>THE MACHINE SHOULD FEEL ALIVE.</span></div>
      <div class="signal-layout">
        <div class="signal-copy">
          <p class="micro-label">BINARY INTELLIGENCE</p>
          <h2>WATCH THE <span>SYSTEM</span><br>THINK IN SIGNALS,<br><em>NOT TABS.</em></h2>
          <p class="signal-lede">A cinematic learning layer that makes Jarvis feel dense with technology while also showing how information could move through a context-first operating system.</p>
          <div class="signal-legend">
            <div><i></i><span>Binary stream</span></div>
            <div><i></i><span>Context packet</span></div>
            <div><i></i><span>Verification flow</span></div>
          </div>
          <div class="signal-caption">This section is an educational concept visualization, built to explain system behavior — not a claim of finished backend telemetry.</div>
        </div>
        <div class="signal-stage" data-signal-stage>
          <canvas data-binary-canvas aria-hidden="true"></canvas>
          <div class="signal-grid"></div>
          <div class="signal-vignette"></div>
          <div class="signal-hud top-left"><small>INPUT MODE</small><strong>VOICE + TEXT + CONTEXT</strong></div>
          <div class="signal-hud top-right"><small>ACTIVE THREAD</small><strong>JARVIS OS WEBSITE</strong></div>
          <div class="signal-hud bottom-left"><small>PROCESS</small><strong>RESTORE → ROUTE → VERIFY</strong></div>
          <div class="signal-hud bottom-right"><small>STATE</small><strong data-signal-status>CONTEXT RECONSTRUCTING</strong></div>
          <div class="signal-pulse signal-a"></div>
          <div class="signal-pulse signal-b"></div>
          <div class="signal-pulse signal-c"></div>
          <div class="data-column left">
            <span>10100110 01001110 10110101</span>
            <span>CTX // THREAD // RESTORE</span>
            <span>00010101 11001100 01101001</span>
            <span>TOOLS.CONNECT(verified_output)</span>
            <span>MEMORY LAYER / SNAPSHOT / LOAD</span>
          </div>
          <div class="data-column right">
            <span>01010111 00110101 01010111</span>
            <span>INTENT: CONTINUE THE WEBSITE</span>
            <span>ROUTE.DESIGNER + WORKSPACE</span>
            <span>VERIFY.CHANGESET / STATUS / EVIDENCE</span>
            <span>01101010 10010101 01101010</span>
          </div>
          <div class="signal-center">
            <div class="center-orbit"></div>
            <div class="center-core"><b>J</b><span>LIVE CONTEXT</span></div>
            <div class="center-ring ring-1"></div>
            <div class="center-ring ring-2"></div>
          </div>
        </div>
      </div>`;
    anchor.insertAdjacentElement('beforebegin', section);
  }

  function injectLearningSection() {
    const anchor = $('#spatial-core') || $('.break-section');
    if (!anchor || $('#learning-system')) return;
    const section = document.createElement('section');
    section.id = 'learning-system';
    section.className = 'learning-system section-pad';
    section.innerHTML = `
      <div class="section-head"><span>04.2 / HOW JARVIS WORKS</span><span>LEARN THE MODEL WITHOUT THE HYPE.</span></div>
      <div class="learning-top">
        <div>
          <p class="micro-label">SYSTEM EXPLAINER</p>
          <h2>FROM <span>INTENT</span><br>TO <em>VERIFIED ACTION.</em></h2>
        </div>
        <p class="learning-lede">This section turns the product vision into a simple mental model. Instead of claiming magic, it explains the operating pattern: understand the request, recover context, choose the right specialist, use the right tool, and preserve the useful state.</p>
      </div>
      <div class="learning-rail" data-learning-rail>
        <article class="learning-card active" data-learn-step="0">
          <div class="learn-index">01</div><small>INTENT</small>
          <h3>UNDERSTAND WHAT THE USER ACTUALLY WANTS.</h3>
          <p>Jarvis should not react to words alone. It should resolve the underlying task: continue, compare, plan, search, explain, or execute.</p>
          <ul><li>Parse the request</li><li>Detect objective</li><li>Identify ambiguity</li></ul>
        </article>
        <article class="learning-card" data-learn-step="1">
          <div class="learn-index">02</div><small>CONTEXT</small>
          <h3>RESTORE THE RELEVANT PROJECT STATE.</h3>
          <p>The system should gather only the files, decisions, history and constraints needed for the task — not flood the user with everything.</p>
          <ul><li>Rank relevant memory</li><li>Recover working thread</li><li>Preserve continuity</li></ul>
        </article>
        <article class="learning-card" data-learn-step="2">
          <div class="learn-index">03</div><small>ROUTING</small>
          <h3>CHOOSE THE RIGHT AGENT AND THE RIGHT TOOL.</h3>
          <p>Different requests need different specialists. Design work, code work, research and review should not all be treated as the same operation.</p>
          <ul><li>Select specialist</li><li>Choose tool chain</li><li>Plan execution path</li></ul>
        </article>
        <article class="learning-card" data-learn-step="3">
          <div class="learn-index">04</div><small>VERIFICATION</small>
          <h3>RETURN OUTPUT WITH EVIDENCE, NOT GUESSWORK.</h3>
          <p>Jarvis should show what changed, why it changed, and whether the result is final, simulated, conceptual or verified.</p>
          <ul><li>Compare results</li><li>Expose evidence</li><li>Update session state</li></ul>
        </article>
      </div>
      <div class="learning-strip" data-learning-strip>
        <button class="active" type="button" data-learn-target="0">Intent</button>
        <button type="button" data-learn-target="1">Context</button>
        <button type="button" data-learn-target="2">Routing</button>
        <button type="button" data-learn-target="3">Verification</button>
      </div>`;
    anchor.insertAdjacentElement('beforebegin', section);
  }

  function injectGlossary() {
    const anchor = $('.roadmap') || $('.finale');
    if (!anchor || $('#jarvis-glossary')) return;
    const section = document.createElement('section');
    section.id = 'jarvis-glossary';
    section.className = 'jarvis-glossary section-pad';
    section.innerHTML = `
      <div class="section-head"><span>07.2 / LEARN THE LANGUAGE</span><span>SMALL TERMS. BIG IDEAS.</span></div>
      <div class="glossary-top">
        <div><p class="micro-label">TECH CONCEPTS</p><h2>IF YOU CAN <span>NAME</span><br>THE PARTS,<br>YOU CAN <em>BUILD</em> THE SYSTEM.</h2></div>
        <p>Jarvis should teach the visitor something real. These cards turn vague AI buzzwords into product-building ideas.</p>
      </div>
      <div class="glossary-grid">
        <article><small>01</small><h3>Context Engineering</h3><p>Designing what information the system sees, in what order, with what priority, so the model receives useful state instead of noise.</p></article>
        <article><small>02</small><h3>Persistent Memory</h3><p>A layer that preserves important decisions, changes and working history so the next session can resume from a meaningful point.</p></article>
        <article><small>03</small><h3>Agent Orchestration</h3><p>Routing a task to the right specialist instead of forcing one model to pretend it can handle every role equally well.</p></article>
        <article><small>04</small><h3>Tool Execution</h3><p>Connecting the intelligence layer with actual tools such as code editors, search, file systems or automation engines.</p></article>
        <article><small>05</small><h3>Verification Loop</h3><p>A safety layer where the system checks results, compares states and labels output honestly before presenting it as done.</p></article>
        <article><small>06</small><h3>Local-First Direction</h3><p>Designing for privacy, lower latency and user control by keeping as much context, data and execution on-device as practical.</p></article>
      </div>
      <div class="glossary-banner"><span>LEARNABLE SYSTEMS WIN TRUST.</span><span>VISUALS BRING ATTENTION. EXPLANATION KEEPS IT.</span></div>`;
    anchor.insertAdjacentElement('beforebegin', section);
  }

  function setupBinaryCanvas() {
    const canvas = $('[data-binary-canvas]');
    if (!canvas || reduceMotion) return;
    const stage = $('[data-signal-stage]');
    const status = $('[data-signal-status]');
    const states = ['CONTEXT RECONSTRUCTING', 'RELEVANT FILES RANKED', 'SPECIALIST ROUTING READY', 'VERIFIED OUTPUT PREPARED'];
    let stateIndex = 0;
    setInterval(() => { if (status) status.textContent = states[stateIndex++ % states.length]; }, 2100);
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0, columns = 0, drops = [];
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]'.split('');
    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(width / 16);
      drops = Array.from({ length: columns }, () => Math.random() * -40);
    }
    function draw() {
      ctx.fillStyle = 'rgba(3, 5, 8, 0.12)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[(Math.random() * chars.length) | 0];
        const x = i * 16, y = drops[i] * 16;
        ctx.fillStyle = `rgba(130, 176, 255, ${0.2 + Math.random() * 0.45})`;
        ctx.fillText(text, x, y);
        if (y > height && Math.random() > 0.975) drops[i] = Math.random() * -20;
        drops[i] += 0.55 + (i % 7) * 0.02;
      }
      requestAnimationFrame(draw);
    }
    stage?.addEventListener('pointermove', (event) => {
      const rect = stage.getBoundingClientRect();
      stage.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width - 0.5) * 12}px`);
      stage.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height - 0.5) * 10}px`);
    });
    stage?.addEventListener('pointerleave', () => { stage.style.setProperty('--mx', '0px'); stage.style.setProperty('--my', '0px'); });
    resize(); window.addEventListener('resize', resize); draw();
  }

  function setupLearningRail() {
    const cards = $$('[data-learn-step]');
    const tabs = $$('[data-learn-target]');
    if (!cards.length || !tabs.length) return;
    let active = 0, timer;
    function activate(next) {
      active = next;
      cards.forEach((card, i) => card.classList.toggle('active', i === active));
      tabs.forEach((tab, i) => tab.classList.toggle('active', i === active));
    }
    function restart() { clearInterval(timer); if (!reduceMotion) timer = setInterval(() => activate((active + 1) % cards.length), 3000); }
    tabs.forEach((tab) => tab.addEventListener('click', () => { activate(Number(tab.dataset.learnTarget || 0)); restart(); }));
    activate(0); restart();
  }

  function init() { injectSignalWall(); injectLearningSection(); injectGlossary(); setupBinaryCanvas(); setupLearningRail(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();