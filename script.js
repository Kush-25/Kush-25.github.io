/**
 * 3D CUBE SCROLL ENGINE
 */
const initCubeScroll = () => {
  const cube = document.querySelector("#cube-container");

  window.addEventListener("scroll", () => {
    const scrollPercent =
      window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight);

    // Rotates the cube based on scroll
    const rotateX = -20 + scrollPercent * 360;
    const rotateY = 45 + scrollPercent * 720;

    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
};

/**
 * GITHUB ACTIVITY (Placeholder for the next feature)
 */
const fetchGithubActivity = async () => {
  const commitText = document.querySelector("#latest-commit");
  try {
    // We will implement the real API call in the next push
    commitText.textContent =
      "git log --oneline: Initialized Portfolio Engine...";
  } catch (e) {
    commitText.textContent = "git status: offline";
  }
};

/**
 * TECH ICONS HELPER
 */
const getTechIcon = (techName) => {
  const slug = techName.toLowerCase().replace(/ /g, "").replace(/\./g, "dot");
  return `<img class="tech-icon" src="https://cdn.simpleicons.org/${slug}" alt="" onerror="this.style.display='none'">`;
};

/**
 * INTERACTION LOGIC
 */
const initCursor = () => {
  const cursor = document.querySelector("#custom-cursor");
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
  const addEvents = () => {
    document.querySelectorAll("a, .project-card, button").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
  };
  addEvents();
  return addEvents;
};

const initTerminalMode = () => {
  const toggle = document.querySelector("#terminal-toggle");
  if (localStorage.getItem("terminal-mode") === "enabled")
    document.body.classList.add("terminal-mode");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("terminal-mode");
    localStorage.setItem(
      "terminal-mode",
      document.body.classList.contains("terminal-mode")
        ? "enabled"
        : "disabled",
    );
  });
};

const initScrollReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
};

/**
 * PROJECT LOADER
 */
const loadProjects = async (refreshCursor) => {
  const projectGrid = document.querySelector("#projects");
  try {
    const response = await fetch("./projects.json");
    const projects = await response.json();
    projectGrid.innerHTML = projects
      .map(
        (p) => `
            <div class="project-card reveal">
                <span class="category">${p.category}</span>
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <div class="tech-stack">
                    ${p.tech.map((t) => `<span class="tech-tag">${getTechIcon(t)} ${t}</span>`).join("")}
                </div>
                <a href="${p.link}" target="_blank" style="display:block; margin-top:20px; color:var(--accent); text-decoration:none; font-size:0.85rem; font-weight:600;">SOURCE ↗</a>
            </div>
        `,
      )
      .join("");
    initScrollReveal();
    if (refreshCursor) refreshCursor();
  } catch (e) {
    console.error(e);
  }
};

// Main Execution
document.addEventListener("DOMContentLoaded", () => {
  const refreshCursor = initCursor();
  initTerminalMode();
  initCubeScroll();
  loadProjects(refreshCursor);
  fetchGithubActivity();
});
