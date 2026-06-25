/* =============================================
   ZYNX MEDIA – script.js
   All Interactions, Animations & Dynamic Logic
   ============================================= */

'use strict';

// =============================================
// DOM READY
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlider();
  initParticles();
  initScrollAnimations();
  initCounters();
  initPortfolioFilter();
  initTestimonialsSlider();
  initContactForm();
  initScrollTop();
  initSmoothScroll();
  initActiveNavLink();
});

// =============================================
// NAVBAR – Scroll behavior & Mobile toggle
// =============================================
function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Scroll state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// =============================================
// ACTIVE NAV LINK – Highlight on scroll
// =============================================
function initActiveNavLink() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(section => observer.observe(section));
}

// =============================================
// HERO BACKGROUND SLIDER
// =============================================
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  let current = 0;

  function nextSlide() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }

  setInterval(nextSlide, 5000);
}

// =============================================
// HERO PARTICLES
// =============================================
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const PARTICLE_COUNT = 30;
  const colors = ['rgba(108,99,255,0.6)', 'rgba(0,212,255,0.5)', 'rgba(255,107,107,0.4)'];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');

    const size    = Math.random() * 4 + 1;
    const left    = Math.random() * 100;
    const delay   = Math.random() * 15;
    const duration = Math.random() * 20 + 15;
    const color   = colors[Math.floor(Math.random() * colors.length)];

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      background: ${color};
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;

    container.appendChild(p);
  }
}

// =============================================
// SCROLL ANIMATIONS (Custom AOS-like)
// =============================================
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// =============================================
// ANIMATED COUNTERS
// =============================================
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => animateCounter(counter));
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) observer.observe(statsSection);
}

function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 2000;
  const step     = target / (duration / 16);
  let current    = 0;

  const update = () => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      return;
    }
    el.textContent = Math.floor(current);
    requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

// =============================================
// PORTFOLIO FILTER
// =============================================
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items       = document.querySelectorAll('.portfolio-item');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'none';
          item.offsetHeight; // trigger reflow
          item.style.animation = 'filterFadeIn 0.4s ease forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Inject keyframe if not present
  if (!document.getElementById('filter-style')) {
    const style = document.createElement('style');
    style.id = 'filter-style';
    style.textContent = `
      @keyframes filterFadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to   { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }
}

// =============================================
// TESTIMONIALS SLIDER
// =============================================
function initTestimonialsSlider() {
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const dotsContainer = document.getElementById('sliderDots');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  let current = 0;
  let autoInterval;

  // Determine cards per view
  function cardsPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function totalSlides() {
    return Math.ceil(cards.length / cardsPerView());
  }

  // Build dots
  function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides(); i++) {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      if (i === current) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    const total = totalSlides();
    current = ((index % total) + total) % total;
    const perView = cardsPerView();
    const cardWidth = track.parentElement.offsetWidth / perView;
    track.style.transform = `translateX(-${current * cardWidth * perView}px)`;
    updateDots();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    autoInterval = setInterval(next, 4500);
  }

  function stopAuto() {
    clearInterval(autoInterval);
  }

  // Card sizing
  function resizeCards() {
    const perView = cardsPerView();
    const gap = 24;
    const totalGap = gap * (perView - 1);
    const cardWidth = (track.parentElement.offsetWidth - totalGap) / perView;
    cards.forEach(card => {
      card.style.flex = `0 0 ${cardWidth}px`;
    });
    // Snap back
    goTo(current);
  }

  prevBtn.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
  nextBtn.addEventListener('click', () => { stopAuto(); next(); startAuto(); });

  // Touch/swipe
  let startX = 0;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) {
      stopAuto();
      dx < 0 ? next() : prev();
      startAuto();
    }
  });

  buildDots();
  resizeCards();
  startAuto();

  window.addEventListener('resize', () => {
    buildDots();
    resizeCards();
  });
}

// =============================================
// CONTACT FORM – Sends data via WhatsApp
// =============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  if (!form) return;

  // ⚠️ APNA WHATSAPP NUMBER YAHAN DAALO (country code ke saath, no + or spaces)
  const YOUR_WHATSAPP_NUMBER = '917070017747';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;

    // Form fields se data lo
    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const phone   = document.getElementById('fphone').value.trim() || 'Not provided';
    const service = document.getElementById('fservice').value || 'Not selected';
    const message = document.getElementById('fmessage').value.trim() || 'No message';

    // WhatsApp message format karo
    const waText =
      `🌟 *New Inquiry – Zynx Media* 🌟%0A%0A` +
      `👤 *Name:* ${encodeURIComponent(name)}%0A` +
      `📧 *Email:* ${encodeURIComponent(email)}%0A` +
      `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
      `🎯 *Service Needed:* ${encodeURIComponent(service)}%0A%0A` +
      `💬 *Message:*%0A${encodeURIComponent(message)}%0A%0A` +
      `-----------------------------%0A` +
      `_Sent via zynx.site contact form_`;

    // Loading state dikhao
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening WhatsApp...';
    submitBtn.disabled = true;

    // WhatsApp open karo
    setTimeout(() => {
      window.open(`https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${waText}`, '_blank');

      // Form reset
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();

      // Success message dikhao
      successMsg.classList.add('visible');
      setTimeout(() => successMsg.classList.remove('visible'), 6000);
    }, 800);
  });

  // Live validation – red border if empty on blur
  const inputs = form.querySelectorAll('input[required], textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (!input.value.trim()) {
        input.style.borderColor = 'rgba(255,107,107,0.6)';
      } else {
        input.style.borderColor = '';
      }
    });
    input.addEventListener('focus', () => {
      input.style.borderColor = '';
    });
  });
}

// =============================================
// SCROLL TO TOP BUTTON
// =============================================
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// =============================================
// CURSOR GLOW EFFECT (Desktop only)
// =============================================
(function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(108,99,255,0.04) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top  = `${e.clientY}px`;
  });
})();

// =============================================
// SERVICE CARD TILT EFFECT (subtle)
// =============================================
(function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect    = card.getBoundingClientRect();
      const cx      = rect.left + rect.width / 2;
      const cy      = rect.top  + rect.height / 2;
      const dx      = (e.clientX - cx) / (rect.width  / 2);
      const dy      = (e.clientY - cy) / (rect.height / 2);
      const tiltX   = dy * -5;
      const tiltY   = dx *  5;
      card.style.transform = `translateY(-8px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// =============================================
// TYPING EFFECT – Hero subtitle (optional flair)
// =============================================
(function initTypingEffect() {
  // Uses badge text cycle for subtle dynamism
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;

  const texts = [
    'Premium Digital Agency',
    'Growth Partner',
    'Creative Experts',
    'Result Driven Team',
  ];

  let index = 0;
  const span = badge.querySelector('span:last-child') || badge;

  setInterval(() => {
    index = (index + 1) % texts.length;
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(-8px)';
    setTimeout(() => {
      badge.childNodes[badge.childNodes.length - 1].textContent = texts[index];
      badge.style.opacity = '1';
      badge.style.transform = 'translateY(0)';
    }, 300);
  }, 3500);

  badge.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
})();

// =============================================
// NAVBAR PROGRESS BAR
// =============================================
(function initProgressBar() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #6c63ff, #00d4ff);
    z-index: 1001;
    width: 0%;
    transition: width 0.1s ease;
    border-radius: 0 2px 2px 0;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const total     = document.documentElement.scrollHeight - window.innerHeight;
    const progress  = (window.scrollY / total) * 100;
    bar.style.width = `${progress}%`;
  }, { passive: true });
})();
