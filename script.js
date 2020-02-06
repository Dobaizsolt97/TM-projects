const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

//song titles
const songs = [
  "Highest in the room",
  "White Iverson",
  "Blinding Lights",
  "Where ya at"
];
// keep track of song
let songInedex = 0;
//initialy load song details into dom
loadSong(songs[songInedex]);

//update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `./music/${song}.mp3`;
  cover.src = `./images/${song}.jpg`;
}

//playsong
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  progress.style.background = "slateblue";
  audio.play();
}
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  progress.style.background = "transparent";

  audio.pause();
}
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;
}
//set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

//event listners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// change song
prevBtn.addEventListener("click", () => {
  songInedex = songInedex - 1;
  if (songInedex < 0) {
    songInedex = songs.length - 1;
    loadSong(songs[songInedex]);
    playSong();
  } else {
    loadSong(songs[songInedex]);
    playSong();
  }
});
// playing the next song
nextBtn.addEventListener("click", () => {
  songInedex = songInedex + 1;
  if (songInedex > songs.length - 1) {
    songInedex = 0;
    loadSong(songs[songInedex]);
    playSong();
  } else {
    loadSong(songs[songInedex]);
    playSong();
  }
});

// time song update event
audio.addEventListener("timeupdate", updateProgress);
// click on progress barr
progressContainer.addEventListener("click", setProgress);

//song ends
audio.addEventListener("ended", () => {
  songInedex = songInedex + 1;
  if (songInedex > songs.length - 1) {
    songInedex = 0;
    loadSong(songs[songInedex]);
    playSong();
  } else {
    loadSong(songs[songInedex]);
    playSong();
  }
});
