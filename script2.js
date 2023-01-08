document.addEventListener('DOMContentLoaded', init, false);


function init(){
    console.log("--- init ---");
    const button = document.getElementById("button");

    button.addEventListener("click", start);
}

async function start(){
    console.log("--- start ---");
    const instructions = document.getElementById("instructions");
    instructions.classList.add("hide");
    button.classList.add("anime");
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }