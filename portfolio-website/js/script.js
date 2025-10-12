// Portfolio Script: Circular progress, filtering, sticky navbar, back-to-top, dark mode
(function () {
  'use strict';

  // ---------- Circular Progress Animation ----------
  function animateCircular(progressSelector, valueSelector, endValue, color, speed) {
    const progressElem = document.querySelector(progressSelector);
    const valueElem = document.querySelector(valueSelector);
    if (!progressElem || !valueElem) return;

    let current = 0;
    const interval = setInterval(() => {
      current++;
      valueElem.textContent = `${current}%`;
      progressElem.style.background = `conic-gradient(${color} ${current * 3.6}deg, #ededed 0deg)`;
      if (current >= endValue) clearInterval(interval);
    }, speed);
  }

  // ---------- Dark Mode Toggle ----------
  function setDarkMode(isDark) {
    if (isDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('dark-mode', 'disabled');
    }
  }

  // ---------- Initialize ----------
  document.addEventListener('DOMContentLoaded', function () {
    // Animate skill progress
    animateCircular('.html-css', '.html-progress', 90, '#fca61f', 30);
    animateCircular('.javascript', '.javascript-progress', 75, '#7d2ae8', 30);
    animateCircular('.php', '.php-progress', 80, '#20c997', 30);
    animateCircular('.reactjs', '.reactjs-progress', 30, '#3f396d', 30);

    // ---------- Portfolio Filter ----------
    if (typeof jQuery !== 'undefined') {
      jQuery(document).on('click', '.filter-item', function () {
        const value = jQuery(this).attr('data-filter');
        if (value === 'all') {
          jQuery('.post').show('1000');
        } else {
          jQuery('.post').not('.' + value).hide('1000');
          jQuery('.post').filter('.' + value).show('1000');
        }
      });
    }

    // ---------- Sticky Navbar ----------
    const navbar = document.getElementById('navbar-top');
    if (navbar) {
      const onScroll = function () {
        if (window.scrollY > 50) {
          navbar.classList.add('fixed-top');
          const navEl = document.querySelector('.navbar');
          const navbarHeight = navEl ? navEl.offsetHeight : 0;
          document.body.style.paddingTop = navbarHeight + 'px';
        } else {
          navbar.classList.remove('fixed-top');
          document.body.style.paddingTop = '0';
        }
      };
      window.addEventListener('scroll', onScroll);
      onScroll();
    }

    // ---------- Back-to-Top Button ----------
    const backBtn = document.getElementById('btn-back-to-top');
    if (backBtn) {
      const toggleBackBtn = function () {
        const show = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
        backBtn.style.display = show ? 'block' : 'none';
      };
      window.addEventListener('scroll', toggleBackBtn);
      backBtn.addEventListener('click', function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      });
      toggleBackBtn();
    }

    // ---------- Dark Mode Button ----------
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (darkModeBtn) {
      // Apply saved preference
      const saved = localStorage.getItem('dark-mode');
      if (saved === 'enabled') setDarkMode(true);

      // Toggle on click
      darkModeBtn.addEventListener('click', function () {
        const isDark = document.body.classList.contains('dark-mode');
        setDarkMode(!isDark);
      });
    }
  });
})();
