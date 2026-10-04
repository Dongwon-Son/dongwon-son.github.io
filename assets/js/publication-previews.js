/* Muted GIF-like loops. No video URL is attached until the preview is visible. */
(function () {
  'use strict';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const players = Array.from(document.querySelectorAll('.preview-player')).map(function (box) {
    return { box: box, video: box.querySelector('video'), visible: false, focused: false, failed: false };
  });
  function update(player) {
    const video = player.video;
    const canPlay = player.visible && !document.hidden && !player.focused && !player.failed &&
      !motion.matches && !(connection && connection.saveData);
    if (canPlay) {
      if (!video.getAttribute('src')) { video.src = video.dataset.src; video.muted = true; video.load(); }
      video.play().catch(function () { /* Keep the static poster if autoplay is unavailable. */ });
    } else { video.pause(); }
  }
  players.forEach(function (player) {
    // Keep keyboard navigation on the source link and pause motion while it is focused.
    player.box.addEventListener('focusin', function () {
      player.focused = true; update(player);
    });
    player.box.addEventListener('focusout', function (event) {
      player.focused = player.box.contains(event.relatedTarget); update(player);
    });
    player.video.addEventListener('playing', function () {
      player.video.classList.add('is-ready');
    });
    player.video.addEventListener('error', function () {
      player.failed = true; player.video.classList.remove('is-ready');
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
  }
  // Without an intersection observer, retain static posters rather than loading every video.
  function preferencesChanged() {
    players.forEach(function (player) {
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
