/* Script principale — MMarchetti */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Cookie banner ---- */
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    if (!localStorage.getItem('cookie-choice')) {
      cookieBanner.classList.remove('cookie-hidden');
    }
    function closeCookieBanner(choice) {
      cookieBanner.classList.add('cookie-hidden');
      localStorage.setItem('cookie-choice', choice);
    }
    const cookieAccept = document.getElementById('cookie-ok-btn');
    if (cookieAccept) {
      cookieAccept.addEventListener('click', function () { closeCookieBanner('accept'); });
    }
    const cookieDecline = document.getElementById('cookie-decline-btn');
    if (cookieDecline) {
      cookieDecline.addEventListener('click', function () { closeCookieBanner('decline'); });
    }
  }

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
    /*
     * Raccoglie i segmenti di testo preservando i nodi elemento (es. <span>),
     * così lo stile del markup viene applicato durante la digitazione stessa
     * e non solo a fine animazione.
     */
    const segments = [];
    typewriterEl.childNodes.forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        segments.push({ text: node.textContent, tag: null });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        segments.push({ text: node.textContent, tag: node.cloneNode(false) });
      }
    });

    typewriterEl.innerHTML = '';
    typewriterEl.classList.add('typewriter--typing');

    let segIdx = 0;
    let charIdx = 0;
    let currentNode = null;

    function typeNext() {
      if (segIdx >= segments.length) {
        typewriterEl.classList.remove('typewriter--typing');
        typewriterEl.classList.add('typewriter--done');
        return;
      }

      const seg = segments[segIdx];

      /* All'inizio di ogni segmento crea il nodo contenitore */
      if (charIdx === 0) {
        if (seg.tag) {
          const wrapper = seg.tag.cloneNode(false);
          typewriterEl.appendChild(wrapper);
          currentNode = document.createTextNode('');
          wrapper.appendChild(currentNode);
        } else {
          currentNode = document.createTextNode('');
          typewriterEl.appendChild(currentNode);
        }
      }

      currentNode.textContent += seg.text[charIdx];
      charIdx++;

      if (charIdx >= seg.text.length) {
        segIdx++;
        charIdx = 0;
        currentNode = null;
      }

      setTimeout(typeNext, 32);
    }

    setTimeout(typeNext, 400);
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
