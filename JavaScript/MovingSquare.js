var myGamePiece;
var OtherRect = [];
var RectAmount = 50;

function Reset() {
    myGameArea.stop();
    OtherRect = [];
    RectAmount = 50;
    document.getElementById("Rects").valueAsNumber = 50;
    startGame(RectAmount);
}


function AddRect() {
    doc = document.getElementById("Rects");
    RectAmount = doc.valueAsNumber;
    RectAmount = MinMaxClamp(RectAmount, doc.min, doc.max);
    doc.valueAsNumber = RectAmount;
    OtherRect = [];
    for (var i = 0; i < RectAmount; i++) {
        xPos = (Math.random() * (window.innerWidth * 0.90)) + 1;
        yPos = (Math.random() * (window.innerHeight * 0.90)) + 1;
        rectWidth = 50;
        rectHeight = 50;
        OtherRect.push(new Rect(rectWidth, rectHeight, "blue", xPos, yPos));
    }
}


function startGame() {
    myGamePiece = new component(30, 30, "red", 225, 225);
    for (var i = 0; i < RectAmount; i++) {
        xPos = (Math.random() * (window.innerWidth * 0.90)) + 1;
        yPos = (Math.random() * (window.innerHeight * 0.90)) + 1;
        rectWidth = 50;
        rectHeight = 50;
        OtherRect.push(new Rect(rectWidth, rectHeight, "blue", xPos, yPos));
    }
    //OtherRect.push(new Rect(10, 10, "blue", 100, 225));
    //OtherRect.push(new Rect(30, 30, "blue", 225, 100));
    //OtherRect.push(new Rect(100, 100, "blue", 400, 100));
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

        window.addEventListener('keydown', KeyDown = function(e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })

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
        if (Entity.x < 0 + (Entity.width / 2)) {
            Entity.x = 0 + (Entity.width / 2);
        }
        if (Entity.x > myGameArea.canvas.width - (Entity.width / 2)) {
            Entity.x = myGameArea.canvas.width - (Entity.width / 2);
        }
        if (Entity.y < 0 + (Entity.height / 2)) {
            Entity.y = 0 + (Entity.height / 2);
        }
        if (Entity.y > myGameArea.canvas.height - (Entity.height / 2)) {
            Entity.y = myGameArea.canvas.height - (Entity.height / 2);
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
    this.color = color;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.gravity = 0;
    this.friction = 0.25;
    this.PushForce = 1000;
    this.velocity = { x: 0, y: 0 };
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.lineWidth = 0;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
        this.y += this.gravity;
        this.x += this.velocity.x;
        this.y -= this.velocity.y;
    }
    this.PhysicsUpdate = function() {
        this.velocity.x = MinMaxClamp(this.velocity.x, -5, 5);
        this.velocity.y = MinMaxClamp(this.velocity.y, -5, 5);
        if (this.velocity.x != 0) {
            if (this.velocity.x > 0) {
                this.velocity.x -= this.friction;
            }
            if (this.velocity.x < 0) {
                this.velocity.x += this.friction;
            }
        }
        if (this.velocity.y != 0) {
            if (this.velocity.y > 0) {
                this.velocity.y -= this.friction;
            }
            if (this.velocity.y < 0) {
                this.velocity.y += this.friction;
            }
        }
    }
    this.MouseCollision = function(mX, mY) {
        color = "blue"
        var _width = this.width * 0.50;
        var _height = this.height * 0.50;

        if (mX <= this.x + _width && mX >= this.x - _width && mY <= this.y + _height && mY >= this.y - _height) {
            color = "green"
            if (mX > this.x) {
                this.velocity.x -= this.PushForce;
            } else if (mX < this.x) {
                this.velocity.x += this.PushForce;
            }
            if (mY > this.y) {
                this.velocity.y += this.PushForce;
            } else if (mY < this.y) {
                this.velocity.y -= this.PushForce;
            }
        }
    }
}




function updateGameArea() {

    myGameArea.clear();
    /*
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
    */
    for (var i = 0; i < OtherRect.length; i++) {
        OtherRect[i].newPos();
        myGameArea.Boundaries(OtherRect[i]);
        OtherRect[i].MouseCollision(myGameArea.mousePosx, myGameArea.mousePosy);
        OtherRect[i].PhysicsUpdate();
        OtherRect[i].update();
    }
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