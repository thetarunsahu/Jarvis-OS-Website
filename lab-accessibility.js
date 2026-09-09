/* Focus containment for the preserved lab panels; initialization runs after all lab modules. */
(() => {
  const focusable = 'button:not([disabled]),a[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';
  function init() {
    const input = document.querySelector('[data-command-input]');
    if (input) { input.setAttribute('aria-label','Give Jarvis a goal for the simulated command demo'); input.maxLength=400; }
    const response = document.querySelector('[data-response-text]');
    if (response) response.setAttribute('aria-live','polite');
    const panels = [
      ['[data-command-center]','Jarvis command demo','[data-command-input]'],
      ['[data-menu]','Lab navigation','[data-menu-close]']
    ];
    panels.forEach(([selector,label,initial]) => {
      const panel=document.querySelector(selector); if(!panel)return;
      panel.setAttribute('role','dialog'); panel.setAttribute('aria-label',label); panel.setAttribute('aria-modal','true');
      let before=null,wasOpen=false;
      const update=()=>{
        const open=panel.classList.contains('open');
        panel.inert=!open;
        if(open&&!wasOpen){before=document.activeElement;panel.querySelector(initial)?.focus();}
        if(!open&&wasOpen&&before?.isConnected)before.focus({preventScroll:true});
        wasOpen=open;
      };
      new MutationObserver(update).observe(panel,{attributes:true,attributeFilter:['class']}); update();
      panel.addEventListener('keydown',event=>{
        if(event.key!=='Tab'||!panel.classList.contains('open'))return;
        const items=[...panel.querySelectorAll(focusable)].filter(x=>!x.closest('[aria-hidden="true"]')&&x.getClientRects().length);
        if(!items.length)return;
        const first=items[0],last=items[items.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      });
    });
    // Resolve direct links only after the deferred lab modules have inserted their sections.
    if(location.hash){
      const id=decodeURIComponent(location.hash.slice(1));
      document.getElementById(id)?.scrollIntoView({behavior:'auto',block:'start'});
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

