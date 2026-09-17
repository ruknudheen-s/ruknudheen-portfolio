let modalState;

export function initModal() {
  modalState = {
    backdrop: document.getElementById("modalBackdrop"),
    modal: document.getElementById("modal"),
    title: document.getElementById("modalTitle"),
    year: document.getElementById("modalYear"),
    body: document.getElementById("modalBody"),
    close: document.getElementById("modalClose"),
    lastFocused: null,
  };
  modalState.close.addEventListener("click", closeProjectModal);
  modalState.backdrop.addEventListener("click", (event) => {
    if (event.target === modalState.backdrop) closeProjectModal();
  });
}

export function openProjectModal(id, projects) {
  const project = projects.find((item) => item.id === id);
  if (!project) return;
  modalState.lastFocused = document.activeElement;
  modalState.title.textContent = project.title;
  modalState.year.textContent = project.year;
  const links =
    project.links.github || project.links.demo
      ? `<div class="modal-section"><h4>Links</h4><div class="tag-row">${project.links.github ? `<a class="tag" href="${project.links.github}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ""}${project.links.demo ? `<a class="tag" href="${project.links.demo}" target="_blank" rel="noopener noreferrer">Live demo</a>` : ""}</div></div>`
      : "";
  modalState.body.innerHTML = `<div class="modal-section"><h4>Overview</h4><p>${project.overview}</p></div><div class="modal-section"><h4>Objective</h4><p>${project.objective}</p></div><div class="modal-section"><h4>Contribution &amp; key work</h4><ul>${project.contributions.map((item) => `<li>${item}</li>`).join("")}</ul></div><div class="modal-section"><h4>Technologies</h4><div class="tag-row">${project.tech.map((item) => `<span class="tag">${item}</span>`).join("")}</div></div>${project.certification ? `<div class="modal-section"><h4>Certification</h4><p>${project.certification}</p></div>` : ""}${links}`;
  modalState.backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
  modalState.close.focus();
  document.addEventListener("keydown", trapFocus);
}

function closeProjectModal() {
  modalState.backdrop.classList.remove("open");
  document.body.style.overflow = "";
  document.removeEventListener("keydown", trapFocus);
  modalState.lastFocused?.focus();
}

function trapFocus(event) {
  if (event.key === "Escape") return closeProjectModal();
  if (event.key !== "Tab") return;
  const focusables = modalState.modal.querySelectorAll(
    'a, button, input, textarea, [tabindex]:not([tabindex="-1"])',
  );
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
