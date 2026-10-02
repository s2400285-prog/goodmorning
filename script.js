const music = document.getElementById("music");
const cd = document.getElementById("cd");
const playButton = document.getElementById("playButton");

const progress = document.getElementById("progress");

const currentTimeText = document.getElementById("currentTime");
const durationText = document.getElementById("duration");

const volume = document.getElementById("volume");

const lyrics = document.getElementById("lyrics");

// Original messages shown while music plays

const messages = [
  "Good morning, beautiful. ❤️",

  "I hope today gives you a reason to smile. 🌷",

  "Take your time today. You don't have to rush everything. ☀️",

  "Please remember to take care of yourself. 💗",

  "Whatever happens today, keep going. You can do this. 🌸",

  "Someone is wishing you happiness today. ❤️",

  "May your day be peaceful, successful, and full of little joys. ✨",

  "And if today becomes difficult, remember that tomorrow is another chance. 🌅",
];

let messageIndex = 0;

// Play / Pause

function toggleMusic() {
  if (music.paused) {
    music.play();

    cd.classList.add("playing");

    playButton.innerHTML = "⏸️";

    changeMessage();
  } else {
    music.pause();

    cd.classList.remove("playing");

    playButton.innerHTML = "▶️";
  }
}

// Change message

function changeMessage() {
  lyrics.style.animation = "none";

  void lyrics.offsetWidth;

  lyrics.style.animation = "lyricFade 0.6s ease";

  lyrics.innerHTML = messages[messageIndex];

  messageIndex++;

  if (messageIndex >= messages.length) {
    messageIndex = 0;
  }
}

// Change message every 8 seconds

setInterval(function () {
  if (!music.paused) {
    changeMessage();
  }
}, 8000);

// Update progress

music.addEventListener("timeupdate", function () {
  if (music.duration) {
    const percentage = (music.currentTime / music.duration) * 100;

    progress.value = percentage;

    currentTimeText.innerHTML = formatTime(music.currentTime);
  }
});

// Show duration

music.addEventListener("loadedmetadata", function () {
  durationText.innerHTML = formatTime(music.duration);
});

// Click progress bar

progress.addEventListener("input", function () {
  if (music.duration) {
    music.currentTime = (progress.value / 100) * music.duration;
  }
});

// Volume

volume.addEventListener("input", function () {
  music.volume = volume.value;
});

// Format time

function formatTime(seconds) {
  if (isNaN(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = Math.floor(seconds % 60);

  return (
    minutes +
    ":" +
    (remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds)
  );
}

// Previous button

function previousSong() {
  music.currentTime = 0;
}

// Next button

function nextSong() {
  music.currentTime = 0;

  changeMessage();
}

// When song ends

music.addEventListener("ended", function () {
  cd.classList.remove("playing");

  playButton.innerHTML = "▶️";
});
