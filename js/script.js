/**
 * FOUNDRY PRINT AND PROMO — script.js  FINAL v4
 *
 * 1. Dynamic copyright year
 * 2. Header scroll state
 * 3. Mobile nav (open/close/escape/outside-click/resize)
 * 4. Smooth scroll with header offset
 * 5. Active nav link highlighting (IntersectionObserver)
 * 6. Scroll-triggered entrance animations (prefers-reduced-motion aware)
 */

(function () {
  'use strict';

  /* --------------------------------------------------
     1. YEAR
  -------------------------------------------------- */
  var yr = document.getElementById('current-year');
  if (yr) yr.textContent = new Date().getFullYear();


  /* --------------------------------------------------
     2. HEADER SCROLL STATE
  -------------------------------------------------- */
  var header = document.getElementById('site-header');

  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* --------------------------------------------------
     3. MOBILE NAV
  -------------------------------------------------- */
  var btn = document.getElementById('mobile-btn');
  var nav = document.getElementById('mobile-nav');

  function openNav() {
    if (!btn || !nav) return;
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close navigation menu');
    nav.classList.add('open');
    nav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    if (!btn || !nav) return;
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation menu');
    nav.classList.remove('open');
    nav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (btn) {
    btn.addEventListener('click', function () {
      btn.classList.contains('open') ? closeNav() : openNav();
    });
  }

  document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(function (el) {
    el.addEventListener('click', closeNav);
  });

  document.addEventListener('click', function (e) {
    if (nav && nav.classList.contains('open') &&
        !nav.contains(e.target) && btn && !btn.contains(e.target)) {
      closeNav();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('open')) {
      closeNav();
      if (btn) btn.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024) closeNav();
  });


  /* --------------------------------------------------
     4. SMOOTH SCROLL WITH HEADER OFFSET
  -------------------------------------------------- */
  function headerH() {
    return parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10
    ) || 76;
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');

      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      var top = target.getBoundingClientRect().top + window.scrollY - headerH() - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });

      if (history.pushState) history.pushState(null, '', href);
    });
  });


  /* --------------------------------------------------
     5. ACTIVE NAV LINK HIGHLIGHTING
  -------------------------------------------------- */
  var sections = document.querySelectorAll('section[id]');
  var links    = document.querySelectorAll('.nav-link');

  if (sections.length && links.length && 'IntersectionObserver' in window) {
    var activeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          links.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-38% 0px -52% 0px', threshold: 0 });

    sections.forEach(function (s) { activeObs.observe(s); });
  }


  /* --------------------------------------------------
     6. SCROLL-TRIGGERED ANIMATIONS
     Respects prefers-reduced-motion.
  -------------------------------------------------- */
  var reducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var revealEls = document.querySelectorAll('.reveal, .reveal-grid');

  if (reducedMotion) {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  } else if ('IntersectionObserver' in window) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revObs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

    revealEls.forEach(function (el) { revObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

})();
