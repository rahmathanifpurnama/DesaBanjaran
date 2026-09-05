const form = document.querySelector("#authForm");
const message = document.querySelector("#message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";
  const button = form.querySelector("button");
  button.disabled = true;
  const mode = form.dataset.mode;
  const payload = Object.fromEntries(new FormData(form));
  try {
    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Permintaan gagal.");
    window.location.replace("/admin/");
  } catch (error) {
    message.textContent = error.message;
  } finally {
    button.disabled = false;
  }
});
