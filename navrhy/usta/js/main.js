// Usťa s.r.o. — termokamera, počítadla, reference, aktivní položka menu
(function () {
  var motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Teplota v hledáčku jemně kolísá
  var tempEl = document.querySelector('[data-temp]');
  if (tempEl && motionOk) {
    setInterval(function () {
      var t = 55.2 + (Math.random() - 0.5) * 0.6;
      tempEl.textContent = t.toFixed(1).replace('.', ',');
    }, 1500);
  }

  if (!motionOk || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js-anim');

  function countUp(el) {
    var target = +el.dataset.count;
    var start = performance.now();
    var dur = 1600;
    function step(now) {
      var x = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - x, 3))) + '+';
      if (x < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('[data-count]');
  counters.forEach(function (el) { el.textContent = '0+'; });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      if (e.target.classList.contains('stats')) counters.forEach(countUp);
      else e.target.classList.add('on');
      io.unobserve(e.target);
    });
  }, { threshold: 0.35 });
  io.observe(document.querySelector('.stats'));
  io.observe(document.querySelector('.ref-table'));

  // Aktivní sekce v menu
  var links = document.querySelectorAll('.main-nav a');
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) {
        if (a.getAttribute('href') === '#' + e.target.id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['servis', 'kotelny', 'reference', 'onas', 'kontakt'].forEach(function (id) {
    var s = document.getElementById(id);
    if (s) spy.observe(s);
  });
})();
