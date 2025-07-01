const playlist = ['song1.mp3', 'song2.mp3', 'song3.mp3','song4.mp3']; // Add your songs here
let currentIndex = playlist.indexOf(localStorage.getItem('currentSong'));

const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const timer = document.getElementById('timer');
const playPauseBtn = document.getElementById('play-pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

document.getElementById('minimize').addEventListener('click', () => {
  window.electronAPI.minimize();
});

document.getElementById('close').addEventListener('click', () => {
  window.electronAPI.close();
});


// Format seconds into MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Load and play a song
function loadSong(index) {
  const song = playlist[index];
  audio.src = `../assets/songs/${song}`;

  cover.src = `../assets/covers/${song.replace(/\.(mp3|mp4)$/, '.jpeg')}`;
  audio.play().catch(err => {
    console.error('Playback error:', err);
  });
  playPauseBtn.textContent = '⏸️';
}

// Update timer every second
setInterval(() => {
  if (!isNaN(audio.duration)) {
    const current = formatTime(audio.currentTime);
    const total = formatTime(audio.duration);
    timer.textContent = `${current} / ${total}`;
  }
}, 1000);

// Play/Pause toggle
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = 'PLAY';
  } else {
    audio.pause();
    playPauseBtn.textContent = 'PAUSE';
  }
});

// Next song
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
});

// Previous song
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentIndex);
});

// Auto-play next song when current ends
audio.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
});

// Initial load
loadSong(currentIndex);
