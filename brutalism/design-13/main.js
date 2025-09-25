// Custom Cursor
const cursor = document.querySelector(".cursor");
let mouseX = 0,
  mouseY = 0;
let cursorX = 0,
  cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;

  cursor.style.left = cursorX - 10 + "px";
  cursor.style.top = cursorY - 10 + "px";

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Close mobile menu if open
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });
});

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Counter Animation
function animateCounter(element, start, end, duration) {
  let startTimestamp = null;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);

    element.textContent =
      current +
      (end.toString().includes("+") ? "+" : "") +
      (end.toString().includes("%") ? "%" : "");

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

// Trigger counter animations when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(".stat-number");
        counters.forEach((counter) => {
          const text = counter.textContent;
          const number = parseInt(text.replace(/\D/g, ""));
          animateCounter(counter, 0, number, 2000);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const aboutSection = document.querySelector("#about");
if (aboutSection) {
  statsObserver.observe(aboutSection);
}

// Parallax Effect for Geometric Shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  document.querySelectorAll(".geometric-shape").forEach((shape, index) => {
    const speed = (index + 1) * 0.3;
    shape.style.transform = `translate3d(0, ${scrolled * speed}px, 0) rotate(${
      scrolled * 0.1
    }deg)`;
  });
});

// Hover Effects for Project Cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translate(-8px, -8px) scale(1.02)";
    card.style.boxShadow = "12px 12px 0px var(--solana-cyan)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translate(0, 0) scale(1)";
    card.style.boxShadow = "4px 4px 0px var(--solana-cyan)";
  });
});

// Add some random movement to floating elements
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

document.querySelectorAll(".floating").forEach((element) => {
  const delay = randomFloat(0, 2000);
  const duration = randomFloat(4000, 8000);

  setTimeout(() => {
    element.style.animation = `float ${duration}ms ease-in-out infinite`;
  }, delay);
});

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    const scrolled = window.pageYOffset;

    // Update navbar background opacity based on scroll
    const nav = document.querySelector("nav");
    const opacity = Math.min(scrolled / 100, 0.95);
    nav.style.background = `rgba(26, 26, 46, ${opacity})`;
  }, 16)
);

console.log("🚀 BRUTAL PORTFOLIO LOADED - Ready to make an impact!");
