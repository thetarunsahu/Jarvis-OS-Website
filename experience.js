/* Jarvis OS: one input/state system; no global text rewriting. */
(() => {
  'use strict';
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => Array.from(root.querySelectorAll(q));
  const html = document.documentElement;
  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch (_) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (_) { /* Preferences remain session-local. */ } }
  };
  let motion = !motionQuery.matches && storage.get('jarvis-motion') !== 'off';
  let sound = false; // Always opt in during this visit.
  let audioContext = null;
  let runId = 0;
  let activeAgent = 'builder';
  let returnFocus = null;
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function applyMotion() {
    html.classList.toggle('motion-off', !motion);
    const button = $('#motion-toggle');
    button.textContent = motion ? 'Motion on' : 'Motion off';
    button.setAttribute('aria-pressed', String(motion));
    window.dispatchEvent(new CustomEvent('jarvis:motion', { detail: { enabled: motion } }));
    requestScroll();
  }
  $('#motion-toggle').addEventListener('click', () => {
    motion = !motion;
    storage.set('jarvis-motion', motion ? 'on' : 'off');
    applyMotion();
  });
  motionQuery.addEventListener('change', event => {
    motion = !event.matches && storage.get('jarvis-motion') !== 'off';
    applyMotion();
  });

  function tone(kind = 'tap') {
    if (!sound) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') audioContext.resume();
      const frequencies = kind === 'done' ? [440, 660, 880] : [kind === 'step' ? 392 : 330];
      frequencies.forEach((frequency, i) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const at = audioContext.currentTime + i * .075;
        oscillator.type = 'sine'; oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(.0001, at);
        gain.gain.exponentialRampToValueAtTime(.028, at + .015);
        gain.gain.exponentialRampToValueAtTime(.0001, at + .2);
        oscillator.connect(gain); gain.connect(audioContext.destination);
        oscillator.start(at); oscillator.stop(at + .23);
      });
    } catch (_) { sound = false; updateSound(); }
  }
  function updateSound() {
    $('#sound-toggle').textContent = sound ? 'Sound on' : 'Sound off';
    $('#sound-toggle').setAttribute('aria-pressed', String(sound));
  }
  $('#sound-toggle').addEventListener('click', () => { sound = !sound; updateSound(); tone(); });

  function openDialog(dialog, focus) {
    if (dialog.open) return;
    returnFocus = document.activeElement;
    dialog.showModal();
    if (focus) focus.focus({ preventScroll: true });
    tone();
  }
  const commandDialog = $('#command-dialog');
  $$('[data-open-command]').forEach(button => button.addEventListener('click', () => openDialog(commandDialog, $('#command-input'))));
  $('#menu-toggle').addEventListener('click', () => openDialog($('#mobile-menu')));
  $('#shortcut-toggle').addEventListener('click', () => openDialog($('#shortcuts-dialog')));
  $$('dialog').forEach(dialog => {
    $('[data-close-dialog]', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    });
  });
  $$('#mobile-menu a').forEach(a => a.addEventListener('click', () => $('#mobile-menu').close()));

  function goTo(selector, focus) {
    const target = $(selector);
    if (!target) return;
    target.scrollIntoView({ behavior: motion ? 'smooth' : 'auto', block: 'center' });
    if (focus) focus.focus({ preventScroll: true });
  }

  // Roving tabindex and arrow/Home/End behavior are shared by the two tab sets.
  function keyboardTabs(tablist, activate) {
    const tabs = $$('[role="tab"]', tablist);
    tablist.addEventListener('keydown', event => {
      const current = tabs.indexOf(document.activeElement);
      if (current < 0) return;
      const vertical = tablist.getAttribute('aria-orientation') === 'vertical';
      const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
      const previousKey = vertical ? 'ArrowUp' : 'ArrowLeft';
      let next = current;
      if (event.key === nextKey) next = (current + 1) % tabs.length;
      else if (event.key === previousKey) next = (current - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault(); tabs[next].focus(); activate(tabs[next]);
    });
  }
  function selectTab(tabs, active) {
    tabs.forEach(tab => {
      const selected = tab === active;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      tab.classList.toggle('active', selected);
    });
  }
  function animatePanel(element) {
    if (!motion) return;
    element.classList.remove('refreshing');
    void element.offsetWidth;
    element.classList.add('refreshing');
  }

  const workspacePanel = $('#workspace-panel');
  const originalOverview = workspacePanel.innerHTML;
  const workspaceViews = {
    projects: '<div class="workspace-greeting"><span class="eyebrow">EXAMPLE PROJECT CONTEXT</span><h3>Every idea has a home.</h3><p>Open a thread to bring its working context back.</p></div><div class="workspace-list"><button class="workspace-item" data-prompt="Continue my Jarvis OS project"><span>Jarvis OS<small>Architecture · product experience</small></span><span aria-hidden="true">↗</span></button><button class="workspace-item" data-prompt="Find the files for my robot project"><span>Robotics project<small>Research · hardware · software</small></span><span aria-hidden="true">↗</span></button><button class="workspace-item" data-prompt="Research what I need for my SIH project"><span>SIH research<small>Problem statement · next steps</small></span><span aria-hidden="true">↗</span></button></div>',
    memory: '<div class="workspace-greeting"><span class="eyebrow">EXAMPLE SAVED CONTEXT</span><h3>Keep what matters.</h3><p>Decisions, files, and the next useful action.</p></div><div class="workspace-list"><div class="workspace-item"><div>Architecture decision<small>Separate the desktop shell from the agent runtime.</small></div><span class="eyebrow">DECISION</span></div><div class="workspace-item"><div>Product experience<small>Keep the identity clear and the motion controlled.</small></div><span class="eyebrow">DIRECTION</span></div><div class="workspace-item"><div>Next session<small>Continue the interface and inspect the changes.</small></div><span class="eyebrow">RESUME</span></div></div>',
    agents: '<div class="workspace-greeting"><span class="eyebrow">SPECIALIST ROSTER / CONCEPT</span><h3>The right mind for the task.</h3><p>One goal. A coordinated handoff.</p></div><div class="workspace-list"><div class="workspace-item"><div>The Builder<small>Implementation and verification</small></div><span class="eyebrow">CODE</span></div><div class="workspace-item"><div>The Researcher<small>Sources and comparisons</small></div><span class="eyebrow">RESEARCH</span></div><div class="workspace-item"><div>The Designer + Archivist<small>Product direction and working context</small></div><span class="eyebrow">CONTEXT</span></div></div>'
  };
  function selectView(button) {
    const view = button.dataset.view;
    selectTab($$('[data-view]'), button);
    workspacePanel.setAttribute('aria-labelledby', button.id);
    workspacePanel.innerHTML = view === 'overview' ? originalOverview : workspaceViews[view];
    animatePanel(workspacePanel); tone();
  }
  $$('[data-view]').forEach(button => button.addEventListener('click', () => selectView(button)));
  keyboardTabs($('.workspace-tabs'), selectView);

  const memories = {
    decision: ['LAST DECISION', 'Keep the desktop shell separate from the agent runtime.', 'Architecture / saved context'],
    files: ['RELEVANT CONTEXT', 'Product brief, architecture notes, and the current interface direction.', 'Illustrative project records / no file access'],
    next: ['YOUR RESUME POINT', 'Continue the interface, inspect what changed, and capture the next decision.', 'Next action / same continuous thread']
  };
  function selectMemory(button) {
    selectTab($$('[data-memory]'), button);
    const [label, copy, context] = memories[button.dataset.memory];
    const panel = $('#memory-detail');
    panel.setAttribute('aria-labelledby', button.id);
    panel.innerHTML = '<span class="eyebrow">' + label + '</span><p>' + copy + '</p><span class="memory-context">' + context + '</span>';
    animatePanel(panel); tone();
  }
  $$('[data-memory]').forEach(button => button.addEventListener('click', () => selectMemory(button)));
  keyboardTabs($('.memory-tabs'), selectMemory);

  const agentPrompts = {
    builder: "Continue yesterday's branch and help me debug the next step.",
    researcher: 'Research what I need for my SIH project.',
    designer: 'Help me refine the interface for Jarvis OS.',
    archivist: 'Find the files for my robot project.'
  };
  $$('[data-agent]').forEach(button => button.addEventListener('click', () => {
    activeAgent = button.dataset.agent;
    $$('[data-agent]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    $('#agent-example').textContent = '“' + agentPrompts[activeAgent] + '”';
    tone();
  }));
  $('#agent-try').addEventListener('click', () => launchDemo(agentPrompts[activeAgent]));

  function classify(goal) {
    if (/research|compare|sih|source|study/i.test(goal)) return {
      agent: 'Researcher', view: 'projects', context: 'Example SIH brief and research questions',
      result: 'The Researcher would compare sources against your project brief, then return a cited summary and the gaps worth investigating.'
    };
    if (/file|robot|folder|find|archive/i.test(goal)) return {
      agent: 'Archivist', view: 'projects', context: 'Example robotics project and related notes',
      result: 'The Archivist would bring together the project brief, hardware notes, and related files, with an explanation of why each one matters.'
    };
    if (/design|interface|visual|creative/i.test(goal)) return {
      agent: 'Designer', view: 'agents', context: 'Example product brief and visual direction',
      result: 'The Designer would restore the approved direction, propose the next interface change, and return a preview for you to inspect.'
    };
    if (/plan|day|schedule/i.test(goal)) return {
      agent: 'Planner', view: 'projects', context: 'Example commitments and open project threads',
      result: 'A planning specialist would organize your next steps around available time and project priorities, keeping the same working context.'
    };
    if (/continue|jarvis|debug|code|branch|yesterday|resume|build/i.test(goal)) return {
      agent: 'Builder', view: 'overview', context: 'Example Jarvis OS architecture decision',
      result: 'Resume point ready: the desktop shell stays separate from the agent runtime. The next step is to continue the interface and inspect the changes.'
    };
    return {
      agent: 'Intent review', view: 'overview', context: 'A new goal with no existing example context',
      result: 'This scripted demo supports project continuity, research, design, and file discovery. In the product vision, Jarvis would clarify this goal before choosing a specialist.'
    };
  }
  async function runDemo(goal) {
    goal = goal.trim().slice(0, 400);
    if (!goal) return;
    const id = ++runId;
    const scenario = classify(goal);
    const status = $('#demo-status'), response = $('#demo-response'), output = $('#demo-output');
    const steps = $$('[data-step]');
    $('#demo-input').value = goal;
    $('#demo-submit').disabled = true;
    $('#demo-form').setAttribute('aria-busy', 'true');
    output.classList.add('busy');
    document.body.classList.add('executing');
    const labels = ['Reading the intent', 'Restoring context', 'Routing the thought', 'Resume point ready'];
    const copy = [
      'Your goal: “' + goal + '”',
      scenario.context + '.',
      'Suggested specialist: ' + scenario.agent + '.',
      scenario.result
    ];
    const states = ['thinking', 'memory', 'routing', 'ready'];
    try {
      for (let i = 0; i < 4; i++) {
        if (id !== runId) return;
        steps.forEach((step, index) => {
          step.classList.toggle('active', index === i);
          step.classList.toggle('complete', index < i);
          if (index === i) step.setAttribute('aria-current', 'step');
          else step.removeAttribute('aria-current');
        });
        status.textContent = labels[i].toUpperCase();
        response.textContent = copy[i]; // User input never enters HTML.
        $('#core-state').textContent = labels[i];
        window.dispatchEvent(new CustomEvent('jarvis:state', { detail: { state: states[i] } }));
        tone(i === 3 ? 'done' : 'step');
        if (i === 1) selectView($('[data-view="' + scenario.view + '"]'));
        if (i < 3) await delay(motion ? 800 : 180);
      }
      steps.forEach(step => { step.classList.add('complete'); step.classList.remove('active'); });
      status.textContent = 'DEMO COMPLETE / ' + scenario.agent.toUpperCase();
    } finally {
      if (id === runId) {
        $('#demo-submit').disabled = false;
        $('#demo-form').removeAttribute('aria-busy');
        output.classList.remove('busy');
        document.body.classList.remove('executing');
      }
    }
  }
  function launchDemo(goal) {
    if (commandDialog.open) commandDialog.close();
    goTo('#demo-console', $('#demo-input'));
    runDemo(goal);
  }
  $('#demo-form').addEventListener('submit', event => { event.preventDefault(); runDemo($('#demo-input').value); });
  $('#command-form').addEventListener('submit', event => { event.preventDefault(); launchDemo($('#command-input').value); });
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-prompt],[data-dialog-prompt]');
    if (!trigger) return;
    launchDemo(trigger.dataset.prompt || trigger.dataset.dialogPrompt);
  });

  document.addEventListener('keydown', event => {
    const typing = event.target.matches('input,textarea,select,[contenteditable="true"]');
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (commandDialog.open) commandDialog.close();
      else if (!$('dialog[open]')) openDialog(commandDialog, $('#command-input'));
      return;
    }
    if (typing || event.ctrlKey || event.metaKey || event.altKey || $('dialog[open]')) return;
    const key = event.key.toLowerCase();
    if (key === 'j') { event.preventDefault(); openDialog(commandDialog, $('#command-input')); }
    if (key === '/') { event.preventDefault(); goTo('#demo-console', $('#demo-input')); }
    if (key === 'm') { event.preventDefault(); goTo('#memory', $('#memory-decision')); }
    if (key === 'a') { event.preventDefault(); goTo('#system', $('[data-agent]')); }
    if (key === 'l') { event.preventDefault(); window.location.href = 'lab.html'; }
    if (key === '?') { event.preventDefault(); openDialog($('#shortcuts-dialog')); }
  });

  // One-shot reveals preserve the original DOM and leave every section readable.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-seen');
      observer.unobserve(entry.target);
    }), { threshold: .1, rootMargin: '0px 0px -25px 0px' });
    $$('[data-reveal]').forEach(element => observer.observe(element));
    const chapterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        $$('.desktop-nav a[href^="#"]').forEach(a => a.classList.toggle('active', a.hash === '#' + entry.target.id));
      });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    ['vision','experience','system'].forEach(id => chapterObserver.observe($('#' + id)));
  }
  let scrollFrame = 0;
  function requestScroll() {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(updateScroll);
  }
  function updateScroll() {
    scrollFrame = 0;
    const maximum = html.scrollHeight - innerHeight;
    $('#reading-progress').style.transform = 'scaleX(' + (maximum > 0 ? Math.max(0, Math.min(1, scrollY / maximum)) : 0) + ')';
    $('#site-nav').classList.toggle('scrolled', scrollY > 30);
    if (!motion) return;
    const workspace = $('#workspace');
    const r = workspace.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0 && innerWidth > 640) {
      const angle = Math.min(5, Math.max(0, (r.top - innerHeight * .12) / innerHeight * 6));
      workspace.style.setProperty('--workspace-tilt', angle.toFixed(2) + 'deg');
    }
    const footer = $('.finale-word');
    const f = footer.getBoundingClientRect();
    if (f.top < innerHeight && f.bottom > 0) footer.style.setProperty('--footer-offset', Math.max(0, (innerHeight - f.top) * .025).toFixed(1) + 'px');
  }
  addEventListener('scroll', requestScroll, { passive: true });
  addEventListener('resize', requestScroll, { passive: true });
  applyMotion();
})();

