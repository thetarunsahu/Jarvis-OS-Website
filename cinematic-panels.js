(function(){
  const $=(s,r=document)=>r.querySelector(s);
  function inject(){
    if($('#cinematic-panels')) return;
    const anchor=$('.experience');
    if(!anchor) return;
    const section=document.createElement('section');
    section.id='cinematic-panels';
    section.className='cinematic-panels';
    section.innerHTML=`
      <div class="section-head"><span>02.2 / VISUAL SYSTEM</span><span>ORIGINAL JARVIS CONCEPT ARTWORK</span></div>
      <div class="cinematic-grid">
        <article class="cinematic-frame hero-frame" data-cinematic-frame>
          <img src="assets/jarvis-neural-field.svg" alt="Original Jarvis context field concept visualization" loading="lazy" />
          <div class="cinematic-overlay"><div class="cinematic-copy"><small>CONTEXT FIELD / CONCEPT</small><h3>THE WORK ISN'T IN ONE APP.</h3><p>Jarvis is imagined as the layer that connects project state, memory, agents and tools around the same objective.</p></div><span class="cinematic-index">VISUAL / 01</span></div>
        </article>
        <div class="cinematic-side">
          <article class="cinematic-frame" data-cinematic-frame>
            <img src="assets/jarvis-workspace-vision.svg" alt="Original Jarvis workspace concept interface" loading="lazy" />
            <div class="cinematic-overlay"><div class="cinematic-copy"><small>WORKSPACE / CONCEPT</small><h3>ONE THREAD.</h3><p>A concrete visual direction for a future Jarvis workspace.</p></div><span class="cinematic-index">02</span></div>
          </article>
          <div class="cinematic-caption"><span>WHY THIS EXISTS</span><p><strong>Make the product tangible.</strong>The interface visuals are intentionally presented as original concept artwork, not screenshots of completed functionality.</p></div>
        </div>
      </div>`;
    anchor.insertAdjacentElement('beforebegin',section);
  }
  function motion(){
    if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('[data-cinematic-frame]').forEach(frame=>{
      frame.addEventListener('pointermove',e=>{
        const r=frame.getBoundingClientRect();
        const x=((e.clientX-r.left)/r.width-.5)*8;
        const y=((e.clientY-r.top)/r.height-.5)*8;
        const img=frame.querySelector('img');
        if(img) img.style.transform=`scale(1.055) translate(${x*.18}px,${y*.18}px)`;
      });
      frame.addEventListener('pointerleave',()=>{const img=frame.querySelector('img');if(img) img.style.transform='';});
    });
  }
  function init(){inject();motion();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();

(function loadJarvisExperienceStack(){
  const head=document.head;
  const loaded=new Set();
  function style(href){if(loaded.has(href)||document.querySelector(`link[href="${href}"]`))return;loaded.add(href);const link=document.createElement('link');link.rel='stylesheet';link.href=href;head.appendChild(link);}
  function script(src){if(loaded.has(src)||document.querySelector(`script[src="${src}"]`))return;loaded.add(src);const el=document.createElement('script');el.src=src;el.async=false;head.appendChild(el);}
  const stack=[
    ['v4-system.css','v4-system.js'],
    ['tech-atlas.css','tech-atlas.js'],
    ['core-state.css','core-state.js'],
    ['intro-core.css','intro-core.js'],
    ['orchestration-lab.css','orchestration-lab.js'],
    ['orchestration-enhance.css','orchestration-enhance.js'],
    ['inside-jarvis.css','inside-jarvis.js'],
    ['concept-lab.css','concept-lab.js'],
    ['product-suite.css','product-suite.js'],
    ['memory-interaction.css','memory-interaction.js'],
    ['atlas-enhance.css','atlas-enhance.js'],
    ['tech-annotations.css','tech-annotations.js'],
    ['sound-system.css','sound-system.js'],
    ['launch-polish.css','launch-polish.js']
  ];
  stack.forEach(([css,js])=>{style(css);script(js);});
})();