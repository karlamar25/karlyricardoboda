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

        document.getElementById("days").textContent="00";
        document.getElementById("hours").textContent="00";
        document.getElementById("minutes").textContent="00";
        document.getElementById("seconds").textContent="00";

        return;

    }

    const days=Math.floor(distance/(1000*60*60*24));

    const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const minutes=Math.floor((distance%(1000*60*60))/(1000*60));

    const seconds=Math.floor((distance%(1000*60))/1000);

    document.getElementById("days").textContent=String(days).padStart(2,"0");
    document.getElementById("hours").textContent=String(hours).padStart(2,"0");
    document.getElementById("minutes").textContent=String(minutes).padStart(2,"0");
    document.getElementById("seconds").textContent=String(seconds).padStart(2,"0");

}

updateCountdown();

setInterval(updateCountdown,1000);

//======================================
// SCROLL SUAVE FLECHA
//======================================

const arrow=document.querySelector(".scroll-indicator");

if(arrow){

    arrow.addEventListener("click",()=>{

        window.scrollTo({

            top:window.innerHeight,

            behavior:"smooth"

        });

    });

}

//======================================
// ANIMACIÓN AL HACER SCROLL
//======================================

const sections=document.querySelectorAll("section");

sections.forEach(section=>{

    section.style.opacity="0";
    section.style.transform="translateY(60px)";
    section.style.transition="all .9s ease";

});

const observer=new IntersectionObserver((entries)=>{

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
// ABRIR SOLO UN FAQ
//======================================

const faqs=document.querySelectorAll(".faq details");

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