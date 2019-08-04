const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
const fullscreen = document.querySelector(".fullscreen");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const toggle = document.querySelector(".toggle");
const skip = document.querySelectorAll("[data-skip]");
const range = document.querySelectorAll(".player__slider");

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
  //   video.paused ? video.play() : video.pause();
}

function toggleButton() {
  const icon = video.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skipVideo() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function updateRange() {
  video[this.name] = this.value;
}

function updateProgress(e) {
  const scrub = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrub;
}

function progressSlider() {
  const slider = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${slider}%`;
}

function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    player.webkitRequestFullscreen();
  }
}

video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
video.addEventListener("play", toggleButton);
video.addEventListener("pause", toggleButton);

skip.forEach(button => {
  button.addEventListener("click", skipVideo);
});

range.forEach(value => {
  value.addEventListener("change", updateRange);
});

video.addEventListener("timeupdate", progressSlider);

let mouseDown = false;
progress.addEventListener("click", updateProgress);
progress.addEventListener("mousemove", e => {
  mouseDown && updateProgress(e);
});
progress.addEventListener("mousedown", () => {
  mouseDown = true;
});
progress.addEventListener("mouseup", () => {
  mouseDown = false;
});

fullscreen.addEventListener("click", toggleFullScreen);
