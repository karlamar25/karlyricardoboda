/*======================================================
CONFIGURACIÓN
======================================================*/

const weddingDate = new Date("2026-12-05T17:00:00").getTime();

/*======================================================
CUENTA REGRESIVA
======================================================*/

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCountdown() {

    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        clearInterval(countdownInterval);

        return;

    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");

}

updateCountdown();

const countdownInterval = setInterval(updateCountdown, 1000);

/*======================================================
ELEMENTOS DEL FORMULARIO
======================================================*/

const form = document.getElementById("rsvp-form");

const nombrePrincipal = document.getElementById("nombre");

const invitadosExtra = document.getElementById("invitados-extra");

const botonAgregar = document.getElementById("agregar-invitado");

const MAX_INVITADOS = 4;

let invitadosAgregados = 0;

/*======================================================
INVITADOS DINÁMICOS
======================================================*/

botonAgregar.addEventListener("click", () => {

    if (invitadosAgregados >= MAX_INVITADOS - 1) {

        alert("Solo puedes agregar hasta 4 invitados en total.");

        return;

    }

    invitadosAgregados++;

    const numero = invitadosAgregados + 1;

    const bloque = document.createElement("div");

    bloque.className = "campo invitado-extra";

    bloque.innerHTML = `

        <label>

            Invitado ${numero}

        </label>

        <div class="invitado-grupo">

            <input
                type="text"
                class="nombre-extra"
                placeholder="Nombre y apellido">

            <button
                type="button"
                class="eliminar-invitado"
                aria-label="Eliminar invitado">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

    `;

    invitadosExtra.appendChild(bloque);

    actualizarBoton();

});

/*======================================================
ELIMINAR INVITADOS
======================================================*/

invitadosExtra.addEventListener("click", (e) => {

    const boton = e.target.closest(".eliminar-invitado");

    if (!boton) return;

    const bloque = boton.closest(".invitado-extra");

    bloque.remove();

    invitadosAgregados--;

    renumerarInvitados();

    actualizarBoton();

});

/*======================================================
RENUMERAR INVITADOS
======================================================*/

function renumerarInvitados() {

    const invitados = invitadosExtra.querySelectorAll(".invitado-extra");

    invitados.forEach((item, index) => {

        item.querySelector("label").textContent = `Invitado ${index + 2}`;

    });

}

/*======================================================
ACTUALIZAR BOTÓN
======================================================*/

function actualizarBoton() {

    if (invitadosAgregados >= MAX_INVITADOS - 1) {

        botonAgregar.disabled = true;

        botonAgregar.style.opacity = ".6";

        botonAgregar.style.cursor = "not-allowed";

    } else {

        botonAgregar.disabled = false;

        botonAgregar.style.opacity = "1";

        botonAgregar.style.cursor = "pointer";

    }

}

/*======================================================
ENVÍO POR WHATSAPP
======================================================*/

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const nombre = nombrePrincipal.value.trim();

    if (nombre === "") {

        alert("Por favor ingresa tu nombre.");

        nombrePrincipal.focus();

        return;

    }

    const respuesta = document.querySelector(
        'input[name="respuesta"]:checked'
    ).value;

    let invitados = `1. ${nombre}`;

    const extras = document.querySelectorAll(".nombre-extra");

    extras.forEach((input, index) => {

        const valor = input.value.trim();

        if (valor !== "") {

            invitados += `\n${index + 2}. ${valor}`;

        }

    });

    const mensaje =

`¡Hola Karla y Ricardo! 💚

Quiero confirmar mi asistencia a su boda.

${respuesta}

Invitados:

${invitados}

¡Nos vemos el 05 de diciembre de 2026! ✨`;

    const telefono = "50370473421";

    const url =
        `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

    form.reset();

    invitadosExtra.innerHTML = "";

    invitadosAgregados = 0;

    actualizarBoton();

});

/*======================================================
INICIALIZACIÓN
======================================================*/

actualizarBoton();