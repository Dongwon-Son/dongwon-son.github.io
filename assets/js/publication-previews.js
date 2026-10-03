/* Muted GIF-like loops. No video URL is attached until the preview is visible. */
(function () {
  'use strict';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const players = Array.from(document.querySelectorAll('.preview-player')).map(function (box) {
    return { box: box, video: box.querySelector('video'), button: box.querySelector('button'), visible: false, userPaused: false, manual: false, failed: false };
  });
  function update(player) {
    const video = player.video;
    const canPlay = player.visible && !document.hidden && !player.userPaused && !player.failed &&
      (player.manual || (!motion.matches && !(connection && connection.saveData)));
    if (canPlay) {
      if (!video.getAttribute('src')) { video.src = video.dataset.src; video.muted = true; video.load(); }
      video.play().catch(function () { /* Poster and play button remain available. */ });
    } else { video.pause(); }
  }
  players.forEach(function (player) {
    player.button.hidden = false;
    player.button.addEventListener('click', function () {
      player.userPaused = !player.video.paused;
      player.manual = !player.userPaused;
      update(player);
    });
    player.video.addEventListener('playing', function () {
      player.video.classList.add('is-ready');
      player.button.textContent = 'Ⅱ';
      player.button.setAttribute('aria-label', 'Pause preview for ' + player.button.dataset.title);
    });
    player.video.addEventListener('pause', function () {
      player.button.textContent = '▶';
      player.button.setAttribute('aria-label', 'Play preview for ' + player.button.dataset.title);
    });
    player.video.addEventListener('error', function () {
      player.failed = true; player.video.classList.remove('is-ready'); player.button.hidden = true;
    });
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        const player = players.find(function (item) { return item.box === entry.target; });
        player.visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        update(player);
      });
    }, { threshold: [0, 0.25] });
    players.forEach(function (player) { observer.observe(player.box); });
  } else {
    // Keep the static poster unless the visitor explicitly starts a preview.
    players.forEach(function (player) { player.visible = true; });
  }
  function preferencesChanged() {
    players.forEach(function (player) {
      player.manual = false;
      if (motion.matches || (connection && connection.saveData)) {
        player.video.pause(); player.video.classList.remove('is-ready');
        player.video.removeAttribute('src'); player.video.load();
      }
      update(player);
    });
  }
  motion.addEventListener('change', preferencesChanged);
  if (connection && connection.addEventListener) { connection.addEventListener('change', preferencesChanged); }
  document.addEventListener('visibilitychange', function () { players.forEach(update); });
}());
