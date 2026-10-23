document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("ageOverlay");
  const confirmAge = document.getElementById("confirmAge");
  const denyAge = document.getElementById("denyAge");

  confirmAge.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });

  denyAge.addEventListener("click", () => {
    document.querySelector(".age-box").innerHTML = `
      <h2>Conteúdo para maiores de 18 anos</h2>
      <p>Você precisa ter 18 anos ou mais para acessar este catálogo.</p>
      <p class="mb-0">Obrigado por compreender.</p>`;
  });

  // Filtro de categorias do catálogo
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productItems = document.querySelectorAll(".product-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      const category = button.dataset.filter;

      productItems.forEach(item => {
        item.classList.toggle("d-none", category !== "todos" && item.dataset.category !== category);
      });
    });
  });

  // Botões demonstrativos de interesse; não realizam compra real
  const toastElement = document.getElementById("interestToast");
  const toastText = document.getElementById("toastText");
  const interestToast = bootstrap.Toast.getOrCreateInstance(toastElement);

  document.querySelectorAll(".buy-btn").forEach(button => {
    button.addEventListener("click", () => {
      const product = button.dataset.product;
      toastText.textContent = `Você demonstrou interesse em ${product}. Entre em contato para mais informações.`;
      interestToast.show();
      document.getElementById("subject").value = `Interesse no produto: ${product}`;
      document.getElementById("contato").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Validação de demonstração do formulário (não envia para servidor)
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    formMessage.textContent = "Mensagem validada! Este projeto é demonstrativo e ainda não envia dados para um servidor.";
    formMessage.className = "form-message mt-3 text-success";
    contactForm.reset();
  });
});
