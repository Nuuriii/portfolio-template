// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

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

// Skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    bar.style.width = width + "%";
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-on-scroll");

      // Trigger skill bars animation when about section is visible
      if (entry.target.classList.contains("about")) {
        setTimeout(animateSkillBars, 500);
      }
    }
  });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.backgroundColor = "#FFFFFF";
    navbar.style.backdropFilter = "none";
  }
});

// Form submission
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields!");
      return;
    }

    // Simulate form submission
    const submitBtn = this.querySelector(".btn-primary");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "SENDING...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("Message sent successfully!");
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });

// Geometric shapes animation
function animateShapes() {
  const shapes = document.querySelectorAll(".geometric-shape");

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.5;
    let rotation = 0;

    setInterval(() => {
      rotation += speed;
      shape.style.transform =
        shape.style.transform.replace(/rotate\$[^)]*\$/, "") +
        ` rotate(${rotation}deg)`;
    }, 100);
  });
}

// Initialize animations when page loads
document.addEventListener("DOMContentLoaded", () => {
  animateShapes();

  // Add loading animation
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease-in-out";
    document.body.style.opacity = "1";
  }, 100);
});

// Project card interactions
document.querySelectorAll(".project-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const projectTitle =
      this.closest(".project-card").querySelector(".project-title").textContent;
    alert(
      `Opening project: ${projectTitle}\n\n(This would normally open the project details or external link)`
    );
  });
});

// Button click effects
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple CSS
const style = document.createElement("style");
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Active navigation highlight
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// Add active nav link styles
const navStyle = document.createElement("style");
navStyle.textContent = `
    .nav-link.active {
        background-color: var(--orange-primary);
        color: var(--white);
        border-color: var(--black);
    }
`;
document.head.appendChild(navStyle);
