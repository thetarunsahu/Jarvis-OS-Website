(() => {
  'use strict';
  const $ = (q, r = document) => r.querySelector(q);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const storage = {
    get(k){ try { return sessionStorage.getItem(k); } catch (_) { return null; } },
    set(k,v){ try { sessionStorage.setItem(k,v); } catch (_) {} }
  };

  function buildAwakening() {
    if ($('.jarvis-awakening')) return $('.jarvis-awakening');
    const overlay = document.createElement('section');
    overlay.className = 'jarvis-awakening';
    overlay.setAttribute('aria-label','Jarvis system awakening');
    overlay.innerHTML = `
      <div class="awaken-top"><span><i></i><strong>JARVIS / OS</strong> · PERSONAL INTELLIGENCE LAYER</span><span data-awaken-clock>00:00:00</span></div>
      <div class="awaken-shell">
        <div class="awaken-diagnostics">
          <span><i></i><b>IDENTITY</b> VERIFIED</span>
          <span><i></i><b>CONTEXT</b> LINKED</span>
          <span><i></i><b>MEMORY</b> READY</span>
          <span><i></i><b>TOOLS</b> STANDBY</span>
        </div>
        <div class="awaken-center">
          <div class="awaken-core" data-awaken-core>
            <span class="awaken-ring r1"></span><span class="awaken-ring r2"></span><span class="awaken-ring r3"></span>
            <div class="awaken-sigil" data-awaken-sigil>J</div>
          </div>
          <div class="awaken-copy"><small>BOOT SEQUENCE / 001</small><h1>INTELLIGENCE<br><span>WITH CONTINUITY.</span></h1></div>
          <div class="awaken-status"><div class="awaken-status-row"><span data-awaken-status>RESTORING SYSTEM CONTEXT</span><span data-awaken-percent>00%</span></div><div class="awaken-track"><i></i></div></div>
        </div>
        <div class="awaken-diagnostics right">
          <span><i></i><b>VOICE</b> AVAILABLE</span>
          <span><i></i><b>AGENTS</b> 04 READY</span>
          <span><i></i><b>WORKSPACE</b> ACTIVE</span>
          <span><i></i><b>SYSTEM</b> ONLINE</span>
        </div>
      </div>
      <button type="button" class="awaken-skip" data-awaken-skip>SKIP INTRO ↗</button>`;
    document.body.prepend(overlay);
    return overlay;
  }

  function updateClock(el){
    const target = $('[data-awaken-clock]', el); if (!target) return;
    const tick = () => target.textContent = new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date());
    tick(); const id = setInterval(tick,1000); el.addEventListener('jarvis:intro-done',()=>clearInterval(id),{once:true});
  }

  function animateStatus(el, duration) {
    const percent = $('[data-awaken-percent]',el), status = $('[data-awaken-status]',el);
    const messages = [
      [0,'RESTORING SYSTEM CONTEXT'],
      [.28,'LINKING MEMORY THREADS'],
      [.52,'ROUTING SPECIALIST LAYER'],
      [.76,'SYNCING WORKSPACE STATE'],
      [.94,'JARVIS READY']
    ];
    const start = performance.now();
    function frame(now){
      const p = Math.min(1,(now-start)/duration);
      if(percent) percent.textContent = String(Math.floor(p*100)).padStart(2,'0')+'%';
      if(status){ const current=[...messages].reverse().find(x=>p>=x[0]); status.textContent=current[1]; }
      if(p<1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function flyToHero(overlay) {
    const source = $('[data-awaken-sigil]',overlay), target = $('#core-stage');
    if (!source || !target || reduce) return Promise.resolve();
    const s = source.getBoundingClientRect(), t = target.getBoundingClientRect();
    const size = Math.min(84, Math.max(48, t.width*.12));
    const flight = document.createElement('div');
    flight.className = 'awaken-flight'; flight.textContent='J';
    Object.assign(flight.style,{left:s.left+'px',top:s.top+'px',width:s.width+'px',height:s.height+'px'});
    document.body.appendChild(flight); source.style.opacity='0';
    const dx=(t.left+t.width/2)-(s.left+s.width/2), dy=(t.top+t.height/2)-(s.top+s.height/2), scale=size/s.width;
    const anim=flight.animate([
      {transform:'translate3d(0,0,0) scale(1) rotate(-8deg)',opacity:1,filter:'blur(0)'},
      {offset:.72,opacity:1,filter:'blur(0)'},
      {transform:`translate3d(${dx}px,${dy}px,0) scale(${scale}) rotate(0deg)`,opacity:0,filter:'blur(6px)'}
    ],{duration:720,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'});
    return anim.finished.catch(()=>{}).then(()=>flight.remove());
  }

  async function finishIntro(overlay, quick=false) {
    if (!overlay || overlay.dataset.leaving) return;
    overlay.dataset.leaving='1';
    if(!quick) await flyToHero(overlay);
    overlay.classList.add('is-leaving');
    document.body.classList.remove('awakening-active');
    overlay.dispatchEvent(new Event('jarvis:intro-done'));
    setTimeout(()=>overlay.remove(), reduce?120:760);
    storage.set('jarvis-home-intro','seen');
    window.dispatchEvent(new CustomEvent('jarvis:state',{detail:{state:'ready'}}));
  }

  function playIntro(force=false) {
    const seen = storage.get('jarvis-home-intro') === 'seen';
    const overlay = buildAwakening();
    document.body.classList.add('awakening-active');
    updateClock(overlay);
    const duration = reduce ? 220 : (seen && !force ? 1200 : 3300);
    animateStatus(overlay,duration);
    $('[data-awaken-skip]',overlay)?.addEventListener('click',()=>finishIntro(overlay,true),{once:true});
    setTimeout(()=>finishIntro(overlay,false),duration);
  }

  function featureLab() {
    const nav = $('.desktop-nav a[href="lab.html"]');
    if(nav && !$('.lab-nav-signal',nav)){
      nav.classList.add('lab-nav-featured');
      const signal=document.createElement('span'); signal.className='lab-nav-signal'; signal.textContent='LIVE LAB'; nav.appendChild(signal);
    }
    const hero = $('.hero');
    if(hero && !$('.hero-lab-gateway',hero)){
      const gateway=document.createElement('aside');gateway.className='hero-lab-gateway';
      gateway.innerHTML='<a href="systems-lab.html"><small>SYSTEMS LAB / EXPERIMENTAL LAYER</small><strong>Go inside Jarvis.</strong><p>Orchestration · AI systems · memory · product concepts</p><span class="lab-gateway-arrow" aria-hidden="true">↗</span></a>';
      hero.appendChild(gateway);
    }
    const link=$('.lab-link');
    if(link){ link.setAttribute('aria-label','Open the Jarvis Systems Lab gateway'); }
  }

  function routeLabGateway(){
    document.addEventListener('click',event=>{
      const link=event.target.closest('a[href="lab.html"]');
      if(!link)return;
      event.preventDefault();
      location.href='systems-lab.html';
    });
    addEventListener('keydown',event=>{
      if(event.key.toLowerCase()!=='l'||event.ctrlKey||event.metaKey||event.altKey)return;
      if(/input|textarea|select/i.test(document.activeElement?.tagName))return;
      event.preventDefault();
      event.stopImmediatePropagation();
      location.href='systems-lab.html';
    },true);
  }

  function keyboardReplay(){
    addEventListener('keydown',event=>{
      if((event.key==='b'||event.key==='B')&&!event.ctrlKey&&!event.metaKey&&!/input|textarea|select/i.test(document.activeElement?.tagName)){
        event.preventDefault();
        playIntro(true);
      }
    });
  }

  function init(){
    featureLab(); routeLabGateway(); keyboardReplay();
    requestAnimationFrame(()=>playIntro(false));
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
