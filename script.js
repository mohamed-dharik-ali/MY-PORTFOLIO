// Small interactive enhancements: reveal on scroll, animate progress bars, simple form validation

document.addEventListener('DOMContentLoaded', () => {
  // set year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // simple reveal on scroll
  const reveals = Array.from(document.querySelectorAll('.reveal-up'));
  const onScroll = () => {
    const threshold = window.innerHeight * 0.85;
    reveals.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < threshold) el.classList.add('visible');
    });
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  // Section separators: animate when entering viewport
  const separators = Array.from(document.querySelectorAll('.section-separator'));
  const onScrollSeparators = () => {
    const threshold = window.innerHeight * 0.9;
    separators.forEach(s => {
      if (s.classList.contains('visible')) return;
      const r = s.getBoundingClientRect();
      if (r.top < threshold) s.classList.add('visible');
    });
  };
  onScrollSeparators();
  window.addEventListener('scroll', onScrollSeparators, {passive:true});

  // animate skill bars
  const progressEls = Array.from(document.querySelectorAll('.progress'));
  const animateProgress = () => {
    progressEls.forEach(el => {
      const value = Number(el.getAttribute('data-value') || 0);
      const bar = el.querySelector('.progress-bar');
      if (!bar) return;
      bar.style.width = '0%';
      setTimeout(() => bar.style.width = value + '%', 200);
      // animate percent label if present
      const parent = el.parentElement;
      const percentEl = parent ? parent.querySelector('.skill-percent') : null;
      if (percentEl) {
        percentEl.textContent = '0%';
        let cur = 0;
        const step = Math.max(1, Math.floor(value / 20));
        const t = setInterval(() => {
          cur += step;
          if (cur >= value) { cur = value; clearInterval(t); }
          percentEl.textContent = cur + '%';
        }, 16);
      }
    });
  };
  // run after small delay so reveal animations look smoother
  setTimeout(animateProgress, 350);

  // Academics cards animation: animate bars when cards enter viewport
  const eduCards = Array.from(document.querySelectorAll('.edu-card'));
  const animateEduCards = () => {
    const threshold = window.innerHeight * 0.85;
    eduCards.forEach(card => {
      if (card.classList.contains('visible')) return; // already animated
      const r = card.getBoundingClientRect();
      if (r.top < threshold) {
        card.classList.add('visible');
        const value = Number(card.getAttribute('data-value') || 0);
        const bar = card.querySelector('.edu-bar');
        if (bar) {
          setTimeout(() => { bar.style.width = value + '%'; }, 120);
        }
      }
    });
  };
  // run on load and scroll
  setTimeout(animateEduCards, 300);
  window.addEventListener('scroll', animateEduCards, {passive:true});

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Theme toggle (dark <-> light) with localStorage
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const applyTheme = (t) => {
    if (t === 'light') document.body.classList.add('light-theme'); else document.body.classList.remove('light-theme');
    themeToggle.textContent = t === 'light' ? '☀️' : '🌙';
  };
  applyTheme(currentTheme);
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Typing effect for name in hero
  const typingNameEl = document.querySelector('.typing-name');
  if (typingNameEl) {
    const fullText = 'Mohamed Dharik Ali';
    typingNameEl.textContent = '';
    let i = 0;
    const typer = setInterval(() => {
      typingNameEl.textContent += fullText.charAt(i) || '';
      i++;
      if (i > fullText.length) {
        clearInterval(typer);
        // remove cursor after finish
        setTimeout(() => typingNameEl.style.borderRight = 'none', 600);
      }
    }, 70);
  }

  // Back to top button
  const backToTop = document.getElementById('back-to-top');
  const onScrollForTop = () => {
    if (!backToTop) return;
    if (window.scrollY > window.innerHeight * 0.6) backToTop.classList.add('visible'); else backToTop.classList.remove('visible');
  };
  window.addEventListener('scroll', onScrollForTop, {passive:true});
  onScrollForTop();
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

  // Animate radial CGPA: conic-gradient + counter
  const radial = document.querySelector('.cgpa.radial');
  if (radial) {
    const target = Number(radial.getAttribute('data-value') || 0);
    const ring = radial.querySelector('.radial-ring');
    const counter = radial.querySelector('.cgpa-percent');
    // animate from 0 to target
    let p = 0;
    const dur = 900; // ms
    const steps = Math.max(12, Math.floor(dur / 16));
    const inc = target / steps;
    const anim = setInterval(() => {
      p += inc;
      if (p >= target) p = target;
      const pct = Math.round(p);
      // set ring background using conic-gradient
      if (ring) ring.style.background = `conic-gradient(var(--accent) ${pct}%, rgba(255,255,255,0.04) ${pct}%)`;
      if (counter) counter.textContent = pct;
      if (p === target) clearInterval(anim);
    }, Math.max(8, Math.floor(dur / steps)));
  }

  // Contact form handling and section click animations
  const sections = Array.from(document.querySelectorAll('section.section'));
  sections.forEach(section => {
    const h3 = section.querySelector('h3');
    if (!h3) return;
    h3.addEventListener('click', () => {
      section.classList.toggle('clicked');
      // brief pulse animation on header
      h3.style.animation = 'none';
      setTimeout(() => { h3.style.animation = ''; }, 10);
    });
    
    // Add click animations to content items in section
    const contentItems = section.querySelectorAll('p, .skill, .edu-card, .contact-form label, .contact-info');
    contentItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        item.classList.toggle('clicked');
        // remove the clicked state after a delay for visual feedback
        setTimeout(() => {
          item.classList.remove('clicked');
        }, 1200);
      });
    });
  });

  // Contact form handling (no server) — perform client-side validation and show message
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('form-msg');
  
  // EmailJS integration — IMPORTANT: Replace these with your actual EmailJS credentials
  // Get these from: https://dashboard.emailjs.com/admin
  // 1. SERVICE_ID: Your Email Service ID (e.g., 'service_abc123')
  // 2. TEMPLATE_ID: Your Email Template ID (e.g., 'template_xyz789')
  // 3. PUBLIC_KEY: Already set in index.html — same key used to initialize emailjs above
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID_HERE';
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID_HERE';
  // If you initialized EmailJS in the HTML with your public key, you don't need to call init here.

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    if (!name) { msg.textContent = 'Please enter your name.'; return; }
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { msg.textContent = 'Please enter a valid email.'; return; }

    // If EmailJS isn't loaded, fallback to simulated send with an explanatory message
    if (!window.emailjs || typeof emailjs.sendForm !== 'function') {
      msg.textContent = 'Email service not configured. Replace EmailJS placeholders and include their SDK.';
      return;
    }

    msg.textContent = 'Sending message...';
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, '#contact-form')
      .then(() => {
        msg.textContent = 'Thanks — your message was sent.';
        form.reset();
      }, (err) => {
        console.error('EmailJS error', err);
        msg.textContent = 'Failed to send message. Check console and EmailJS configuration.';
      });
  });

});
