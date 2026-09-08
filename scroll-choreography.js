(function(){
  const scenes=[
    ['.hero','AWAKEN'],['.manifesto','PROBLEM'],['#cinematic-panels','VISION'],['#experience','EXPERIENCE'],['#desktop-scene','DESKTOP'],['#agents','AGENTS'],['#memory','MEMORY'],['#inside-jarvis','INSIDE'],['#system','SYSTEM'],['#concept-lab','LEARN'],['#product-suite','PRODUCT'],['#roadmap','BUILD'],['#tech-atlas','ATLAS'],['.finale','FINALE']
  ];
  function init(){
    if(document.querySelector('.scene-hud'))return;
    const hud=document.createElement('div');hud.className='scene-hud';hud.innerHTML='<span data-scene-index>01</span><i></i><strong data-scene-name>AWAKEN</strong><em data-scene-progress>00%</em>';
    const wash=document.createElement('div');wash.className='scene-wash';wash.innerHTML='<i></i><b></b>';
    document.body.append(wash,hud);
    const entries=scenes.map(([sel,name],i)=>({el:document.querySelector(sel),name,i})).filter(x=>x.el);
    let current=entries[0],ticking=false;
    function activate(item){if(!item||current===item)return;current=item;document.documentElement.dataset.scene=item.name.toLowerCase();hud.classList.remove('pulse');void hud.offsetWidth;hud.classList.add('pulse');hud.querySelector('[data-scene-index]').textContent=String(item.i+1).padStart(2,'0');hud.querySelector('[data-scene-name]').textContent=item.name;document.documentElement.style.setProperty('--scene-index',item.i);}
    const observer=new IntersectionObserver(es=>{const visible=es.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible){const item=entries.find(x=>x.el===visible.target);activate(item)}},{threshold:[.18,.35,.55],rootMargin:'-18% 0px -24%'});entries.forEach(x=>observer.observe(x.el));
    function update(){ticking=false;if(!current)return;const r=current.el.getBoundingClientRect();const range=Math.max(1,r.height-innerHeight);const p=range>0?Math.max(0,Math.min(1,-r.top/range)):Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));hud.querySelector('[data-scene-progress]').textContent=`${String(Math.round(p*100)).padStart(2,'0')}%`;hud.style.setProperty('--p',p.toFixed(3));}
    addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});update();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,1000));else setTimeout(init,1000);
})();