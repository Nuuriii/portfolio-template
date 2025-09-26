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

// Add click effect to bento items
document.querySelectorAll(".bento-item").forEach((item) => {
  item.addEventListener("click", function () {
    this.style.transform = "translate(-2px, -2px)";
    this.style.boxShadow = "10px 10px 0px #000";

    setTimeout(() => {
      this.style.transform = "";
      this.style.boxShadow = "";
    }, 150);
  });
});

// Dynamic greeting based on time
function updateGreeting() {
  const hour = new Date().getHours();
  const heroTitle = document.querySelector(".hero h1");

  if (hour < 12) {
    heroTitle.textContent = "Selamat Pagi! Saya Alex";
  } else if (hour < 17) {
    heroTitle.textContent = "Selamat Siang! Saya Alex";
  } else {
    heroTitle.textContent = "Selamat Malam! Saya Alex";
  }
}

// Initialize greeting on page load
updateGreeting();

// Add typing effect to hero subtitle
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

// Initialize typing effect
window.addEventListener("load", () => {
  const subtitle = document.querySelector(".hero p");
  const originalText = subtitle.textContent;
  typeWriter(subtitle, originalText, 50);
});

// Add hover sound effect (optional - requires audio files)
document.querySelectorAll(".btn, .social-link").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    // Add subtle visual feedback
    element.style.transform = "scale(1.05)";
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "scale(1)";
  });
});

// Contact form handling (if you add a form later)
function handleContact() {
  // Add contact form logic here
  alert("Terima kasih! Pesan Anda akan segera dibalas.");
}

// Performance optimization: Lazy loading for images (if you add them later)
if ("IntersectionObserver" in window) {
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

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}
