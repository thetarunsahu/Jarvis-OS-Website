(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sigilMarkup=`<div class="jarvis-sigil"><i class="sigil-a"></i><i class="sigil-b"></i><i class="sigil-c"></i><i class="sigil-triangle"></i><b class="sigil-node"></b></div>`;

  function replaceHeroCore(){
    const center=$('.hero-core .core-center');
    if(!center||center.dataset.sigilReady) return;
    center.dataset.sigilReady='true';
    center.innerHTML=`<div class="hero-sigil">${sigilMarkup}</div><small>ONLINE</small>`;
  }

  function addReplayControl(){
    const hero=$('.hero');
    if(!hero||$('.boot-replay',hero)) return;
    const button=document.createElement('button');
    button.type='button';
    button.className='boot-replay';
    button.textContent='Replay awakening  B';
    button.addEventListener('click',()=>playIntro(true));
    hero.appendChild(button);
  }

  function makeIntro(full){
    const overlay=document.createElement('div');
    overlay.className=`cinematic-boot${full?'':' quick'}`;
    overlay.setAttribute('role','presentation');
    overlay.innerHTML=`
      <div class="boot-cinema-grid"></div>
      <div class="boot-cinema-vignette"></div>
      <div class="boot-cinema-scan"></div>
      <div class="boot-cinema-noise"></div>
      <div class="boot-cinema-top"><span>JARVIS / PERSONAL INTELLIGENCE LAYER</span><span data-intro-clock>BOOT / 00:00:00</span></div>
      <div class="boot-cinema-side left">
        <span>01001010 01000001 01010010</span><span>CTX.PIPELINE / INITIALIZE</span><span>MEMORY.INDEX / DISCOVER</span><span>AGENTS.RUNTIME / STANDBY</span><span>TOOLS.BUS / BOUNDARY CHECK</span>
      </div>
      <div class="boot-cinema-side right">
        <span>VOICE / TEXT / FILES</span><span>PROJECT.STATE / RESTORE</span><span>MODEL.ROUTER / READY</span><span>VERIFICATION / ARMED</span><span>SESSION.CONTINUITY / ONLINE</span>
      </div>
      <div class="boot-cinema-main">
        <div class="boot-cinema-eyebrow" data-intro-eyebrow>${full?'SYSTEM AWAKENING':'SESSION RESUME'}</div>
        <div class="boot-cinema-core-wrap"><div class="boot-cinema-cross"></div>${sigilMarkup}</div>
        <div class="boot-cinema-story">
          <div><div class="boot-cinema-state" data-intro-state>${full?'INITIALIZING CONTEXT':'RESTORING THREAD'}</div><div class="boot-cinema-title" data-intro-title>${full?'YOUR COMPUTER HAS ENOUGH APPS.':'WELCOME BACK.'}</div></div>
        </div>
      </div>
      <div class="boot-cinema-progress"><span data-intro-percent>00%</span><div class="boot-cinema-track"><i data-intro-track></i></div><button class="boot-skip" type="button" data-intro-skip>${full?'Skip intro':'Enter'}</button></div>`;
    return overlay;
  }

  function playIntro(forceFull=false){
    $('.cinematic-boot')?.remove();
    document.body.classList.remove('intro-revealed');
    const seen=sessionStorage.getItem('jarvis-awakening-seen')==='1';
    const full=forceFull||!seen;
    const overlay=makeIntro(full);
    document.body.appendChild(overlay);
    document.body.classList.add('intro-playing');

    const percent=$('[data-intro-percent]',overlay);
    const track=$('[data-intro-track]',overlay);
    const state=$('[data-intro-state]',overlay);
    const title=$('[data-intro-title]',overlay);
    const clock=$('[data-intro-clock]',overlay);
    const sideItems=[...overlay.querySelectorAll('.boot-cinema-side span')];
    const duration=reduce?450:(full?5600:950);
    const started=performance.now();
    let frame=0;
    let lastStep=-1;
    const fullScenes=[
      ['INITIALIZING CONTEXT','YOUR COMPUTER HAS ENOUGH APPS.'],
      ['RESTORING MEMORY','THE SYSTEM SHOULD REMEMBER.'],
      ['ROUTING SPECIALISTS','ONE GOAL. MANY MINDS.'],
      ['CONNECTING TOOLS','INTELLIGENCE NEEDS ACTION.'],
      ['VERIFICATION ONLINE','IT NEEDS CONTEXT.'],
      ['JARVIS CORE READY','IT NEEDS JARVIS.']
    ];
    const quickScenes=[['RESTORING THREAD','WELCOME BACK.'],['CONTEXT READY','CONTINUE WHERE YOU STOPPED.']];
    const scenes=full?fullScenes:quickScenes;

    const finish=()=>{
      if(!overlay.isConnected) return;
      sessionStorage.setItem('jarvis-awakening-seen','1');
      overlay.classList.add('is-exiting');
      document.body.classList.remove('intro-playing');
      document.body.classList.add('intro-revealed');
      setTimeout(()=>document.body.classList.remove('intro-revealed'),1600);
      setTimeout(()=>overlay.remove(),900);
    };

    $('[data-intro-skip]',overlay)?.addEventListener('click',finish,{once:true});

    function tick(now){
      if(!overlay.isConnected) return;
      const elapsed=now-started;
      const p=Math.min(1,elapsed/duration);
      const value=Math.round(p*100);
      if(percent) percent.textContent=`${String(value).padStart(2,'0')}%`;
      if(track) track.style.width=`${value}%`;
      if(clock){
        const seconds=elapsed/1000;
        clock.textContent=`BOOT / 00:00:${String(Math.floor(seconds)).padStart(2,'0')}`;
      }
      const step=Math.min(scenes.length-1,Math.floor(p*scenes.length));
      if(step!==lastStep){
        lastStep=step;
        if(state) state.textContent=scenes[step][0];
        if(title){
          title.style.opacity='0';
          title.style.transform='translateY(8px)';
          setTimeout(()=>{if(title){title.textContent=scenes[step][1];title.style.opacity='1';title.style.transform='translateY(0)';}},120);
        }
        sideItems.forEach((item,i)=>item.classList.toggle('is-hot',i%scenes.length===step%Math.max(1,scenes.length)));
      }
      if(p<1){frame=requestAnimationFrame(tick);}else{setTimeout(finish,full?340:80);}
    }
    frame=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(frame);
  }

  function init(){
    replaceHeroCore();
    addReplayControl();
    playIntro(false);
    addEventListener('keydown',event=>{
      if((event.key==='b'||event.key==='B')&&!/input|textarea/i.test(document.activeElement?.tagName)){
        event.preventDefault();
        playIntro(true);
      }
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();