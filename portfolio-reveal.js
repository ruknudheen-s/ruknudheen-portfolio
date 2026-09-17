export function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  elements.forEach((element, index) =>
    element.style.setProperty("--delay", `${Math.min(index * 80, 240)}ms`),
  );
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("in"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  elements.forEach((element) => observer.observe(element));
}
