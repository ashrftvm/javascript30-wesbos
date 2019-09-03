const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error("Oh No!! 😔", err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  console.log(width, height);
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    // pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; //Red
    pixels.data[i + 1] = pixels.data[i + 1] - 50; //Green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 150] = pixels.data[i + 0]; //Red
    pixels.data[i + 100] = pixels.data[i + 1]; //Green
    pixels.data[i - 150] = pixels.data[i + 2]; //Blue
  }
  return pixels;
}

function takePhoto() {
  // play sound
  snap.currentTime = 0;
  snap.play();
  //take photo and save it to url and strip
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "handsome");
  link.innerHTML = `<img src="${data}" alt="Handsome 💌"/>`;
  strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
