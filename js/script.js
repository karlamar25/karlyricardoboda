//=============================
// CUENTA REGRESIVA
//=============================

const weddingDate = new Date("2026-12-05T17:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if(distance < 0){

        document.getElementById("days").innerHTML="00";
        document.getElementById("hours").innerHTML="00";
        document.getElementById("minutes").innerHTML="00";
        document.getElementById("seconds").innerHTML="00";

        return;

    }

    const days = Math.floor(distance/(1000*60*60*24));

    const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const minutes = Math.floor((distance%(1000*60*60))/(1000*60));

    const seconds = Math.floor((distance%(1000*60))/1000);

    document.getElementById("days").innerHTML = String(days).padStart(2,"0");
    document.getElementById("hours").innerHTML = String(hours).padStart(2,"0");
    document.getElementById("minutes").innerHTML = String(minutes).padStart(2,"0");
    document.getElementById("seconds").innerHTML = String(seconds).padStart(2,"0");

}

updateCountdown();

setInterval(updateCountdown,1000);

//=============================
// EFECTO SUAVE AL HACER SCROLL
//=============================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

sections.forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});