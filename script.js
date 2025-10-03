
console.log("✅ script.js loaded");

document.addEventListener("DOMContentLoaded", () => {

  // typewriter effect
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
  }; typeEffect();

  // dark mode toggle
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

  // visitor info
  function gatherVisitorInformation() {
  let visitorData = {}

  // technical info
  visitorData.userAgent = navigator.userAgent; // broswer and OS
  visitorData.platform = navigator.platform; // OS
  visitorData.language = navigator.language;

  // display info
  visitorData.screenWidth = screen.width;
  visitorData.screenHeight = screen.height;
  visitorData.colorDepth = screen.colorDepth;

  // session info
  visitorData.pageURL = document.URL; // current page
  visitorData.referrer = document.referrer; // previous page
  visitorData.title = document.title; //title of current page

  // time and location info
  try {
    visitorData.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch(e) {
    visitorData.timeZone = 'not available'
  }
  return visitorData;
}; gatherVisitorInformation();




const visitorData = gatherVisitorInformation();
const visitorContainer = document.getElementById("visitor-data");

if (visitorContainer) {
    let html = "<ul class='space-y-2'>";
    for(const [key, value] of Object.entries(visitorData)) {
      html +=`<li><strong>${key}:</strong> ${value}</li>`;
    }
    html += "</ul>"
    visitorContainer.innerHTML = html;
  }

});
