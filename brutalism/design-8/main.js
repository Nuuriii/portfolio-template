// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-item a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Simulate form submission
    alert("Thank you for your message! I'll get back to you soon.");
    this.reset();
  });

// Add some interactive effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translate(-8px, -8px)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translate(0, 0)";
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(13, 17, 23, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.backgroundColor = "var(--firebase-darker)";
    navbar.style.backdropFilter = "none";
  }
});

// Dynamic typing effect for hero subtitle
const subtitle = document.querySelector(".subtitle");
const originalText = subtitle.textContent;
const roles = [
  "Full Stack Developer & Firebase Expert",
  "React Specialist & UI/UX Enthusiast",
  "Firebase Expert & Cloud Architect",
  "JavaScript Developer & Problem Solver",
];

let currentRole = 0;
let currentChar = 0;
let isDeleting = false;

function typeEffect() {
  const current = roles[currentRole];

  if (isDeleting) {
    subtitle.textContent = current.substring(0, currentChar - 1);
    currentChar--;
  } else {
    subtitle.textContent = current.substring(0, currentChar + 1);
    currentChar++;
  }

  let typeSpeed = 100;

  if (isDeleting) {
    typeSpeed = 50;
  }

  if (!isDeleting && currentChar === current.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && currentChar === 0) {
    isDeleting = false;
    currentRole = (currentRole + 1) % roles.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}

// Start typing effect after page load
setTimeout(typeEffect, 2000);

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const rate = scrolled * -0.5;

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Add glitch effect to title on hover
const heroTitle = document.querySelector(".hero h1");
if (heroTitle) {
  heroTitle.addEventListener("mouseenter", function () {
    this.style.textShadow = `
                    2px 2px var(--firebase-orange),
                    -2px -2px var(--firebase-amber),
                    4px 4px var(--firebase-yellow)
                `;
    this.style.animation = "glitch 0.3s ease-in-out";
  });

  heroTitle.addEventListener("mouseleave", function () {
    this.style.textShadow = "var(--shadow-brutal) var(--firebase-orange)";
    this.style.animation = "none";
  });
}

// Add CSS for glitch animation
const style = document.createElement("style");
style.textContent = `
            @keyframes glitch {
                0%, 100% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
            }
        `;
document.head.appendChild(style);
