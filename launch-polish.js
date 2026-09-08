(function(){
  function addHead(){
    const head=document.head;
    const add=(tag,attrs)=>{const key=attrs.rel?`${tag}[rel="${attrs.rel}"]`:attrs.name?`${tag}[name="${attrs.name}"]`:attrs.property?`${tag}[property="${attrs.property}"]`:null;if(key&&head.querySelector(key))return;const el=document.createElement(tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));head.appendChild(el)};
    add('link',{rel:'icon',href:'assets/jarvis-sigil.svg',type:'image/svg+xml'});
    add('link',{rel:'manifest',href:'site.webmanifest'});
    add('meta',{name:'application-name',content:'Jarvis OS'});
    add('meta',{name:'color-scheme',content:'dark'});
    add('meta',{name:'mobile-web-app-capable',content:'yes'});
    add('meta',{name:'apple-mobile-web-app-title',content:'Jarvis OS'});
    add('meta',{property:'og:title',content:'Jarvis OS — Intelligence that lives with you.'});
    add('meta',{property:'og:description',content:'A cinematic build-in-public product experience for a context-first personal AI operating layer.'});
    add('meta',{property:'og:type',content:'website'});
    add('meta',{property:'og:image',content:new URL('assets/jarvis-social-card.svg',location.href).href});
    add('meta',{name:'twitter:card',content:'summary_large_image'});
  }
  function addSkip(){if(document.querySelector('.skip-link'))return;const a=document.createElement('a');a.className='skip-link';a.href='#top';a.textContent='Skip to main experience';document.body.prepend(a)}
  function externalLinks(){document.querySelectorAll('a[target="_blank"]').forEach(a=>{if(!a.rel.includes('noopener'))a.rel=`${a.rel} noopener`.trim()})}
  function lazySections(){if(!('IntersectionObserver'in window))return;const sections=[...document.querySelectorAll('section')].filter(s=>!s.classList.contains('hero')&&!s.classList.contains('inside-jarvis'));const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('section-near');obs.unobserve(e.target)}}),{rootMargin:'700px 0px'});sections.forEach(s=>obs.observe(s))}
  function init(){addHead();addSkip();externalLinks();lazySections()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();