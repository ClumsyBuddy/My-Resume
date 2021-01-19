var myGamePiece;
var OtherRect = [];


function startGame() {
    myGamePiece = new component(30, 30, "red", 225, 225);
    OtherRect.push(new Rect(10, 10, "blue", 100, 225));
    OtherRect.push(new Rect(30, 30, "blue", 225, 100));
    OtherRect.push(new Rect(100, 100, "blue", 400, 100));
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
    this.MouseCollision = function(mX, mY) {
        color = "blue"
        var _width = this.width / -2;
        var _height = this.height / -2;

        var r = {
            A: { x: this.x - _width, y: this.y - _height },
            B: { x: this.x + _width, y: this.y - _height },
            C: { x: this.x - _width, y: this.y + _height },
            D: { x: this.x + _width, y: this.y + _height }
        }
        var MousePos = { x: mX, y: mY };
        if (pointInRectangle(MousePos, r)) {
            color = "green";
        }

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
    for (var i = 0; i < OtherRect.length; i++) {
        OtherRect[i].newPos();
        myGameArea.Boundaries(OtherRect[i]);
        OtherRect[i].MouseCollision(myGameArea.mousePosx, myGameArea.mousePosy);
        OtherRect[i].update();
    }

    //console.log(myGameArea.mousePos.x);
}



function pointInRectangle(m, r) {
    var AB = vector(r.A, r.B);
    var AD = vector(r.A, r.D);
    var AM = vector(r.A, m);
    var dotAMAB = dot(AM, AB);
    var dotABAB = dot(AB, AB);
    var dotAMAD = dot(AM, AD);
    var dotADAD = dot(AD, AD);

    return 0 <= dotAMAB && dotAMAB <= dotABAB && 0 <= dotAMAD && dotAMAD <= dotADAD;
}

function vector(p1, p2) {
    return {
        x: (p2.x - p1.x),
        y: (p2.y - p1.y)
    };
}

function dot(u, v) {
    // return (u.x*u.x+u.y*u.y)*(v.x*v.x+v.y*v.y);
    return u.x * v.x + u.y * v.y;
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