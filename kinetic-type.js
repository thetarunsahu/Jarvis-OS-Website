(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const skipTags=new Set(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','INPUT','SELECT','OPTION','CODE','PRE','SVG','PATH','CANVAS']);
  const signatureSelectors=[
    '.hero h1 .line',
    '.silent-lines h2',
    '.break-copy h2',
    '.finale h2',
    '#jarvis-contrast .contrast-center strong'
  ];

  function cleanText(el){return (el.innerText||el.textContent||'').replace(/\s+/g,' ').trim();}

  function splitSignature(el){
    if(!el||el.dataset.motionSplit)return;
    const label=cleanText(el);if(!label)return;
    let index=0;
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode(node){
      const p=node.parentElement;
      if(!p||skipTags.has(p.tagName)||p.closest('.motion-unit'))return NodeFilter.FILTER_REJECT;
      return node.nodeValue&&node.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
    }});
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      const frag=document.createDocumentFragment();
      [...node.nodeValue].forEach(ch=>{
        if(/\s/.test(ch)){frag.appendChild(document.createTextNode(ch));return;}
        const span=document.createElement('span');
        span.className='motion-char motion-unit';
        span.textContent=ch;
        span.style.setProperty('--motion-i',index++);
        span.setAttribute('aria-hidden','true');
        frag.appendChild(span);
      });
      node.replaceWith(frag);
    });
    el.dataset.motionSplit='chars';
    el.setAttribute('aria-label',label);
    el.classList.add('motion-signature','motion-clip');
  }

  function classify(root=document){
    signatureSelectors.forEach(sel=>$$(sel,root).forEach(splitSignature));

    $$('section h2, section h3, .manifesto-line, .desktop-intro h2, .inside-story h2, .concept-intro h2, .suite-intro h2, .workflow-intro h2, .capsule-intro h2, .evidence-intro h2, .hardware-copy h2',root)
      .forEach(el=>{if(!el.dataset.motionSplit)el.classList.add('motion-heading-safe');});

    $$('section p, .manifesto-note strong, .cinematic-copy p, .workflow-grid article p',root)
      .forEach(el=>el.classList.add('motion-copy-safe'));

    $$('.section-head',root).forEach(el=>el.classList.add('motion-section-head-safe'));

    const groups=['.agent-rail','.glossary-grid','.learning-rail','.workflow-grid','.project-cards','.os-cards','.evidence-chain','.contrast-stage'];
    groups.forEach(sel=>$$(sel,root).forEach(group=>[...group.children].forEach((item,i)=>{
      item.classList.add('motion-stagger-safe');
      item.style.setProperty('--motion-order',i);
    })));
  }

  function motionTargets(){
    return $$('.motion-signature,.motion-heading-safe,.motion-copy-safe,.motion-section-head-safe,.motion-stagger-safe');
  }

  function setPhase(el,phase){
    el.classList.remove('motion-future','motion-present','motion-past');
    el.classList.add('motion-'+phase);
  }

  function phaseFromRect(el){
    const r=el.getBoundingClientRect();
    const vh=innerHeight||document.documentElement.clientHeight;
    if(r.bottom<vh*.08)return 'past';
    if(r.top>vh*.92)return 'future';
    return 'present';
  }

  function observeTargets(targets,observer){
    targets.forEach(el=>{
      if(el.dataset.motionObserved)return;
      el.dataset.motionObserved='1';
      setPhase(el,phaseFromRect(el));
      observer.observe(el);
    });
  }

  function init(){
    document.documentElement.classList.add('motion-safe-ready');
    classify();

    if(reduce){
      motionTargets().forEach(el=>setPhase(el,'present'));
      return;
    }

    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        const el=entry.target;
        if(entry.isIntersecting){setPhase(el,'present');return;}
        const r=el.getBoundingClientRect();
        setPhase(el,r.bottom<innerHeight*.18?'past':'future');
      });
    },{rootMargin:'-6% 0px -10% 0px',threshold:[0,.08,.24]});

    observeTargets(motionTargets(),observer);

    let timer=0;
    const mo=new MutationObserver(mutations=>{
      const meaningful=mutations.some(m=>[...m.addedNodes].some(n=>n.nodeType===1));
      if(!meaningful)return;
      clearTimeout(timer);
      timer=setTimeout(()=>{
        classify();
        observeTargets(motionTargets(),observer);
      },100);
    });
    mo.observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();