export function initCertifications(certifications) {
  document.getElementById("certList").innerHTML = certifications
    .map(
      (certification) =>
        `<div class="cert-row"><div class="cert-row-left"><span class="cert-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></svg></span><div><div class="cert-name">${certification.name}</div><div class="cert-issuer">${certification.issuer}</div></div></div><span class="cert-date">${certification.date}</span></div>`,
    )
    .join("");
}
