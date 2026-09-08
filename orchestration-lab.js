(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scenarios=[
    {label:'Continue project',goal:'Continue the Jarvis OS website from where we stopped.',intent:'Resume active project work',context:'Recent commits + UI decisions + unfinished visual pass',agent:'Designer → Builder',tool:'Workspace + GitHub',verify:'Compare changed files + visual state',result:'Resume point restored. Next visual task selected.'},
    {label:'Research decision',goal:'Compare the best local-first memory approaches for Jarvis.',intent:'Research + compare architecture choices',context:'Jarvis architecture direction + privacy constraints',agent:'Researcher',tool:'Web research + notes',verify:'Cross-check sources + summarize tradeoffs',result:'Decision brief prepared with evidence and caveats.'},
    {label:'Find files',goal:'Find everything related to the weed robot navigation logic.',intent:'Retrieve project evidence',context:'Project history + filenames + semantic relevance',agent:'Archivist',tool:'File search + project memory',verify:'Rank files by relevance',result:'Relevant files grouped into one working context.'},
    {label:'Plan execution',goal:'Plan my next three hours around Jarvis development.',intent:'Create an executable work plan',context:'Current project state + priorities + time window',agent:'Planner',tool:'Tasks + project context',verify:'Check dependencies + sequence',result:'Focused build plan generated with clear checkpoints.'}
  ];

  function inject(){
    const anchor=$('#learning-system')||$('#spatial-core')||$('.memory');
    if(!anchor||$('#orchestration-lab')) return;
    const section=document.createElement('section');
    section.id='orchestration-lab';
    section.className='orchestration-lab section-pad';
    section.innerHTML=`
      <div class="section-head"><span>04.35 / LIVE ORCHESTRATION LAB</span><span>INTERACT WITH THE SYSTEM MODEL.</span></div>
      <div class="route-lab-intro">
        <div><p class="micro-label">SIMULATED PRODUCT DEMO</p><h2>ONE REQUEST.<br><span>SIX SYSTEM</span><br><em>DECISIONS.</em></h2></div>
        <div class="route-lab-copy"><p>Type a goal or choose a scenario. The interface will visualize how a context-first Jarvis could interpret the task, recover context, route a specialist, pick a tool, verify the result and preserve the useful state.</p><div class="route-lab-disclaimer">EDUCATIONAL SIMULATION — THIS VISUALIZES THE PRODUCT MODEL, NOT A CLAIM OF LIVE AUTONOMOUS EXECUTION.</div></div>
      </div>
      <div class="route-lab-shell" data-route-lab>
        <div class="route-lab-topbar"><span><i></i> JARVIS / ORCHESTRATION LAB</span><span data-route-clock>STATE / READY</span></div>
        <div class="route-lab-grid">
          <aside class="route-lab-input">
            <div class="route-lab-input-head"><span>01 / GOAL</span><small>WHAT SHOULD THE SYSTEM DO?</small></div>
            <form data-route-form><textarea data-route-input rows="4" spellcheck="false">Continue the Jarvis OS website from where we stopped.</textarea><button type="submit">ROUTE REQUEST ↗</button></form>
            <div class="route-presets" data-route-presets>${scenarios.map((s,i)=>`<button type="button" data-route-preset="${i}" class="${i===0?'active':''}"><small>0${i+1}</small><span>${s.label}</span></button>`).join('')}</div>
            <div class="route-lab-tip"><span>TIP</span><p>Try words like <b>research</b>, <b>files</b>, <b>design</b>, <b>plan</b> or <b>continue</b> to change the simulated route.</p></div>
          </aside>
          <main class="route-lab-stage">
            <div class="route-stage-grid"></div><div class="route-stage-scan"></div>
            <svg class="route-lines" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true"><path d="M95 260 C180 260 205 260 275 260"/><path d="M330 260 C400 260 425 260 495 260"/><path d="M550 260 C620 260 645 260 715 260"/><path d="M770 260 C830 260 855 260 925 260"/></svg>
            <div class="route-packet" data-route-packet></div>
            <div class="route-node node-intent active" data-route-node="0"><small>01</small><span>INTENT</span><b data-route-intent>Resume active project work</b></div>
            <div class="route-node node-context" data-route-node="1"><small>02</small><span>CONTEXT</span><b data-route-context>Recent project state</b></div>
            <div class="route-node node-agent" data-route-node="2"><small>03</small><span>AGENT</span><b data-route-agent>Designer → Builder</b></div>
            <div class="route-node node-tool" data-route-node="3"><small>04</small><span>TOOL</span><b data-route-tool>Workspace + GitHub</b></div>
            <div class="route-node node-verify" data-route-node="4"><small>05</small><span>VERIFY</span><b data-route-verify>Compare changed state</b></div>
            <div class="route-result" data-route-result><div class="route-result-head"><span>06 / RESULT</span><small data-route-result-state>READY</small></div><strong data-route-result-copy>Resume point restored. Next visual task selected.</strong><div class="route-result-tags"><span>CONTEXT PRESERVED</span><span>EVIDENCE READY</span><span>STATE UPDATED</span></div></div>
          </main>
          <aside class="route-lab-log">
            <div class="route-log-head"><span>TRACE</span><small data-route-trace-state>STANDBY</small></div>
            <div class="route-log" data-route-log><p><time>00.000</time><span>Awaiting request.</span></p></div>
            <div class="route-metrics"><div><small>CONTEXT</small><strong data-route-context-score>--</strong></div><div><small>ROUTE</small><strong data-route-route-score>--</strong></div><div><small>VERIFY</small><strong data-route-verify-score>--</strong></div></div>
          </aside>
        </div>
      </div>`;
    anchor.insertAdjacentElement('afterend',section);
  }

  function classify(goal){
    const q=goal.toLowerCase();
    if(/research|compare|study|source|latest/.test(q)) return scenarios[1];
    if(/file|folder|find|document|robot|weed/.test(q)) return scenarios[2];
    if(/plan|schedule|today|hour|priority/.test(q)) return scenarios[3];
    if(/design|ui|website|visual|landing/.test(q)) return {...scenarios[0],agent:'Designer',tool:'Workspace + design system',verify:'Compare layout + interaction state',result:'Design context restored. Next interface change selected.'};
    return scenarios[0];
  }

  function setup(){
    const root=$('[data-route-lab]');
    if(!root) return;
    const form=$('[data-route-form]',root),input=$('[data-route-input]',root),packet=$('[data-route-packet]',root),nodes=$$('[data-route-node]',root),log=$('[data-route-log]',root),clock=$('[data-route-clock]',root),traceState=$('[data-route-trace-state]',root),resultState=$('[data-route-result-state]',root),resultCopy=$('[data-route-result-copy]',root);
    const map={intent:$('[data-route-intent]',root),context:$('[data-route-context]',root),agent:$('[data-route-agent]',root),tool:$('[data-route-tool]',root),verify:$('[data-route-verify]',root)};
    const scores={context:$('[data-route-context-score]',root),route:$('[data-route-route-score]',root),verify:$('[data-route-verify-score]',root)};
    let runToken=0;

    function setPreset(index){const scenario=scenarios[index];if(!scenario)return;input.value=scenario.goal;$$('[data-route-preset]',root).forEach((b,i)=>b.classList.toggle('active',i===index));}
    function addLog(ms,text,hot=false){const p=document.createElement('p');p.className=hot?'hot':'';p.innerHTML=`<time>${(ms/1000).toFixed(3).padStart(6,'0')}</time><span>${text}</span>`;log.appendChild(p);log.scrollTop=log.scrollHeight;}
    function resetVisuals(){nodes.forEach((n,i)=>n.classList.toggle('active',i===0));packet?.classList.remove('running');void packet?.offsetWidth;log.innerHTML='';if(scores.context)scores.context.textContent='--';if(scores.route)scores.route.textContent='--';if(scores.verify)scores.verify.textContent='--';}

    async function run(goal){
      const token=++runToken,scenario=classify(goal||'');
      resetVisuals();map.intent.textContent=scenario.intent;map.context.textContent=scenario.context;map.agent.textContent=scenario.agent;map.tool.textContent=scenario.tool;map.verify.textContent=scenario.verify;resultCopy.textContent=scenario.result;resultState.textContent='PROCESSING';traceState.textContent='RUNNING';clock.textContent='STATE / ORCHESTRATING';packet?.classList.add('running');
      const steps=[['Intent resolved',0,'intent'],['Relevant project context ranked',1,'context'],[`Specialist selected: ${scenario.agent}`,2,'route'],[`Tool path selected: ${scenario.tool}`,3,'route'],['Verification boundary applied',4,'verify'],['Result prepared and state preserved',5,'verify']];
      const start=performance.now();
      for(let i=0;i<steps.length;i++){
        if(token!==runToken)return;
        await new Promise(r=>setTimeout(r,reduce?40:440));
        if(token!==runToken)return;
        const elapsed=Math.round(performance.now()-start);nodes.forEach((n,idx)=>n.classList.toggle('active',idx===Math.min(i,4)));addLog(elapsed,steps[i][0],i===steps.length-1);
        if(steps[i][2]==='context'&&scores.context)scores.context.textContent='92%';
        if(steps[i][2]==='route'&&scores.route)scores.route.textContent='88%';
        if(steps[i][2]==='verify'&&scores.verify)scores.verify.textContent=i===steps.length-1?'PASS':'...';
      }
      if(token!==runToken)return;resultState.textContent='READY';traceState.textContent='COMPLETE';clock.textContent='STATE / COMPLETE';root.classList.add('is-complete');setTimeout(()=>root.classList.remove('is-complete'),900);
    }

    form?.addEventListener('submit',e=>{e.preventDefault();run(input.value.trim());});
    $$('[data-route-preset]',root).forEach(b=>b.addEventListener('click',()=>{const index=Number(b.dataset.routePreset||0);setPreset(index);run(scenarios[index].goal);}));
    addEventListener('keydown',e=>{if((e.key==='l'||e.key==='L')&&!/input|textarea/i.test(document.activeElement?.tagName)){e.preventDefault();input?.focus();$('#orchestration-lab')?.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});}});
  }

  function init(){inject();setup();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();