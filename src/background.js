/*************************************************
              CONSTANTS & VARIABLES
*************************************************/
const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")
let background = new Image();
background.src = "img/bowling_green_5.png";


/*************************************************
                CREATE GAME AREA
*************************************************/
let gameArea = {
  canvas: canvas,
  start: function() {
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(updateGameArea, 20);
  },
  clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
      clearInterval(this.interval);
  }
}

/*************************************************
              BACKGROUND CLASS
*************************************************/
class Background{
  constructor(width, height, source, x, y) {
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = source;
    this.x = x
    this.y = y
    this.dx = 0; // setting x speed to 0
    this.dy = 0; // setting y speed to 0
  }

  update() {
    ctx.drawImage(this.image,
      this.x + this.width,
      this.y,
      this.width, this.height);
  }

  newPos() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x == -(this.width)) {
        this.x = 0;
    }
  }


} // end of Background class

let myBackground = new Background(1200, 400, "img/bowling_green_5.png", 0, 0);
// console.log(myBackground);
// myBackground.onload = myBackground.update()
// myBackground.onload = myBackground.update()


// function updateGameArea() {
//     gameArea.clear();
//     myBackground.dx = -0.5;
//     myBackground.newPos();
//     myBackground.update();
//     debugger
// }


// gameArea.start();

// background.onload = function(){
//     ctx.drawImage(background,0,0,1200,400);
// }

window.onload = function() {
    myBackground.update()
}
