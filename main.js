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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
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
          if (!text.includes('[')) {
            const target = parseInt(text.replace(/\D/g, ''));
            if (!isNaN(target)) {
              animateCounter(stat, target);
            }
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
