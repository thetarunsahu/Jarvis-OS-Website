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

const v4Style=document.createElement('link');
v4Style.rel='stylesheet';
v4Style.href='v4-system.css';
document.head.appendChild(v4Style);

const v4Script=document.createElement('script');
v4Script.src='v4-system.js';
v4Script.defer=true;
document.head.appendChild(v4Script);

const atlasStyle=document.createElement('link');
atlasStyle.rel='stylesheet';
atlasStyle.href='tech-atlas.css';
document.head.appendChild(atlasStyle);

const atlasScript=document.createElement('script');
atlasScript.src='tech-atlas.js';
atlasScript.defer=true;
document.head.appendChild(atlasScript);