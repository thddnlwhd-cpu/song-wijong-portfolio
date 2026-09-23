document.querySelectorAll('.commerce-play').forEach(button => {
  button.addEventListener('click', () => {
    const video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'none';
    video.poster = button.querySelector('img').src;
    video.src = button.dataset.video;
    video.setAttribute('aria-label', button.getAttribute('aria-label'));
    video.addEventListener('play', () => {
      document.querySelectorAll('.commerce-item video').forEach(other => {
        if(other !== video) other.pause();
      });
    });
    video.addEventListener('error', () => {
      const message = document.createElement('p');
      message.className = 'commerce-error';
      message.textContent = '영상을 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.';
      video.replaceWith(message);
    }, {once:true});
    button.replaceWith(video);
    video.focus();
    video.play().catch(() => { /* Native controls allow retrying playback. */ });
  });
});
