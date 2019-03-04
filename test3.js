const canvas = document.querySelector("#canvas");
const fullWidth = 1000
const fullHeight = 450
canvas.width = fullWidth
canvas.height = fullHeight
// console.log(canvas);
var c = canvas.getContext("2d");
// var e = canvas.getContext("2d");
// var b = canvas.getContext("2d"); // background line


// creates the "FLOOR"
function createFloor() {
  // var c = canvas.getContext("2d");
  c.fillRect(0, 250, fullWidth, 5);
}
createFloor()


// animate()

class Obstacle {
  constructor(x, height) {
    this.x = x
    this.y = 250 - height
    this.dx = -1
    this.width = 40
    this.height = height
    this.c = canvas.getContext("2d");
  }

  draw() {
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.dx;
    this.draw();
  }

  animate() {
    window.requestAnimationFrame( () => {
      this.animate()
    });
    this.c.clearRect(0, 0, innerWidth, innerHeight);
    createFloor();
    // debugger
    this.move();
  }
}


let rectangle1 = new Obstacle(800, 20)
let rectangle2 = new Obstacle(900, 50)
// rectangle.draw()
// rectangle1.animate()
// rectangle1.draw()
// rectangle2.draw()
// rectangle2.animate()
// animate(rectangle)
