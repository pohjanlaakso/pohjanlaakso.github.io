
console.log("✅ script.js loaded");

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

// synchonous data gathering ie. "the old stuff"
function gatherVisitorInformation() {
let visitorData = {}

  // call the GPU info function
  visitorData.gpu = getWebGLInfo();

  // technical info
  visitorData.userAgent = navigator.userAgent; // broswer and OS
  visitorData.platform = navigator.platform; // OS
  visitorData.language = navigator.language;

  // advanced technical info
  visitorData.deviceMemory = navigator.deviceMemory;
  visitorData.cpuCores = navigator.hardwareConcurrency;
  visitorData.onlineStatus = navigator.onLine;
  visitorData.cookies = navigator.cookieEnabled;
  visitorData.touchSupport = "ontouchstart" in window;
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
}; // gatherVisitorInformation();

// A-synchronous data gathering ie. "the new stuff"
async function fetchAsyncVisitorData() {
  let asyncData = {};

  // ip and location fetch
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    asyncData.ip = data.ip;
    asyncData.city = data.city;
    asyncData.country = data.country;
  } catch(e) {
    asyncData.ip = "failed to fetch IP"
  }

  // geolocation
  asyncData.userGeolocation = await new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      pos => resolve(`${pos.coords.latitude}, ${pos.coords.longitude}`),
      err => resolve(`Geo Error: ${err.message}`),
      { timeout: 5000, enableHighAccuracy: false }
    );

  });
  return asyncData;
};

// main async wrapper and display
async function gatherVisitorInformationAsync() {
  const syncData = gatherVisitorInformation(); // get synchro data first.
  const asyncData = await fetchAsyncVisitorData(); // get A-syncrho data second.
  return { ...syncData, ...asyncData}; // combine and return.
}

// execution
document.addEventListener("DOMContentLoaded", async() => {
  
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

  const finalVisitorData = await gatherVisitorInformationAsync();
  const visitorContainer = document.getElementById("visitor-data");

 if (visitorContainer) {
        let html = "<ul class='space-y-2'>";
        for(const [key, value] of Object.entries(finalVisitorData)) {
            // FIX: Ensure booleans are displayed correctly
            const displayValue = (typeof value === 'boolean') ? (value ? "Yes" : "No") : value;
            html +=`<li><strong>${key}:</strong> ${displayValue}</li>`;
        }
        html += "</ul>"
        visitorContainer.innerHTML = html;
    };

});

// const visitorData = gatherVisitorInformation();
// const visitorContainer = document.getElementById("visitor-data");


