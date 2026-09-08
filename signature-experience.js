(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const timers=new Set();
  const later=(fn,ms)=>{const id=setTimeout(()=>{timers.delete(id);fn();},reduce?Math.min(ms,40):ms);timers.add(id);return id;};

  const statusMeta={
    idle:['IDLE','84%','06','04'],listening:['LISTENING','92%','08','04'],thinking:['THINKING','96%','11','04'],routing:['ROUTING','94%','09','04'],executing:['EXECUTING','89%','07','05'],verified:['VERIFIED','98%','06','05']
  };

  function sectionAfter(selector,id,html,className='signature-section section-pad'){
    const anchor=$(selector); if(!anchor||$('#'+id)) return null;
    const el=document.createElement('section'); el.id=id; el.className=className; el.innerHTML=html;
    anchor.insertAdjacentElement('afterend',el); return el;
  }
  function sectionBefore(selector,id,html,className='signature-section section-pad'){
    const anchor=$(selector); if(!anchor||$('#'+id)) return null;
    const el=document.createElement('section'); el.id=id; el.className=className; el.innerHTML=html;
    anchor.insertAdjacentElement('beforebegin',el); return el;
  }

  function injectCompare(){
    return sectionAfter('#manifesto','jarvis-contrast',`
      <div class="section-head"><span>01.6 / WHY JARVIS</span><span>THE DIFFERENCE IS CONTINUITY.</span></div>
      <div class="contrast-head">
        <div><p class="micro-label">BEFORE / WITH JARVIS</p><h2>TOO MANY <span>TOOLS.</span><br>NOT ENOUGH<br><em>CONTEXT.</em></h2></div>
        <p>The point of Jarvis is not to add another destination. It is to remove the reconstruction tax between you and the work.</p>
      </div>
      <div class="contrast-stage" data-contrast-stage>
        <div class="contrast-panel without">
          <small>WITHOUT JARVIS</small>
          <strong>RECONSTRUCT THE WORK.</strong>
          <ul><li><b>18</b><span>browser tabs</span></li><li><b>06</b><span>apps open</span></li><li><b>04</b><span>folders searched</span></li><li><b>03</b><span>old chats reopened</span></li></ul>
          <div class="contrast-log"><span>searching for last decision…</span><span>which file was final?</span><span>what did we change yesterday?</span><span class="blink">context missing_</span></div>
        </div>
        <div class="contrast-center"><span>THE PROBLEM WAS NEVER TOO FEW TOOLS.</span><i></i><strong>IT WAS TOO LITTLE CONTEXT.</strong></div>
        <div class="contrast-panel with">
          <small>WITH JARVIS</small>
          <strong>RESUME THE OBJECTIVE.</strong>
          <ul><li><b>01</b><span>goal restored</span></li><li><b>06</b><span>relevant files ranked</span></li><li><b>01</b><span>last decision loaded</span></li><li><b>01</b><span>next action ready</span></li></ul>
          <div class="contrast-log"><span>project state restored</span><span>Designer routed</span><span>evidence attached</span><span class="good">resume point ready</span></div>
        </div>
      </div>
      <form class="signature-command" data-signature-command>
        <div><small>ONE COMMAND / WHOLE SYSTEM</small><input aria-label="Try a Jarvis orchestration command" value="Continue my Jarvis project from yesterday." /></div>
        <button type="submit">RUN ACROSS JARVIS ↗</button>
      </form>`);
  }

  function injectSilent(){
    return sectionBefore('#memory','silent-continuity',`
      <div class="silent-sticky">
        <div class="silent-mark">SESSION / CLOSED</div>
        <div class="silent-lines">
          <h2 data-silent-a>YOU CLOSED<br>THE LAPTOP.</h2>
          <h2 data-silent-b>THE CONTEXT<br><em>DIDN'T.</em></h2>
          <p data-silent-c>Tomorrow should begin from the work — not from the reconstruction of the work.</p>
        </div>
        <div class="silent-core"><i></i><i></i><b></b></div>
      </div>`,`silent-continuity`);
  }

  function injectMemoryCapsule(){
    return sectionAfter('#memory','memory-capsule',`
      <div class="section-head"><span>04.7 / MEMORY CAPSULE</span><span>MAKE CONTINUITY INSPECTABLE.</span></div>
      <div class="capsule-intro"><div><p class="micro-label">PROJECT MEMORY</p><h2>THE SYSTEM<br>SHOULD REMEMBER<br><em>THE RIGHT THINGS.</em></h2></div><p>Memory is useful only when you can see what survived, why it matters and where to resume. This is a concept for an inspectable Jarvis memory object.</p></div>
      <div class="capsule-shell">
        <aside class="capsule-tabs">
          ${['Overview','Decisions','Files','Resume'].map((x,i)=>`<button type="button" data-capsule-tab="${i}" class="${i===0?'active':''}"><small>0${i+1}</small><span>${x}</span></button>`).join('')}
        </aside>
        <div class="capsule-card">
          <div class="capsule-card-top"><span>PROJECT MEMORY / JARVIS OS WEBSITE</span><span>CONCEPT OBJECT</span></div>
          <div class="capsule-view" data-capsule-view></div>
        </div>
        <aside class="day-thread">
          <small>ONE DAY / ONE THREAD</small>
          <ol><li><time>08:14</time><span>“What is important today?”</span></li><li><time>10:42</time><span>“Continue the website.”</span></li><li><time>14:08</time><span>“Research alternatives.”</span></li><li><time>18:31</time><span>“Save where we stopped.”</span></li><li class="next"><time>NEXT DAY</time><span>“Continue.”</span></li></ol>
          <strong>THE SESSION ENDS.<br>THE CONTEXT DOESN'T.</strong>
        </aside>
      </div>`);
  }

  function injectEvidence(){
    const anchor=$('#orchestration-lab')||$('#learning-system')||$('#inside-jarvis');
    if(!anchor||$('#evidence-trail')) return null;
    const el=document.createElement('section'); el.id='evidence-trail'; el.className='evidence-trail section-pad';
    el.innerHTML=`
      <div class="section-head"><span>05.7 / EVIDENCE TRAIL</span><span>“DONE” SHOULD HAVE PROOF.</span></div>
      <div class="evidence-intro"><div><p class="micro-label">VERIFICATION UX</p><h2>DON'T TRUST<br>THE CLAIM.<br><em>TRACE IT.</em></h2></div><p>Jarvis should separate a confident sentence from a verified outcome. This demo shows the proof chain behind a completed task.</p></div>
      <div class="evidence-shell" data-evidence-shell>
        <div class="evidence-result"><small>TASK RESULT</small><strong>Website hero updated.</strong><span data-evidence-status>NOT CHECKED</span><button type="button" data-evidence-run>RUN EVIDENCE CHECK ↗</button></div>
        <div class="evidence-chain">
          ${[['01','PROMPT','Goal understood'],['02','PLAN','Target files selected'],['03','CHANGE','Interface modified'],['04','TEST','Validation executed'],['05','RESULT','State verified']].map((x,i)=>`<article data-evidence-step="${i}"><small>${x[0]}</small><span>${x[1]}</span><strong>${x[2]}</strong><i></i></article>`).join('')}
        </div>
        <div class="evidence-proof"><span>ILLUSTRATIVE PROOF TRAIL</span><div><b data-proof-line>Awaiting verification.</b><small data-proof-meta>Concept trace — not live product telemetry.</small></div></div>
      </div>`;
    anchor.insertAdjacentElement('afterend',el); return el;
  }

  function injectOSMorph(){
    const anchor=$('#product-suite')||$('.roadmap');
    if(!anchor||$('#os-threshold')) return null;
    const el=document.createElement('section'); el.id='os-threshold'; el.className='os-threshold';
    el.innerHTML=`
      <div class="os-scroll" data-os-scroll>
        <div class="os-sticky section-pad">
          <div class="inside-head"><span>06.8 / THE THRESHOLD</span><span>FROM PAGE → OPERATING LAYER.</span></div>
          <div class="os-stage" data-os-stage>
            <div class="browser-frame" data-browser-frame>
              <div class="browser-chrome"><div><i></i><i></i><i></i></div><span>jarvis.local / experience</span><small>BROWSER</small></div>
              <div class="os-wallpaper"></div>
              <div class="os-core-mini"><i></i><i></i><b></b></div>
              <aside class="os-sidebar"><small>THREADS</small><span class="active">Jarvis OS</span><span>Research</span><span>Robot</span><span>FreshFusion</span></aside>
              <main class="os-main"><small data-os-kicker>WEB EXPERIENCE</small><h3 data-os-title>THIS STARTS AS A WEBSITE.</h3><p data-os-copy>Keep scrolling. The interface stops behaving like a page and begins behaving like a persistent work surface.</p><div class="os-cards"><article><small>ACTIVE GOAL</small><strong>Ship Jarvis Website</strong></article><article><small>MEMORY</small><strong>Resume point ready</strong></article><article><small>AGENT</small><strong>Designer active</strong></article></div></main>
              <aside class="os-context"><small>CONTEXT</small><div><span>Project</span><b>Jarvis OS</b></div><div><span>State</span><b>Restored</b></div><div><span>Evidence</span><b>Attached</b></div></aside>
              <div class="os-dock"><button>⌘</button><button>◫</button><button>✦</button><button>⌕</button><button>◉</button></div>
              <div class="os-label">CONCEPT UI / FUTURE PRODUCT DIRECTION</div>
            </div>
          </div>
          <div class="os-story"><span data-os-index>01 / 04</span><strong data-os-story>WEBSITE</strong><p data-os-note>Information is presented to you.</p></div>
          <div class="inside-footer"><span>PAGE → THREAD → WORKSPACE → INTELLIGENCE LAYER</span><span data-os-percent>00%</span></div>
        </div>
      </div>`;
    anchor.insertAdjacentElement('beforebegin',el); return el;
  }

  function injectWorkflows(){
    return sectionBefore('.roadmap','workflow-stories',`
      <div class="section-head"><span>07.4 / REAL WORKFLOWS</span><span>WHAT WOULD YOU ACTUALLY ASK IT TO DO?</span></div>
      <div class="workflow-intro"><div><p class="micro-label">USE CASES</p><h2>THE PRODUCT<br>IS THE<br><em>RESUME BUTTON.</em></h2></div><p>Different people have different tools. The shared problem is the same: rebuilding context before meaningful work can continue.</p></div>
      <div class="workflow-grid">
        ${[
          ['STUDENT','“Continue my SIH research and tell me what is missing.”','Researcher','Sources → gaps → next action'],
          ['DEVELOPER','“Open yesterday’s branch and continue debugging.”','Builder','Branch → logs → fix → verify'],
          ['FOUNDER','“Summarize what changed across product, docs and messages.”','Archivist','Changes → decisions → risks'],
          ['CREATOR','“Find the last approved design and prepare the next iteration.”','Designer','Approved state → visual direction']
        ].map((x,i)=>`<article><small>0${i+1} / ${x[0]}</small><h3>${x[1]}</h3><div><span>ROUTE</span><b>${x[2]}</b></div><p>${x[3]}</p><button type="button" data-workflow-run="${i}">RUN STORY ↗</button></article>`).join('')}
      </div>`);
  }

  function injectHardware(){
    const anchor=$('#tech-atlas')||$('.finale'); if(!anchor||$('#physical-jarvis')) return null;
    const el=document.createElement('section'); el.id='physical-jarvis'; el.className='physical-jarvis section-pad';
    el.innerHTML=`
      <div class="section-head"><span>08.8 / PHYSICAL LAYER</span><span>WHAT IF JARVIS HAD A MACHINE BODY?</span></div>
      <div class="hardware-frame">
        <img src="assets/jarvis-silicon-core.svg" alt="Original Jarvis silicon and compute concept artwork" loading="lazy">
        <div class="hardware-copy"><small>ORIGINAL CONCEPT ARTWORK</small><h2>INTELLIGENCE<br>NEEDS<br><em>COMPUTE.</em></h2><p>A future Jarvis can span software and hardware: microphones, cameras, local inference, memory, acceleration and controlled interfaces.</p></div>
        <div class="hardware-nodes"><span class="n1">VOICE</span><span class="n2">CAMERA</span><span class="n3">LOCAL MODEL</span><span class="n4">MEMORY</span><span class="n5">GPU / NPU</span><span class="n6">TOOLS</span></div>
        <div class="hardware-caption">PHYSICAL PRODUCT DIRECTION / NOT A FINISHED DEVICE</div>
      </div>`;
    anchor.insertAdjacentElement('beforebegin',el); return el;
  }

  function injectHUD(){
    if($('.signature-hud')) return;
    const hud=document.createElement('aside'); hud.className='signature-hud'; hud.innerHTML=`
      <div class="signature-hud-top"><span><i></i> JARVIS CORE</span><small>CONCEPT PULSE</small></div>
      <strong data-pulse-state>IDLE</strong>
      <div class="pulse-grid"><span>CONTEXT<b data-pulse-context>84%</b></span><span>MEMORY<b data-pulse-memory>06</b></span><span>AGENTS<b data-pulse-agents>04</b></span><span>TOOLS<b data-pulse-tools>05</b></span></div>
      <div class="pulse-thread"><small>THREAD</small><span data-pulse-thread>Jarvis OS Website</span></div>`;
    document.body.appendChild(hud);
  }

  function injectTrace(){
    if($('.signature-trace')) return;
    const el=document.createElement('aside'); el.className='signature-trace'; el.setAttribute('aria-live','polite');
    el.innerHTML=`<div><span>WHOLE-SYSTEM TRACE</span><button type="button" data-trace-close>×</button></div><strong data-trace-title>STANDBY</strong><p data-trace-copy>Give Jarvis one goal and watch the interface react.</p><div class="trace-steps">${['INTENT','MEMORY','ROUTE','TOOL','VERIFY'].map((x,i)=>`<span data-trace-step="${i}">${x}</span>`).join('')}</div>`;
    document.body.appendChild(el); $('[data-trace-close]',el).addEventListener('click',()=>el.classList.remove('open'));
  }

  function injectKeyboard(){
    if($('.key-map')) return;
    const el=document.createElement('div'); el.className='key-map'; el.setAttribute('aria-hidden','true');
    el.innerHTML=`<div class="key-map-card"><div class="key-map-head"><span>JARVIS / KEYBOARD MAP</span><button type="button" data-key-close>×</button></div><h3>OPERATE THE EXPERIENCE.</h3><div class="key-grid">${[['J','Command Center'],['B','Replay awakening'],['L','Orchestration Lab'],['R','Truth Lens'],['M','Memory Capsule'],['A','Agent System'],['/','Focus command'],['?','Keyboard map']].map(x=>`<div><kbd>${x[0]}</kbd><span>${x[1]}</span></div>`).join('')}</div><p>Hidden sequence: type <strong>WAKEJARVIS</strong> outside an input.</p></div>`;
    document.body.appendChild(el); $('[data-key-close]',el).addEventListener('click',()=>toggleKeyMap(false));
  }

  function injectAskPanel(){
    if($('.ask-jarvis-panel')) return;
    const panel=document.createElement('aside'); panel.className='ask-jarvis-panel'; panel.setAttribute('aria-hidden','true');
    panel.innerHTML=`<div class="ask-head"><span>ASK JARVIS ABOUT THIS</span><button type="button" data-ask-close>×</button></div><small data-ask-kicker>CONCEPT</small><h3 data-ask-title>Context Engineering</h3><p data-ask-copy></p><div class="ask-example" data-ask-example></div><span class="ask-truth">EXPLANATION MODE / EDUCATIONAL</span>`;
    document.body.appendChild(panel); $('[data-ask-close]',panel).addEventListener('click',()=>closeAsk());
  }

  const capsuleViews=[
    `<div class="capsule-overview"><div><small>LAST WORKED</small><strong>8 Sep · 02:11 AM</strong></div><div><small>LAST DECISION</small><strong>Reduce visual noise. Make Jarvis identity dominant.</strong></div><div><small>CHANGED</small><strong>14 files</strong></div><div><small>NEXT</small><strong>Review cinematic flow</strong></div></div>`,
    `<div class="capsule-list"><article><small>D/18</small><strong>Use one visual language across every product surface.</strong><span>Evidence: interface review</span></article><article><small>D/19</small><strong>Prefer truthful concept labels over fake telemetry.</strong><span>Evidence: product truth lens</span></article><article><small>D/20</small><strong>Make continuity the emotional promise.</strong><span>Evidence: narrative pass</span></article></div>`,
    `<div class="capsule-files">${[['inside-jarvis.js','.97'],['intro-core.js','.93'],['styles.css','.91'],['product-suite.js','.84'],['README.md','.62']].map(x=>`<div><span>${x[0]}</span><b>${x[1]}</b><i style="--score:${Number(x[1])}"></i></div>`).join('')}</div>`,
    `<div class="capsule-resume"><small>RESUME POINT</small><h3>“Continue from the latest cinematic identity pass.”</h3><p>Relevant state: intro morph, system journey, product suite, launch polish, validation workflow.</p><button type="button" data-capsule-run>RESUME THREAD ↗</button></div>`
  ];

  function setupCapsule(){
    const root=$('#memory-capsule'); if(!root) return; const view=$('[data-capsule-view]',root); const tabs=$$('[data-capsule-tab]',root);
    function activate(i){tabs.forEach((b,n)=>b.classList.toggle('active',n===i)); view.innerHTML=capsuleViews[i]; $('[data-capsule-run]',view)?.addEventListener('click',()=>runSignatureCommand('Continue from the latest cinematic identity pass.',true));}
    tabs.forEach((b,i)=>b.addEventListener('click',()=>activate(i))); activate(0);
  }

  function runEvidence(auto=false){
    const root=$('#evidence-trail'); if(!root) return; const shell=$('[data-evidence-shell]',root); const steps=$$('[data-evidence-step]',root); const status=$('[data-evidence-status]',root); const line=$('[data-proof-line]',root); const meta=$('[data-proof-meta]',root);
    steps.forEach(x=>x.classList.remove('active','done')); shell.classList.remove('verified'); status.textContent='CHECKING'; line.textContent='Collecting evidence…'; meta.textContent='Illustrative trace running.';
    dispatchState('executing','Evidence check');
    steps.forEach((step,i)=>later(()=>{steps.slice(0,i).forEach(x=>x.classList.add('done'));step.classList.add('active');line.textContent=['Intent normalized.','Target files mapped.','Expected change found.','Validation passed.','Before/after state agrees.'][i];if(i===steps.length-1){later(()=>{steps.forEach(x=>{x.classList.remove('active');x.classList.add('done')});shell.classList.add('verified');status.textContent='VERIFIED';line.textContent='Result is supported by evidence.';meta.textContent='Concept verification complete.';dispatchState('verified','Evidence ready');},360);}},i*460));
    if(auto) root.classList.add('signature-react');
  }

  function setupEvidence(){ $('[data-evidence-run]')?.addEventListener('click',()=>runEvidence(false)); }

  function setupSilent(){
    const root=$('#silent-continuity'); if(!root) return; let ticking=false;
    function update(){ticking=false;const r=root.getBoundingClientRect();const max=Math.max(1,root.offsetHeight-innerHeight);const p=Math.min(1,Math.max(0,-r.top/max));root.style.setProperty('--silent',p.toFixed(3));root.dataset.silentStage=p<.34?'one':p<.68?'two':'three';}
    addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true}); update();
  }

  function setupOSMorph(){
    const root=$('#os-threshold'); const scroll=$('[data-os-scroll]',root||document); if(!root||!scroll) return; const title=$('[data-os-title]',root),copy=$('[data-os-copy]',root),kicker=$('[data-os-kicker]',root),index=$('[data-os-index]',root),story=$('[data-os-story]',root),note=$('[data-os-note]',root),percent=$('[data-os-percent]',root);
    const scenes=[['WEB EXPERIENCE','THIS STARTS AS A WEBSITE.','Keep scrolling. The interface stops behaving like a page and begins behaving like a persistent work surface.','01 / 04','WEBSITE','Information is presented to you.'],['ACTIVE THREAD','THE PAGE REMEMBERS THE WORK.','Browser chrome recedes. Project state, files and memory become the dominant surface.','02 / 04','THREAD','The work becomes resumable.'],['WORKSPACE','THE INTERFACE BECOMES OPERABLE.','Persistent navigation, agent state and tool context surround the active objective.','03 / 04','WORKSPACE','The system organizes action around the goal.'],['INTELLIGENCE LAYER','THIS ISN’T ANOTHER APP.','Jarvis becomes the layer that connects memory, models, specialists and tools around the same thread.','04 / 04','JARVIS','The computer begins to feel continuous.']];
    let active=-1,ticking=false;
    function update(){ticking=false;const r=scroll.getBoundingClientRect();const max=Math.max(1,scroll.offsetHeight-innerHeight);const p=Math.min(1,Math.max(0,-r.top/max));root.style.setProperty('--os-progress',p.toFixed(4));if(percent)percent.textContent=String(Math.round(p*100)).padStart(2,'0')+'%';const i=Math.min(3,Math.floor(p*4));if(i!==active){active=i;[kicker,title,copy,index,story,note].forEach((el,n)=>{if(el)el.textContent=scenes[i][n]});dispatchState(i<1?'thinking':i<3?'routing':'verified',scenes[i][4]);}}
    addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true}); addEventListener('resize',update); update();
  }

  function dispatchState(state,thread){
    window.dispatchEvent(new CustomEvent('jarvis:state',{detail:{state,source:'signature-experience',thread,hold:1400}}));
    updatePulse(state,thread);
  }
  function updatePulse(state='idle',thread){
    const meta=statusMeta[state]||statusMeta.idle; const hud=$('.signature-hud'); if(!hud) return;
    $('[data-pulse-state]',hud).textContent=meta[0]; $('[data-pulse-context]',hud).textContent=meta[1]; $('[data-pulse-memory]',hud).textContent=meta[2]; $('[data-pulse-agents]',hud).textContent=meta[3]; $('[data-pulse-tools]',hud).textContent=state==='executing'?'05':'05'; if(thread)$('[data-pulse-thread]',hud).textContent=thread;
    hud.dataset.state=state;
  }

  function clearReactions(){ $$('.signature-react').forEach(x=>x.classList.remove('signature-react')); $$('.signature-trace [data-trace-step]').forEach(x=>x.classList.remove('active','done')); }
  function runSignatureCommand(text,scrollFirst=false){
    const trace=$('.signature-trace'); if(!trace) return; clearReactions(); trace.classList.add('open'); $('[data-trace-title]',trace).textContent='INTENT RECEIVED'; $('[data-trace-copy]',trace).textContent=text||'Continue the active work.';
    const steps=$$('[data-trace-step]',trace); const targets=[$('#jarvis-contrast'),$('#memory-capsule')||$('#memory'),$('#agents'),$('#orchestration-lab')||$('#learning-system'),$('#evidence-trail')];
    const states=['listening','thinking','routing','executing','verified'];
    if(scrollFirst) ($('#jarvis-contrast')||$('#memory-capsule'))?.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});
    targets.forEach((target,i)=>later(()=>{
      steps.slice(0,i).forEach(x=>{x.classList.remove('active');x.classList.add('done')}); steps[i]?.classList.add('active'); target?.classList.add('signature-react');
      const copy=['Goal resolved: resume the active Jarvis thread.','Project state and memory ranked by relevance.','Designer + Builder route selected.','Workspace actions prepared through controlled tools.','Evidence chain ready — result can be verified.'][i]; $('[data-trace-title]',trace).textContent=steps[i]?.textContent||'PROCESSING'; $('[data-trace-copy]',trace).textContent=copy; dispatchState(states[i],i===0?'Active goal':i===1?'Context restored':i===2?'Agent route':i===3?'Tool execution':'Verified result');
      if(i===4){runEvidence(true);later(()=>{steps.forEach(x=>{x.classList.remove('active');x.classList.add('done')});$('[data-trace-title]',trace).textContent='SYSTEM VERIFIED';$('[data-trace-copy]',trace).textContent='One goal moved through context, routing, tools and verification.';},900);}
    },i*760));
  }

  function setupCommands(){
    $('[data-signature-command]')?.addEventListener('submit',e=>{e.preventDefault();runSignatureCommand($('input',e.currentTarget)?.value,true)});
    const form=$('[data-command-form]'); form?.addEventListener('submit',()=>later(()=>runSignatureCommand($('[data-command-input]')?.value,false),100));
    $$('[data-command]').forEach(btn=>btn.addEventListener('click',()=>later(()=>runSignatureCommand(btn.dataset.command,false),100)));
    $$('[data-workflow-run]').forEach((btn,i)=>btn.addEventListener('click',()=>{const prompts=['Continue my SIH research and tell me what is missing.','Open yesterday’s branch and continue debugging.','Summarize what changed across product, docs and messages.','Find the last approved design and prepare the next iteration.'];runSignatureCommand(prompts[i],true)}));
  }

  function addAskButtons(){
    const targets=[...$$('.atlas-grid article'),...$$('.concept-panel'),...$$('.glossary-grid article')];
    targets.forEach((card,i)=>{if($('.ask-chip',card))return;const chip=document.createElement('button');chip.type='button';chip.className='ask-chip';chip.textContent='ASK JARVIS ↗';chip.addEventListener('click',e=>{e.stopPropagation();openAsk(card,i)});card.appendChild(chip);});
  }
  function openAsk(card,i){
    const title=$('h3',card)?.textContent||$('strong',card)?.textContent||'This concept'; const base=$('p',card)?.textContent||'This idea helps Jarvis turn fragmented information into a more useful working context.';
    const examples={
      'Embeddings':'You ask for “robot navigation”, but the useful file is named autonomous_row_planner_v3.py. Embeddings can connect them by meaning.',
      'Vector Index':'Instead of loading every file, retrieve the closest semantic matches and only send the useful slice forward.',
      'Context Engineering':'The question is not “how much context can fit?” It is “which context deserves to be seen first?”',
      'Verification':'A model saying “I updated the site” is not proof. The system should show the changed file, validation and final state.'
    };
    const panel=$('.ask-jarvis-panel'); $('[data-ask-kicker]',panel).textContent='WHY JARVIS NEEDS THIS'; $('[data-ask-title]',panel).textContent=title; $('[data-ask-copy]',panel).textContent=base; $('[data-ask-example]',panel).textContent=examples[title]||'This building block matters because Jarvis is not just a model response. It needs context, state, routing, execution and proof around the model.'; panel.classList.add('open'); panel.setAttribute('aria-hidden','false'); dispatchState('thinking',title);
  }
  function closeAsk(){const panel=$('.ask-jarvis-panel');panel?.classList.remove('open');panel?.setAttribute('aria-hidden','true');}

  function addStatusBadges(){
    const map=[['#orchestration-lab','SIMULATION'],['#inside-jarvis','CONCEPT'],['#product-suite','CONCEPT UI'],['#tech-atlas','LEARNING MODEL'],['#evidence-trail','ILLUSTRATIVE TRACE'],['#jarvis-contrast','PRODUCT STORY']];
    map.forEach(([sel,text])=>{const node=$(sel);if(!node||$('.signature-status',node))return;const badge=document.createElement('span');badge.className='signature-status';badge.textContent=text;node.appendChild(badge);});
  }

  function toggleKeyMap(force){const el=$('.key-map');if(!el)return;const open=typeof force==='boolean'?force:!el.classList.contains('open');el.classList.toggle('open',open);el.setAttribute('aria-hidden',String(!open));}
  function setupKeys(){
    let typed='';
    addEventListener('keydown',e=>{
      if(/input|textarea/i.test(document.activeElement?.tagName)) return;
      if(e.key==='?'){e.preventDefault();toggleKeyMap();return}
      if(e.key==='/'){e.preventDefault();$('[data-command-open]')?.click();later(()=>$('[data-command-input]')?.focus(),260);return}
      if(e.key==='m'||e.key==='M'){$('#memory-capsule')?.scrollIntoView({behavior:reduce?'auto':'smooth'});return}
      if(e.key==='a'||e.key==='A'){$('#agents')?.scrollIntoView({behavior:reduce?'auto':'smooth'});return}
      if(e.key.length===1){typed=(typed+e.key.toLowerCase()).slice(-10);if(typed.endsWith('wakejarvis')){typed='';document.body.classList.add('jarvis-awake');dispatchState('verified','WAKE JARVIS');$('.boot-replay')?.click();later(()=>document.body.classList.remove('jarvis-awake'),2200);}}
    });
  }

  function setupPulseObserver(){
    const sections=[['#manifesto','Manifesto'],['#jarvis-contrast','Why Jarvis'],['#experience','Experience'],['#agents','Agent System'],['#memory-capsule','Memory Capsule'],['#inside-jarvis','Inside Jarvis'],['#os-threshold','Jarvis Workspace'],['#product-suite','Product System'],['#tech-atlas','Tech Atlas']].map(([s,n])=>[$(s),n]).filter(x=>x[0]);
    const io=new IntersectionObserver(entries=>{const hit=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!hit)return;const found=sections.find(x=>x[0]===hit.target);if(found){$('[data-pulse-thread]')?.replaceChildren(document.createTextNode(found[1]));}},{threshold:[.15,.35,.6]});sections.forEach(x=>io.observe(x[0]));
    addEventListener('jarvis:state',e=>{const d=e.detail||{};updatePulse(d.state||'idle',d.thread||d.stage||d.source);});
  }

  function init(){
    injectCompare(); injectSilent(); injectMemoryCapsule(); injectEvidence(); injectOSMorph(); injectWorkflows(); injectHardware(); injectHUD(); injectTrace(); injectKeyboard(); injectAskPanel();
    setupCapsule(); setupEvidence(); setupSilent(); setupOSMorph(); setupCommands(); addAskButtons(); addStatusBadges(); setupKeys(); setupPulseObserver(); updatePulse('idle','Jarvis OS Website');
    later(addAskButtons,900); later(addStatusBadges,900);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
