const fireflyStage = document.querySelector('.home .reel-stage');
if (fireflyStage) {
  const pointerMedia = matchMedia('(hover: hover) and (pointer: fine)');
  const firefly = document.createElement('span');
  firefly.className = 'firefly-cursor';
  firefly.setAttribute('aria-hidden', 'true');
  document.body.append(firefly);
  const hideFirefly = () => {
    firefly.classList.remove('active');
    fireflyStage.classList.remove('firefly-active');
  };
  fireflyStage.addEventListener('pointermove', event => {
    if (!pointerMedia.matches || event.pointerType === 'touch' || document.documentElement.classList.contains('light')) {
      hideFirefly(); return;
    }
    firefly.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    firefly.classList.add('active');
    fireflyStage.classList.add('firefly-active');
  });
  fireflyStage.addEventListener('pointerleave', hideFirefly);
  window.addEventListener('blur', hideFirefly);
  window.addEventListener('scroll', hideFirefly, {passive:true});
  document.addEventListener('visibilitychange', hideFirefly);
  document.querySelector('.theme-toggle')?.addEventListener('click', hideFirefly);
  pointerMedia.addEventListener('change', hideFirefly);
}
