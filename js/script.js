/*======================================================*
* CONFIGURACIÓN
*======================================================*/

// La cuenta regresiva finaliza al iniciar la ceremonia (4:00 PM)
const weddingDate = new Date("2026-12-05T16:00:00").getTime();

// La confirmación estará disponible hasta el 20 de noviembre.
// Se cierra a las 00:00 del 21 de noviembre.
const confirmacionFecha = new Date("2026-11-21T00:00:00").getTime();

// El botón de calendario funcionará hasta finalizar el 5 de diciembre.
// Se desactiva a partir del 6 de diciembre.
const calendarioFecha = new Date("2026-12-06T00:00:00").getTime();


/*======================================================*
* CUENTA REGRESIVA
*======================================================*/

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

let countdownInterval;

function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if(distance <= 0){

        const countdown = document.querySelector(".countdown");

        if(countdown){

            countdown.innerHTML = `

                <div class="contador-final">

                    <h3>¡Hoy es nuestro gran día!</h3>

                    <p>Gracias por acompañarnos.</p>

                </div>

            `;

        }

        clearInterval(countdownInterval);

        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    if(daysElement){

        daysElement.textContent =
            String(days).padStart(2,"0");

    }

    if(hoursElement){

        hoursElement.textContent =
            String(hours).padStart(2,"0");

    }

    if(minutesElement){

        minutesElement.textContent =
            String(minutes).padStart(2,"0");

    }

    if(secondsElement){

        secondsElement.textContent =
            String(seconds).padStart(2,"0");

    }

}

updateCountdown();

countdownInterval = setInterval(updateCountdown,1000);


/*======================================================*
* CONFIRMACIÓN DE ASISTENCIA
* CIERRE: 20 DE NOVIEMBRE DE 2026
*======================================================*/

const botonWhatsapp =
    document.querySelector(".btn-whatsapp");

const confirmacionToggle =
    document.querySelector(".confirmacion-toggle");

function verificarConfirmacion(){

    if(!botonWhatsapp) return;

    const ahora =
        new Date().getTime();

    if(ahora >= confirmacionFecha){

        // Desactivar enlace de WhatsApp
        botonWhatsapp.removeAttribute("href");

        botonWhatsapp.removeAttribute("target");

        botonWhatsapp.removeAttribute("rel");

        botonWhatsapp.style.background =
            "#7A7A7A";

        botonWhatsapp.innerHTML = `

            <i class="fa-solid fa-lock"></i>

            Confirmación cerrada

        `;

        // Evitar que se pueda hacer clic
        botonWhatsapp.addEventListener(
            "click",
            function(e){

                e.preventDefault();

                alert(
                    "La fecha para confirmar asistencia ya ha finalizado.\n\n" +
                    "¡Gracias por comprenderlo! ❤️"
                );

            }
        );

        // Cambiar el texto de la sección
        const textoConfirmacion =
            document.querySelector(".confirmacion-texto");

        if(textoConfirmacion){

            textoConfirmacion.innerHTML = `
                El período para confirmar asistencia
                ha finalizado.
            `;

        }

    }

}

verificarConfirmacion();


/*======================================================*
* AGREGAR AL CALENDARIO
* FUNCIONA HASTA EL 5 DE DICIEMBRE DE 2026
*======================================================*/

const botonCalendario =
    document.getElementById("btn-calendario");

function verificarCalendario(){

    if(!botonCalendario) return;

    const ahora =
        new Date().getTime();

    if(ahora >= calendarioFecha){

        botonCalendario.disabled = true;

        botonCalendario.style.background =
            "#7A7A7A";

        botonCalendario.style.cursor =
            "default";

        botonCalendario.innerHTML = `

            <i class="fa-solid fa-heart"></i>

            Evento finalizado

        `;

        botonCalendario.addEventListener(
            "click",
            function(e){

                e.preventDefault();

                alert(
                    "Nuestra boda ya se celebró.\n\n" +
                    "¡Gracias por visitar nuestra invitación! ❤️"
                );

            }
        );

    }

}

verificarCalendario();


/*======================================================*
* DRESS CODE · DESPLEGABLE
*======================================================*/

const dressToggle =
    document.getElementById("dress-toggle");

const dressContent =
    document.getElementById("dress-content");

if(dressToggle && dressContent){

    dressToggle.addEventListener(
        "click",
        function(){

            dressContent.classList.toggle("abierto");

            dressToggle.classList.toggle("abierto");

            const icono =
                dressToggle.querySelector(
                    ".dress-icon"
                );

            if(
                dressContent.classList.contains(
                    "abierto"
                )
            ){

                icono.textContent = "−";

            }else{

                icono.textContent = "+";

            }

        }
    );

}