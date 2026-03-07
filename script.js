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
const loadProjects = async () => {
  const projectGrid = document.querySelector("#projects");

  try {
    // Fetching from current directory
    const response = await fetch("./projects.json");
    if (!response.ok) throw new Error("Could not fetch projects.json");

    const projects = await response.json();

    // Clear loading text and inject projects
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

    // Initialize animations for the new project cards
    initScrollReveal();
  } catch (error) {
    console.error("Error:", error);
    projectGrid.innerHTML = `<p style="color:red;">Error loading projects: ${error.message}</p>`;
    // Still run reveal for the hero section even if projects fail
    initScrollReveal();
  }
};

// Start the process
document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
});
