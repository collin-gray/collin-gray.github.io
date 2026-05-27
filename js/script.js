/**
 * FOUNDRY PRINT AND PROMO — script.js  v5
 *
 * 1. Dynamic copyright year
 * 2. Header scroll state
 * 3. Mobile nav toggle (open/close/Escape/outside-click/resize)
 * 4. Smooth scroll with header offset
 * 5. Active nav link highlighting
 * 6. Scroll-triggered entrance animations (prefers-reduced-motion aware)
 * 7. Mobile sticky bar auto-hide after hero passes viewport
 */

(function () {
  'use strict';

  /* 1. YEAR */
  var yr = document.getElementById('current-year');
  if (yr) yr.textContent = new Date().getFullYear();


  /* 2. HEADER SCROLL STATE */
  var header = document.getElementById('site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);
    updateStickyBar();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* 3. MOBILE NAV */
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
  if (btn) btn.addEventListener('click', function () {
    btn.classList.contains('open') ? closeNav() : openNav();
  });
  document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(function (el) {
    el.addEventListener('click', closeNav);
  });
  document.addEventListener('click', function (e) {
    if (nav && nav.classList.contains('open') && btn &&
        !nav.contains(e.target) && !btn.contains(e.target)) closeNav();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('open')) {
      closeNav(); if (btn) btn.focus();
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024) closeNav();
  });


  /* 4. SMOOTH SCROLL */
  function headerH() {
    return parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--hdr-h'), 10
    ) || 76;
  }
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' }); return;
      }
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - headerH() - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
      if (history.pushState) history.pushState(null, '', href);
    });
  });


  /* 5. ACTIVE NAV LINKS */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var activeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-38% 0px -52% 0px', threshold: 0 });
    sections.forEach(function (s) { activeObs.observe(s); });
  }


  /* 6. SCROLL ANIMATIONS */
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


  /* 7. MOBILE STICKY BAR — hide while hero is in view (optional UX) */
  var stickyBar = document.getElementById('mobile-sticky-bar');
  var heroSec   = document.getElementById('hero');

  function updateStickyBar() {
    if (!stickyBar || !heroSec) return;
    var heroBottom = heroSec.getBoundingClientRect().bottom;
    // Show the bar once the hero has scrolled out of view
    if (heroBottom <= 0) {
      stickyBar.style.transform = 'translateY(0)';
      stickyBar.style.opacity   = '1';
    } else {
      stickyBar.style.transform = 'translateY(100%)';
      stickyBar.style.opacity   = '0';
    }
  }

  // Initialize sticky bar hidden, then reveal via scroll
  if (stickyBar) {
    stickyBar.style.transform  = 'translateY(100%)';
    stickyBar.style.opacity    = '0';
    stickyBar.style.transition = 'transform 300ms ease, opacity 300ms ease';
  }
  updateStickyBar();

})();
