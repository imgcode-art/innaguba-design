// Palette preview: ?theme=warm shows the earlier walnut palette
if (/[?&]theme=warm\b/.test(location.search)) document.documentElement.setAttribute('data-theme', 'warm');

// Anchor jumps land exactly under the sticky header, so the previous section's
// divider hides behind the header line instead of showing as a second line.
(function () {
  var head = document.querySelector('.site-head');
  if (!head) return;
  function set() { document.documentElement.style.setProperty('--head-h', head.offsetHeight + 'px'); }
  set();
  window.addEventListener('resize', set);
})();

// Reveal sections as they scroll into view. Items that enter together
// (e.g. three service columns) get a short stagger so they appear one by one.
(function () {
  var items = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    var batch = entries.filter(function (e) { return e.isIntersecting; });
    batch.forEach(function (e, i) {
      e.target.style.transitionDelay = (i * 120) + 'ms';
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
  items.forEach(function (el) { io.observe(el); });
})();

// Headline: the last word slowly changes (properly, with care, honestly).
// Skipped for people who prefer reduced motion; screen readers get the full sentence from aria-label.
(function () {
  var el = document.querySelector('.rotator');
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var words = el.getAttribute('data-words').split('|');
  var i = 0;
  setInterval(function () {
    el.classList.add('is-out');
    setTimeout(function () {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.classList.remove('is-out');
    }, 450);
  }, 3200);
})();

// Phone menu: open/close, close on link tap or Escape.
(function () {
  var btn = document.querySelector('.menu-btn');
  if (!btn) return;
  var root = document.documentElement;
  function set(open) {
    root.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  btn.addEventListener('click', function () { set(!root.classList.contains('menu-open')); });
  document.querySelectorAll('#site-nav a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
})();

// Silent video loops play only while on screen; reduced motion gets controls instead.
(function () {
  var vids = document.querySelectorAll('video.loop');
  if (!vids.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    vids.forEach(function (v) { v.controls = true; });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { var p = e.target.play(); if (p) p.catch(function () {}); }
      else e.target.pause();
    });
  }, { threshold: 0.4 });
  vids.forEach(function (v) { io.observe(v); });
})();
