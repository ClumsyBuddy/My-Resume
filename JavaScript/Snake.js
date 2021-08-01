
function Start_Snake(){
    myRect = new Rect(20, 20, "green", 100, 100);

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
                myGameArea.debug = !myGameArea.debug;
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




function updateGameArea(){
    myGameArea.clear();
    myRect.update();
}