(function(){
  const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
  const defs={
    'Language Model':'Generates and reasons over the context it receives. It is one component, not the whole product.',
    'Embeddings':'Vectors that represent meaning so semantically related content can be searched geometrically.',
    'Vector Index':'A search structure optimized for finding nearby embeddings quickly.',
    'Memory Store':'Persistent, selected state that survives beyond one interaction or session.',
    'Agent Runtime':'Coordination logic for specialist behaviors, tools and shared objectives.',
    'Tool Adapters':'Controlled bridges between model decisions and real software actions.',
    'Speech Pipeline':'Speech recognition + synthesis, where latency strongly affects how natural the interface feels.',
    'Verification Layer':'Checks changed state and evidence before a system claims an action succeeded.',
    'Context Engineering':'Designing which information enters the model, in what order and with what priority.',
    'Persistent Memory':'Long-lived useful state, separate from simply storing every chat message.',
    'Agent Orchestration':'Routing subtasks across specialized behaviors while preserving one shared objective.',
    'Tool Execution':'Turning a plan into constrained actions in files, apps, APIs or other software.',
    'Verification Loop':'Compare expected vs actual outcome, then expose evidence.',
    'Local-First Direction':'Prefer on-device storage or execution where practical, while allowing cloud capability when needed.'
  };
  function init(){if($('.tech-tooltip'))return;const tip=document.createElement('div');tip.className='tech-tooltip';tip.innerHTML='<small>TECH NOTE</small><strong></strong><p></p>';document.body.appendChild(tip);const candidates=$$('.atlas-grid article,.glossary-grid article');candidates.forEach(card=>{const heading=$('h3',card)?.textContent?.trim();const def=defs[heading];if(!def)return;card.dataset.techAnnotation=heading;card.tabIndex=card.tabIndex>=0?card.tabIndex:0;const show=()=>{$('strong',tip).textContent=heading;$('p',tip).textContent=def;tip.classList.add('visible')};const hide=()=>tip.classList.remove('visible');card.addEventListener('mouseenter',show);card.addEventListener('mouseleave',hide);card.addEventListener('focus',show);card.addEventListener('blur',hide);card.addEventListener('mousemove',e=>{tip.style.left=`${Math.min(innerWidth-290,e.clientX+18)}px`;tip.style.top=`${Math.min(innerHeight-150,e.clientY+18)}px`})});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,900));else setTimeout(init,900);
})();