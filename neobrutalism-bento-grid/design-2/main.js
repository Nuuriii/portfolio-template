// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest("nav")) {
    navLinks.classList.remove("active");
  }
});

// Smooth scrolling untuk navigation links
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
    // Close mobile menu after clicking
    navLinks.classList.remove("active");
  });
});

// Contact form submission
document.querySelector(".contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Simple form validation and feedback
  const inputs = e.target.querySelectorAll("input, textarea");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.style.background = "#ffcccb";
      setTimeout(() => {
        input.style.background = "";
      }, 2000);
    }
  });

  if (isValid) {
    // Success feedback
    const submitBtn = e.target.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Terkirim! ✓";
    submitBtn.style.background = "var(--bubble-mint)";

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = "";
      e.target.reset();
    }, 3000);
  }
});

// Add interactive hover effects for bento items
document.querySelectorAll(".bento-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "translate(-4px, -4px) scale(1.02)";
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "";
  });
});

// Dynamic color changes for project cards
const projectCards = document.querySelectorAll(".project-card");
const colors = [
  "var(--bubble-pink)",
  "var(--bubble-purple)",
  "var(--bubble-mint)",
  "var(--bubble-orange)",
];

projectCards.forEach((card, index) => {
  card.addEventListener("mouseenter", () => {
    card.style.background = colors[index % colors.length];
    card.style.color = "white";
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "";
    card.style.color = "";
  });
});

// Add typing effect for hero text (without scroll trigger)
function addTypingEffect() {
  const heroTitle = document.querySelector(".hero h1");
  const text = heroTitle.textContent;
  heroTitle.textContent = "";

  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  // Start typing effect after page load
  setTimeout(typeWriter, 1000);
}

// Initialize typing effect when page loads
window.addEventListener("load", addTypingEffect);

// Add random bubble decorations
function createBubble() {
  const bubble = document.createElement("div");
  const colors = [
    "var(--bubble-pink)",
    "var(--bubble-purple)",
    "var(--bubble-mint)",
    "var(--bubble-yellow)",
    "var(--bubble-orange)",
  ];

  bubble.style.position = "fixed";
  bubble.style.width = Math.random() * 20 + 10 + "px";
  bubble.style.height = bubble.style.width;
  bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
  bubble.style.borderRadius = "50%";
  bubble.style.opacity = "0.1";
  bubble.style.pointerEvents = "none";
  bubble.style.zIndex = "-1";
  bubble.style.left = Math.random() * 100 + "vw";
  bubble.style.top = "100vh";
  bubble.style.transition = "transform 6s linear";

  document.body.appendChild(bubble);

  setTimeout(() => {
    bubble.style.transform = "translateY(-110vh)";
  }, 100);

  setTimeout(() => {
    document.body.removeChild(bubble);
  }, 6000);
}

// Create bubbles periodically
setInterval(createBubble, 3000);
