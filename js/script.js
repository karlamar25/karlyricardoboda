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

        days.textContent="00";
        hours.textContent="00";
        minutes.textContent="00";
        seconds.textContent="00";

        return;

    }

    days.textContent=Math.floor(distance/(1000*60*60*24));
    hours.textContent=Math.floor((distance%(1000*60*60*24))/(1000*60*60));
    minutes.textContent=Math.floor((distance%(1000*60*60))/(1000*60));
    seconds.textContent=Math.floor((distance%(1000*60))/1000);

}

updateCountdown();

setInterval(updateCountdown,1000);


//======================================
// ANIMACIÓN
//======================================

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity=1;
            entry.target.style.transform="translateY(0)";

        }

    });

},{threshold:.15});

document.querySelectorAll("section").forEach(sec=>{

    sec.style.opacity=0;

    sec.style.transform="translateY(40px)";

    sec.style.transition=".8s";

    observer.observe(sec);

});


//======================================
// FAQ
//======================================

document.querySelectorAll(".faq details").forEach(item=>{

    item.addEventListener("toggle",()=>{

        if(item.open){

            document.querySelectorAll(".faq details").forEach(other=>{

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

document.querySelectorAll(".dress details").forEach(item=>{

    item.addEventListener("toggle",()=>{

        if(item.open){

            document.querySelectorAll(".dress details").forEach(other=>{

                if(other!==item){

                    other.open=false;

                }

            });

        }

    });

});


//======================================
// CONFIRMAR POR WHATSAPP
//======================================

const boton=document.getElementById("btn-confirmar");

if(boton){

    boton.addEventListener("click",()=>{

        const nombre=document.getElementById("nombre").value.trim();

        if(nombre===""){

            alert("Por favor escribe tu nombre y apellido.");

            return;

        }

        const respuesta=document.querySelector('input[name="respuesta"]:checked').value;

        const mensaje=document.getElementById("mensaje").value.trim();

        let texto=`Hola Karla y Ricardo 👋

Quiero responder a su invitación de boda.

Nombre:
${nombre}

Confirmación:
${respuesta}`;

        if(mensaje!==""){

            texto+=`

Mensaje:
${mensaje}`;

        }

        texto+=`

¡Muchas gracias!`;

        window.location.href=`https://wa.me/50370473421?text=${encodeURIComponent(texto)}`;

    });

}