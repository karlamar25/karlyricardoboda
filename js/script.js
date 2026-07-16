//======================================
// KARLA & RICARDO
//======================================


//======================================
// CUENTA REGRESIVA
//======================================

const weddingDate = new Date("2026-12-05T17:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if(distance <= 0){

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2,"0");
    document.getElementById("hours").textContent = String(hours).padStart(2,"0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");

}

updateCountdown();

setInterval(updateCountdown,1000);


//======================================
// ANIMACIÓN AL HACER SCROLL
//======================================

const sections = document.querySelectorAll("section");

sections.forEach(section=>{

    section.style.opacity="0";
    section.style.transform="translateY(40px)";
    section.style.transition="all .8s ease";

});

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:.15
});

sections.forEach(section=>observer.observe(section));


//======================================
// PREGUNTAS FRECUENTES
//======================================

const faqs = document.querySelectorAll(".faq details");

faqs.forEach(item=>{

    item.addEventListener("toggle",()=>{

        if(item.open){

            faqs.forEach(other=>{

                if(other!==item){

                    other.open=false;

                }

            });

        }

    });

});


//======================================
// DRESS CODE
//======================================

const dress = document.querySelectorAll(".dress details");

dress.forEach(item=>{

    item.addEventListener("toggle",()=>{

        if(item.open){

            dress.forEach(other=>{

                if(other!==item){

                    other.open=false;

                }

            });

        }

    });

});

//======================================
// CONFIRMACIÓN
//======================================

const formulario = document.getElementById("rsvp-form");
const contenedorInvitados = document.getElementById("invitados-extra");
const btnAgregar = document.getElementById("agregar-invitado");

let totalInvitados = 1;

if(btnAgregar){

    btnAgregar.addEventListener("click",function(){

        if(totalInvitados>=4){

            alert("Solo puedes agregar un máximo de 4 invitados.");

            return;

        }

        totalInvitados++;

        const bloque = document.createElement("div");

        bloque.className="campo invitado-extra";

        bloque.innerHTML=`

            <label>

                Invitado ${totalInvitados}

            </label>

            <input
                type="text"
                class="nombre-extra"
                placeholder="Nombre y apellido">

            <button
                type="button"
                class="eliminar-invitado btn">

                Eliminar invitado

            </button>

        `;

        contenedorInvitados.appendChild(bloque);

        bloque.querySelector(".eliminar-invitado").addEventListener("click",function(){

            bloque.remove();

            totalInvitados--;

        });

    });

}

if(formulario){

    formulario.addEventListener("submit",function(e){

        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();

        if(nombre===""){

            alert("Por favor escribe tu nombre y apellido.");

            return;

        }

        const invitados = [];

        invitados.push(nombre);

        document.querySelectorAll(".nombre-extra").forEach(campo=>{

            if(campo.value.trim()!==""){

                invitados.push(campo.value.trim());

            }

        });

        const respuesta = document.querySelector('input[name="respuesta"]:checked').value;

        let mensaje = `💍 *CONFIRMACIÓN DE ASISTENCIA*%0A%0A`;

        invitados.forEach((persona,index)=>{

            mensaje += `👤 Invitado ${index+1}%0A${persona}%0A%0A`;

        });

        mensaje += `${respuesta}%0A%0A`;

        mensaje += `Muchas gracias.%0A`;

        mensaje += `Karla & Ricardo ❤️`;

        const enlace = `https://wa.me/50370473421?text=${mensaje}`;

        window.open(enlace,"_blank");

    });

}