// Floating shapes animation
function createFloatingShapes() {
  const shapesContainer = document.getElementById("floating-shapes");
  const shapes = ["circle", "square", "triangle"];
  const colors = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#96ceb4",
    "#ffeaa7",
    "#fd79a8",
  ];

  for (let i = 0; i < 8; i++) {
    const shape = document.createElement("div");
    const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    shape.className = `shape ${shapeType}`;

    if (shapeType !== "triangle") {
      shape.style.width = Math.random() * 30 + 20 + "px";
      shape.style.height = shape.style.width;
      shape.style.backgroundColor = color;
    }

    shape.style.left = Math.random() * 100 + "%";
    shape.style.top = Math.random() * 100 + "%";
    shape.style.animationDelay = Math.random() * 6 + "s";
    shape.style.animationDuration = Math.random() * 4 + 4 + "s";

    shapesContainer.appendChild(shape);
  }
}

// Fade in animation observer
function setupFadeInAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });
}

// Interactive functions
function openContact() {
  alert(
    "Contact form would open here!\n\nEmail: john.doe@example.com\nPhone: +1 (555) 123-4567"
  );
}

function openSocial(platform) {
  const urls = {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    instagram: "https://instagram.com/johndoe",
  };

  // In a real implementation, you would open the actual URLs
  alert(`Opening ${platform.toUpperCase()} profile!\n\nURL: ${urls[platform]}`);
}

// Add hover sound effect (optional)
function addHoverEffects() {
  const bentoItems = document.querySelectorAll(".bento-item");

  bentoItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      // You could add a subtle sound effect here
      item.style.transform = "translate(-4px, -4px) scale(1.02)";
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "";
    });
  });
}

// Add dynamic skill tags animation
function animateSkillTags() {
  const skillTags = document.querySelectorAll(".skill-tag");

  skillTags.forEach((tag, index) => {
    setTimeout(() => {
      tag.style.animation = "fadeIn 0.5s ease forwards";
    }, index * 100);
  });
}

// Add typing effect to hero section
function typeWriter() {
  const text = "CREATIVE DEVELOPER";
  const subtitle = document.querySelector(".subtitle");
  let i = 0;

  subtitle.innerHTML = "";

  function type() {
    if (i < text.length) {
      subtitle.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  }

  setTimeout(type, 1000);
}

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function () {
  createFloatingShapes();
  setupFadeInAnimation();
  addHoverEffects();
  setTimeout(animateSkillTags, 500);
  typeWriter();

  // Add some random movement to shapes
  setInterval(() => {
    const shapes = document.querySelectorAll(".shape");
    shapes.forEach((shape) => {
      const currentLeft = parseFloat(shape.style.left);
      const currentTop = parseFloat(shape.style.top);

      shape.style.left = currentLeft + (Math.random() - 0.5) * 2 + "%";
      shape.style.top = currentTop + (Math.random() - 0.5) * 2 + "%";
    });
  }, 10000);
});

// Add CSS animation keyframes for skill tags
const style = document.createElement("style");
style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
document.head.appendChild(style);
