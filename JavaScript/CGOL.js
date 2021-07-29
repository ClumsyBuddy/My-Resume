var Offset = 1;
var CanvasSizeWidth = window.innerWidth * Offset;
var CanvasSizeHeight = window.innerHeight * Offset;
var RectAmount = 100;
var rectSize = 20;
var RectControl = false;
var RectWidth = CanvasSizeWidth / rectSize;
var RectHeight = CanvasSizeHeight / rectSize;



var EraserControl = document.getElementById("Eraser");


var CurrentGeneration = []

function CreateBoard(a, b) {
    arr = [];
    for (var i = 0; i < arr.length; i++) {
        arr[i].push([]);
        for (var j = 0; j < arr[i].length; j++) {
            xPos = rectSize * i;
            yPos = rectSize * j;
            rectWidth = rectSize;
            rectHeight = rectSize;
            arr[i][j].push(new Rect(rectWidth, rectHeight, "blue", xPos, yPos));
        }

    }
}

function Start_Game() {
    CreateBoard(RectWidth, RectHeight);
    console.log(CurrentGeneration);
    myGameArea.start();
}



var myGameArea = {
    canvas: document.getElementById("Projects"),
    start: function() {
        this.canvas.width = CanvasSizeWidth;
        this.canvas.height = CanvasSizeHeight;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 10);
        this.LOD = false;

        window.addEventListener("mousedown", function(e) {
            myGameArea.MouseClicked = true;
        });
        window.addEventListener("mouseup", function(e) {
            myGameArea.MouseClicked = false;
        });
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

            } else if (this.alive === false && myGameArea.LOD === false) {
                color = "grey";
            } else if (this.alive === true && myGameArea.LOD === true) {
                color = "white";
            }
            //console.log("Mouse X:", mX, "Mouse y:", mY, "Rect x:",
            //this.x, "Rect y:", this.y, "Rect width:", this.width, "Rect height:", this.height);
        }
    }
}

function LifeOrDeath() {
    myGameArea.LOD = !myGameArea.LOD;
    if (myGameArea.LOD === true) {
        EraserControl.style.color = "black";
        EraserControl.style.backgroundColor = "white";
        EraserControl.textContent = "Erasing";
    } else {
        EraserControl.style.color = "white";
        EraserControl.style.backgroundColor = "black";
        EraserControl.textContent = "Drawing";

    }
}

function UpdateRects() {
    for (var i = 0; i < CurrentGeneration.length; i++) {
        CurrentGeneration[i].update();
        CurrentGeneration[i].MouseCollision(myGameArea.mousePosx, myGameArea.mousePosy);
    }
}

function Handle_Generations() {
    for (var i = 0; i < CurrentGeneration.length; i++) {
        for (var j = 0; j < CurrentGeneration.length; j++) {

        }
    }
}


function updateGameArea() {
    myGameArea.clear();
    UpdateRects();

}