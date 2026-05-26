/**
 * FOUNDRY PRINT AND PROMO — script.js
 *
 * 1. Dynamic copyright year
 * 2. Header scroll state
 * 3. Mobile nav toggle (open / close / Escape / outside click)
 * 4. Smooth scroll for all in-page anchors with header offset
 * 5. Active nav-link highlighting via IntersectionObserver
 * 6. Scroll-triggered entrance animations (.reveal / .reveal-grid)
 */

(function () {
  'use strict';

  /* --------------------------------------------------
     1. DYNAMIC YEAR
  -------------------------------------------------- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* --------------------------------------------------
     2. HEADER SCROLL STATE
     Adds .scrolled class after 12px — CSS darkens bg.
  -------------------------------------------------- */
  const header = document.getElementById('site-header');

  function onScroll () {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run immediately in case page loads mid-scroll


  /* --------------------------------------------------
     3. MOBILE NAV TOGGLE
  -------------------------------------------------- */
  const mobileBtn = document.getElementById('mobile-btn');
  const mobileNav = document.getElementById('mobile-nav');

  function openNav () {
    if (!mobileBtn || !mobileNav) return;
    mobileBtn.classList.add('open');
    mobileBtn.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeNav () {
    if (!mobileBtn || !mobileNav) return;
    mobileBtn.classList.remove('open');
    mobileBtn.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mobileBtn) {
    mobileBtn.addEventListener('click', function () {
      mobileBtn.classList.contains('open') ? closeNav() : openNav();
    });
  }

  // Close when a nav link is tapped
  document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(function (el) {
    el.addEventListener('click', closeNav);
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!mobileNav || !mobileBtn) return;
    if (
      mobileNav.classList.contains('open') &&
      !mobileNav.contains(e.target) &&
      !mobileBtn.contains(e.target)
    ) closeNav();
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
      closeNav();
      if (mobileBtn) mobileBtn.focus();
    }
  });

  // Close on resize to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024) closeNav();
  });


  /* --------------------------------------------------
     4. SMOOTH SCROLL WITH HEADER OFFSET
     Works for all <a href="#..."> links.
  -------------------------------------------------- */
  function getHeaderH () {
    return parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
      10
    ) || 72;
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - getHeaderH() - 8;
      window.scrollTo({ top, behavior: 'smooth' });

      if (history.pushState) history.pushState(null, null, href);
    });
  });


  /* --------------------------------------------------
     5. ACTIVE NAV LINK HIGHLIGHTING
     IntersectionObserver watches each section[id].
  -------------------------------------------------- */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(function (link) {
              link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
          }
        });
      },
      { rootMargin: '-38% 0px -52% 0px', threshold: 0 }
    );

    sections.forEach(function (s) { activeObserver.observe(s); });
  }


  /* --------------------------------------------------
     6. SCROLL-TRIGGERED ENTRANCE ANIMATIONS
     .reveal        — single element fade-up
     .reveal-grid   — grid whose children stagger in
  -------------------------------------------------- */
  if ('IntersectionObserver' in window) {

    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    );

    document.querySelectorAll('.reveal, .reveal-grid').forEach(function (el) {
      revealObserver.observe(el);
    });

  } else {
    // Fallback: show everything immediately
    document.querySelectorAll('.reveal, .reveal-grid').forEach(function (el) {
      el.classList.add('in-view');
    });
  }

})();
