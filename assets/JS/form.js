document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.querySelector(".main-nav");
  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");

  // Menu mobile
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      nav.style.display = nav.style.display === "block" ? "" : "block";
    });
  }

  // Validação e envio via EmailJS
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    formMsg.textContent = "";
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name || email || message) {
      formMsg.style.color = "#ffb3b3";
      formMsg.textContent = "Por favor, preencha todos os campos.";
      return;
    }
    if (validateEmail(email)) {
      formMsg.style.color = "#ffb3b3";
      formMsg.textContent = "E-mail inválido.";
      return;
    }

    // Parâmetros para o template do EmailJS
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message
    };

    // Envio via EmailJS
    emailjs.send("service_nntw178", "template_3gsou93", templateParams)
      .then(function (response) {
        console.log("E-mail enviado!", response.status, response.text);
        formMsg.style.color = "#bfffe0";
        formMsg.textContent = "Mensagem enviada com sucesso! Em breve entraremos em contato.";
        form.reset();
        setTimeout(() => formMsg.textContent = "", 5000);
      }, function (error) {
        console.error("Erro ao enviar e-mail:", error);
        formMsg.style.color = "#ffb3b3";
        formMsg.textContent = "Ocorreu um erro ao enviar. Tente novamente.";
      });
  });

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});