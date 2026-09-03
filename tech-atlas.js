(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];

  function inject(){
    const anchor=$('.finale')||$('footer');
    if(!anchor||$('#tech-atlas')) return;
    const section=document.createElement('section');
    section.id='tech-atlas';
    section.className='tech-atlas section-pad';
    section.innerHTML=`
      <div class="section-head"><span>08.4 / TECH ATLAS</span><span>UNDER THE INTERFACE.</span></div>
      <div class="atlas-hero">
        <div><p class="micro-label">ARCHITECTURE BUILDING BLOCKS</p><h2>THE <span>TECH</span><br>BEHIND THE<br><em>EXPERIENCE.</em></h2></div>
        <p>Not a locked implementation stack. This is a learning map of the technologies a system like Jarvis may need: language models, embeddings, memory, agents, tools, speech and verification.</p>
      </div>

      <div class="atlas-pipeline" data-atlas-pipeline>
        <div class="atlas-track"><i data-atlas-packet></i></div>
        <button class="active" data-atlas-node="0"><small>01</small><strong>INPUT</strong><span>voice · text · files</span></button>
        <button data-atlas-node="1"><small>02</small><strong>EMBED</strong><span>semantic representation</span></button>
        <button data-atlas-node="2"><small>03</small><strong>MEMORY</strong><span>retrieve relevant state</span></button>
        <button data-atlas-node="3"><small>04</small><strong>ROUTE</strong><span>agent + model choice</span></button>
        <button data-atlas-node="4"><small>05</small><strong>TOOLS</strong><span>execute in the world</span></button>
        <button data-atlas-node="5"><small>06</small><strong>VERIFY</strong><span>check before done</span></button>
      </div>

      <div class="atlas-detail">
        <div class="atlas-detail-index" data-atlas-index>01</div>
        <div><small data-atlas-kicker>MULTIMODAL INPUT</small><h3 data-atlas-title>Turn human intent into machine-readable signals.</h3></div>
        <p data-atlas-copy>Voice, text, images and files enter through different interfaces, but the system ultimately needs a normalized representation of the user's goal and available evidence.</p>
      </div>

      <div class="atlas-grid">
        <article><span>LLM</span><h3>Language Model</h3><p>The reasoning and generation engine. It interprets instructions, produces plans and writes responses, but it does not automatically know your project state.</p><small>THINKING / GENERATION</small></article>
        <article><span>EMB</span><h3>Embeddings</h3><p>Numeric representations that make semantic similarity searchable. Useful for finding files, notes or memories related by meaning rather than exact keywords.</p><small>SEMANTIC SEARCH</small></article>
        <article><span>VDB</span><h3>Vector Index</h3><p>A retrieval structure for searching embeddings quickly. It can help select the most relevant context instead of loading an entire workspace into a prompt.</p><small>RETRIEVAL</small></article>
        <article><span>MEM</span><h3>Memory Store</h3><p>Persistent state for decisions, preferences, project milestones and useful summaries. Memory should be selective, editable and evidence-backed.</p><small>CONTINUITY</small></article>
        <article><span>AGT</span><h3>Agent Runtime</h3><p>A coordination layer that can assign different subtasks to specialist behaviors and keep their outputs connected to one shared objective.</p><small>ORCHESTRATION</small></article>
        <article><span>API</span><h3>Tool Adapters</h3><p>Controlled connectors between intelligence and real software: files, browsers, calendars, terminals, editors and other APIs.</p><small>EXECUTION</small></article>
        <article><span>STT</span><h3>Speech Pipeline</h3><p>Speech-to-text captures voice input; text-to-speech turns system responses back into natural audio. Latency matters as much as accuracy.</p><small>VOICE INTERFACE</small></article>
        <article><span>VAL</span><h3>Verification Layer</h3><p>Checks whether actions succeeded, compares before/after state and prevents a confident model response from being mistaken for completed work.</p><small>TRUST</small></article>
      </div>

      <div class="atlas-note"><span>DESIGN RULE</span><strong>THE MODEL IS ONLY ONE COMPONENT.</strong><p>A useful AI operating layer needs context management, memory, routing, execution and verification around the model.</p></div>`;
    anchor.insertAdjacentElement('beforebegin',section);
  }

  function interact(){
    const nodes=$$('[data-atlas-node]');
    const packet=$('[data-atlas-packet]');
    const index=$('[data-atlas-index]');
    const kicker=$('[data-atlas-kicker]');
    const title=$('[data-atlas-title]');
    const copy=$('[data-atlas-copy]');
    if(!nodes.length) return;
    const data=[
      ['MULTIMODAL INPUT','Turn human intent into machine-readable signals.','Voice, text, images and files enter through different interfaces, but the system ultimately needs a normalized representation of the user’s goal and available evidence.'],
      ['EMBEDDINGS','Map meaning into a searchable geometric space.','Embeddings convert content into vectors so semantically related files, notes and memories can be found even when their wording is different.'],
      ['RETRIEVAL + MEMORY','Bring back only the state that matters now.','Retrieval ranks candidate context. Persistent memory stores useful long-term state. Together they reduce context reset without dumping everything into the model.'],
      ['MODEL + AGENT ROUTING','Choose the right reasoning path for the task.','A router can choose a model, specialist agent or workflow based on the request, constraints, cost, latency and tools required.'],
      ['TOOL EXECUTION','Let intelligence act through controlled interfaces.','Tool adapters turn a plan into real operations such as reading a file, editing code, searching the web or scheduling an event.'],
      ['VERIFICATION','Prove that the action actually happened.','The verification layer checks outputs and changed state. It separates “the model said it worked” from evidence that the operation really succeeded.']
    ];
    function activate(i){
      nodes.forEach((n,x)=>n.classList.toggle('active',x===i));
      if(index) index.textContent=String(i+1).padStart(2,'0');
      if(kicker) kicker.textContent=data[i][0];
      if(title) title.textContent=data[i][1];
      if(copy) copy.textContent=data[i][2];
      if(packet) packet.style.left=`${i*(100/(nodes.length-1))}%`;
    }
    nodes.forEach((n,i)=>n.addEventListener('click',()=>activate(i)));
    activate(0);
  }

  function init(){inject();interact();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();