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
    section.style.transform="translateY(60px)";
    section.style.transition="all .9s ease";

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

const dressDetails = document.querySelectorAll(".dress details");

dressDetails.forEach(item=>{

    item.addEventListener("toggle",()=>{

        if(item.open){

            dressDetails.forEach(other=>{

                if(other!==item){

                    other.open=false;

                }

            });

        }

    });

});


//======================================
// LIGHTBOX
//======================================

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

const closeLightbox = document.querySelector(".close-lightbox");

document.querySelectorAll(".zoom-img").forEach(img=>{

    img.addEventListener("click",()=>{

        lightbox.style.display="flex";

        lightboxImg.src = img.src;

        lightboxImg.alt = img.alt;

    });

});

closeLightbox.addEventListener("click",()=>{

    lightbox.style.display="none";

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.style.display="none";

    }

});