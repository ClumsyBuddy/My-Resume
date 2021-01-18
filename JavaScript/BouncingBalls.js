var doc = document.getElementById("PricingCanvas");
doc.width = window.innerWidth * 0.90;
doc.height = window.innerHeight * 0.90;
var cdoc = doc.getContext("2d");

/** @type {CanvasRenderingContext2D} */

cdoc.fillStyle = "#FF0000";

var RectAmount = (Math.random() * 10) + 1


var Radius = 10;
var BallX = 50;
var BallY = 50;

DrawRect();



function DrawRect() {
    for (var i = 0; i < RectAmount; i++) {
        var x = (Math.random() * doc.width) + 1
        var y = (Math.random() * doc.height) + 1
        cdoc.fillRect(x, y, 50, 50);
    }
}

function DrawBall(canvas, event) {

    var pos = getCursorPosition(canvas, event)
    console.log("x: " + pos.x + " y: " + pos.y)
    cdoc.arc(pos.x, pos.y, Radius, 0, 2 * Math.PI);
    cdoc.fill()
}


function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    var pos = { x, y };
    //console.log("x: " + x + " y: " + y)
    return pos;
}

const canvas = document.querySelector('canvas')
canvas.addEventListener('mousedown', function(e) {
    DrawBall(canvas, e);
})