/*************************************************
              CONSTANTS & VARIABLES
*************************************************/
const canvas = document.querySelector("#canvas")
// console.log(canvas);


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
    let c = gameArea.context;
    c.drawImage(this.image,
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



function updateGameArea() {
    gameArea.clear();
    myBackground.dx = -0.5;
    myBackground.newPos();
    myBackground.update();
    // debugger
}


gameArea.start();
