// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle mobile menu on hamburger click
hamburger.addEventListener('click', () => {
  // Martin hamburger.classList.toggle('active');
  const isActive = hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isActive); // Martin
  // Martin document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close menu when clicking on a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false'); // Martin
   // Martin document.body.style.overflow = 'auto';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
   // Martin document.body.style.overflow = 'auto';
  }
});

// ── VALUATION MODAL ──
const valuationModal = document.getElementById('valuationModal');
const valuationModalClose = document.getElementById('valuationModalClose');

// Open modal when clicking "Get Home Valuation" buttons
document.querySelectorAll('[data-open-valuation]').forEach(btn => {
  btn.addEventListener('click', () => {
    valuationModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
valuationModalClose.addEventListener('click', () => {
  valuationModal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Close on background click
valuationModal.addEventListener('click', (e) => {
  if (e.target === valuationModal) {
    valuationModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Form submission handler
function handleValuationSubmit(event) {
  event.preventDefault();
  console.log('Form submitted');
  // Add your form submission logic here
}

function handleContactSubmit(event) {
  event.preventDefault();
  console.log('Contact form submitted');
  // Add your form submission logic here
}

// ── BACK TO TOP BUTTON ──
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── SCROLL REVEAL ANIMATIONS ──
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));
