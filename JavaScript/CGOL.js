var Offset = 1;
var CanvasSizeWidth = window.innerWidth * Offset;
var CanvasSizeHeight = window.innerHeight * Offset;
var rectSize = 20;
var RectControl = false;

var _width = CanvasSizeWidth / rectSize;
var _height = CanvasSizeHeight / rectSize;


var RectWidth = parseInt(_width.toFixed(0));
var RectHeight = parseInt(_height.toFixed(0));

console.log(RectWidth, RectHeight);

var EraserControl = document.getElementById("Eraser");

var CurrentGeneration = [];
var NextGeneration = [];

function CreateBoard() {
    arr = [];
    for (var i = 0; i < RectWidth; i++) {
        arr.push([]);
        for (var j = 0; j < RectHeight; j++) {
            xPos = rectSize * i;
            yPos = rectSize * j;
            arr[i].push(new Array());
            arr[i][j] = new Rect(rectSize, rectSize, "white", i * rectSize, j * rectSize);
        }

    }
    CurrentGeneration = arr;
}

function Start_Game() {
    CreateBoard();
    myGameArea.start();
}



var myGameArea = {
    canvas: document.getElementById("Projects"),
    start: function() {
        this.canvas.width = CanvasSizeWidth;
        this.canvas.height = CanvasSizeHeight;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.LOD = false;
        this.UpdateGame = false;
        this.interval = setInterval(updateGameArea, 10);

        window.addEventListener("keyup", function(e) {
            if (e.key == "o") {
                console.log("Updategame: ", myGameArea.UpdateGame);
                myGameArea.UpdateGame = !myGameArea.UpdateGame;
            } else if (e.key == "p") {
                console.log(CurrentGeneration);
            }
        });
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
                color = "grey";
            }
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
        for (var j = 0; j < CurrentGeneration[i].length; j++) {
            if (myGameArea.UpdateGame == false) {
                CurrentGeneration[i][j].MouseCollision(myGameArea.mousePosx, myGameArea.mousePosy);
            }
            CurrentGeneration[i][j].update();
        }
    }
}


function Handle_Generations() {
    var sum = 0;
    NextGeneration = CurrentGeneration;
    for (var i = 0; i < RectWidth; i++) {
        for (var j = 0; j < RectHeight; j++) {
            for (var x = -1; x < 2; x++) {
                for (var y = -1; y < 2; y++) {
                    if (x == 0 && y == 0) {
                        continue;
                    } else {
                        var cols = (i + x + RectWidth) % RectWidth;
                        var rows = (j + y + RectHeight) % RectHeight;
                        sum += CurrentGeneration[cols][rows].alive;
                    }
                }
            }
            if (sum > 0) {
                console.log(sum, CurrentGeneration[i][j]);
            }
            if (sum == 2 && NextGeneration[i][j].alive == true) {
                CurrentGeneration[i][j].alive = true;
            } else if (sum == 3 && NextGeneration[i][j].alive == true) {
                CurrentGeneration[i][j].alive = true;
            } else if (sum < 2 && NextGeneration[i][j].alive == true) {
                console.log("UnderPop");
                CurrentGeneration[i][j].alive = false;
            } else if (sum > 3 && NextGeneration[i][j].alive == true) {
                console.log("OverPop");
                CurrentGeneration[i][j].alive = false;
            } else if (sum == 3 && NextGeneration[i][j].alive == false) {
                console.log("Birth");
                CurrentGeneration[i][j].alive = true;
            }
            sum = 0;
        }
    }
}
var GenerationCounter = 0;
var GenerationTimer = 200;

function updateGameArea() {
    GenerationCounter += 1;
    myGameArea.clear();
    if (myGameArea.UpdateGame == true && GenerationCounter >= GenerationTimer) {
        Handle_Generations();
        GenerationCounter = 0;
    }
    UpdateRects();
}