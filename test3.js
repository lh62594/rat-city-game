const canvas = document.querySelector("#canvas");
// console.log(canvas);
var c = canvas.getContext("2d");
var e = canvas.getContext("2d");
var b = canvas.getContext("2d"); // background line
// <canvas id="canvas" width="800" height="400"></canvas>


// black rectangles
c.fillRect(0, 250, 800, 5);
// c.fillRect(700, 190, 25, 60);


// the player rectangle
// c.fillStyle = "rgba(0, 0, 255, 0.7)";
// c.fillRect(25, 225, 25, 25);


var x = 900
var y = 1200
var dx = -1
function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, innerWidth, innerHeight)
  b.fillRect(0, 250, 800, 5);
  c.fillRect(x, 190, 25, 60);
  e.fillRect(y, 220, 25, 30);

  x += dx
  y += dx

}

// animate()

function Obstacle(x, h) {
  this.x = x;
  this.y =
  this.h = h;
  this.dx = -1

  this.draw = function() {
    c.fillRect(x, 200, 25, h);
    console.log(this.y);
  }
}

var rec = new Obstacle(600, 50)
rec.draw()
