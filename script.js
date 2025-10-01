// Typewriter effect
const roles = [
  "Web Developer 💻",
  "Data Enthusiast 📊",
  "Problem Solver 🧠",
  "Lifelong Learner 📚"
];
let i = 0;
let j = 0;
let currentRole = "";
const typewriterElement = document.querySelector(".typewriter");

function typeEffect() {
  if (i < roles.length) {
    currentRole = roles[i].substring(0, j + 1);
    typewriterElement.textContent = currentRole;

    if (j < roles[i].length) {
      j++;
      setTimeout(typeEffect, 100);
    } else {
      setTimeout(() => {
        j = 0;
        i = (i + 1) % roles.length;
        typeEffect();
      }, 2000);
    }
  }
}
typeEffect();

// Dark mode toggle
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");

  // Apply saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }

  // Toggle theme on button click
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  });
});

