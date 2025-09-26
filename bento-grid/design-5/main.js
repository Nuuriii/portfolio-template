// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate on Scroll)
  initAOS();

  // Initialize smooth scrolling
  initSmoothScrolling();

  // Initialize mobile navigation
  initMobileNav();

  // Initialize interactive elements
  initInteractiveElements();

  // Initialize scroll effects
  initScrollEffects();
});

// AOS (Animate on Scroll) Implementation
function initAOS() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-aos-delay") || 0;
        setTimeout(() => {
          entry.target.classList.add("aos-animate");
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with data-aos attribute
  const aosElements = document.querySelectorAll("[data-aos]");
  aosElements.forEach((el) => observer.observe(el));
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Mobile navigation toggle
function initMobileNav() {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      this.classList.toggle("active");
    });
  }

  // Close mobile nav when clicking on links
  const mobileNavLinks = document.querySelectorAll(".nav-links a");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });
}

// Interactive elements
function initInteractiveElements() {
  // CTA Button interaction
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      // Add ripple effect
      createRipple(this);

      // Scroll to contact section or perform action
      const contactCard = document.querySelector(".contact-card");
      if (contactCard) {
        contactCard.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    });
  }

  // Project items hover effects
  const projectItems = document.querySelectorAll(".project-item");
  projectItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(8px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
    });
  });

  // Bento items interaction
  const bentoItems = document.querySelectorAll(".bento-item");
  bentoItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.background = "linear-gradient(135deg, #111111, #1a1a1a)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.background = "#111111";
    });
  });
}

// Create ripple effect
function createRipple(element) {
  const circle = document.createElement("span");
  const diameter = Math.max(element.clientWidth, element.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - element.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - element.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = element.querySelector(".ripple");
  if (ripple) {
    ripple.remove();
  }

  element.appendChild(circle);

  // Remove ripple after animation
  setTimeout(() => {
    circle.remove();
  }, 600);
}

// Scroll effects
function initScrollEffects() {
  let lastScrollTop = 0;
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Hide/show header on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;

    // Parallax effect for hero elements
    const parallaxElements = document.querySelectorAll(".bento-item");
    parallaxElements.forEach((el, index) => {
      const speed = 0.05 * (index + 1);
      const yPos = -(scrollTop * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth loading animation
window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  // Stagger animation for bento items
  const bentoItems = document.querySelectorAll(".bento-item");
  bentoItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 100);
  });
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  // ESC key to close mobile nav
  if (e.key === "Escape") {
    const navLinks = document.querySelector(".nav-links");
    const navToggle = document.querySelector(".nav-toggle");

    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
    }
  }
});

// Contact form handling (if you add a form later)
function handleContactForm() {
  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Add your form submission logic here
      console.log("Form submitted");

      // Show success message
      showNotification("Message sent successfully!", "success");
    });
  }
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification--${type}`;
  notification.textContent = message;

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#3b82f6"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after delay
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Add ripple CSS if not exists
function addRippleCSS() {
  if (!document.querySelector("#ripple-styles")) {
    const style = document.createElement("style");
    style.id = "ripple-styles";
    style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }
}

// Initialize ripple CSS
addRippleCSS();

// Performance optimization
const optimizeImages = () => {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
};

// Call optimization functions
optimizeImages();
