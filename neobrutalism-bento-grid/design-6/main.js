// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
let isDarkTheme = false;

themeToggle.addEventListener("click", () => {
  isDarkTheme = !isDarkTheme;
  body.classList.toggle("dark-theme");
  themeToggle.textContent = isDarkTheme ? "☀️" : "🌙";
  localStorage.setItem("darkTheme", isDarkTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem("darkTheme");
if (savedTheme === "true") {
  body.classList.add("dark-theme");
  themeToggle.textContent = "☀️";
  isDarkTheme = true;
}

// Contact Form
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const formData = new FormData(contactForm);

  // Show success message
  const submitBtn = contactForm.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Terkirim! ✓";
  submitBtn.style.background = "var(--green-primary)";

  // Reset form
  contactForm.reset();

  // Reset button after 3 seconds
  setTimeout(() => {
    submitBtn.textContent = originalText;
    submitBtn.style.background = "var(--pink-primary)";
  }, 3000);
});

// Add click effect to cards
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("mousedown", () => {
    card.style.transform = "scale(0.98)";
  });

  card.addEventListener("mouseup", () => {
    card.style.transform = "scale(1)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
  });
});

// Parallax effect on mouse move (subtle)
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  const translateX = (mouseX - 0.5) * 10;
  const translateY = (mouseY - 0.5) * 10;

  const profileCard = document.querySelector(".profile-card");
  if (profileCard) {
    profileCard.style.transform = `translate(${translateX}px, ${translateY}px)`;
  }
});

// Dynamic greeting based on time
function updateGreeting() {
  const hour = new Date().getHours();
  const profileTitle = document.querySelector(".profile-card .title");

  if (hour >= 5 && hour < 12) {
    profileTitle.textContent = "Creative Developer & Designer ☀️";
  } else if (hour >= 12 && hour < 17) {
    profileTitle.textContent = "Creative Developer & Designer 🌤️";
  } else if (hour >= 17 && hour < 21) {
    profileTitle.textContent = "Creative Developer & Designer 🌅";
  } else {
    profileTitle.textContent = "Creative Developer & Designer 🌙";
  }
}

updateGreeting();

// Stats counter animation (only on first view)
let statsAnimated = false;
const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      animateStats();
    }
  });
}, observerOptions);

const statsCard = document.querySelector(".stats-card");
if (statsCard) {
  observer.observe(statsCard);
}

function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const finalValue = stat.textContent;
    let currentValue = 0;
    const isLarge = finalValue.includes("K");
    const targetValue = isLarge
      ? 500
      : parseInt(finalValue.replace(/[^0-9]/g, ""));
    const increment = targetValue / 50;

    const counter = setInterval(() => {
      currentValue += increment;

      if (currentValue >= targetValue) {
        stat.textContent = finalValue;
        clearInterval(counter);
      } else {
        if (isLarge) {
          stat.textContent = Math.floor(currentValue) + "K+";
        } else {
          stat.textContent = Math.floor(currentValue).toLocaleString();
        }
      }
    }, 30);
  });
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Press 'T' to toggle theme
  if (e.key === "t" || e.key === "T") {
    themeToggle.click();
  }

  // Press 'C' to focus contact form
  if (e.key === "c" || e.key === "C") {
    const firstInput = contactForm.querySelector("input");
    firstInput.focus();
    firstInput.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

// Add ripple effect on click
function createRipple(e) {
  const card = e.currentTarget;
  const ripple = document.createElement("span");
  const rect = card.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  ripple.classList.add("ripple");

  // Add ripple styles
  const style = document.createElement("style");
  style.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }
                
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;

  if (!document.head.querySelector("style[data-ripple]")) {
    style.setAttribute("data-ripple", "");
    document.head.appendChild(style);
  }

  card.style.position = "relative";
  card.style.overflow = "hidden";
  card.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add ripple to all cards
cards.forEach((card) => {
  card.addEventListener("click", createRipple);
});

// Console Easter Egg
console.log(
  "%c🎨 Welcome to my portfolio! 🚀",
  "font-size: 20px; font-weight: bold; color: #FF6B9D;"
);
console.log(
  "%c👨‍💻 Looking for a developer? Let's connect!",
  "font-size: 14px; color: #C66EFC;"
);
