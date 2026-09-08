(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=matchMedia('(pointer:fine)').matches;
  const dynamicSelector='[data-inside-title],[data-inside-copy],[data-inside-kicker],[data-suite-title],[data-suite-desc],[data-suite-tag],[data-os-title],[data-os-copy],[data-os-kicker],[data-stage-prompt],[data-response-text],[data-boot-log],[data-trace-title],[data-trace-copy],[data-proof-line],[data-proof-meta],[data-capsule-view]';
  const skipTags=new Set(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','INPUT','SELECT','OPTION','CODE','PRE','SVG','PATH','CANVAS']);
  let splitting=false;

  function textContentClean(el){return (el.innerText||el.textContent||'').replace(/\s+/g,' ').trim();}
  function canSplit(el){return el&&!el.matches(dynamicSelector)&&!el.closest('[contenteditable="true"]')&&!el.dataset.motionSplit;}

  function splitTextNodes(el,mode){
    if(!canSplit(el)) return;
    const label=textContentClean(el);
    if(!label) return;
    splitting=true;
    let index=0;
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode(node){
      const p=node.parentElement;
      if(!p||skipTags.has(p.tagName)||p.closest('.motion-unit'))return NodeFilter.FILTER_REJECT;
      return node.nodeValue&&node.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
    }});
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      const frag=document.createDocumentFragment();
      if(mode==='chars'){
        [...node.nodeValue].forEach(ch=>{
          if(/\s/.test(ch)){frag.appendChild(document.createTextNode(ch));return;}
          const span=document.createElement('span');span.className='motion-char motion-unit';span.textContent=ch;span.style.setProperty('--motion-i',index++);span.setAttribute('aria-hidden','true');frag.appendChild(span);
        });
      }else{
        node.nodeValue.split(/(\s+)/).forEach(part=>{
          if(!part)return;
          if(/^\s+$/.test(part)){frag.appendChild(document.createTextNode(part));return;}
          const span=document.createElement('span');span.className='motion-word motion-unit';span.textContent=part;span.style.setProperty('--motion-i',index++);span.setAttribute('aria-hidden','true');frag.appendChild(span);
        });
      }
      node.replaceWith(frag);
    });
    el.dataset.motionSplit=mode;
    el.dataset.motionLabel=label;
    el.setAttribute('aria-label',label);
    if(mode==='chars')el.classList.add('motion-chars');
    splitting=false;
  }

  function classify(root=document){
    const charTargets=[
      '.hero h1 .line','.silent-lines h2','.break-copy h2','.finale h2',
      '#jarvis-contrast .contrast-center strong','#os-threshold .os-main h3'
    ];
    const headingTargets=[
      'section h2','section h3','.manifesto-line','.desktop-intro h2','.inside-story h2',
      '.concept-intro h2','.suite-intro h2','.workflow-intro h2','.capsule-intro h2',
      '.evidence-intro h2','.hardware-copy h2'
    ];
    const copyTargets=[
      'section p','.manifesto-note strong','.inside-story>p:not(.micro-label)',
      '.cinematic-copy p','.learning-card li','.glossary-grid article p','.workflow-grid article p'
    ];
    const labelTargets=['.micro-label','.section-head>span','article>small','.cinematic-copy>small','.inside-head>span'];

    charTargets.forEach(sel=>$$(sel,root).forEach(el=>{if(canSplit(el)){el.classList.add('motion-heading','motion-clip','motion-velocity-title');splitTextNodes(el,'chars');}}));
    headingTargets.forEach(sel=>$$(sel,root).forEach(el=>{if(!el.matches(charTargets.join(','))&&canSplit(el)){el.classList.add('motion-heading','motion-clip','motion-velocity-title');splitTextNodes(el,'words');}}));
    copyTargets.forEach(sel=>$$(sel,root).forEach(el=>{if(canSplit(el)){el.classList.add('motion-copy');splitTextNodes(el,'words');}}));
    labelTargets.forEach(sel=>$$(sel,root).forEach(el=>{if(!el.closest('.section-head'))el.classList.add('motion-label');}));
    $$('.section-head',root).forEach(el=>el.classList.add('motion-section-head'));

    const itemGroups=['.agent-rail','.glossary-grid','.learning-rail','.workflow-grid','.project-cards','.os-cards','.evidence-chain','.contrast-stage'];
    itemGroups.forEach(sel=>$$(sel,root).forEach(group=>[...group.children].forEach((item,i)=>{item.classList.add('motion-stagger-item');item.style.setProperty('--motion-order',i);}))); 
  }

  function ensurePhase(el){
    if(!el.classList.contains('motion-future')&&!el.classList.contains('motion-present')&&!el.classList.contains('motion-past'))el.classList.add('motion-future');
  }

  function phaseElement(el){
    const r=el.getBoundingClientRect();
    const vh=innerHeight||document.documentElement.clientHeight;
    const inBand=r.bottom>vh*.06&&r.top<vh*.94;
    el.classList.toggle('motion-present',inBand);
    el.classList.toggle('motion-future',!inBand&&r.top>=vh*.5);
    el.classList.toggle('motion-past',!inBand&&r.bottom<vh*.5);
  }

  function prepareMotionElements(){
    const elements=$$('.motion-heading,.motion-copy,.motion-label,.motion-stagger-item,.motion-section-head');
    elements.forEach(ensurePhase);
    return elements;
  }

  function setupIntersection(elements){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        const el=entry.target;
        if(entry.isIntersecting){
          el.classList.remove('motion-future','motion-past');el.classList.add('motion-present');
        }else{
          const r=el.getBoundingClientRect();
          el.classList.remove('motion-present');
          el.classList.toggle('motion-past',r.bottom<innerHeight*.45);
          el.classList.toggle('motion-future',r.top>=innerHeight*.45);
        }
      });
    },{rootMargin:'-5% 0px -7% 0px',threshold:[0,.08,.28,.55]});
    elements.forEach(el=>observer.observe(el));
    return observer;
  }

  function setupScenes(){
    const sections=$$('main>section, .signature-section, #inside-jarvis, #os-threshold, #concept-lab, #product-suite').filter((el,i,a)=>a.indexOf(el)===i);
    sections.forEach((s,i)=>{s.classList.add('motion-scene');s.dataset.motionScene=String(i+1).padStart(2,'0');});
    let ticking=false;
    function update(){
      ticking=false;const vh=innerHeight;
      sections.forEach(s=>{
        const r=s.getBoundingClientRect();
        const center=r.top+r.height/2;
        const dist=Math.abs(center-vh/2);
        const energy=Math.max(0,1-dist/(vh*.95));
        s.style.setProperty('--motion-scene-energy',energy.toFixed(3));
      });
    }
    addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
    addEventListener('resize',update);update();
    return sections;
  }

  function setupScrollVelocity(){
    if(reduce)return;
    let lastY=scrollY,lastT=performance.now(),display=0,raf=0;
    function sample(){
      raf=0;const now=performance.now();const dy=scrollY-lastY;const dt=Math.max(16,now-lastT);let v=(dy/dt)*18;v=Math.max(-18,Math.min(18,v));display+=(v-display)*.32;document.documentElement.style.setProperty('--scroll-velocity',display.toFixed(2));lastY=scrollY;lastT=now;
      if(Math.abs(display)>.06){raf=requestAnimationFrame(sample);}else document.documentElement.style.setProperty('--scroll-velocity','0');
    }
    addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(sample);},{passive:true});
  }

  function chapterName(section){
    const head=$('.section-head span:last-child',section)||$('.inside-head span:last-child',section);
    const h=$('h2,h1,h3',section);
    return textContentClean(head||h||section).slice(0,78)||'JARVIS SYSTEM';
  }
  function setupChapterCue(sections){
    if(reduce)return;
    const cue=document.createElement('div');cue.className='kinetic-chapter';cue.innerHTML='<div class="kinetic-chapter-inner"><span class="kinetic-chapter-index" data-k-index>01</span><div class="kinetic-chapter-copy"><small>JARVIS / SCENE TRANSITION</small><strong data-k-title>CONTEXT</strong></div></div>';document.body.appendChild(cue);
    const idx=$('[data-k-index]',cue),title=$('[data-k-title]',cue);
    let current=null,timer=0,ready=false;
    setTimeout(()=>ready=true,1600);
    const candidates=sections.filter(s=>s.id&& !['top'].includes(s.id));
    const obs=new IntersectionObserver(entries=>{
      if(!ready)return;
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!visible||visible.target===current)return;
      current=visible.target;const i=Math.max(0,candidates.indexOf(current));idx.textContent=String(i+1).padStart(2,'0');title.textContent=chapterName(current);
      cue.classList.remove('is-showing');void cue.offsetWidth;cue.classList.add('is-showing');clearTimeout(timer);timer=setTimeout(()=>cue.classList.remove('is-showing'),1150);
    },{rootMargin:'-38% 0px -38% 0px',threshold:[0,.1,.35]});
    candidates.forEach(s=>obs.observe(s));
  }

  function dynamicRootAnimation(){
    $$(dynamicSelector).forEach(el=>{el.classList.add(el.matches('h1,h2,h3,strong')?'motion-heading':'motion-copy');ensurePhase(el);});
  }

  function init(){
    document.documentElement.classList.add('motion-ready');
    classify();dynamicRootAnimation();
    let elements=prepareMotionElements();const io=setupIntersection(elements);const sections=setupScenes();setupScrollVelocity();setupChapterCue(sections);
    elements.forEach(phaseElement);

    let rescanTimer=0;
    const mo=new MutationObserver(mutations=>{
      if(splitting)return;
      const meaningful=mutations.some(m=>[...m.addedNodes].some(n=>n.nodeType===1));
      if(!meaningful)return;
      clearTimeout(rescanTimer);rescanTimer=setTimeout(()=>{
        classify();dynamicRootAnimation();
        const fresh=prepareMotionElements().filter(el=>!el.dataset.motionObserved);
        fresh.forEach(el=>{el.dataset.motionObserved='1';io.observe(el);phaseElement(el);});
      },120);
    });
    mo.observe(document.body,{childList:true,subtree:true});
    elements.forEach(el=>el.dataset.motionObserved='1');
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();