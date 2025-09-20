// DOM Elements
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navbar = document.getElementById("navbar");
const contactForm = document.getElementById("contact-form");

// Navigation Toggle
navToggle?.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "#FFFFFF";
    navbar.style.backdropFilter = "none";
  }
});

// Active navigation link
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);

// Smooth scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const navbarHeight = navbar.offsetHeight;
    const sectionTop = section.offsetTop - navbarHeight;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });
  }
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");

      // Animate skill progress bars
      if (entry.target.classList.contains("skill-category")) {
        const progressBars = entry.target.querySelectorAll(".progress-bar");
        progressBars.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          setTimeout(() => {
            bar.style.width = width + "%";
          }, 200);
        });
      }

      // Animate stat numbers
      if (entry.target.classList.contains("stat-card")) {
        const number = entry.target.querySelector(".stat-number");
        const finalNumber = parseInt(number.textContent);
        animateNumber(number, finalNumber);
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".card, .section-title, .hero-text, .hero-image")
  .forEach((el) => {
    observer.observe(el);
  });

// Animate numbers
function animateNumber(element, target) {
  const duration = 2000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + "+";
  }, 16);
}

// Contact form handling
contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML =
    '<span class="material-icons">hourglass_empty</span> Mengirim...';
  submitBtn.disabled = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success message
    showNotification("Pesan berhasil dikirim! Terima kasih.", "success");
    contactForm.reset();
  } catch (error) {
    // Show error message
    showNotification("Terjadi kesalahan. Silakan coba lagi.", "error");
  } finally {
    // Restore button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <span class="material-icons">
            ${
              type === "success"
                ? "check_circle"
                : type === "error"
                ? "error"
                : "info"
            }
        </span>
        <span>${message}</span>
    `;

  // Add notification styles
  const styles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--surface);
            color: var(--on-surface);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            box-shadow: var(--elevation-3);
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            z-index: 1001;
            transform: translateX(400px);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .notification-success {
            border-left: 4px solid #10B981;
        }
        
        .notification-error {
            border-left: 4px solid #EF4444;
        }
        
        .notification-info {
            border-left: 4px solid var(--primary-color);
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;

  // Add styles if not already added
  if (!document.querySelector("#notification-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "notification-styles";
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  document.body.appendChild(notification);

  // Show notification
  requestAnimationFrame(() => {
    notification.classList.add("show");
  });

  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Ripple effect for buttons
document.querySelectorAll(".ripple").forEach((button) => {
  button.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
        `;

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation styles
const rippleStyles = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Parallax effect for floating cards
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".floating-card");

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    const yPos = scrolled * speed;
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src || img.src;
      img.classList.add("loaded");
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll("img").forEach((img) => {
  imageObserver.observe(img);
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    navMenu.classList.remove("active");
  }
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Set initial active nav link
  updateActiveNavLink();

  // Add loading class to body
  document.body.classList.add("loaded");

  console.log("Portfolio Material Design loaded successfully! 🚀");
});

// Performance optimization
window.addEventListener("load", () => {
  // Remove loading states
  document.querySelectorAll(".loading").forEach((el) => {
    el.classList.remove("loading");
  });
});

// Service Worker registration (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
