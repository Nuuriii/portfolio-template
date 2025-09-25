// Mobile Menu Toggle
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.getElementById("navLinks");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
});

// Smooth Scrolling
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

// Fade In Animation on Scroll
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

// Form Submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Simple form validation
  if (name && email && message) {
    alert("Thank you for your message! I will get back to you soon.");
    contactForm.reset();
  } else {
    alert("Please fill in all fields.");
  }
});

// Dynamic Project Card Hover Effect
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "rotate(0deg) translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    const isEven = Array.from(projectCards).indexOf(card) % 2 === 1;
    const rotation = isEven ? "rotate(1deg)" : "rotate(-1deg)";
    card.style.transform = rotation;
  });
});

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  if (hero && heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add active state to navigation
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Random project card animation on page load
window.addEventListener("load", () => {
  setTimeout(() => {
    projectCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.animation = "float 3s ease-in-out infinite";
        card.style.animationDelay = `${index * 0.2}s`;
      }, index * 100);
    });
  }, 1000);
});

// Typing effect for hero title (optional enhancement)
const heroTitle = document.querySelector(".hero-content h1");
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = "";

  setTimeout(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    typeWriter();
  }, 1000);
}
