// Portfolio JavaScript - Green Poison Neobrutalism
document.addEventListener("DOMContentLoaded", function () {
  // Smooth hover effects untuk grid items
  const gridItems = document.querySelectorAll(".grid-item");

  gridItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translate(-3px, -3px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translate(0, 0)";
    });
  });

  // Project click handlers
  const projects = document.querySelectorAll(".project");

  projects.forEach((project) => {
    project.addEventListener("click", function () {
      const projectTitle = this.querySelector(".project-title").textContent;
      alert(`Opening project: ${projectTitle}`);
      // Di sini bisa ditambahkan logic untuk membuka modal atau redirect
    });
  });

  // Social link tracking
  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const platform = this.textContent.trim();
      console.log(`Clicked on ${platform}`);
      // Di sini bisa ditambahkan analytics tracking
    });
  });

  // Contact button handlers
  const hireButton = document.querySelector(".btn-secondary");
  const viewProjectButton = document.querySelector(".btn-primary");

  if (hireButton) {
    hireButton.addEventListener("click", function () {
      // Bisa redirect ke contact form atau WhatsApp
      window.open(
        "mailto:hello@johndoe.com?subject=Hire Inquiry&body=Hi, I would like to discuss a project with you.",
        "_blank"
      );
    });
  }

  if (viewProjectButton) {
    viewProjectButton.addEventListener("click", function () {
      alert("Opening featured project...");
      // Logic untuk membuka project detail
    });
  }

  // Dynamic status indicator
  const statusDot = document.querySelector(".status-dot");

  if (statusDot) {
    // Simulasi status update
    setInterval(() => {
      statusDot.style.boxShadow =
        statusDot.style.boxShadow === "none"
          ? "0 0 15px var(--poison-green)"
          : "none";
    }, 2000);
  }

  // Responsive grid adjustments
  function handleResize() {
    const container = document.querySelector(".container");
    const width = window.innerWidth;

    // Dynamic gap adjustments
    if (width < 480) {
      container.style.gap = "10px";
    } else if (width < 768) {
      container.style.gap = "15px";
    } else {
      container.style.gap = "20px";
    }
  }

  window.addEventListener("resize", handleResize);
  handleResize(); // Initial call

  // Keyboard navigation support
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  document.addEventListener("mousedown", function () {
    document.body.classList.remove("keyboard-navigation");
  });

  // Simple form validation jika ada contact form
  const contactForm = document.querySelector("#contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = this.querySelector('input[name="name"]').value;
      const email = this.querySelector('input[name="email"]').value;
      const message = this.querySelector('textarea[name="message"]').value;

      if (!name || !email || !message) {
        alert("Please fill in all fields");
        return;
      }

      // Process form submission
      console.log("Form submitted:", { name, email, message });
      alert("Message sent successfully!");
    });
  }

  // Performance optimization - lazy loading untuk images
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Theme customization (optional)
  const themeToggle = document.querySelector("#themeToggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("theme-alt");
    });
  }

  console.log("Portfolio loaded successfully! 🚀");
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth scrolling untuk internal links (jika ada)
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Export functions untuk penggunaan global
window.portfolioUtils = {
  debounce,
  smoothScroll,
};
