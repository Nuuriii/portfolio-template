// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");

mobileMenuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    // Close mobile menu if open
    navMenu.classList.remove("active");
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

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Simulate form submission
  alert("Thank you for your message! I will get back to you soon.");
  this.reset();
});

// Add some interactive effects
document.querySelectorAll(".brutal-box").forEach((box) => {
  box.addEventListener("mouseenter", function () {
    this.style.transform =
      "translate(-4px, -4px) rotate(" + (Math.random() * 4 - 2) + "deg)";
  });

  box.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });
});

// Navbar scroll effect
let lastScrollY = window.scrollY;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }

  lastScrollY = currentScrollY;
});

// Add typing effect to hero title
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

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  const originalText = heroTitle.textContent;
  typeWriter(heroTitle, originalText, 150);
});

// Random rotation for skill cards
document.querySelectorAll(".skill-card").forEach((card, index) => {
  card.style.transform = `rotate(${Math.random() * 6 - 3}deg)`;

  card.addEventListener("mouseenter", function () {
    this.style.transform = "rotate(0deg) scale(1.05)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = `rotate(${Math.random() * 6 - 3}deg)`;
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero::before");
  const speed = scrolled * 0.5;

  if (parallax) {
    document.querySelector(".hero").style.transform = `translateY(${speed}px)`;
  }
});

// Add glitch effect to logo on hover
const logo = document.querySelector(".logo");
logo.addEventListener("mouseenter", function () {
  this.style.textShadow = "2px 0 #3ECF8E, -2px 0 #1A1A1A";
  setTimeout(() => {
    this.style.textShadow = "";
  }, 200);
});

// Console message for developers
console.log(`
        🎨 Brutalism Portfolio Template
        ================================
        Built with vanilla HTML, CSS, and JavaScript
        Featuring Supabase color scheme
        
        Feel free to customize and make it your own!
        `);
