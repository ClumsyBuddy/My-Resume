var Rects = [];
var Offset = 1;
var CanvasSizeWidth = window.innerWidth * Offset;
var CanvasSizeHeight = window.innerHeight * Offset;
var RectAmount = 100;
var rectSize = 20;
var RectControl = false;
var RectWidth = CanvasSizeWidth / rectSize;
var RectHeight = CanvasSizeHeight / rectSize;

function Start_Game() {
    for (var i = 0; i < RectWidth; i++) {
        for (var j = 0; j < RectHeight; j++) {
            xPos = rectSize * i;
            yPos = rectSize * j;
            rectWidth = rectSize;
            rectHeight = rectSize;
            Rects.push(new Rect(rectWidth, rectHeight, "blue", xPos, yPos));
        }

    }
    myGameArea.start();
}



var myGameArea = {
    canvas: document.getElementById("Projects"),
    start: function() {
        this.canvas.width = CanvasSizeWidth;
        this.canvas.height = CanvasSizeHeight;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 1);
        this.LOD = false;

        window.addEventListener('keydown', KeyDown = function(e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener("mousedown", function(e) {
            if (e === 1) {
                console.log("Clicked");
            }
            myGameArea.MouseClicked = true;
        });
        window.addEventListener("mouseup", function(e) {
            myGameArea.MouseClicked = false;
        });
        window.addEventListener('keyup', KeyUp = function(e) {
            e.preventDefault();
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('mousemove', function(e) {
            const rect = myGameArea.canvas.getBoundingClientRect()
            myGameArea.mousePosx = e.clientX - rect.left;
            myGameArea.mousePosy = e.clientY - rect.top;
        })
        window.addEventListener('resize', function(e) {
            myGameArea.canvas.width = CanvasSizeWidth;
            myGameArea.canvas.height = CanvasSizeHeight;
        })
    },
    stop: function() {
        clearInterval(this.interval);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

}

function Rect(width, height, color, x, y) {

    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.alive = false
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.fillStyle = color;
        ctx.lineWidth = 0;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
        if (this.alive === false) {
            color = "white"
        } else {
            color = "black"
        }
    }

    this.MouseCollision = function(mX, mY) {
        if (mX > this.x && mX < (this.x + this.width) && mY > this.y && mY < (this.y + this.height)) {
            if (myGameArea.MouseClicked === true) {
                if (myGameArea.LOD === false) {
                    this.alive = true
                } else {
                    this.alive = false;
                }

            } else if (this.alive === false) {
                color = "grey";
            }
            //console.log("Mouse X:", mX, "Mouse y:", mY, "Rect x:",
            //this.x, "Rect y:", this.y, "Rect width:", this.width, "Rect height:", this.height);
        }
    }
}

function LifeOrDeath() {
    myGameArea.LOD = !myGameArea.LOD;
}

function Handle_Rects() {
    for (var i = 0; i < Rects.length; i++) {
        Rects[i].update();
        Rects[i].MouseCollision(myGameArea.mousePosx, myGameArea.mousePosy);
    }
}


function updateGameArea() {
    myGameArea.clear();
    Handle_Rects();

}