// Intersection Observer for fade-in animations
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

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const btnLoading = document.getElementById("btnLoading");

  // Show loading state
  btnText.style.display = "none";
  btnLoading.style.display = "inline-block";
  submitBtn.disabled = true;

  // Get form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Simulate API call
  setTimeout(() => {
    // Hide loading state
    btnText.style.display = "inline-block";
    btnLoading.style.display = "none";
    submitBtn.disabled = false;

    // Show success message
    alert(
      "Terima kasih! Pesan Anda telah terkirim. Saya akan segera merespons."
    );

    // Reset form
    this.reset();
  }, 2000);
});

// Add hover effects for bento items
document.querySelectorAll(".bento-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.02)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Smooth scrolling for anchor links
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

// Dynamic greeting based on time
function updateGreeting() {
  const hour = new Date().getHours();
  const headerText = document.querySelector(".header p");
  let greeting = "Full Stack Laravel Developer";

  if (hour < 12) {
    greeting = "Selamat Pagi! " + greeting;
  } else if (hour < 17) {
    greeting = "Selamat Siang! " + greeting;
  } else {
    greeting = "Selamat Malam! " + greeting;
  }

  headerText.textContent = greeting;
}

// Initialize greeting
updateGreeting();

// Add parallax effect to background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = scrolled * 0.5;
  document.body.style.backgroundPosition = `center ${parallax}px`;
});

// Skills animation on hover
document.querySelectorAll(".skill-tag").forEach((skill) => {
  skill.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1) rotate(2deg)";
    this.style.boxShadow = "0 5px 15px rgba(255, 45, 32, 0.3)";
  });

  skill.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) rotate(0deg)";
    this.style.boxShadow = "none";
  });
});

// Social links interaction
document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const linkName = this.textContent;
    alert(`Mengarahkan ke profil ${linkName}...`);
  });
});

// Add typing effect to header
function typeWriter(text, element, speed = 100) {
  let i = 0;
  element.textContent = "";
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect on page load
window.addEventListener("load", () => {
  const nameElement = document.querySelector(".header h1");
  typeWriter("John Doe", nameElement, 150);
});

// Add counter animation for statistics
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent =
        Math.floor(start) + (element.textContent.includes("+") ? "+" : "");
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent =
        target + (element.textContent.includes("+") ? "+" : "");
    }
  }

  updateCounter();
}

// Trigger counter animation when statistics card is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const numbers = entry.target.querySelectorAll(".stat-number");
      numbers.forEach((number) => {
        const text = number.textContent;
        const target = parseInt(text.replace(/\D/g, ""));
        if (target) {
          animateCounter(number, target);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(".bento-item").forEach((item) => {
  if (item.querySelector(".stat-number")) {
    statsObserver.observe(item);
  }
});
