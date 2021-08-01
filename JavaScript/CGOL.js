var UI = new UIManager("CanvasDiv");

var Offset = 1;
var CanvasSizeWidth = window.innerWidth * Offset;
var CanvasSizeHeight = window.innerHeight * Offset;
var rectSize = 15;
var RectControl = false;

var _width = CanvasSizeWidth / rectSize;
var _height = CanvasSizeHeight / rectSize;

var RectWidth = parseInt(_width.toFixed(0));
var RectHeight = parseInt(_height.toFixed(0));

Eraser_Control = null;
Pause_Button = null;



var CurrentGeneration = [];

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

function Start_CGOL() {
    LoadUI();
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
        this.debug = false;
        this.UpdateGame = false;
        this.interval = setInterval(updateGameArea, 10);

        window.addEventListener("keyup", function(e) {
            if (e.key == "o") {
                PauseButton();
            } else if (e.key == "p") {
                UnloadUI();
                console.log("Debug click");
            }else if(e.key == "e"){
                LifeOrDeath();
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
        ctx.fillStyle = this.color;
        ctx.lineWidth = 0;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
        if (this.alive === false) {
            this.color = "white"
        } else {
            this.color = "black"
        }
    }

    this.MouseCollision = function(mX, mY) {
        if (mX > this.x && mX < (this.x + this.width) && mY > this.y && mY < (this.y + this.height)) {
            if (myGameArea.MouseClicked === true) {
                if (myGameArea.LOD === false && myGameArea.debug === false) {
                    this.alive = true
                } else if(myGameArea.LOD === true && myGameArea.debug === false) {
                    this.alive = false;
                }else if (myGameArea.debug === true){
                    console.log(this.x ,this.y);
                    console.log(this.alive);
                    myGameArea.MouseClicked = false;
                }
                
                //myGameArea.MouseClicked = false;
            } else if (this.alive === false && myGameArea.LOD === false) {
                this.color = "grey";
            } else if (this.alive === true && myGameArea.LOD === true) {
                this.color = "grey";
            }
        }
    }
}

function LifeOrDeath() {
    myGameArea.LOD = !myGameArea.LOD;
    if (myGameArea.LOD === true) {
        Eraser_Control.style.color = "black";
        Eraser_Control.style.backgroundColor = "white";
        Eraser_Control.textContent = "Erasing";
    } else {
        Eraser_Control.style.color = "white";
        Eraser_Control.style.backgroundColor = "black";
        Eraser_Control.textContent = "Drawing";

    }
}
function PauseButton() {
    myGameArea.UpdateGame = !myGameArea.UpdateGame;
    if (myGameArea.UpdateGame === false) {
        Pause_Button.style.color = "black";
        Pause_Button.style.backgroundColor = "white";
        Pause_Button.textContent = "Paused";
    } else {
        Pause_Button.style.color = "white";
        Pause_Button.style.backgroundColor = "black";
        Pause_Button.textContent = "Unpaused";

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

const deepCopy = (arr) => {
    let copy = [];
    arr.forEach(elem => {
      if(Array.isArray(elem)){
        copy.push(deepCopy(elem))
      }else{
        if (typeof elem === 'object') {
          copy.push(deepCopyObject(elem))
      } else {
          copy.push(elem)
        }
      }
    })
    return copy;
  }
  // Helper function to deal with Objects
  const deepCopyObject = (obj) => {
    let tempObj = {};
    for (let [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        tempObj[key] = deepCopy(value);
      } else {
        if (typeof value === 'object') {
          tempObj[key] = deepCopyObject(value);
        } else {
          tempObj[key] = value
        }
      }
    }
    return tempObj;
  }

function Handle_Generations() {
    var sum = 0;
    const NextGeneration = deepCopy(CurrentGeneration);

    for (var i = 0; i < RectWidth; i++) {
        for (var j = 0; j < RectHeight; j++) {
            for (var x = -1; x < 2; x++) {
                for (var y = -1; y < 2; y++) {
                    if (x == 0 && y == 0) {
                        continue;
                    } else {
                        var cols = (i + x + RectWidth) % RectWidth;
                        var rows = (j + y + RectHeight) % RectHeight;
                        sum += NextGeneration[cols][rows].alive;
                    }
                }
            }
            if (sum === 2 && NextGeneration[i][j].alive == true) {
                CurrentGeneration[i][j].alive = true;
            } else if (sum === 3 && NextGeneration[i][j].alive === true) {
                CurrentGeneration[i][j].alive = true;
            } else if (sum < 2 && NextGeneration[i][j].alive === true) {
                CurrentGeneration[i][j].alive = false;
            } else if (sum > 3 && NextGeneration[i][j].alive === true) {
                CurrentGeneration[i][j].alive = false;
            } else if (sum === 3 && NextGeneration[i][j].alive === false) {
                CurrentGeneration[i][j].alive = true;
            }
            sum = 0;
        }
    }
}
var GenerationCounter = 0;
var GenerationTimer = 10;

function updateGameArea() {
    GenerationCounter += 1;
    myGameArea.clear();
    if (myGameArea.UpdateGame == true && GenerationCounter >= GenerationTimer) {
        Handle_Generations();
        GenerationCounter = 0;
    }
    UpdateRects();
}







function LoadUI(){
    UI.CreateElement(key="Erase", Element = {Ele : "button", id : "Eraser", type : "button", style : "position:absolute; margin-top:5%; left:1%;", textContent : "Drawing"});
    UI.CreateElement(key="Pause", Element = {Ele : "button", id : "Pause", type : "button", style : "position:absolute; margin-top:5%; left:10%;", textContent : "Paused"});
    
    var EraserControl = UI.GetSavedElement("Erase");
    Eraser_Control = EraserControl;
    var PauseButton =  UI.GetSavedElement("Pause");
    Pause_Button = PauseButton;
}
function UnloadUI(){
    UI.RemoveElement(key="Erase");
}

function UnloadGame(){

    myGameArea.stop();
}