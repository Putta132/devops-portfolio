// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// Sticky Navbar & Active Link Highlighting
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Sticky Navbar background
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(2, 6, 23, 0.95)';
    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
  } else {
    navbar.style.background = 'rgba(2, 6, 23, 0.8)';
    navbar.style.boxShadow = 'none';
  }

  // Active link highlighting
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// Scroll Reveal Animations via IntersectionObserver
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Optional: stop observing once revealed
      // observer.unobserve(entry.target);
    }
  });
};

const revealOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Terminal Typewriter Effect
const typewriterEl = document.getElementById('typewriter');
const textToType = "./deploy.sh --env production";
let typeIndex = 0;
let isTyping = true;

function typeWriter() {
  if (isTyping) {
    if (typeIndex < textToType.length) {
      typewriterEl.textContent += textToType.charAt(typeIndex);
      typeIndex++;
      setTimeout(typeWriter, 100);
    } else {
      isTyping = false;
      setTimeout(() => {
        isTyping = true;
        typewriterEl.textContent = "";
        typeIndex = 0;
        typeWriter();
      }, 4000); // 4 seconds delay before typing again
    }
  }
}

// Start typing effect on load
setTimeout(typeWriter, 1000);
