// Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove("active");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
      navMenu.classList.remove("active");
    }
  });
});

// Scroll animations
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

// Form submission
document.querySelector(".contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(e.target);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Simple validation
  if (name && email && message) {
    alert("MESSAGE SENT! I'LL GET BACK TO YOU SOON.");
    e.target.reset();
  } else {
    alert("PLEASE FILL IN ALL FIELDS!");
  }
});

// Add some interactive brutalist effects
document.addEventListener("mousemove", (e) => {
  const shapes = document.querySelectorAll(".brutal-shape");
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.5;
    const xOffset = (x - 0.5) * speed * 20;
    const yOffset = (y - 0.5) * speed * 20;

    shape.style.transform = `rotate(45deg) translate(${xOffset}px, ${yOffset}px)`;
  });
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    navMenu.classList.remove("active");
  }
});

// Add random glitch effect to title
const glitchTitle = () => {
  const title = document.querySelector(".name");
  if (title && Math.random() < 0.1) {
    title.style.transform = `rotate(${Math.random() * 4 - 2}deg)`;
    setTimeout(() => {
      title.style.transform = "rotate(-2deg)";
    }, 100);
  }
};

setInterval(glitchTitle, 3000);

// Performance optimization for mobile
let ticking = false;
const updateAnimations = () => {
  // Only update animations if not already updating
  if (!ticking) {
    requestAnimationFrame(() => {
      ticking = false;
    });
    ticking = true;
  }
};

window.addEventListener("scroll", updateAnimations);
window.addEventListener("resize", updateAnimations);
