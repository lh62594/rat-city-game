/**************************************************
            CONSTANTS & VARIABLES
**************************************************/
const canvas = document.querySelector("#canvas");
const fullWidth = window.innerWidth
const fullHeight = 450
const floorPos = 315
const bgSpeed = -1
const pizzaSpeed = -2.5
const obSpeed = -4
const container = document.querySelector("#container")

canvas.width = fullWidth
canvas.height = fullHeight

let c = canvas.getContext("2d");

//arrays
let obstacles = []
let pizzas = []
let bgs = []

let lives = 3
let jumpKey = false


/**************************************************
            BACKGROUND CREATIONS
**************************************************/
// creates the "FLOOR"
// function createFloor() {
//   c.fillStyle = "rgba(0,0,0)"
//   c.fillRect(0, floorPos, fullWidth, 3);
// }

// createFloor()


/**************************************************
                      CLASSES
**************************************************/
class Obstacle {
  constructor(x, height) {
    this.x = x
    this.y = floorPos - height
    this.dx = obSpeed
    this.width = 50
    this.height = height
  }

  draw() {
    c.fillStyle = "rgba(0, 0, 0)"
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    if (this.x + this.width < 0) {
      this.x = fullWidth + (Math.random()*525 + 475)
    }
    this.x += obSpeed
    this.draw();
  }

} // end of Obstacle class

class Pizza {
  constructor(x) {
    this.x = x
    this.y = floorPos - 50
    this.dx = pizzaSpeed
    this.radius = 10
    // this.image = new Image();
    // this.image.src = "img/pizza.png"
    this.jumping = false
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(0, 0, 255, 0.7)"
    c.strokeStyle = "rgba(0, 0, 255, 0.7)"
    c.stroke();
    c.fill()
  }

  move() {
    this.x += this.dx
    this.draw();
  }

} // end of Pizza class

class Background {
  constructor(x) {
    this.x = x
    this.y = 75
    this.dx = bgSpeed
    this.width = 60
    this.height = 25
    this.d = 500
    this.image = new Image();
    this.image.src = 'img/bowling_green_5.png'
  }

  draw() {
    c.strokeStyle = "rgb(139,0,0)"
    c.strokeRect(this.x + this.width/2, this.y, this.width, this.height)
    c.strokeRect(this.x, this.y + this.height, this.width, this.height)
    c.strokeRect(this.x + this.width, this.y + this.height, this.width, this.height)

    c.strokeRect(this.d + this.x + this.width/2, this.y + 50, this.width, this.height)
    c.strokeRect(this.d + this.x, this.y + this.height + 50, this.width, this.height)
    c.strokeRect(this.d + this.x + this.width, this.y + this.height + 50, this.width, this.height)
  }

  move() {
    if (this.x + this.d + 2 * this.width< 0) {
      this.x = fullWidth
    }
    this.x += this.dx;
    this.draw();
  }
} // end of Background class

// let b = new Background

class Player {
  constructor() {
    this.x = 200
    this.y = floorPos - 100
    this.width = 45
    this.height = 100
    // this.gravity = 0
    // this.gravitySpeed = 0
    // this.y_velocity = 0
    this.jumping = false
  }

  draw() {
    c.fillStyle = "rgba(255,255,255,1)"
    c.fillRect(this.x, this.y, this.width, this.height)
  }
}


class Door {
  constructor(x) {
    this.x = x
    this.y = floorPos - 200
    this.dx = -1.2
    this.width = 100
    this.height = 200
  }

  draw() {
    // drawing the rectangle of the door
    c.fillStyle = ("rgba(46, 49, 49, 1)")
    c.fillRect(this.x, this.y, this.width, this.height)
    c.fillStyle = ("rgba(228, 233, 237, 1)")
    c.fillRect(this.x + 20, 140, 60, 60)

    // drawing the knob of the door
    c.beginPath()
    c.arc(this.x + 80, 225, 5, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(0, 0, 255, 1)"
    c.strokeStyle = "rgba(0, 0, 255, 1)"
    c.stroke();
    c.fill()
  }

  move() {
    if (this.x > 200) {
      this.x += this.dx;
      this.draw();
    } else {
      this.draw();
      container.style.animation = "none"
    }
  }
}




// function jump() {
//   if
//   this.y_velocity -= 20
//   this.jumping = true
//   this.y_velocity += 1.5;
//
//   if (this.y > 250) {
//     this.jumping = false
//     this.y = 250
//     this.y_velocity = 0
//   }
// }
// function draw() {
//   var ctx = document.getElementById('canvas').getContext('2d');
//   var img = new Image();
//   img.onload = function() {
//     ctx.drawImage(img, 100, 200, 50, 50);
//   };
//   img.src = 'img/pizza.png';
// }

/**************************************************
            BACKGROUND CREATIONS
**************************************************/
let player = new Player
let door = new Door(fullWidth * 2)

function createObstacles() {
  for (var i = 0; i < 2; i++) {
    var x = fullWidth + i * (Math.random()*525 + 475)
    var height = 30
    obstacles.push(new Obstacle(x, height))
  }
}

function createPizzas() {
  for (var i = 0; i < 10; i++) {
    var x = fullWidth + i * (Math.random()*400 + 375) + 350
    pizzas.push(new Pizza(x))
  }
}

function createBackground() {
  for (var i = 0; i < 2; i++) {
    var x = 100 + i * fullWidth
    bgs.push(new Background(x))
  }
}


function renderAll() {
  createObstacles()
  obstacles.forEach( o => o.draw() )
  // createBackground()
  // bgs.forEach( b => b.draw() )
  createPizzas()
  pizzas.forEach( p => p.draw() )
  player.draw()
}


/**************************************************
              ANIMATION FUNCTIONS
**************************************************/
// to "move right" function
// add event listeners on the left/right arrows
// gives illusion that character is moving, without actually moving the character
function animate() {
  requestAnimationFrame( () => {
    animate()
  });

  c.clearRect(0, 0, innerWidth, innerHeight);
  player.draw()

  obstacles.forEach( o => o.move() )

  pizzas.forEach( p => p.move() )

  door.move()

  if(jumpKey == true && player.y == (floorPos - player.height)) {
    player.y = 150
  } else if (jumpKey == false){
    player.y = floorPos - player.height
  }

}
/**************************************************
                EVENT LISTENERS
**************************************************/
window.addEventListener("keydown", event => {
  if (event.code == "ArrowUp" && jumpKey == false) {
    jumpKey = true
    console.log(jumpKey);
  }
})

window.addEventListener("keyup", event => {
  if (event.code == "ArrowUp") {
  jumpKey = false
  console.log(jumpKey);
  }
})


/**************************************************
                INVOKING FUNCTIONS
**************************************************/
renderAll()
animate()
