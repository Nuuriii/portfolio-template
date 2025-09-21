// Mobile menu toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

// Smooth scrolling
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

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
  .forEach((el) => {
    observer.observe(el);
  });

// Add stagger animation to project cards
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`;
});

// Form submission
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const name = formData.get("name");
  const email = formData.get("email");
  const project = formData.get("project");
  const message = formData.get("message");

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  // Simulate form submission
  alert("Thanks for your message! I'll get back to you soon.");
  this.reset();
});

// Add some interactive elements
document.querySelectorAll(".skill-item").forEach((skill) => {
  skill.addEventListener("mouseenter", function () {
    this.style.transform = "rotate(0deg) scale(1.1)";
  });

  skill.addEventListener("mouseleave", function () {
    const rotation = Math.random() > 0.5 ? "2deg" : "-2deg";
    this.style.transform = `rotate(${rotation}) scale(1)`;
  });
});

// Parallax effect for geometric shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  document.querySelectorAll(".shape").forEach((shape, index) => {
    const speed = (index + 1) * 0.3;
    shape.style.transform += ` translateY(${rate * speed}px)`;
  });
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

// Initialize typing effect on page load
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero h1");
  const originalText = heroTitle.innerHTML;
  typeWriter(heroTitle, originalText.replace(/<[^>]*>/g, ""), 50);
});
