/* Script principale — MMarchetti */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Hamburger menu ---- */
  const hamburger = document.querySelector('.navbar-hamburger');
  const nav = document.querySelector('.navbar-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      /* Blocca lo scroll del body quando il menu è aperto */
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Chiude il menu al click su un link */
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    /* Chiude il menu se si ridimensiona a viewport desktop */
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768 && nav.classList.contains('open')) {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- Navbar scrolled ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = function () {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Voce navbar attiva ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Anno copyright dinamico ---- */
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Intersection Observer — fade-in + slide-up ---- */
  const animatedEls = document.querySelectorAll('.fade-in, .slide-up');
  if (animatedEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animatedEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---- Typewriter effect (solo su desktop) ---- */
  const typewriterEl = document.querySelector('.typewriter');
  if (typewriterEl && window.innerWidth >= 768) {
    const originalHTML = typewriterEl.innerHTML;
    const plainText = typewriterEl.textContent;
    typewriterEl.innerHTML = '';
    typewriterEl.style.borderRight = '3px solid var(--blu)';

    const textSpan = document.createElement('span');
    typewriterEl.appendChild(textSpan);

    let i = 0;
    const speed = 32;

    function typeWriter() {
      if (i < plainText.length) {
        textSpan.textContent = plainText.substring(0, i + 1);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        typewriterEl.innerHTML = originalHTML;
        typewriterEl.style.animation = 'blink-caret 0.75s step-end infinite';
      }
    }

    setTimeout(typeWriter, 400);
  }

  /* ---- Cursore personalizzato ---- */
  const cursor = document.querySelector('.custom-cursor');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = -100, mouseY = -100;
    let cursorX = -100, cursorY = -100;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!cursor.classList.contains('active')) {
        cursor.classList.add('active');
      }
    });

    document.addEventListener('mouseleave', function () {
      cursor.classList.remove('active');
    });

    function animateCursor() {
      const lag = 0.15;
      cursorX += (mouseX - cursorX) * lag;
      cursorY += (mouseY - cursorY) * lag;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    /* Hover su link, bottoni, card */
    const hoverTargets = document.querySelectorAll('a, button, .btn, .card, .navbar-hamburger');
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('cursor-hover');
      });
    });
  }

});
