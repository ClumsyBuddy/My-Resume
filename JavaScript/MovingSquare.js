var myGamePiece;
var OtherRect;


function startGame() {
    myGamePiece = new component(30, 30, "red", 225, 225);
    OtherRect = new Rect(30, 30, "blue", 225, 225);
    myGameArea.start();
}

var myGameArea = {
    canvas: document.getElementById("PricingCanvas"),
    start: function() {
        this.canvas.width = window.innerWidth * 0.90;
        this.canvas.height = window.innerHeight * 0.90;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function(e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function(e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('mousemove', function(e) {
            const rect = myGameArea.canvas.getBoundingClientRect()
            myGameArea.mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        })
        window.addEventListener('resize', function(e) {
            myGameArea.canvas.width = window.innerWidth * 0.90;
            myGameArea.canvas.height = window.innerHeight * 0.90;
        })
    },
    stop: function() {
        clearInterval(this.interval);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    Boundaries: function(Entity) {
        if (Entity.x < 0) {
            Entity.x = 0;
        }
        if (Entity.x > myGameArea.canvas.width) {
            Entity.x = myGameArea.canvas.width;
        }
        if (Entity.y < 0) {
            Entity.y = 0;
        }
        if (Entity.y > myGameArea.canvas.height) {
            Entity.y = myGameArea.canvas.height;
        }
    },
}


function component(width, height, color, x, y, type) {

    this.type = type;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}

function Rect(width, height, color, x, y, type) {

    this.type = type;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.gravity = 5;
    this.velocity = { x: 0, y: 0 };
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
        this.y += this.gravity;
    }
    this.PhysicsUpdate = function() {
        this.velocity.x = MinMaxClamp(this.velocity.x, -5, 5);
        this.velocity.y = MinMaxClamp(this.velocity.y, -5, 5);
    }
}



function updateGameArea() {
    myGameArea.clear();
    myGamePiece.moveAngle = 0;
    myGamePiece.speed = 0;
    if (myGameArea.keys && myGameArea.keys[65] || myGameArea.keys && myGameArea.keys[37]) { myGamePiece.moveAngle = -3; }
    if (myGameArea.keys && myGameArea.keys[68] || myGameArea.keys && myGameArea.keys[39]) { myGamePiece.moveAngle = 3; }
    if (myGameArea.keys && myGameArea.keys[87] || myGameArea.keys && myGameArea.keys[38]) { myGamePiece.speed = 5; }
    if (myGameArea.keys && myGameArea.keys[83] || myGameArea.keys && myGameArea.keys[40]) { myGamePiece.speed = -5; }
    //PlayerPiece
    myGamePiece.newPos();
    myGameArea.Boundaries(myGamePiece);
    myGamePiece.update();
    //Testing piece
    OtherRect.newPos();
    myGameArea.Boundaries(OtherRect);
    OtherRect.update();

    //console.log(myGameArea.mousePos.x)
}







function MinMaxClamp(Value, Min = '', Max = '') {
    if (Value > Max) {
        return Max;
    }
    if (Value < Min) {
        return Min;
    }
    return Value;
}