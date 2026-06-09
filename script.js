// -- Martin --
// ── EMAILJS CONFIG ──
const EMAILJS_PUBLIC_KEY  ='LGlZbQW2Bst65MOr_';
const EMAILJS_SERVICE_ID  ='service_ve7dmzk';
const EMAILJS_TEMPLATE_ID ='__ejs-test-mail-service__';

emailjs.init({publicKey: EMAILJS_PUBLIC_KEY});


// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle mobile menu on hamburger click
hamburger.addEventListener('click', () => {
  const isActive = hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isActive); 
});

// Close menu when clicking on a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false'); 
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
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

/* Martin
function handleContactSubmit(event) {
  event.preventDefault();
  console.log('Contact form submitted');
  // Add your form submission logic here
}
*/

//Martin The new function I just added 
/*
 async function handleContactSubmit(event) {
  event.preventDefault();

  const form      = event.target;
  const btn       = document.getElementById('contactSubmitBtn');
  const msgBox    = document.getElementById('contactFormMessage');

  // Reset state
  msgBox.className = 'form-message';
  msgBox.style.display = 'none';
  msgBox.textContent = '';
  btn.disabled = true;
  btn.textContent = 'Sending…';

  // Encode form data for Netlify
  const data = new URLSearchParams();
  new FormData(form).forEach((value, key) => data.append(key, value));

  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data.toString(),
    });

    if (res.ok) {
      msgBox.textContent = 'Thank you — your message has been sent. We\'ll be in touch shortly.';
      msgBox.classList.add('success');
      msgBox.style.display = 'block';
      form.reset();
    } else {
      throw new Error(`Server responded with ${res.status}`);
    }
  } catch (err) {
    console.error('Contact form error:', err);
    msgBox.textContent = 'Something went wrong. Please try again or email us directly at meknaholdings@gmail.com.';
    msgBox.classList.add('error');
    msgBox.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Message';
  }
}
*/

async function handleContactSubmit(event) {
  event.preventDefault();
  const form   = event.target;
  const btn    = document.getElementById('contactSubmitBtn');
  const msgBox = document.getElementById('contactFormMessage');
 
  msgBox.className     = 'form-message';
  msgBox.style.display = 'none';
  msgBox.textContent   = '';
  btn.disabled         = true;
  btn.textContent      = 'Sending…';
 
  const params = {
    from_name:    form['contact-name'].value.trim(),
    from_email:   form['contact-email'].value.trim(),
    phone:        form['contact-phone'].value.trim()
                    || 'Not provided',
    enquiry_type: form['enquiry-type'].value,
    message:      form['contact-message'].value.trim(),
    reply_to:     form['contact-email'].value.trim(),
  };
 
  try {
    await emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,params);
    msgBox.textContent ="Thank you — we'll be in touch shortly.";
    msgBox.classList.add('success');
    msgBox.style.display = 'block';
    form.reset();
    msgBox.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  } 
  catch (err) {
    console.error('EmailJS error:', err);
    msgBox.textContent ='Something went wrong. Please email us at' + ' info1@meknaholdings.com.';
    msgBox.classList.add('error');
    msgBox.style.display = 'block';
  } 
  finally {
    btn.disabled    = false;
    btn.textContent = 'Send Message';
  }
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
