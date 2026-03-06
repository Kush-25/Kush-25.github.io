const projects = [
  { name: "Agentic RAG", desc: "Autonomous retrieval system." },
  { name: "CubeTime Android", desc: "Jetpack Compose port." },
];

const list = document.getElementById("project-list");

projects.forEach((p) => {
  const item = document.createElement("p");
  item.innerHTML = `<strong>${p.name}</strong>: ${p.desc}`;
  list.appendChild(item);
});

document.getElementById("color-mode").addEventListener("click", () => {
  document.body.style.filter =
    document.body.style.filter === "invert(1)" ? "invert(0)" : "invert(1)";
});
