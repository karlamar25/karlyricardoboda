/*======================================================
CONFIGURACIÓN
======================================================*/

// La cuenta regresiva finaliza al iniciar la ceremonia (4:00 PM)
const weddingDate = new Date("2026-12-05T16:00:00").getTime();

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

        const countdown = document.querySelector(".countdown");

        if (countdown) {

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

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");

}

updateCountdown();

const countdownInterval = setInterval(updateCountdown, 1000);

/*======================================================
EVENTO FINALIZADO
======================================================*/

const botonWhatsapp = document.querySelector(".btn-whatsapp");

function verificarEventoFinalizado() {

    if (!botonWhatsapp) return;

    const ahora = new Date().getTime();

    if (ahora >= weddingDate) {

        botonWhatsapp.removeAttribute("href");

        botonWhatsapp.removeAttribute("target");

        botonWhatsapp.style.background = "#7A7A7A";

        botonWhatsapp.innerHTML = `
            <i class="fa-solid fa-heart"></i>
            Evento finalizado
        `;

        botonWhatsapp.addEventListener("click", function (e) {

            e.preventDefault();

            alert(
                "Nuestra boda ya se celebró.\n\n¡Gracias por visitar nuestra invitación! ❤️"
            );

        });

    }

}

verificarEventoFinalizado();

/*======================================================
AGREGAR AL CALENDARIO
======================================================*/

const botonCalendario = document.getElementById("btn-calendario");

if (botonCalendario) {

    botonCalendario.addEventListener("click", function () {

        const evento = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Karla y Ricardo//Boda//ES",
            "CALSCALE:GREGORIAN",
            "BEGIN:VEVENT",

            "UID:karla-ricardo-boda-2026@karlyricardoboda.com",

            "DTSTART;TZID=America/El_Salvador:20261205T160000",

            "DTEND;TZID=America/El_Salvador:20261205T220000",

            "SUMMARY:Boda Karla & Ricardo",

            "STATUS:CONFIRMED",

            "END:VEVENT",
            "END:VCALENDAR"

        ].join("\r\n");


        const archivo = new Blob(
            [evento],
            {
                type: "text/calendar;charset=utf-8"
            }
        );


        const url = URL.createObjectURL(archivo);


        const enlace = document.createElement("a");

        enlace.href = url;

        enlace.download = "Boda-Karla-Ricardo.ics";

        document.body.appendChild(enlace);

        enlace.click();

        document.body.removeChild(enlace);


        setTimeout(function () {

            URL.revokeObjectURL(url);

        }, 5000);

    });

}