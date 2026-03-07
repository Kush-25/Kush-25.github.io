/**
 * CUSTOM CURSOR LOGIC
 */
const initCursor = () => {
  const cursor = document.querySelector("#custom-cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Add hover effect to all interactive elements
  const addCursorEvents = () => {
    const interactiveElements = document.querySelectorAll(
      "a, .project-card, button",
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
  };

  addCursorEvents();
  // Return the function so we can call it again after projects load
  return addCursorEvents;
};

/**
 * MAGNETIC TILT LOGIC
 */
const applyTilt = (card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
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
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
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
    if (!response.ok) throw new Error("Could not fetch projects.json");

    const projects = await response.json();

    projectGrid.innerHTML = projects
      .map(
        (project) => `
            <div class="project-card reveal">
                <span class="category">${project.category || "Development"}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
                </div>
                <a href="${project.link}" target="_blank" style="display:block; margin-top:20px; color:var(--accent); text-decoration:none; font-size:0.9rem;">View Project ↗</a>
            </div>
        `,
      )
      .join("");

    initScrollReveal();
    document
      .querySelectorAll(".project-card")
      .forEach((card) => applyTilt(card));

    // Refresh cursor listeners for the new cards
    if (refreshCursor) refreshCursor();
  } catch (error) {
    console.error("Error:", error);
    projectGrid.innerHTML = `<p style="color:red;">Error loading projects: ${error.message}</p>`;
    initScrollReveal();
  }
};

// Start the process
document.addEventListener("DOMContentLoaded", () => {
  const refreshCursor = initCursor();
  loadProjects(refreshCursor);
});
