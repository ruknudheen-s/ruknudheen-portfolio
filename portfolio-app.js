import { resumeData, CONTACT_FORM_ENDPOINT } from "./portfolio-data.js";
import { initTheme } from "./portfolio-theme.js";
import { initNavigation } from "./portfolio-navigation.js";
import { initModal } from "./portfolio-modal.js";
import { initProjects } from "./portfolio-projects.js";
import { initCertifications } from "./portfolio-certifications.js";
import { initContactForm } from "./portfolio-contact.js";
import { initReveal } from "./portfolio-reveal.js";

initTheme();
initNavigation();
initModal();
initProjects(resumeData.projects);
initCertifications(resumeData.certifications);
initContactForm(CONTACT_FORM_ENDPOINT);
initReveal();
document.getElementById("year").textContent = new Date().getFullYear();
