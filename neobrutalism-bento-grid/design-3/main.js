// Simple JavaScript for interactive effects
document.addEventListener("DOMContentLoaded", function () {
  // Add click effects to cards
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("div");
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        pointer-events: none;
                        transform: scale(0);
                        animation: ripple 0.6s ease-out forwards;
                    `;

      card.style.position = "relative";
      card.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS animation for ripple
  const style = document.createElement("style");
  style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
  document.head.appendChild(style);

  // Add hover effects for social buttons
  const socialBtns = document.querySelectorAll(".social-btn");
  socialBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)";
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add dynamic color changing for floating bubbles
  const bubbles = document.querySelectorAll('[class*="bubble-"]');
  const colors = [
    "var(--bg-primary)",
    "var(--bg-secondary)",
    "var(--bg-tertiary)",
    "var(--bg-quaternary)",
    "var(--bg-accent)",
  ];

  setInterval(() => {
    bubbles.forEach((bubble) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      bubble.style.background = randomColor;
    });
  }, 3000);

  // Add parallax effect to floating elements
  document.addEventListener("mousemove", function (e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    bubbles.forEach((bubble, index) => {
      const speed = (index + 1) * 0.5;
      const x = mouseX * speed;
      const y = mouseY * speed;
      bubble.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
});

// Theme customization function
function changeTheme(primaryColor, secondaryColor, tertiaryColor) {
  document.documentElement.style.setProperty("--bg-primary", primaryColor);
  document.documentElement.style.setProperty("--bg-secondary", secondaryColor);
  document.documentElement.style.setProperty("--bg-tertiary", tertiaryColor);
}

// Example usage: changeTheme('#ff6b9d', '#4ecdc4', '#ffe66d');
