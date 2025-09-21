// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
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

// Scroll Animations
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

// Custom Cursor
const cursor = document.querySelector(".cursor");
const hoverElements = document.querySelectorAll(
  "a, button, .project-card, .skill-card, .contact-item"
);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

// Parallax Effect for Background Elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero::before");

  // Header background on scroll
  const header = document.querySelector(".header");
  if (scrolled > 100) {
    header.style.backgroundColor = "rgba(225, 0, 152, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.backgroundColor = "#e10098";
    header.style.backdropFilter = "none";
  }
});

// Dynamic Text Animation
const dynamicTexts = [
  "CREATIVE DEVELOPER",
  "UI/UX DESIGNER",
  "FULL STACK DEV",
  "PROBLEM SOLVER",
];

let currentTextIndex = 0;
const heroTitle = document.querySelector(".hero-text h1 span");

function changeText() {
  heroTitle.style.opacity = "0";
  setTimeout(() => {
    heroTitle.textContent = dynamicTexts[currentTextIndex];
    heroTitle.style.opacity = "1";
    currentTextIndex = (currentTextIndex + 1) % dynamicTexts.length;
  }, 300);
}

// Change text every 3 seconds
setInterval(changeText, 3000);

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Trigger initial animations
  setTimeout(() => {
    document.querySelectorAll(".fade-in").forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, index * 100);
    });
  }, 500);
});

// Project Cards Interactive Effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// Skills Animation on Scroll
const skillsGrid = document.querySelector(".skills-grid");
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      const skills = entry.target.querySelectorAll(".skill-card");
      skills.forEach((skill, index) => {
        setTimeout(() => {
          skill.style.opacity = "1";
          skill.style.transform =
            "translateY(0) rotate(" + (Math.random() * 4 - 2) + "deg)";
        }, index * 100);
      });
    }
  });
});

if (skillsGrid) {
  skillsObserver.observe(skillsGrid);

  // Initially hide skills for animation
  document.querySelectorAll(".skill-card").forEach((skill) => {
    skill.style.opacity = "0";
    skill.style.transform = "translateY(20px)";
    skill.style.transition = "all 0.5s ease";
  });
}
