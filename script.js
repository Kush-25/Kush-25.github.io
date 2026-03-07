/**
 * DYNAMIC TECH ICONS HELPER
 */
const getTechIcon = (techName) => {
  const slug = techName.toLowerCase().replace(/ /g, "").replace(/\./g, "dot");
  return `<img class="tech-icon" src="https://cdn.simpleicons.org/${slug}" alt="${techName}" onerror="this.style.display='none'">`;
};

/**
 * CUSTOM CURSOR LOGIC
 */
const initCursor = () => {
  const cursor = document.querySelector("#custom-cursor");
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
  const addCursorEvents = () => {
    document.querySelectorAll("a, .project-card, button").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
  };
  addCursorEvents();
  return addCursorEvents;
};

/**
 * TERMINAL MODE TOGGLE
 */
const initTerminalMode = () => {
  const toggle = document.querySelector("#terminal-toggle");
  const body = document.body;
  if (localStorage.getItem("terminal-mode") === "enabled")
    body.classList.add("terminal-mode");
  toggle.addEventListener("click", () => {
    body.classList.toggle("terminal-mode");
    localStorage.setItem(
      "terminal-mode",
      body.classList.contains("terminal-mode") ? "enabled" : "disabled",
    );
  });
};

/**
 * MAGNETIC TILT LOGIC
 */
const applyTilt = (card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left,
      y = e.clientY - rect.top;
    const centerX = rect.width / 2,
      centerY = rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${(y - centerY) / 12}deg) rotateY(${(centerX - x) / 12}deg) translateY(-8px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  });
};

/**
 * REVEAL ANIMATION LOGIC
 */
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
    if (!response.ok) throw new Error("Fetch failed");
    const projects = await response.json();

    projectGrid.innerHTML = projects
      .map(
        (p) => `
            <div class="project-card reveal">
                <span class="category">${p.category || "Project"}</span>
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <div class="tech-stack" style="display:flex; flex-wrap:wrap; gap:8px; margin-top:15px;">
                    ${p.tech.map((t) => `<span class="tech-tag">${getTechIcon(t)} ${t}</span>`).join("")}
                </div>
                <a href="${p.link}" target="_blank" style="display:block; margin-top:20px; color:var(--accent); text-decoration:none; font-size:0.85rem; font-weight:600;">SOURCE CODE ↗</a>
            </div>
        `,
      )
      .join("");

    initScrollReveal();
    document
      .querySelectorAll(".project-card")
      .forEach((card) => applyTilt(card));
    if (refreshCursor) refreshCursor();
  } catch (e) {
    projectGrid.innerHTML = `<p style="color:red;">Error: ${e.message}</p>`;
    initScrollReveal();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const refreshCursor = initCursor();
  initTerminalMode();
  loadProjects(refreshCursor);
});
