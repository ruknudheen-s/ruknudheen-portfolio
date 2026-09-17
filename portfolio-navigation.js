export function initNavigation() {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const menuOpen = document.getElementById("menuIconOpen");
  const menuClose = document.getElementById("menuIconClose");

  function setNav(open) {
    navLinks.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuOpen.style.display = open ? "none" : "block";
    menuClose.style.display = open ? "block" : "none";
  }

  navToggle.addEventListener("click", () =>
    setNav(!navLinks.classList.contains("open")),
  );
  document
    .querySelectorAll("[data-nav]")
    .forEach((anchor) => anchor.addEventListener("click", () => setNav(false)));

  const sections = [
    "home",
    "about",
    "skills",
    "projects",
    "education",
    "certifications",
    "contact",
  ]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navAnchors = Array.from(document.querySelectorAll("[data-nav]"));
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((anchor) =>
          anchor.classList.toggle(
            "active",
            anchor.getAttribute("href") === `#${entry.target.id}`,
          ),
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
