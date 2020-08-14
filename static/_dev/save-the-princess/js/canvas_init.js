// CANVAS INIT

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

var canvasWidth = 1280/2;
var canvasHeight = 720/2;

canvas.width = canvasWidth;
canvas.height = canvasHeight;
// canvas.style.border = "1px solid gray";
canvas.style.background = "#666";

window.addEventListener("DOMContentLoaded", function() {
    // var b = document.body;
    // var wh = window.innerHeight;
    // var ch = canvasHeight;
    // var cw = canvasWidth;

    // b.style.transform = "scale(" + ((ch < wh) ? wh / ch : 1 / ch * wh) + ")";

    document.body.appendChild(canvas);

    // setInterval(function(){
    //     wh = window.innerHeight;
    //     b.style.transform = "scale(" + ((ch < wh) ? wh / ch : 1 / ch * wh) + ")";
    // },20);
});