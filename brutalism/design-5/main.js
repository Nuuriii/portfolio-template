// Mobile Navigation
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on links
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
  rootMargin: "0px 0px -100px 0px",
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
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simple validation
    if (name && email && message) {
      alert(
        "MESSAGE SENT SUCCESSFULLY!\nThank you for your message. I'll get back to you soon!"
      );
      this.reset();
    } else {
      alert("PLEASE FILL IN ALL FIELDS");
    }
  });

// Dynamic typing effect for hero section
const heroTitle = document.querySelector(".hero h1");
const originalText = heroTitle.textContent;
let index = 0;

function typeWriter() {
  if (index < originalText.length) {
    heroTitle.textContent = originalText.substring(0, index + 1);
    index++;
    setTimeout(typeWriter, 100);
  }
}

// Start typing effect after a short delay
setTimeout(() => {
  heroTitle.textContent = "";
  index = 0;
  typeWriter();
}, 1000);

// Add random glitch effect to section titles
function glitchEffect(element) {
  const originalText = element.textContent;
  const glitchChars = "!@#$%^&*(){}[]|\\:\";'<>?,./";

  let iterations = 0;
  const maxIterations = 10;

  const interval = setInterval(() => {
    element.textContent = originalText
      .split("")
      .map((char, index) => {
        if (index < iterations) {
          return originalText[index];
        }
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      })
      .join("");

    iterations += 1;

    if (iterations > maxIterations) {
      clearInterval(interval);
      element.textContent = originalText;
    }
  }, 50);
}

// Apply glitch effect to section titles on hover
document.querySelectorAll(".section-title").forEach((title) => {
  title.addEventListener("mouseenter", () => {
    glitchEffect(title);
  });
});

// Parallax effect for floating shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll(".floating-shape");

  shapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.2;
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
