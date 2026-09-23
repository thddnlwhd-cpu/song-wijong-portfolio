const savedTheme=localStorage.getItem('portfolio-theme');const prefersLight=window.matchMedia('(prefers-color-scheme: light)').matches;if(savedTheme==='light'||(!savedTheme&&prefersLight))document.documentElement.classList.add('light');
const header=document.querySelector('.top');const themeButton=document.createElement('button');themeButton.className='theme-toggle';themeButton.type='button';themeButton.innerHTML='<svg class="sun-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg><svg class="moon-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.4A8.5 8.5 0 0 1 8.6 3.5a8.5 8.5 0 1 0 11.9 11.9Z"/></svg>';const menuButton=document.querySelector('.menu-btn');header?.insertBefore(themeButton,menuButton);function updateThemeLabel(){const light=document.documentElement.classList.contains('light');themeButton.setAttribute('aria-label',light?'다크 모드로 변경':'라이트 모드로 변경');themeButton.title=light?'다크 모드':'라이트 모드'}updateThemeLabel();themeButton.addEventListener('click',()=>{document.documentElement.classList.toggle('light');localStorage.setItem('portfolio-theme',document.documentElement.classList.contains('light')?'light':'dark');updateThemeLabel()});menuButton?.addEventListener('click',()=>header.classList.toggle('menu-open'));
const notice=document.querySelector('.notice');document.querySelectorAll('[data-pending]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();notice.classList.add('show');setTimeout(()=>notice.classList.remove('show'),1800)}));
const reel = document.querySelector('#reel-video');
// Keep audio from different award films from overlapping.
document.querySelectorAll('.award-film video').forEach(video => {
  video.addEventListener('play', () => {
    document.querySelectorAll('.award-film video').forEach(other => {
      if (other !== video) other.pause();
    });
  });
});
if (reel) {
  const films = ['hana', 'iherb', 'mediheal', 'culture', 'bbusulang'];
  let bag = [], previous = '';
  reel.muted = true;
  reel.controls = false;
  function nextFilm() {
    if (!bag.length) {
      bag = [...films];
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      if (bag[bag.length - 1] === previous) [bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]];
    }
    previous = bag.pop();
    reel.src = 'videos/' + previous + '.mp4';
    reel.load();
    playReel();
  }
  function playReel() {
    reel.play().catch(() => { /* Keep poster visible if autoplay is blocked. */ });
  }
  reel.addEventListener('ended', nextFilm);
  document.addEventListener('visibilitychange', () => { if (document.hidden) reel.pause(); else playReel(); });
  document.addEventListener('pointerdown', () => { if (reel.paused && !document.hidden) playReel(); }, { once: true });
  nextFilm();
}
const viewer=document.querySelector('.viewer');document.querySelectorAll('.project').forEach(p=>p.addEventListener('click',()=>{if(!viewer)return;viewer.querySelector('p').textContent=p.dataset.title;viewer.classList.add('open');document.body.style.overflow='hidden'}));function closeViewer(){viewer?.classList.remove('open');document.body.style.overflow=''}document.querySelector('.viewer-close')?.addEventListener('click',closeViewer);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeViewer()});
