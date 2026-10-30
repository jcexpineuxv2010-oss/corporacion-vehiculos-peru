document.addEventListener("DOMContentLoaded", () => {
  console.log("Corporación Vehículos Perú - Frontend inicializado correctamente 🚀");

  // Efecto Navbar al hacer scroll
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // Formulario de contacto hacia WhatsApp
  const formContacto = document.getElementById("form-contacto");
  if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const asunto = document.getElementById("asunto").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      const numeroWhatsApp = "51913651532";
      const textoWA = encodeURIComponent(
        `Hola Corporación Vehículos Perú,\n` +
        `Mi nombre es: ${nombre}\n` +
        `Teléfono: ${telefono}\n` +
        `Asunto: ${asunto}\n` +
        `Mensaje: ${mensaje}`
      );

      window.open(`https://wa.me/${numeroWhatsApp}?text=${textoWA}`, "_blank");
    });
  }
});