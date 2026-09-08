(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stages=[
    {key:'INPUT',state:'listening',title:'Intent enters the system.',copy:'Voice, text, images and files are normalized into one working request. Jarvis starts with the goal — not the app.',meta:['VOICE / TEXT / FILES','INTENT PARSE','MULTIMODAL']},
    {key:'CONTEXT',state:'thinking',title:'The request gets a working world.',copy:'Recent decisions, active project state and relevant evidence are assembled so the model does not begin from zero.',meta:['PROJECT STATE','RECENT DECISIONS','RELEVANCE']},
    {key:'MEMORY',state:'thinking',title:'Useful history is retrieved, not dumped.',copy:'Semantic retrieval ranks memories and files by relevance. Persistent memory should be selective, inspectable and tied to evidence.',meta:['EMBEDDINGS','VECTOR SEARCH','PERSISTENCE']},
    {key:'MODEL ROUTER',state:'routing',title:'The right intelligence path is selected.',copy:'The router can choose a model, specialist behavior or workflow based on capability, latency, cost and tool requirements.',meta:['MODEL CHOICE','POLICY','LATENCY']},
    {key:'AGENTS',state:'routing',title:'Specialists receive one shared objective.',copy:'Builder, Researcher, Designer and Archivist can handle different parts of the task while staying inside one coherent thread.',meta:['SPECIALISTS','SHARED CONTEXT','ORCHESTRATION']},
    {key:'TOOLS',state:'executing',title:'Intelligence crosses into real software.',copy:'Controlled adapters turn plans into actions across files, browsers, editors and other tools. Boundaries matter as much as capability.',meta:['FILES','BROWSER','WORKSPACE']},
    {key:'VERIFICATION',state:'verified',title:'The system proves what actually changed.',copy:'Before Jarvis says “done”, the verification layer checks outputs, compares state and preserves the evidence needed to trust the result.',meta:['BEFORE / AFTER','EVIDENCE','STATE SAVED']}
  ];

  function inject(){
    const anchor=$('.system');
    if(!anchor||$('#inside-jarvis')) return;
    const section=document.createElement('section');
    section.id='inside-jarvis';
    section.className='inside-jarvis';
    section.innerHTML=`
      <div class="inside-scroll" data-inside-scroll>
        <div class="inside-sticky section-pad">
          <div class="inside-head"><span>05.2 / INSIDE JARVIS</span><span>SCROLL THROUGH THE OPERATING LAYER.</span></div>
          <div class="inside-progress"><i data-inside-progress></i></div>
          <div class="inside-layout">
            <aside class="inside-rail" aria-label="Jarvis system layers">
              ${stages.map((s,i)=>`<button type="button" data-inside-jump="${i}" class="${i===0?'active':''}"><small>0${i+1}</small><span>${s.key}</span></button>`).join('')}
            </aside>

            <div class="inside-viewport" data-inside-viewport>
              <div class="inside-space-grid"></div>
              <div class="inside-depth depth-a"></div><div class="inside-depth depth-b"></div><div class="inside-depth depth-c"></div>
              <div class="inside-axis axis-x"></div><div class="inside-axis axis-y"></div>
              <div class="inside-core-shell" data-inside-core>
                <div class="inside-orbit orbit-a"><i></i><b></b></div>
                <div class="inside-orbit orbit-b"><i></i><b></b></div>
                <div class="inside-orbit orbit-c"><i></i><b></b></div>
                <div class="inside-core-mark"><span></span><span></span><span></span><b></b></div>
                <div class="inside-layer-label layer-north" data-layer-north>INPUT</div>
                <div class="inside-layer-label layer-east" data-layer-east>CONTEXT</div>
                <div class="inside-layer-label layer-south" data-layer-south>MEMORY</div>
                <div class="inside-layer-label layer-west" data-layer-west>TOOLS</div>
              </div>
              <div class="inside-packet packet-one"></div><div class="inside-packet packet-two"></div><div class="inside-packet packet-three"></div>
              <div class="inside-code left"><span>0x4A4152564953</span><span>CTX.RESTORE()</span><span>ROUTE.SELECT()</span><span>TOOLS.EXEC()</span></div>
              <div class="inside-code right"><span>01001010 01000001</span><span>MEM.RANK / 0.94</span><span>AGENT.SHARED_STATE</span><span>VERIFY.DIFF</span></div>
              <div class="inside-concept-badge">CONCEPTUAL SYSTEM VISUALIZATION</div>
            </div>

            <aside class="inside-story">
              <div class="inside-counter"><span data-inside-index>01</span><small>/ 07</small></div>
              <p class="micro-label" data-inside-kicker>INPUT</p>
              <h2 data-inside-title>Intent enters the system.</h2>
              <p data-inside-copy>Voice, text, images and files are normalized into one working request. Jarvis starts with the goal — not the app.</p>
              <div class="inside-meta" data-inside-meta>${stages[0].meta.map(x=>`<span>${x}</span>`).join('')}</div>
              <div class="inside-state"><small>CORE STATE</small><strong data-inside-state>LISTENING</strong></div>
            </aside>
          </div>
          <div class="inside-footer"><span>INPUT → CONTEXT → MEMORY → ROUTER → AGENTS → TOOLS → VERIFICATION</span><span data-inside-percent>00%</span></div>
        </div>
      </div>`;
    anchor.insertAdjacentElement('beforebegin',section);
  }

  function interact(){
    const section=$('#inside-jarvis');
    const scroll=$('[data-inside-scroll]',section||document);
    const viewport=$('[data-inside-viewport]',section||document);
    const progress=$('[data-inside-progress]',section||document);
    const index=$('[data-inside-index]',section||document);
    const kicker=$('[data-inside-kicker]',section||document);
    const title=$('[data-inside-title]',section||document);
    const copy=$('[data-inside-copy]',section||document);
    const meta=$('[data-inside-meta]',section||document);
    const state=$('[data-inside-state]',section||document);
    const percent=$('[data-inside-percent]',section||document);
    const buttons=$$('[data-inside-jump]',section||document);
    const core=$('[data-inside-core]',section||document);
    if(!section||!scroll||!viewport) return;
    let active=-1,ticking=false;

    function setStage(next,local=0){
      next=Math.max(0,Math.min(stages.length-1,next));
      const s=stages[next];
      if(active!==next){
        active=next;
        if(index) index.textContent=String(next+1).padStart(2,'0');
        if(kicker) kicker.textContent=s.key;
        if(title){title.classList.remove('swap');void title.offsetWidth;title.textContent=s.title;title.classList.add('swap');}
        if(copy) copy.textContent=s.copy;
        if(meta) meta.innerHTML=s.meta.map(x=>`<span>${x}</span>`).join('');
        if(state) state.textContent=s.state.toUpperCase();
        buttons.forEach((b,i)=>b.classList.toggle('active',i===next));
        section.dataset.stage=s.key.toLowerCase().replace(/\s+/g,'-');
        window.dispatchEvent(new CustomEvent('jarvis:state',{detail:{state:s.state,source:'inside-jarvis',stage:s.key}}));
      }
      section.style.setProperty('--stage',next);
      section.style.setProperty('--local',local.toFixed(3));
      if(core) core.style.setProperty('--tilt',`${(local-.5)*8}deg`);
    }

    function update(){
      ticking=false;
      const rect=scroll.getBoundingClientRect();
      const max=Math.max(1,scroll.offsetHeight-innerHeight);
      const raw=Math.min(1,Math.max(0,-rect.top/max));
      const scaled=raw*stages.length;
      const stage=Math.min(stages.length-1,Math.floor(scaled));
      const local=Math.min(1,Math.max(0,scaled-stage));
      setStage(stage,local);
      if(progress) progress.style.width=`${raw*100}%`;
      if(percent) percent.textContent=`${String(Math.round(raw*100)).padStart(2,'0')}%`;
      section.style.setProperty('--journey',raw.toFixed(4));
    }
    function request(){if(!ticking){ticking=true;requestAnimationFrame(update);}}
    addEventListener('scroll',request,{passive:true});
    addEventListener('resize',request);
    buttons.forEach((button,i)=>button.addEventListener('click',()=>{
      const top=scroll.getBoundingClientRect().top+scrollY;
      const max=Math.max(1,scroll.offsetHeight-innerHeight);
      scrollTo({top:top+(i/(stages.length-1))*max,behavior:reduce?'auto':'smooth'});
    }));
    if(!reduce&&matchMedia('(pointer:fine)').matches){
      viewport.addEventListener('pointermove',e=>{
        const r=viewport.getBoundingClientRect();
        section.style.setProperty('--mx',`${((e.clientX-r.left)/r.width-.5)*16}px`);
        section.style.setProperty('--my',`${((e.clientY-r.top)/r.height-.5)*12}px`);
      });
      viewport.addEventListener('pointerleave',()=>{section.style.setProperty('--mx','0px');section.style.setProperty('--my','0px');});
    }
    update();
  }

  function init(){inject();interact();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();