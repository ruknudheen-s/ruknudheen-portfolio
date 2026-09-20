export function initContactForm(endpoint) {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const statusMessage = status.querySelector("span");
  const setError = (field, invalid) =>
    document.getElementById(field).classList.toggle("invalid", invalid);
  const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form).entries());
    const checks = {
      name: !values.name.trim(),
      email: !validEmail(values.email.trim()),
      subject: !values.subject.trim(),
      message: values.message.trim().length < 20,
    };
    Object.entries(checks).forEach(([name, invalid]) =>
      setError(`field-${name}`, invalid),
    );
    if (Object.values(checks).some(Boolean)) {
      status.classList.remove("show");
      form.querySelector(".invalid input, .invalid textarea")?.focus();
      return;
    }
    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!response.ok)
          throw new Error(`Contact form request failed: ${response.status}`);
      } catch (error) {
        console.error(error);
        statusMessage.textContent =
          "Your message could not be sent. Please try again or contact me directly.";
        status.classList.add("show");
        return;
      }
    }
    statusMessage.textContent = endpoint
      ? "Thanks - your message has been sent."
      : "Thanks - your message is ready to send once a form endpoint is configured.";
    status.classList.add("show");
    form.reset();
  });
}
