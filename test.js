// const hello = document.querySelector("#testing")
//
// console.log(hello);

// var myGamePiece;
// var myBackground;
const canvas = document.querySelector("#canvas")
var c = canvas.getContext("2d")
console.log(c);

let myGamePiece = new component(100, 120, "img/mario-pose2.png", 10, 170, "image");
let myBackground = new component(1200, 400, "img/bowling_green_5.png", 0, 0, "background");

const startBtn = document.querySelector("#btnStart")


function startGame() {
    myGameArea.start();
}

var myGameArea = {
    canvas : canvas,
    start : function() {
        // this.canvas.width = 800; // setting the canvas width
        // this.canvas.height = 400; // setting the canvas height
        this.context = this.canvas.getContext("2d"); // creating the 2d drawing element

        // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        // this.frameNo = 0;
        this.interval = setInterval(startGameArea, 20);
        },
    move: function() {
      this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

// const myGameArea = document.querySelector("#bg")
// console.log(myGameArea);

function component(width, height, src, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = src;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        let ctx = myGameArea.context;
        // debugger
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        if (type == "background") {
            ctx.drawImage(this.image,
                this.x + this.width,
                this.y,
                this.width, this.height);
        }
        } else {
            ctx.fillStyle = src;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    myBackground.speedX = -0.5;
    // myBackground.speedX = speed;
    myBackground.newPos();
    myBackground.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function startGameArea() {
    // myGameArea.clear();
    myBackground.speedX = 0;
    // myBackground.newPos();
    myBackground.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

// function move(dir) {
//     myGamePiece.image.src = "angry.gif";
//     if (dir == "up") {myGamePiece.speedY = -1; }
//     if (dir == "down") {myGamePiece.speedY = 1; }
//     if (dir == "left") {myGamePiece.speedX = -1; }
//     if (dir == "right") {myGamePiece.speedX = 1; }
// }

function clearmove() {
    myGamePiece.image.src = "smiley.gif";
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

startBtn.addEventListener("click", event => {
  // console.log(event);
  myGameArea.move()
})
