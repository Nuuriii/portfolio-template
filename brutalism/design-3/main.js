// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
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

// Fade in animation on scroll
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

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Skill progress animation
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll(".skill-progress");
        progressBars.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          setTimeout(() => {
            bar.style.width = width;
          }, 500);
        });
      }
    });
  },
  { threshold: 0.5 }
);

const skillsSection = document.querySelector("#skills");
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Contact form submission
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Message sent! Thank you for reaching out.");
  contactForm.reset();
});

// Typing animation restart on scroll
const heroSection = document.querySelector("#home");
const typingElement = document.querySelector(".typing-animation");

const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        typingElement.style.animation = "none";
        setTimeout(() => {
          typingElement.style.animation =
            "typing 3s steps(40, end), blink 0.75s step-end infinite";
        }, 100);
      }
    });
  },
  { threshold: 0.5 }
);

heroObserver.observe(heroSection);

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 8px 0 var(--black), 0 0 20px rgba(0,0,0,0.3)";
  } else {
    navbar.style.boxShadow = "0 8px 0 var(--black)";
  }
});

// Random geometric background elements
function createFloatingElements() {
  const hero = document.querySelector(".hero");
  for (let i = 0; i < 5; i++) {
    const element = document.createElement("div");
    element.style.position = "absolute";
    element.style.width = Math.random() * 100 + 20 + "px";
    element.style.height = Math.random() * 100 + 20 + "px";
    element.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    element.style.border = "3px solid rgba(0, 0, 0, 0.2)";
    element.style.left = Math.random() * 100 + "%";
    element.style.top = Math.random() * 100 + "%";
    element.style.transform = `rotate(${Math.random() * 360}deg)`;
    element.style.zIndex = "1";
    hero.appendChild(element);
  }
}

// Initialize floating elements
createFloatingElements();
