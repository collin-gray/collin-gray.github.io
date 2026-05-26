/**
 * FOUNDRY PRINT AND PROMO — JAVASCRIPT
 * script.js
 *
 * Features:
 *  1. Dynamic copyright year in footer
 *  2. Sticky header scroll state
 *  3. Mobile navigation toggle
 *  4. Smooth scroll for all in-page anchor links
 *  5. Active nav link highlighting on scroll
 *  6. Scroll-triggered entrance animations (IntersectionObserver)
 *  7. Mobile nav: close on link click or outside click
 */

(function () {
  'use strict';

  // ================================================
  // 1. DYNAMIC COPYRIGHT YEAR
  // ================================================
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  // ================================================
  // 2. STICKY HEADER SCROLL STATE
  // Adds .is-scrolled class to header after 10px scroll.
  // CSS uses this to slightly darken the background.
  // ================================================
  const header = document.getElementById('site-header');

  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Run on load in case page is already scrolled


  // ================================================
  // 3. MOBILE NAVIGATION TOGGLE
  // ================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav     = document.getElementById('mobile-nav');

  function openMobileNav() {
    if (!mobileMenuBtn || !mobileNav) return;
    mobileMenuBtn.classList.add('is-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent scroll while nav is open
  }

  function closeMobileNav() {
    if (!mobileMenuBtn || !mobileNav) return;
    mobileMenuBtn.classList.remove('is-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleMobileNav() {
    const isOpen = mobileMenuBtn.classList.contains('is-open');
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileNav);
  }

  // Close mobile nav when a mobile nav link is clicked
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');
  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  // Close mobile nav when clicking outside of it
  document.addEventListener('click', function (e) {
    if (!mobileNav || !mobileMenuBtn) return;
    if (
      mobileNav.classList.contains('is-open') &&
      !mobileNav.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      closeMobileNav();
    }
  });

  // Close mobile nav on resize to desktop width
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024) {
      closeMobileNav();
    }
  });

  // Close mobile nav on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('is-open')) {
      closeMobileNav();
      if (mobileMenuBtn) mobileMenuBtn.focus();
    }
  });


  // ================================================
  // 4. SMOOTH SCROLL FOR ALL IN-PAGE ANCHOR LINKS
  // Handles offset for the fixed header.
  // ================================================
  const headerHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
    10
  ) || 72;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip empty hashes
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });

      // Update URL hash without jumping
      if (history.pushState) {
        history.pushState(null, null, href);
      }
    });
  });


  // ================================================
  // 5. ACTIVE NAV LINK HIGHLIGHTING ON SCROLL
  // Uses IntersectionObserver to track which section
  // is in view and marks the corresponding nav link active.
  // ================================================
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.remove('is-active');
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('is-active');
              }
            });
          }
        });
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }


  // ================================================
  // 6. SCROLL-TRIGGERED ENTRANCE ANIMATIONS
  // Adds .animate-on-scroll class to eligible elements,
  // then observes them. CSS handles the transition.
  //
  // Elements that animate: serve-card, service-card,
  // why-card, process-step, work-card, section headings.
  // ================================================
  const animatableSelectors = [
    '.serve-card',
    '.service-card',
    '.why-card',
    '.process-step',
    '.work-card',
    '.agency-stat',
    '.faith-inner',
    '.final-cta-inner'
  ];

  const animatableElements = document.querySelectorAll(
    animatableSelectors.join(', ')
  );

  // Only run if browser supports IntersectionObserver
  if ('IntersectionObserver' in window) {
    animatableElements.forEach(function (el) {
      el.classList.add('animate-on-scroll');
    });

    const animationObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Stop observing once animated — no need to re-trigger
            animationObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08
      }
    );

    animatableElements.forEach(function (el) {
      animationObserver.observe(el);
    });
  } else {
    // Fallback: show all elements immediately if IntersectionObserver unsupported
    animatableElements.forEach(function (el) {
      el.classList.add('animate-on-scroll', 'is-visible');
    });
  }


  // ================================================
  // 7. LOGO IMAGE ERROR HANDLING
  // If the SVG logo fails to load, the onerror
  // attributes in HTML handle the fallback.
  // No additional JS needed here.
  // ================================================

})();
