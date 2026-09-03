(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  function inject(){
    const anchor=$('.agents');
    if(!anchor||$('#desktop-scene')) return;
    const section=document.createElement('section');
    section.id='desktop-scene';
    section.className='desktop-scene section-pad';
    section.innerHTML=`
      <div class="section-head"><span>02.8 / DESKTOP CONCEPT</span><span>A PRODUCT SCREEN YOU CAN FEEL.</span></div>
      <div class="desktop-intro">
        <div><p class="micro-label">INTERFACE DIRECTION</p><h2>ONE DESKTOP.<br><em>ONE THREAD.</em></h2></div>
        <p>This is a concept interface for how Jarvis OS could gather goals, projects, memory and specialist agents into one continuous workspace.</p>
      </div>
      <div class="desktop-perspective" data-desktop-perspective>
        <div class="desktop-glow"></div>
        <div class="desktop-window">
          <div class="desktop-bar"><div><i></i><i></i><i></i></div><span>JARVIS / WORKSPACE</span><small>CONCEPT UI</small></div>
          <div class="desktop-grid">
            <aside class="desktop-sidebar">
              <span class="desktop-brand"><b>J</b><small>JARVIS</small></span>
              <nav>
                <button class="active"><i>01</i><span>Today</span></button>
                <button><i>02</i><span>Projects</span></button>
                <button><i>03</i><span>Memory</span></button>
                <button><i>04</i><span>Agents</span></button>
              </nav>
              <div class="desktop-user"><span></span><div><b>Local Mode</b><small>Prototype</small></div></div>
            </aside>
            <main class="desktop-main">
              <div class="desktop-main-top"><div><small>ACTIVE THREAD</small><strong>Jarvis OS Website</strong></div><span class="desktop-live"><i></i> CONTEXT READY</span></div>
              <div class="desktop-command">
                <small>PRIMARY INTENT</small>
                <h3>Continue from where we stopped.</h3>
                <button type="button" data-command-open>RUN WITH CONTEXT ↗</button>
              </div>
              <div class="desktop-cards">
                <article><small>LAST DECISION</small><strong>Push visual density further.</strong><p>Keep the product truthful, but make the interface feel tangible.</p><span>MEMORY / 01</span></article>
                <article><small>NEXT ACTION</small><strong>Review the latest screenshot.</strong><p>Find empty zones, weak hierarchy and areas that need more visual depth.</p><span>PLANNER / 02</span></article>
                <article class="desktop-agent-card"><small>ROUTED AGENT</small><div class="agent-core"><i></i><b>DESIGNER</b></div><p>Interface direction + motion language</p><span>AGENT / 03</span></article>
              </div>
              <div class="desktop-activity"><span>ACTIVITY</span><div class="activity-line"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><small data-desktop-status>Restoring project state…</small></div>
            </main>
            <aside class="desktop-context">
              <div class="context-head"><span>CONTEXT</span><i></i></div>
              <div class="context-block"><small>PROJECT</small><strong>Jarvis-OS-Website</strong><span>Active</span></div>
              <div class="context-block"><small>RECENT</small><strong>Visual V3.2</strong><span>Synced</span></div>
              <div class="context-block"><small>FILES</small><strong>6 relevant</strong><span>Ranked</span></div>
              <div class="context-orbit"><i></i><i></i><i></i><b>J</b></div>
              <p>Conceptual product preview. No claim that this exact desktop runtime is complete.</p>
            </aside>
          </div>
        </div>
        <div class="desktop-shadow"></div>
      </div>`;
    anchor.insertAdjacentElement('beforebegin',section);
  }

  function activate(){
    const wrap=$('[data-desktop-perspective]');
    if(!wrap) return;
    const status=$('[data-desktop-status]');
    const states=['Restoring project state…','Ranking relevant files…','Routing to Designer…','Context ready.'];
    let n=0;
    setInterval(()=>{ if(status) status.textContent=states[n++%states.length]; },1800);
    if(!reduce&&matchMedia('(pointer:fine)').matches){
      wrap.addEventListener('mousemove',e=>{
        const r=wrap.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        wrap.style.setProperty('--rx',`${-y*5}deg`);
        wrap.style.setProperty('--ry',`${x*7}deg`);
      });
      wrap.addEventListener('mouseleave',()=>{wrap.style.setProperty('--rx','0deg');wrap.style.setProperty('--ry','0deg');});
    }
  }

  function revealFallback(){
    setTimeout(()=>$$('.reveal,.reveal-text').forEach(el=>el.classList.add('visible')),2200);
  }

  function init(){inject();activate();revealFallback();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();