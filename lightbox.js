(function(){
  const works = [];
  let current = 0;

  function extractBg(el){
    if(!el) return '';
    return (el.style.backgroundImage||'').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
  }

  function init(){
    document.querySelectorAll('.work-item').forEach((item, i) => {
      let images;
      if(item.dataset.images){
        images = JSON.parse(item.dataset.images);
      } else {
        const src = extractBg(item.querySelector('.work-thumb'));
        images = src ? [src] : [];
      }
      const title = item.querySelector('.work-title')?.textContent || '';
      const mats  = item.querySelector('.work-materials')?.textContent || '';
      let videos = [];
      if(item.dataset.videos){
        videos = JSON.parse(item.dataset.videos);
      } else if(item.dataset.video){
        videos = [item.dataset.video];
      }
      const longdesc = item.dataset.longdesc || '';
      works.push({ images, title, mats, videos, longdesc });
      if(images.length || videos.length) item.addEventListener('click', () => show(i));
    });
  }

  function show(i){
    current = i;
    render();
    document.getElementById('lb').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close(){
    document.getElementById('lb-images').innerHTML = '';
    document.getElementById('lb').classList.remove('open');
    document.body.style.overflow = '';
  }

  function prev(){ current = (current - 1 + works.length) % works.length; render(); }
  function next(){ current = (current + 1) % works.length; render(); }

  function render(){
    const w = works[current];
    const container = document.getElementById('lb-images');
    const imgHtml = w.images.map(src =>
      '<img src="' + src + '" alt="' + w.title + '" class="lb-scroll-img">'
    ).join('');
    const videoHtml = w.videos.map(id =>
      '<div class="lb-video-wrap"><iframe class="lb-video" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe></div>'
    ).join('');
    container.innerHTML = imgHtml + videoHtml;
    document.getElementById('lb-scroll').scrollTop = 0;
    document.getElementById('lb-title').textContent = w.title;
    document.getElementById('lb-mats').textContent = w.mats;
    var descEl = document.getElementById('lb-longdesc');
    if(descEl){
      if(w.longdesc){
        descEl.innerHTML = w.longdesc.split('|').map(function(p){ return '<p>' + p + '</p>'; }).join('');
        descEl.style.display = '';
      } else {
        descEl.innerHTML = '';
        descEl.style.display = 'none';
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    init();
    document.getElementById('lb').addEventListener('click', function(e){
      if(e.target === this) close();
    });
  });

  document.addEventListener('keydown', function(e){
    var overlay = document.getElementById('lb');
    if(!overlay || !overlay.classList.contains('open')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft') prev();
    if(e.key === 'ArrowRight') next();
  });

  window.lbClose = close;
  window.lbPrev  = prev;
  window.lbNext  = next;
})();
