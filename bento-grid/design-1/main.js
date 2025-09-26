// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all bento items
document.querySelectorAll(".bento-item").forEach((item) => {
  observer.observe(item);
});

// Theme toggle functionality
let isDarkMode = true;

function toggleTheme() {
  const body = document.body;
  const toggle = document.querySelector(".theme-toggle");

  if (isDarkMode) {
    // Switch to light mode
    body.style.background = "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)";
    body.style.color = "#1e293b";
    toggle.innerHTML = "☀️";

    // Update bento item backgrounds for light mode
    document.querySelectorAll(".bento-item").forEach((item) => {
      item.style.border = "1px solid rgba(30, 41, 59, 0.1)";
    });

    isDarkMode = false;
  } else {
    // Switch back to dark mode
    body.style.background = "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)";
    body.style.color = "#f8fafc";
    toggle.innerHTML = "🌙";

    // Reset bento item backgrounds for dark mode
    document.querySelectorAll(".bento-item").forEach((item) => {
      item.style.border = "1px solid rgba(255, 255, 255, 0.1)";
    });

    isDarkMode = true;
  }
}

// Add hover effects to bento items
document.querySelectorAll(".bento-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.02)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Typing effect for header
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect on page load
window.addEventListener("load", () => {
  const headerText = document.querySelector(".header p");
  const originalText = headerText.textContent;
  typeWriter(headerText, originalText, 50);
});

// Add click effects to contact links
document.querySelectorAll(".contact-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.height, rect.width);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(62, 207, 142, 0.6);
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
document.head.appendChild(rippleStyle);

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + (target > 999 ? "k" : "") + "+";
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + (target > 999 ? "k" : "") + "+";
    }
  }

  updateCounter();
}

// Animate counters when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll(".stat-number");
      statNumbers.forEach((num, index) => {
        const targets = [50, 5, 20, 100];
        setTimeout(() => {
          animateCounter(num, targets[index]);
        }, index * 200);
      });
      statsObserver.unobserve(entry.target);
    }
  });
});

const statsSection = document.querySelector(".stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}
