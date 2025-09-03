var arr = [
  {
    songName: "Euphoria",
    url: "./Songs/euphoria.mp3",
    img: "./Images/1.jpg",
    duration: "00:28",
  },
  {
    songName: "Going SVT",
    url: "./Songs/Going SVT.mp3",
    img: "./Images/2.jpeg",
    duration: "00:15",
  },
  {
    songName: "Fake Love",
    url: "./Songs/Fake Love.mp3",
    img: "./Images/3.jpeg",
    duration: "00:23",
  },
  {
    songName: "Drive You Insane",
    url: "./Songs/Drive You Insane.mp3",
    img: "./Images/4.jpeg",
    duration: "00:24",
  },
  {
    songName: "One Day",
    url: "./Songs/One Day.mp3",
    img: "./Images/5.jpeg",
    duration: "00:24",
  },
  {
    songName: "Like I Do",
    url: "./Songs/love u like i do.mp3",
    img: "./Images/6.jpeg",
    duration: "00:21",
  },
  {
    songName: "Under the Influence",
    url: "./Songs/Under the Influence.m4a",
    img: "./Images/7.jpeg",
    duration: "00:32",
  },
  {
    songName: "Darari",
    url: "./Songs/DARARI.mp3",
    img: "./Images/8.jpeg",
    duration: "00:25",
  },
  {
    songName: "Let Me Love You",
    url: "./Songs/Let Me Love You.mp3",
    img: "./Images/9.jpeg",
    duration: "00:42",
  },
  {
    songName: "Crazy",
    url: "./Songs/Crazy.mp3",
    img: "./Images/10.jpeg",
    duration: "00:36",
  },
  {
    songName: "What Makes You Beautiful",
    url: "./Songs/What Makes You Beautiful.mp3",
    img: "./Images/11.jpeg",
    duration: "00:50",
  },
  {
    songName: "Left & Right",
    url: "./Songs/Left & Right.mp3",
    img: "./Images/12.jpeg",
    duration: "00:28",
  },
  {
    songName: "The Weekend",
    url: "./Songs/The Weekend.mp3",
    img: "./Images/13.jpeg",
    duration: "00:31",
  },
  {
    songName: "PTD_BTS",
    url: "./Songs/PTD_BTS.mp4",
    img: "./Images/14.jpeg",
    duration: "00:55",
  },
  {
    songName: "Closer",
    url: "./Songs/Closer.mp3",
    img: "./Images/15.jpeg",
    duration: "00:47",
  },
  {
    songName: "We Don't Talk Anymore",
    url: "./Songs/JK.mp3",
    img: "./Images/16.jpeg",
    duration: "00:33",
  },
];

//to iterate all of the song i would be needing to use for each loop i can say that for each loop is specially for iterating array

var allSongs = document.querySelector("#all_songs");

var poster = document.querySelector(".left");

var audio = new Audio();

var slectedSong = 0;

//slecting the play-pause functions

var backwar = document.querySelector("#backward");
var play = document.querySelector("#play");
var forward = document.querySelector("#forward");

function mainFunction() {
  var clutter = "";
  arr.forEach(function (elem, index) {
    clutter += `<div class="items" id=${index}>
    <div class="left_side">
        <img src=${elem.img} alt="">
        <h4>${elem.songName}</h4>
    </div>
        <div class="rigth_side">
        <p>${elem.duration}</p>
    </div>
</div>`;
  });

  //show the data to the web page , to do that i have to use DOM
  allSongs.innerHTML = clutter;

  if (audio.src !== arr[slectedSong].url) {
    audio.src = arr[slectedSong].url;
  }
  poster.style.backgroundImage = `url(${arr[slectedSong].img})`;
}
mainFunction();

//adding eventlistner
allSongs.addEventListener("click", function (dets) {
  // slectedSong = dets.target.id;
  const clickedItem = dets.target.closest(".items");
  if (!clickedItem) return; // agar .items ke andar click nahi hai toh ignore

  slectedSong = clickedItem.id;
  play.innerHTML = `<img src="Images/pause-line.png" alt="">`;
  flag = 1;
  mainFunction();
  audio.play();
});

//adding eventlistener to play
var flag = 0;
play.addEventListener("click", function () {
  if (flag == 0) {
    play.innerHTML = `<img src="Images/pause-line.png" alt="">`;
    // mainFunction()
    audio.play();
    flag = 1;
  } else {
    play.innerHTML = `<img src="Images/play-large-fill.png" alt="">`;
    flag = 0;
    // mainFunction()
    audio.pause();
  }
});

forward.addEventListener("click", function () {
  forward.style.opacity = 1;
  backwar.style.opacity = 1;

  if (slectedSong < arr.length - 1) {
    slectedSong++;
    mainFunction();
    audio.play();

    play.innerHTML = `<img src="Images/pause-line.png" alt="">`;
    flag = 1;

    if (slectedSong === arr.length - 1) {
      forward.style.opacity = 0.4;
    }
  } else {
    forward.style.opacity = 0.4;
  }
});

backwar.addEventListener("click", function () {
  forward.style.opacity = 1;
  backwar.style.opacity = 1;

  if (slectedSong > 0) {
    slectedSong--;
    mainFunction();
    audio.play();

    // Force update play icon to pause
    play.innerHTML = `<img src="Images/pause-line.png" alt="">`;
    flag = 1;

    // If now at first song → dim backward
    if (slectedSong === 0) {
      backwar.style.opacity = 0.4;
    }
  } else {
    backwar.style.opacity = 0.4;
  }
});

// footer
document.querySelectorAll(".footer > h3").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 150);
  });
});

//👽
// CIRCULAR VISUALIZER SETUP ----------
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

let audioCtx, analyser, sourceNode, bufferLength, dataArray;
let animationId = null;

function initVisualizer() {
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512; // try 256 or 512 (256 => smoother, fewer bars)
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    // create source only once
    sourceNode = audioCtx.createMediaElementSource(audio);
    sourceNode.connect(analyser);
    analyser.connect(audioCtx.destination);
  } catch (err) {
    console.error("Web Audio API error:", err);
    return;
  }

  // ensuring canvas matches container and is crisp (dpr)
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // mobile unlock: resume audio context on first user interaction
  function unlock() {
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    document.removeEventListener("touchstart", unlock);
    document.removeEventListener("click", unlock);
  }
  document.addEventListener("touchstart", unlock, { passive: true });
  document.addEventListener("click", unlock, { once: true });

  // start/stop drawing with audio playback
  audio.addEventListener("play", () => {
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    if (!animationId) draw();
  });
  audio.addEventListener("pause", () => stopDrawing());
  audio.addEventListener("ended", () => stopDrawing());
}

// Resize canvas to match CSS size and use devicePixelRatio for sharp lines
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  // Mak2 drawing coordinates use CSS pixels (so we can use easy values)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawIdle(); // draw ring when idle/resized
}

function stopDrawing() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  drawIdle();
}

// draw faint central ring when not playing (or on pause)
function drawIdle() {
  // clear with transparent so poster shows through
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.width / dpr;
  const cssH = canvas.height / dpr;
  ctx.clearRect(0, 0, cssW, cssH);

  const cx = cssW / 2;
  const cy = cssH / 2;
  const radius = Math.min(cx, cy) * 0.32;

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.12)"; // faint ring
  ctx.lineWidth = 2;
  ctx.stroke();
}

// main draw loop (circular bars)
function draw() {
  animationId = requestAnimationFrame(draw);
  analyser.getByteFrequencyData(dataArray);

  const dpr = window.devicePixelRatio || 1;
  const width = canvas.width / dpr;
  const height = canvas.height / dpr;

  // clear canvas
  ctx.clearRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const baseRadius = Math.min(cx, cy) * 0.32; // inner transparent radius
  const maxBar = Math.min(cx, cy) * 0.55; // maximum outward length

  // create full 360° bars
  const bars = bufferLength; // double to make full circle
  const spacing = 1.8; // 90% circle, 10% gap
  const angleStep = (Math.PI * 2 * spacing) / bars;

  for (let i = 0; i < bars; i++) {
    const value = dataArray[i % bufferLength]; // repeat array to fill 360°
    const percent = value / 255;
    const barLen = percent * maxBar;

    const angle = i * angleStep;
    const x1 = cx + Math.cos(angle) * baseRadius;
    const y1 = cy + Math.sin(angle) * baseRadius;
    const x2 = cx + Math.cos(angle) * (baseRadius + barLen);
    const y2 = cy + Math.sin(angle) * (baseRadius + barLen);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    const alpha = 0.2 + percent * 0.4; // 0.1 - 0.5
    // 0.25 - 1
    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    ctx.lineWidth = Math.max(1, percent * 3);
    ctx.stroke();
  }

  // draw faint ring outline
  ctx.beginPath();
  ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// initialize visualizer (once)
initVisualizer();
