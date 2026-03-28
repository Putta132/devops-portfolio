/* ============================================
   DevOps Portfolio — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navigation ──────────────────────────────
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll → shrink navbar
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Hamburger toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const highlightNav = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });


  // ── Scroll Animations ──────────────────────
  const animateElements = document.querySelectorAll('[data-animate]');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        animateObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => animateObserver.observe(el));


  // ── Hero Stat Counter ─────────────────────
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000;
    const start = performance.now();

    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      element.textContent = Math.round(target * easedProgress);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(num => animateCounter(num));
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);


  // ── Typing Effect ─────────────────────────
  const typedText = document.getElementById('typed-text');
  const commands = [
    'docker build -t webapp:latest .',
    'terraform apply --auto-approve',
    'kubectl apply -f deployment.yaml',
    'aws ecs update-service --cluster prod',
    'ansible-playbook deploy.yml',
    'helm upgrade --install myapp ./chart'
  ];

  let cmdIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeEffect = () => {
    const current = commands[cmdIndex];

    if (!isDeleting) {
      typedText.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      setTimeout(typeEffect, 50 + Math.random() * 40);
    } else {
      typedText.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        cmdIndex = (cmdIndex + 1) % commands.length;
        setTimeout(typeEffect, 500);
        return;
      }
      setTimeout(typeEffect, 25);
    }
  };

  setTimeout(typeEffect, 1200);


  // ── Hero Particles ────────────────────────
  const particlesContainer = document.getElementById('hero-particles');

  const createParticles = () => {
    const count = window.innerWidth < 768 ? 20 : 40;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (6 + Math.random() * 6) + 's';

      const hue = 230 + Math.random() * 60;
      particle.style.background = `hsl(${hue}, 80%, 65%)`;
      particle.style.width = (2 + Math.random() * 3) + 'px';
      particle.style.height = particle.style.width;
      particle.style.boxShadow = `0 0 ${4 + Math.random() * 8}px hsl(${hue}, 80%, 65%)`;

      particlesContainer.appendChild(particle);
    }
  };

  createParticles();


  // ── Gallery Lightbox ──────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryExpands = document.querySelectorAll('.gallery-expand');

  galleryExpands.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.gallery-card');
      const img = card.querySelector('.gallery-image');
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Also open lightbox on card click
  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.gallery-image');
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });


  // ── Contact Form ──────────────────────────
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

    if (!name || !email || !message) return;

    // Replace form with success state
    contactForm.innerHTML = `
      <div class="form-success">
        <i class="fas fa-check-circle"></i>
        <h4>Message Sent!</h4>
        <p>Thanks, ${name}! I'll get back to you within 24 hours.</p>
      </div>
    `;
  });


  // ── Smooth Scroll for all anchor links ────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ── Project Modals ─────────────────────────
  const btnCicd = document.getElementById('btn-project-cicd');
  const btnAws = document.getElementById('btn-project-aws');
  const modalCicd = document.getElementById('modal-cicd');
  const modalAws = document.getElementById('modal-aws');

  const openProjectModal = (modal) => {
    if(!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = (modal) => {
    if(!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (btnCicd) {
    btnCicd.addEventListener('click', (e) => {
      e.preventDefault();
      openProjectModal(modalCicd);
    });
  }

  if (btnAws) {
    btnAws.addEventListener('click', (e) => {
      e.preventDefault();
      openProjectModal(modalAws);
    });
  }

  document.querySelectorAll('.project-modal').forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => closeProjectModal(modal));
    
    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal(modal);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.project-modal.active').forEach(closeProjectModal);
    }
  });

});
