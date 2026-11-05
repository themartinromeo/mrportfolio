const video = document.querySelector('.hero-video');
const button = document.querySelector('.motion');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function syncButton() {
  button.textContent = video.paused ? button.dataset.play : button.dataset.pause;
}
function play() {
  if (!video.src) video.src = video.dataset.src;
  video.play().catch(syncButton);
}
video.addEventListener('play', syncButton);
video.addEventListener('pause', syncButton);
button.addEventListener('click', () => video.paused ? play() : video.pause());
reducedMotion.addEventListener('change', ({ matches }) => {
  if (matches) video.pause();
});
syncButton();
button.hidden = false;
if (!reducedMotion.matches) play();
