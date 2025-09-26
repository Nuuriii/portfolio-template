// Simple interaction effects without scroll animations
document.addEventListener("DOMContentLoaded", function () {
  // Add click effect to cards
  const cards = document.querySelectorAll(".bento-card");

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });

  // Dynamic background color change on hover
  const heroCard = document.querySelector(".hero");
  const colors = [
    "var(--bubble-pink)",
    "var(--bubble-blue)",
    "var(--bubble-green)",
    "var(--bubble-purple)",
  ];
  let colorIndex = 0;

  heroCard.addEventListener("mouseenter", function () {
    colorIndex = (colorIndex + 1) % colors.length;
    this.style.background = colors[colorIndex];
  });

  // Skill tag interaction
  const skillTags = document.querySelectorAll(".skill-tag");
  skillTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      const colors = [
        "var(--bubble-pink)",
        "var(--bubble-blue)",
        "var(--bubble-green)",
        "var(--bubble-yellow)",
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      this.style.background = randomColor;

      setTimeout(() => {
        this.style.background = "var(--neo-white)";
      }, 1000);
    });
  });

  // Simple cursor effect
  document.addEventListener("mousemove", function (e) {
    const cursor = document.querySelector(".cursor");
    if (!cursor) {
      const cursorElement = document.createElement("div");
      cursorElement.className = "cursor";
      cursorElement.style.cssText = `
                        position: fixed;
                        width: 20px;
                        height: 20px;
                        background: var(--neo-black);
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 9999;
                        mix-blend-mode: difference;
                        transition: transform 0.1s ease;
                    `;
      document.body.appendChild(cursorElement);
    }

    const cursorEl = document.querySelector(".cursor");
    cursorEl.style.left = e.clientX - 10 + "px";
    cursorEl.style.top = e.clientY - 10 + "px";
  });
});
