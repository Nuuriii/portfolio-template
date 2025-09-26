// Simple project modal functionality
function openProject(projectId) {
  const projects = {
    ecommerce: {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and Stripe integration.",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      link: "#",
    },
    portfolio: {
      title: "Creative Portfolio",
      description:
        "Interactive portfolio website for artists with gallery and booking system.",
      tech: ["Next.js", "Sanity CMS", "Framer Motion", "Vercel"],
      link: "#",
    },
    dashboard: {
      title: "Analytics Dashboard",
      description:
        "Real-time analytics dashboard with data visualization and reporting features.",
      tech: ["Vue.js", "D3.js", "Python", "PostgreSQL", "Docker"],
      link: "#",
    },
    mobile: {
      title: "Mobile App",
      description:
        "Task management mobile app with collaboration features and real-time sync.",
      tech: ["React Native", "Firebase", "Redux", "Push Notifications"],
      link: "#",
    },
  };

  const project = projects[projectId];
  alert(
    `${project.title}\n\n${
      project.description
    }\n\nTech Stack: ${project.tech.join(", ")}`
  );
}

// Simple contact form handling
document.addEventListener("DOMContentLoaded", function () {
  // Add some interactive behaviors
  const bentoItems = document.querySelectorAll(".bento-item");

  bentoItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px) scale(1.02)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Social links click handling
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.href === "#") {
        e.preventDefault();
        alert("Link akan mengarah ke profil social media yang sebenarnya!");
      }
    });
  });

  // Add some dynamic content updates
  const stats = document.querySelectorAll(".stat-number");
  stats.forEach((stat) => {
    const originalNumber = stat.textContent;
    stat.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.2)";
      this.style.transition = "transform 0.2s ease";
    });

    stat.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });
});

// Simple theme switcher (bonus feature)
let currentTheme = "bubble-gum";

function switchTheme() {
  const root = document.documentElement;
  if (currentTheme === "bubble-gum") {
    // Switch to dark mode
    root.style.setProperty("--primary-pink", "#E11D48");
    root.style.setProperty("--primary-purple", "#7C3AED");
    root.style.setProperty("--primary-blue", "#1D4ED8");
    root.style.setProperty("--bg-light", "#1F1F1F");
    root.style.setProperty("--text-dark", "#FEFEFE");
    currentTheme = "dark";
  } else {
    // Switch back to bubble gum
    root.style.setProperty("--primary-pink", "#FF6B9D");
    root.style.setProperty("--primary-purple", "#A855F7");
    root.style.setProperty("--primary-blue", "#3B82F6");
    root.style.setProperty("--bg-light", "#FEFEFE");
    root.style.setProperty("--text-dark", "#1F1F1F");
    currentTheme = "bubble-gum";
  }
}

// Add keyboard shortcuts
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === "t") {
    e.preventDefault();
    switchTheme();
  }
});
