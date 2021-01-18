const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('PricingCanvas'));
canvas.width = window.innerWidth * 0.90;
canvas.height = window.innerHeight * 0.90;
var cdoc = canvas.getContext("2d");

/** @type {CanvasRenderingContext2D} */

cdoc.fillStyle = "red";

var Radius = 10;
var BallX = 50;
var BallY = 50;


function Rect(canvas, e) {
    Clear();
    var pos = getCursorPosition(canvas, e);
    cdoc.fillRect(pos.x, pos.y, 50, 50);
    cdoc.fill();
}

this.interval = setInterval(DrawRect, 25);

function DrawRect(rectamount) {
    RectAmount = (Math.random() * 1) + 1
    for (var i = 0; i < RectAmount; i++) {
        var x = (Math.random() * canvas.width) + 1
        var y = (Math.random() * canvas.height) + 1
        cdoc.fillRect(x, y, 50, 50);
    }
}

function Clear() {
    cdoc.clearRect(0, 0, canvas.width, canvas.height);
}

function DrawBall(canvas, event) {
    //Clear();
    var pos = getCursorPosition(canvas, event)
    console.log("x: " + pos.x + " y: " + pos.y)
    cdoc.beginPath();
    cdoc.arc(pos.x, pos.y, Radius, 0, 2 * Math.PI);
    cdoc.fill();
}


function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    var pos = { x, y };
    //console.log("x: " + x + " y: " + y)
    return pos;
}

canvas.addEventListener('mousedown', function(e) {
    DrawBall(canvas, e);
})