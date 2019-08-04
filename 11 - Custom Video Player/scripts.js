const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
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

video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
video.addEventListener("play", toggleButton);
video.addEventListener("pause", toggleButton);
