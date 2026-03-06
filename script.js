const myProjects = [
  {
    title: "Agentic RAG System",
    desc: "Autonomous retrieval-augmented generation system built for complex query synthesis.",
    tech: "Python • LangChain",
  },
  {
    title: "CubeTime Android",
    desc: "A high-performance Rubik's Cube timer ported to Android using Jetpack Compose.",
    tech: "Kotlin • Jetpack Compose",
  },
  {
    title: "Arch Linux Config",
    desc: "Customized rolling release setup for AI development on ThinkPad X13.",
    tech: "Bash • Lua • Rice",
  },
];

const grid = document.getElementById("project-grid");

myProjects.forEach((project) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
        <code style="font-size: 0.75rem; color: #58a6ff;">${project.tech}</code>
    `;
  grid.appendChild(card);
});
