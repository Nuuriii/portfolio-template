// Simple JavaScript for interactions
function openProject(projectId) {
  alert(
    `Opening ${projectId} - In a real implementation, this would open a modal or navigate to project details.`
  );
}

// Add some interactive hover effects
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translate(-2px, -2px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translate(0, 0)";
    });
  });

  // Simple click feedback for clickable cards
  const clickableCards = document.querySelectorAll(".card.clickable");
  clickableCards.forEach((card) => {
    card.addEventListener("mousedown", function () {
      this.style.transform = "translate(2px, 2px)";
      this.style.boxShadow = "4px 4px 0px #000";
    });

    card.addEventListener("mouseup", function () {
      this.style.transform = "translate(-2px, -2px)";
      this.style.boxShadow = "12px 12px 0px #000";
    });
  });
});

// Responsive grid adjustment
function adjustGrid() {
  const container = document.querySelector(".container");
  const width = window.innerWidth;

  if (width <= 480) {
    container.style.gridTemplateColumns = "1fr";
  } else if (width <= 768) {
    container.style.gridTemplateColumns = "repeat(4, 1fr)";
  } else if (width <= 1200) {
    container.style.gridTemplateColumns = "repeat(8, 1fr)";
  } else {
    container.style.gridTemplateColumns = "repeat(12, 1fr)";
  }
}

window.addEventListener("resize", adjustGrid);
adjustGrid(); // Call on load
