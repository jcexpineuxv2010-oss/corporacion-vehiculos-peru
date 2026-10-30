document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("grid-autos");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const numeroWhatsApp = "51913651532";

  if (!gridContainer) return;

  // Crear contenedor del modal dinámicamente en el DOM
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <img id="modal-img" class="modal-img" src="" alt="Vehículo">
      <span id="modal-brand" class="modal-brand"></span>
      <h2 id="modal-title" class="modal-title"></h2>
      
      <div class="modal-price-box">
        <span id="modal-usd" class="modal-price-usd"></span>
        <span id="modal-pen" class="modal-price-pen"></span>
      </div>

      <div class="modal-grid-specs">
        <div class="spec-item">Año <strong id="modal-year"></strong></div>
        <div class="spec-item">Kilometraje <strong id="modal-km"></strong></div>
        <div class="spec-item">Transmisión <strong id="modal-trans"></strong></div>
        <div class="spec-item">Combustible <strong id="modal-comb"></strong></div>
      </div>

      <a id="modal-wa-btn" href="#" target="_blank" rel="noopener noreferrer" class="btn-card-wa" style="padding: 1rem; font-size: 0.85rem;">
        <i class="fa-brands fa-whatsapp"></i> Cotizar esta Unidad por WhatsApp
      </a>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  const btnCloseModal = modalOverlay.querySelector(".modal-close");
  btnCloseModal.addEventListener("click", () => modalOverlay.classList.remove("active"));
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove("active");
  });

  function renderizarAutos(listaAutos) {
    gridContainer.innerHTML = "";

    if (listaAutos.length === 0) {
      gridContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #94a3b8; padding: 3rem;">No se encontraron vehículos para este filtro.</p>`;
      return;
    }

    listaAutos.forEach(auto => {
      const mensajeWA = encodeURIComponent(
        `Hola Corporación Vehículos Perú, estoy interesado en el vehículo ${auto.marca} ${auto.modelo} (${auto.anio}) valorizado en $${auto.precioUSD.toLocaleString()}. ¿Sigue disponible?`
      );
      const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeWA}`;

      const card = document.createElement("article");
      card.className = "auto-card";

      card.innerHTML = `
        <div class="card-img">
          <img src="${auto.imagen}" alt="${auto.marca} ${auto.modelo}" onerror="this.src='https://via.placeholder.com/400x250?text=Vehiculo+CVP'">
          ${auto.destacado ? '<span class="badge">Destacado</span>' : ''}
        </div>
        <div class="card-body">
          <span class="card-brand">${auto.marca}</span>
          <h3 class="card-title">${auto.modelo}</h3>
          <p class="card-year">Año: ${auto.anio}</p>
          
          <div class="card-specs">
            <span><i class="fa-solid fa-gauge"></i> ${auto.kilometraje}</span>
            <span><i class="fa-solid fa-gear"></i> ${auto.transmision}</span>
            <span><i class="fa-solid fa-gas-pump"></i> ${auto.combustible}</span>
          </div>

          <div class="card-price">
            <span class="usd">$${auto.precioUSD.toLocaleString()} USD</span>
            <span class="pen">S/ ${auto.precioPEN.toLocaleString()}</span>
          </div>

          <div class="card-buttons">
            <button class="btn-card-detalle" data-id="${auto.id}">Ver Ficha</button>
            <a href="${linkWhatsApp}" target="_blank" rel="noopener noreferrer" class="btn-card-wa">
              <i class="fa-brands fa-whatsapp"></i> Cotizar
            </a>
          </div>
        </div>
      `;

      gridContainer.appendChild(card);
    });

    // Asignar eventos a los botones "Ver Ficha"
    document.querySelectorAll(".btn-card-detalle").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const autoId = parseInt(e.target.getAttribute("data-id"));
        const auto = autosData.find(a => a.id === autoId);
        if (!auto) return;

        // Rellenar datos del modal
        document.getElementById("modal-img").src = auto.imagen;
        document.getElementById("modal-brand").textContent = auto.marca;
        document.getElementById("modal-title").textContent = auto.modelo;
        document.getElementById("modal-usd").textContent = `$${auto.precioUSD.toLocaleString()} USD`;
        document.getElementById("modal-pen").textContent = `Ref: S/ ${auto.precioPEN.toLocaleString()}`;
        document.getElementById("modal-year").textContent = auto.anio;
        document.getElementById("modal-km").textContent = auto.kilometraje;
        document.getElementById("modal-trans").textContent = auto.transmision;
        document.getElementById("modal-comb").textContent = auto.combustible;

        const mensajeWA = encodeURIComponent(
          `Hola Corporación Vehículos Perú, deseo agendar una visita o consultar detalles técnicos del ${auto.marca} ${auto.modelo} (${auto.anio}).`
        );
        document.getElementById("modal-wa-btn").href = `https://wa.me/${numeroWhatsApp}?text=${mensajeWA}`;

        modalOverlay.classList.add("active");
      });
    });
  }

  const esPaginaPrincipal = window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/");

  if (esPaginaPrincipal) {
    const autosDestacados = autosData.filter(auto => auto.destacado);
    renderizarAutos(autosDestacados);
  } else {
    renderizarAutos(autosData);

    filterButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");

        const filtro = e.target.getAttribute("data-filter");

        if (filtro === "todos") {
          renderizarAutos(autosData);
        } else {
          const autosFiltrados = autosData.filter(auto => auto.marca.toLowerCase() === filtro.toLowerCase());
          renderizarAutos(autosFiltrados);
        }
      });
    });
  }
});