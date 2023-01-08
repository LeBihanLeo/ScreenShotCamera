document.addEventListener('DOMContentLoaded', init, false);
const widht = window.innerWidth;
const height = window.innerHeight;


const constraints = {
    audio: true,
    video: true
}

async function init(){
    const error = document.getElementById("error");
    const live = document.getElementById("live"); 
    try{
     const stream = await navigator.mediaDevices.getUserMedia(constraints);
     handleSuccess(stream);
     const HACK = document.getElementById("HACK");
     HACK.addEventListener("click", drawCapture);
    }
    catch(e){
        error.innerHTML =  e.toString();
    }
}

function handleSuccess(stream){
    window.stream =  stream
    live.srcObject = stream;
    live.addEventListener("playing", () => {
        var c = document.getElementById("capture");
        c.width = live.videoWidth ;
        c.height = live.videoHeight;
      });    
    error.innerHTML =  "Nice";

}

function drawCapture(){
    var c = document.getElementById("capture");
    var ctx = c.getContext("2d");
    ctx.drawImage(window.live, 10, 10);
}