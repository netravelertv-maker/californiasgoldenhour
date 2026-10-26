(function(){
  var figs=[].slice.call(document.querySelectorAll('.grid .g')),lb=document.getElementById('lb'),
      img=lb.querySelector('.lb-img'),t=lb.querySelector('.lb-cap strong'),l=lb.querySelector('.lb-cap span'),
      c=lb.querySelector('.lb-count'),i=0,last=null,x0=null,y0=null;
  function show(n){i=(n+figs.length)%figs.length;var f=figs[i],im=f.querySelector('img');
    img.src=im.getAttribute('src');img.alt=im.alt;t.textContent=f.querySelector('strong').textContent;
    l.textContent=f.querySelector('figcaption span').textContent;c.textContent=(i+1)+' / '+figs.length;
    [i+1,i-1].forEach(function(k){var p=new Image();p.src=figs[(k+figs.length)%figs.length].querySelector('img').getAttribute('src');});}
  function open(n){last=document.activeElement;show(n);lb.hidden=false;document.documentElement.style.overflow='hidden';lb.querySelector('.lb-close').focus();}
  function close(){lb.hidden=true;document.documentElement.style.overflow='';if(last)last.focus();}
  figs.forEach(function(f,n){f.addEventListener('click',function(){open(n);});
    f.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(n);}});});
  lb.querySelector('.lb-close').onclick=close;
  lb.querySelector('.lb-prev').onclick=function(e){e.stopPropagation();show(i-1);};
  lb.querySelector('.lb-next').onclick=function(e){e.stopPropagation();show(i+1);};
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('lb-fig'))close();});
  document.addEventListener('keydown',function(e){if(lb.hidden)return;
    if(e.key==='Escape')close();else if(e.key==='ArrowRight')show(i+1);else if(e.key==='ArrowLeft')show(i-1);});
  lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;y0=e.touches[0].clientY;},{passive:true});
  lb.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;
    if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy))show(dx<0?i+1:i-1);else if(dy>90)close();x0=null;});
})();
