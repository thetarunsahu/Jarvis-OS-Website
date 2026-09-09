(() => {
  'use strict';
  const canvas = document.getElementById('gateway-canvas');
  const portal = document.getElementById('gateway-portal');
  const enter = document.querySelector('[data-enter-lab]');
  const transition = document.querySelector('[data-gateway-transition]');
  const clock = document.querySelector('[data-gateway-clock]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateClock(){
    if(!clock)return;
    clock.textContent = new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date());
  }
  updateClock(); setInterval(updateClock,1000);

  if(canvas){
    const ctx = canvas.getContext('2d');
    let width=0,height=0,dpr=1,raf=0;
    let pointer={x:0,y:0,tx:0,ty:0};
    const nodes=[];
    const count=reduce?22:58;
    function seed(){
      nodes.length=0;
      for(let i=0;i<count;i++){
        nodes.push({
          a:Math.random()*Math.PI*2,
          r:.16+Math.random()*.44,
          s:(.0007+Math.random()*.0018)*(Math.random()>.5?1:-1),
          z:.35+Math.random()*.65,
          phase:Math.random()*Math.PI*2
        });
      }
    }
    function resize(){
      dpr=Math.min(devicePixelRatio||1,1.5);
      width=innerWidth;height=innerHeight;
      canvas.width=Math.floor(width*dpr);canvas.height=Math.floor(height*dpr);
      canvas.style.width=width+'px';canvas.style.height=height+'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      seed();
    }
    function draw(time){
      raf=requestAnimationFrame(draw);
      ctx.clearRect(0,0,width,height);
      pointer.x+=(pointer.tx-pointer.x)*.035;
      pointer.y+=(pointer.ty-pointer.y)*.035;
      const cx=width*.5+pointer.x*12, cy=height*.44+pointer.y*8;
      const radius=Math.min(width,height)*.44;
      const pts=[];
      for(const n of nodes){
        if(!reduce)n.a+=n.s;
        const wobble=1+Math.sin(time*.00055+n.phase)*.045;
        const x=cx+Math.cos(n.a)*radius*n.r*wobble;
        const y=cy+Math.sin(n.a)*radius*n.r*.62*wobble;
        pts.push({x,y,z:n.z});
      }
      ctx.lineWidth=.65;
      for(let i=0;i<pts.length;i++){
        const a=pts[i];
        for(let j=i+1;j<pts.length;j++){
          const b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);
          if(d<120){
            ctx.strokeStyle=`rgba(145,156,220,${(1-d/120)*.12})`;
            ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
          }
        }
      }
      for(const p of pts){
        ctx.fillStyle=`rgba(190,198,255,${.15+p.z*.5})`;
        ctx.beginPath();ctx.arc(p.x,p.y,1+p.z*1.2,0,Math.PI*2);ctx.fill();
      }
    }
    addEventListener('resize',resize,{passive:true});
    addEventListener('pointermove',event=>{
      pointer.tx=(event.clientX/Math.max(1,width)-.5)*2;
      pointer.ty=(event.clientY/Math.max(1,height)-.5)*2;
      if(portal&&!reduce)portal.style.transform=`translate(-50%,-50%) translate(${pointer.tx*10}px,${pointer.ty*7}px)`;
    },{passive:true});
    resize();raf=requestAnimationFrame(draw);
    addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
  }

  let leaving=false;
  function enterLab(event){
    if(event)event.preventDefault();
    if(leaving)return;
    leaving=true;
    transition?.classList.add('is-active');
    setTimeout(()=>{location.href='lab.html';},reduce?120:820);
  }
  enter?.addEventListener('click',enterLab);
  addEventListener('keydown',event=>{
    if(/input|textarea|select/i.test(document.activeElement?.tagName))return;
    if(event.key==='Enter'||event.key.toLowerCase()==='l'){
      event.preventDefault();enterLab();
    }
    if(event.key==='Escape')location.href='index.html';
  });
})();
