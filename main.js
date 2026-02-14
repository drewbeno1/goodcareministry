import './style.css'

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile nav when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// Donate Modal
const donateModal = document.getElementById('donate-modal');

function openDonateModal() {
  donateModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDonateModal() {
  donateModal.classList.remove('active');
  document.body.style.overflow = '';
}

if (donateModal) {
  donateModal.querySelector('.modal-close').addEventListener('click', closeDonateModal);
  donateModal.addEventListener('click', (e) => {
    if (e.target === donateModal) closeDonateModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && donateModal.classList.contains('active')) closeDonateModal();
  });

  document.getElementById('donate-contact-btn').addEventListener('click', (e) => {
    e.preventDefault();
    closeDonateModal();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      window.scrollTo({
        top: contactSection.getBoundingClientRect().top + window.pageYOffset - navHeight,
        behavior: 'smooth'
      });
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    // Intercept donate links to show popup instead
    if (this.getAttribute('href') === '#donate') {
      if (donateModal) openDonateModal();
      return;
    }
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
  });
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Here you would typically send the data to a server
    // For now, we'll just log it and show a success message
    console.log('Form submitted:', data);

    // Show success message (you can customize this)
    alert('Thank you for your message! We will get back to you soon.');

    // Reset form
    this.reset();
  });
}

// Animate elements on scroll (Intersection Observer)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      animateOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add animation to sections
document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  animateOnScroll.observe(section);
});

// Add the animate-in class styles dynamically
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Director's Testimony Modal
const testimonyBtn = document.getElementById('testimony-btn');
const testimonyModal = document.getElementById('testimony-modal');
const modalClose = document.getElementById('modal-close');

if (testimonyBtn && testimonyModal) {
  testimonyBtn.addEventListener('click', () => {
    testimonyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    testimonyModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);

  testimonyModal.addEventListener('click', (e) => {
    if (e.target === testimonyModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && testimonyModal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Gallery Expand/Collapse
const galleryToggle = document.getElementById('gallery-toggle');
const galleryGrid = document.querySelector('.gallery-grid');

if (galleryToggle && galleryGrid) {
  galleryToggle.addEventListener('click', () => {
    const isExpanded = galleryGrid.classList.toggle('expanded');
    galleryToggle.textContent = isExpanded ? 'Show Less' : 'Show More';
  });
}

// Stat counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.impact');

if (statsSection && statNumbers.length > 0) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(stat => {
          const text = stat.textContent;
          // Check if it's a placeholder
          if (!text.includes('[') && /^\d+$/.test(text.trim())) {
            const target = parseInt(text);
            animateCounter(stat, target);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statsObserver.observe(statsSection);
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const duration = 1500;
  const stepTime = duration / 50;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, stepTime);
}
