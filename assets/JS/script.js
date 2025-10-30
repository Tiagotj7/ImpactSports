      // Simple interactivity: mobile menu + contact form validation
    document.addEventListener("DOMContentLoaded", function () {
      const menuBtn = document.getElementById("menu-toggle");
      const nav = document.querySelector(".main-nav");
      if (menuBtn) {
        menuBtn.addEventListener("click", () => {
          if (nav.style.display === "block") {
            nav.style.display = "";
          } else {
            nav.style.display = "block";
          }
        });
      }

      // Contact form with simple validation (no backend)
      const form = document.getElementById("contactForm");
      const formMsg = document.getElementById("formMsg");

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        formMsg.textContent = "";
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
          formMsg.style.color = "#ffb3b3";
          formMsg.textContent = "Por favor preencha todos os campos.";
          return;
        }
        if (!validateEmail(email)) {
          formMsg.style.color = "#ffb3b3";
          formMsg.textContent = "E-mail inválido.";
          return;
        }

        // fake submit (here you can call fetch to your backend)
        formMsg.style.color = "#bfffe0";
        formMsg.textContent = "Mensagem enviada! Em breve retornaremos.";
        form.reset();

        setTimeout(() => {
          formMsg.textContent = "";
        }, 5000);
      });

      function validateEmail(email) {
        // simple regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      }
    });
