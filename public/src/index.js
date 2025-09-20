const emailInputHero = document.getElementById("email-hero");
const successMessageHero = document.getElementById("success-message-hero");
const errorContainerHero = document.getElementById("error-container-hero");
const errorMessageHero = document.getElementById("error-message-hero");
const buttonHero = document.getElementById("button-hero");

const emailInputCta = document.getElementById("email-cta");
const successMessageCta = document.getElementById("success-message-cta");
const errorMessageCta = document.getElementById("error-message-cta");
const errorContainerCta = document.getElementById("error-container-cta");
const buttonCta = document.getElementById("button-cta");

// Función para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para llamar la API
async function submitEmail(email) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response = await fetch(
      "https://waitlist-server-five.vercel.app/api/waitlist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          project: "esdent",
        }),
      }
    );

    if (response.ok) {
      return { success: true };
    } else {
      // Intentar parsear la respuesta JSON para obtener el mensaje de error
      try {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || `Error del servidor (${response.status})`,
        };
      } catch (parseError) {
        return {
          success: false,
          error: `Error del servidor (${response.status})`,
        };
      }
    }
  } catch (error) {
    return { success: false, error: "Error de conexión" };
  }
}

// Función para mostrar mensaje de error
function showError(errorMessageElement, errorContainerElement, message) {
  errorMessageElement.textContent = message;
  errorContainerElement.style.display = "flex";
}

// Función para mostrar mensaje de éxito
function showSuccess(successElement, message) {
  successElement.style.display = "flex";
}

// Función para ocultar mensajes
function hideMessages(errorContainer, successElement) {
  errorContainer.style.display = "none";
  successElement.style.display = "none";
}

buttonHero.addEventListener("click", async () => {
  const email = emailInputHero.value.trim();

  // Ocultar mensajes previos
  hideMessages(errorContainerHero, successMessageHero);

  // Mostrar loader
  buttonHero.disabled = true;
  buttonHero.style.opacity = "0.5";
  buttonHero.style.cursor = "not-allowed";
  buttonHero.innerHTML = '<span class="loader"></span> Reservando...';

  // Validar email
  if (!email) {
    showError(
      errorMessageHero,
      errorContainerHero,
      "Por favor ingresa tu email"
    );
    // Restaurar botón
    buttonHero.disabled = false;
    buttonHero.style.opacity = "1";
    buttonHero.style.cursor = "pointer";
    buttonHero.innerHTML = "Reserva mi mes gratis";
    return;
  }

  if (!isValidEmail(email)) {
    showError(
      errorMessageHero,
      errorContainerHero,
      "Por favor ingresa un email válido"
    );
    // Restaurar botón
    buttonHero.disabled = false;
    buttonHero.style.opacity = "1";
    buttonHero.style.cursor = "pointer";
    buttonHero.innerHTML = "Reserva mi mes gratis";
    return;
  }

  // Llamar API
  const result = await submitEmail(email);

  // Restaurar botón
  buttonHero.disabled = false;
  buttonHero.style.opacity = "1";
  buttonHero.style.cursor = "pointer";
  buttonHero.innerHTML = "Reserva mi mes gratis";

  if (result.success) {
    showSuccess(
      successMessageHero,
      "¡Gracias! Te hemos registrado correctamente."
    );
    emailInputHero.value = "";
  } else {
    console.log(result.error);
    showError(
      errorMessageHero,
      errorContainerHero,
      result.error || "Ocurrió un error. Inténtalo de nuevo."
    );
  }
});

buttonCta.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = emailInputCta.value.trim();

  // Ocultar mensajes previos
  hideMessages(errorContainerCta, successMessageCta);

  // Mostrar loader
  buttonCta.disabled = true;
  buttonCta.style.opacity = "0.5";
  buttonCta.style.cursor = "not-allowed";
  buttonCta.innerHTML = '<span class="loader"></span> Reservando...';

  // Validar email
  if (!email) {
    showError(errorMessageCta, errorContainerCta, "Por favor ingresa tu email");
    // Restaurar botón
    buttonCta.disabled = false;
    buttonCta.style.opacity = "1";
    buttonCta.style.cursor = "pointer";
    buttonCta.innerHTML = "Reservar mi mes gratis";
    return;
  }

  if (!isValidEmail(email)) {
    showError(
      errorMessageCta,
      errorContainerCta,
      "Por favor ingresa un email válido"
    );
    // Restaurar botón
    buttonCta.disabled = false;
    buttonCta.style.opacity = "1";
    buttonCta.style.cursor = "pointer";
    buttonCta.innerHTML = "Reservar mi mes gratis";
    return;
  }

  // Llamar API
  const result = await submitEmail(email);

  // Restaurar botón
  buttonCta.disabled = false;
  buttonCta.style.opacity = "1";
  buttonCta.style.cursor = "pointer";
  buttonCta.innerHTML = "Reservar mi mes gratis";

  if (result.success) {
    showSuccess(
      successMessageCta,
      "¡Gracias! Te hemos registrado correctamente."
    );
    emailInputCta.value = "";
  } else {
    showError(
      errorMessageCta,
      errorContainerCta,
      result.error || "Ocurrió un error. Inténtalo de nuevo."
    );
  }
});

// Funcionalidad para cerrar el banner de beta
const bannerContainer = document.querySelector(
  ".pointer-events-none.fixed.inset-x-0.bottom-0"
);
const dismissButton = document.querySelector('button[type="button"]');

if (dismissButton && bannerContainer) {
  dismissButton.addEventListener("click", () => {
    bannerContainer.style.display = "none";
  });
}
