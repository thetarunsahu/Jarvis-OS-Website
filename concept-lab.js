(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  function inject(){
    const anchor=$('.roadmap');
    if(!anchor||$('#concept-lab')) return;
    const section=document.createElement('section');
    section.id='concept-lab';section.className='concept-lab section-pad';
    section.innerHTML=`
      <div class="section-head"><span>06.6 / AI SYSTEMS LAB</span><span>LEARN THE MECHANICS, NOT THE BUZZWORDS.</span></div>
      <div class="concept-intro"><div><p class="micro-label">INTERACTIVE LEARNING</p><h2>SEE <span>WHY</span><br>THE SYSTEM<br><em>WORKS.</em></h2></div><p>These mini demos explain the ideas behind context-first AI. They are simplified visual models, designed to teach the architecture without pretending the diagrams are production telemetry.</p></div>
      <div class="concept-tabs">
        ${['Embeddings','Vector DB','RAG','Context Window','Local vs Cloud','Verification'].map((x,i)=>`<button type="button" data-concept-tab="${i}" class="${i===0?'active':''}"><small>0${i+1}</small><span>${x}</span></button>`).join('')}
      </div>
      <div class="concept-stage">
        <article class="concept-panel active" data-concept-panel="0">
          <div class="concept-copy"><small>01 / EMBEDDINGS</small><h3>Meaning becomes geometry.</h3><p>Embeddings convert text, images or files into vectors. Items with similar meaning end up closer together, making semantic retrieval possible even when the exact words differ.</p><div class="concept-callout">QUERY: “continue the robot navigation work”</div></div>
          <div class="embedding-space"><div class="embed-axis x"></div><div class="embed-axis y"></div><span class="embed-node a">path planning</span><span class="embed-node b">obstacle logic</span><span class="embed-node c">crop vision</span><span class="embed-node d">invoice pdf</span><span class="embed-node e">music notes</span><span class="embed-query">QUERY</span><svg viewBox="0 0 100 100" preserveAspectRatio="none"><circle cx="29" cy="34" r="19"/><line x1="50" y1="50" x2="29" y2="34"/></svg></div>
        </article>
        <article class="concept-panel" data-concept-panel="1">
          <div class="concept-copy"><small>02 / VECTOR DATABASE</small><h3>Retrieve the closest useful context.</h3><p>A vector index stores embeddings and returns the nearest matches quickly. Jarvis can use this to rank project memories or files instead of loading the whole workspace.</p></div>
          <div class="vector-demo"><div class="vector-query"><span>QUERY VECTOR</span><b>[.18 .74 .52 .91]</b></div><div class="vector-arrow">→</div><div class="vector-results"><article><strong>0.94</strong><span>navigation-plan.md</span></article><article><strong>0.89</strong><span>obstacle-avoidance.py</span></article><article><strong>0.81</strong><span>field-test-notes.txt</span></article><article class="dim"><strong>0.22</strong><span>invoice-september.pdf</span></article></div></div>
        </article>
        <article class="concept-panel" data-concept-panel="2">
          <div class="concept-copy"><small>03 / RAG</small><h3>Retrieve before generating.</h3><p>Retrieval-Augmented Generation gives the model evidence before it answers. The model still reasons, but it reasons over selected external context rather than memory alone.</p></div>
          <div class="rag-flow"><div><small>1</small><strong>QUESTION</strong><span>“What did we decide?”</span></div><i>→</i><div><small>2</small><strong>RETRIEVE</strong><span>rank project evidence</span></div><i>→</i><div><small>3</small><strong>AUGMENT</strong><span>attach top context</span></div><i>→</i><div><small>4</small><strong>GENERATE</strong><span>answer with evidence</span></div></div>
        </article>
        <article class="concept-panel" data-concept-panel="3">
          <div class="concept-copy"><small>04 / CONTEXT WINDOW</small><h3>More tokens do not mean more signal.</h3><p>A larger context window can hold more material, but useful systems still need ranking. Drag the control: as raw context grows, irrelevant information can grow faster than the signal.</p><label class="window-control"><span>CONTEXT SIZE</span><input type="range" min="8" max="128" value="32" step="8" data-context-range><b data-context-value>32K</b></label></div>
          <div class="context-meter"><div class="meter-head"><span>SELECTED CONTEXT</span><span data-signal-ratio>72% SIGNAL</span></div><div class="meter-bar"><i data-signal-bar></i><b data-noise-bar></b></div><div class="context-blocks" data-context-blocks></div><p data-context-note>32K is enough for a focused project slice when retrieval is good.</p></div>
        </article>
        <article class="concept-panel" data-concept-panel="4">
          <div class="concept-copy"><small>05 / LOCAL vs CLOUD</small><h3>Architecture is a tradeoff, not a religion.</h3><p>Local execution can improve privacy and latency for some tasks. Cloud models can offer more capability. A real Jarvis may route between both depending on the operation.</p><div class="mode-switch"><button type="button" class="active" data-mode="local">LOCAL-FIRST</button><button type="button" data-mode="cloud">CLOUD</button></div></div>
          <div class="mode-grid" data-mode-grid><div><small>PRIVACY</small><strong data-mode-privacy>HIGH</strong><span>more data can stay on device</span></div><div><small>LATENCY</small><strong data-mode-latency>LOW</strong><span>no network round-trip for local tasks</span></div><div><small>CAPABILITY</small><strong data-mode-capability>VARIABLE</strong><span>depends on local model + hardware</span></div><div><small>CONTROL</small><strong data-mode-control>HIGH</strong><span>user owns more of the execution path</span></div></div>
        </article>
        <article class="concept-panel" data-concept-panel="5">
          <div class="concept-copy"><small>06 / VERIFICATION</small><h3>“Done” should be a measured state.</h3><p>A model response is not proof. Verification compares the expected result with evidence from the tool or workspace before the system claims success.</p><button class="verify-run" type="button" data-verify-run>RUN VERIFICATION ↗</button></div>
          <div class="verify-demo"><div class="verify-before"><small>BEFORE</small><span>styles.css</span><b>12,441 bytes</b><em>hero core / old state</em></div><div class="verify-arrow">→</div><div class="verify-after"><small>AFTER</small><span>styles.css</span><b data-verify-size>--</b><em data-verify-change>awaiting evidence</em></div><div class="verify-result" data-verify-result>NOT CHECKED</div></div>
        </article>
      </div>`;
    anchor.insertAdjacentElement('beforebegin',section);
  }

  function interact(){
    const root=$('#concept-lab');if(!root)return;
    const tabs=$$('[data-concept-tab]',root),panels=$$('[data-concept-panel]',root);
    function activate(i){tabs.forEach((x,n)=>x.classList.toggle('active',n===i));panels.forEach((x,n)=>x.classList.toggle('active',n===i));}
    tabs.forEach((b,i)=>b.addEventListener('click',()=>activate(i)));
    const range=$('[data-context-range]',root),value=$('[data-context-value]',root),signal=$('[data-signal-ratio]',root),signalBar=$('[data-signal-bar]',root),noiseBar=$('[data-noise-bar]',root),blocks=$('[data-context-blocks]',root),note=$('[data-context-note]',root);
    function updateContext(){
      if(!range)return;const n=Number(range.value);const ratio=Math.max(34,Math.round(84-(n-8)*.38));value.textContent=`${n}K`;signal.textContent=`${ratio}% SIGNAL`;signalBar.style.width=`${ratio}%`;noiseBar.style.width=`${100-ratio}%`;blocks.innerHTML=Array.from({length:Math.min(16,Math.round(n/8))},(_,i)=>`<i class="${i/Math.min(16,n/8)<ratio/100?'useful':'noise'}"></i>`).join('');note.textContent=n<=32?`${n}K is enough for a focused project slice when retrieval is good.`:n<=72?`${n}K can hold broader project state, but ranking still matters.`:`${n}K can hold a lot — including a lot of irrelevant material. Retrieval quality becomes critical.`;
    }
    range?.addEventListener('input',updateContext);updateContext();
    const modeButtons=$$('[data-mode]',root);const modeData={local:['HIGH','LOW','VARIABLE','HIGH'],cloud:['SERVICE-DEPENDENT','NETWORK','HIGH','SERVICE-DEPENDENT']};
    modeButtons.forEach(btn=>btn.addEventListener('click',()=>{modeButtons.forEach(x=>x.classList.toggle('active',x===btn));const d=modeData[btn.dataset.mode];$('[data-mode-privacy]',root).textContent=d[0];$('[data-mode-latency]',root).textContent=d[1];$('[data-mode-capability]',root).textContent=d[2];$('[data-mode-control]',root).textContent=d[3];}));
    $('[data-verify-run]',root)?.addEventListener('click',()=>{
      const result=$('[data-verify-result]',root),size=$('[data-verify-size]',root),change=$('[data-verify-change]',root);result.textContent='CHECKING';result.classList.remove('pass');size.textContent='reading…';change.textContent='comparing before / after';window.dispatchEvent(new CustomEvent('jarvis:state',{detail:{state:'executing',source:'concept-lab'}}));setTimeout(()=>{size.textContent='15,904 bytes';change.textContent='visual state changed · evidence found';result.textContent='VERIFIED';result.classList.add('pass');window.dispatchEvent(new CustomEvent('jarvis:state',{detail:{state:'verified',source:'concept-lab',hold:1800}}));},900);
    });
  }
  function init(){inject();interact();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();