import { openProjectModal } from "./portfolio-modal.js";

function projectCardHTML(project) {
  const certification = project.certification
    ? '<span class="cert-pill">Certified delivery</span>'
    : "<span></span>";
  return `<article class="project-card" data-categories="${project.categories.join(" ")}">
    <div class="project-card-top"><h3>${project.title}</h3><span class="project-year">${project.year}</span></div>
    <p>${project.summary}</p>
    <div class="tag-row">${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
    <div class="card-footer">${certification}<button class="view-details" data-project="${project.id}">View details <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg></button></div>
  </article>`;
}

export function initProjects(projects) {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = projects.length
    ? projects.map(projectCardHTML).join("")
    : "<p>No projects to show yet - check back soon.</p>";
  grid
    .querySelectorAll("[data-project]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        openProjectModal(button.dataset.project, projects),
      ),
    );

  document.querySelectorAll(".filter-btn").forEach((button) =>
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((item) => item.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      const filter = button.dataset.filter;
      grid.querySelectorAll(".project-card").forEach((card) => {
        card.style.display =
          filter === "all" ||
          card.dataset.categories.split(" ").includes(filter)
            ? ""
            : "none";
      });
    }),
  );
}
