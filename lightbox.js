(function(){
  const works = [];
  let idx = 0;

  function init(){
    document.querySelectorAll('.work-item').forEach((item, i) => {
      const thumb = item.querySelector('.work-thumb');
      const title = item.querySelector('.work-title')?.textContent || '';
      const mats  = item.querySelector('.work-materials')?.textContent || '';
      const bg    = thumb?.style.backgroundImage || '';
      const src   = bg.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
      works.push({ src, title, mats });
      item.addEventListener('click', () => open(i));
    });
  }

  function open(i){
    idx = i;
    render();
    document.getElementById('lb').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close(){
    document.getElementById('lb').classList.remove('open');
    document.body.style.overflow = '';
  }

  function prev(){ idx = (idx - 1 + works.length) % works.length; render(); }
  function next(){ idx = (idx + 1) % works.length; render(); }

  function render(){
    const w = works[idx];
    const img = document.getElementById('lb-img');
    img.src = w.src;
    img.alt = w.title;
    document.getElementById('lb-title').textContent = w.title;
    document.getElementById('lb-mats').textContent = w.mats;
    document.getElementById('lb-count').textContent = (idx + 1) + ' / ' + works.length;
  }

  document.addEventListener('DOMContentLoaded', () => {
    init();
    document.getElementById('lb').addEventListener('click', function(e){
      if(e.target === this) close();
    });
  });

  document.addEventListener('keydown', function(e){
    if(!document.getElementById('lb').classList.contains('open')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft') prev();
    if(e.key === 'ArrowRight') next();
  });

  window.lbClose = close;
  window.lbPrev  = prev;
  window.lbNext  = next;
})();
