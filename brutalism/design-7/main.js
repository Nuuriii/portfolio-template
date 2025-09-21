// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
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
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe all sections and cards
document
  .querySelectorAll("section, .skill-card, .project-card")
  .forEach((el) => {
    observer.observe(el);
  });

// Active navigation highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.style.borderColor = "transparent";
    link.style.background = "transparent";
    link.style.color = "var(--ethereum-dark)";
    if (link.getAttribute("href") === `#${current}`) {
      link.style.borderColor = "var(--ethereum-dark)";
      link.style.background = "var(--ethereum-blue)";
      link.style.color = "var(--ethereum-white)";
    }
  });
});

// Form submission
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // Simulate form submission
    const submitBtn = this.querySelector("button");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Mengirim...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("Message berhasil dikirim! Terima kasih sudah menghubungi saya.");
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });

// Add some dynamic effects
document.addEventListener("DOMContentLoaded", () => {
  // Add geometric background elements
  const sections = document.querySelectorAll("section");
  sections.forEach((section, index) => {
    if (index % 2 === 0) {
      const geometric = document.createElement("div");
      geometric.className = "geometric-bg";
      geometric.style.top = `${Math.random() * 50 + 20}%`;
      geometric.style.left = `${Math.random() * 50 + 40}%`;
      section.style.position = "relative";
      section.appendChild(geometric);
    }
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  if (hero && heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

// Interactive skill cards
document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translate(-4px, -4px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translate(-2px, -2px) scale(1)";
  });
});

// Project card interactions
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translate(-6px, -6px)";
    this.style.boxShadow = "16px 16px 0px var(--ethereum-dark)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translate(-4px, -4px)";
    this.style.boxShadow = "12px 12px 0px var(--ethereum-dark)";
  });
});
