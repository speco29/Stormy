document.querySelectorAll('#playlist li').forEach(item => {
  item.addEventListener('click', () => {
    const song = item.getAttribute('data-src');
    localStorage.setItem('currentSong', song);
    window.location.href = 'player.html';
  });
});

document.getElementById('minimize').addEventListener('click', () => {
  window.electronAPI.minimize();
});

document.getElementById('close').addEventListener('click', () => {
  window.electronAPI.close();
});
