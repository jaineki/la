// music.ts — Background music player

export function initMusic(
  audio: HTMLAudioElement,
  toggleBtn: HTMLButtonElement,
  widget: HTMLElement,
): void {
  let started = false;
  audio.volume = 0.4;

  function play(): void {
    audio.play().then(() => {
      started = true;
      toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
      widget.classList.remove('paused');
    }).catch(() => { /* autoplay blocked — user must click */ });
  }

  toggleBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (!started) { play(); return; }

    if (audio.paused) {
      audio.play();
      toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
      widget.classList.remove('paused');
    } else {
      audio.pause();
      toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
      widget.classList.add('paused');
    }
  });

  // Start on first body click (autoplay policy)
  document.body.addEventListener('click', () => { if (!started) play(); }, { once: true });
}
