
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

  // GPU info
  function getWebGLInfo() {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) return "WebGL not supported";
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    return debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : "Renderer info not available";
  }; 

  // behavioural info
  const start = Date.now();
  window.addEventListener("beforeunload", () => {
    const timeSpent = (Date.now() - start) / 1000;
    console.log(`User stayed for ${timeSpent} seconds`);
  });

  // visitor info
  function gatherVisitorInformation() {
  let visitorData = {}

  // call the GPU info function
  visitorData.gpu = getWebGLInfo();

  // geolocation
  navigator.geolocation.getCurrentPosition(pos => {
    console.log(pos.coords.latitude, pos.coords.longitude);
  });

  fetch("https://ipapi.co/json/")
    .then(res => res.json())
    .then(data => console.log(data.ip, data.city, data.country));

  // technical info
  visitorData.userAgent = navigator.userAgent; // broswer and OS
  visitorData.platform = navigator.platform; // OS
  visitorData.language = navigator.language;

  // advanced technical info
  visitorData.deviceMemory = navigator.deviceMemory;
  visitorData.cpuCores = navigator.hardwareConcurrency;
  visitorData.onlineStatus = navigator.onlineStatus;
  visitorData.cookies = navigator.cookieEnabled;
  visitorData.touchSuppot = "ontouchstart" in window;
  visitorData.darkmode = window.matchMedia("(prefers-color-scheme: dark").matches;

  // network info
  if(navigator.connection) {
    visitorData.connection = navigator.connection?.effectiveType;
    visitorData.speed = navigator.connection?.downlink;
    visitorData.latency = navigator.connection?.rtt;
  }

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
