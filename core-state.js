(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const core=()=>$('.hero-core');
  const states=['idle','listening','thinking','routing','executing','verified'];
  let resetTimer;

  function ensureReadout(){
    const host=$('.system-state');
    if(host&&!$('.core-state-readout',host)){
      const span=document.createElement('span');
      span.className='core-state-readout';
      span.innerHTML='<b></b><em>CORE / IDLE</em>';
      host.appendChild(span);
    }
  }

  function setState(next,hold=0){
    next=states.includes(next)?next:'idle';
    const heroCore=core();
    if(heroCore){
      heroCore.dataset.coreState=next;
      const note=$('.hero-core-note strong');
      if(note) note.textContent=`JARVIS CORE / ${next.toUpperCase()}`;
    }
    document.documentElement.dataset.jarvisState=next;
    const readout=$('.core-state-readout em');
    if(readout) readout.textContent=`CORE / ${next.toUpperCase()}`;
    clearTimeout(resetTimer);
    if(hold>0&&next!=='idle') resetTimer=setTimeout(()=>setState('idle'),hold);
  }

  function observeCommand(){
    const center=$('[data-command-center]');
    const response=$('[data-response-state]');
    if(center){
      new MutationObserver(()=>{
        if(center.classList.contains('open')) setState('listening');
        else if(document.documentElement.dataset.jarvisState==='listening') setState('idle');
      }).observe(center,{attributes:true,attributeFilter:['class']});
    }
    if(response){
      new MutationObserver(()=>{
        const value=(response.textContent||'').trim().toLowerCase();
        if(value.includes('processing')) setState('thinking');
        if(value.includes('ready')) setState('verified',1900);
      }).observe(response,{childList:true,characterData:true,subtree:true});
    }
  }

  function observeRoutingLab(){
    const root=$('[data-route-lab]');
    if(!root) return;
    const observer=new MutationObserver(()=>{
      const nodes=[...root.querySelectorAll('[data-route-node]')];
      const index=nodes.findIndex(n=>n.classList.contains('active'));
      if(index===0) setState('thinking');
      else if(index===1) setState('thinking');
      else if(index===2) setState('routing');
      else if(index===3) setState('executing');
      else if(index===4) setState('verified',2200);
    });
    observer.observe(root,{subtree:true,attributes:true,attributeFilter:['class']});
  }

  function scrollReactive(){
    const hero=$('.hero'),heroCore=core();
    if(!hero||!heroCore||matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking=false;
    function update(){
      ticking=false;
      const rect=hero.getBoundingClientRect();
      const p=Math.min(1,Math.max(0,-rect.top/Math.max(1,rect.height)));
      heroCore.style.setProperty('--scroll-core',p.toFixed(3));
    }
    addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});
    update();
  }

  function init(){
    ensureReadout();
    setState('idle');
    observeCommand();
    setTimeout(observeRoutingLab,800);
    scrollReactive();
    addEventListener('jarvis:state',e=>setState(e.detail?.state||'idle',e.detail?.hold||0));
    document.addEventListener('visibilitychange',()=>{if(document.hidden)setState('idle')});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();