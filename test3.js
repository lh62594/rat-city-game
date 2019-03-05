/**************************************************
            CONSTANTS & VARIABLES
**************************************************/
const canvas = document.querySelector("#canvas");
const fullWidth = 1000
const fullHeight = 450
canvas.width = fullWidth
canvas.height = fullHeight

// let speed = -1
// let bgSpeed = 0
let c = canvas.getContext("2d");

let obstacles = []
let pizzas = []
let bgs = []

let controls = {
  // left: false,
  // up: false,
  right: false,
  // down: false,
};

let lives = 3


/**************************************************
            BACKGROUND CREATIONS
**************************************************/
// creates the "FLOOR"
function createFloor() {
  c.fillStyle = "rgba(0,0,0)"
  c.fillRect(0, 250, fullWidth, 3);
}
createFloor()


/**************************************************
                      CLASSES
**************************************************/
class Obstacle {
  constructor(x, height) {
    this.x = x
    this.y = 250 - height
    this.dx = -1
    this.width = 50
    this.height = height
  }

  draw() {
    c.fillStyle = "rgba(0, 0, 0)"
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  stopped() {
    if (this.x + 2*this.radius < 0) {
      this.x = fullWidth + (Math.random()*400 + 375)
      // this.delete()
    }
    this.x += this.dx
    this.draw();
    console.log(this.x);
    console.log(this.dx);
  }

  moveRight() {
    if (this.x + this.width < 0) {
      this.x = fullWidth + (Math.random()*525 + 475)
    }
    this.x += -5
    this.draw();
  }

} // end of Obstacle class

class Pizza {
  constructor(x) {
    this.x = x
    this.y = 225
    this.dx = 0
    this.radius = 10
    this.image = new Image();
    this.image.src = "img/pizza.png"
  }

  draw() {
    // this.image.onload = function () {
      // c.drawImage(this.image, 100, 100, 50, 50)
    // }
    // let img = new Image()
    // img.src = 'img/pizza.png'
    // img.onload = () => {
    //   c.drawImage(img, this.x, this.y, 35, 35)
    // }
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(0, 0, 255, 0.7)"
    c.strokeStyle = "rgba(0, 0, 255, 0.7)"
    c.stroke();
    c.fill()
  }

  stopped() {
    if (this.x + 2*this.radius < 0) {
      this.x = fullWidth + (Math.random()*400 + 375)
    }
    // this.x += this.dx;
    this.draw();
  }

  moveRight() {
    if (this.x + 2*this.radius < 0) {
      this.x = fullWidth + (Math.random()*400 + 375)
    }
    this.x += -2
    this.draw();
  }

} // end of Pizza class

class Background {
  constructor(x) {
    this.x = x
    this.y = 75
    this.dx = 0
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

    // c.strokeRect(this.d*2 + this.x + this.width/2, this.y, this.width, this.height)
    // c.strokeRect(this.d*2 + this.x, this.y + this.height, this.width, this.height)
    // c.strokeRect(this.d*2 + this.x + this.width, this.y + this.height, this.width, this.height)
    // let ctx = canvas.getContext("2d")
    //
    // // debugger
    // ctx.drawImage(this.image,
    //     this.x + this.width,
    //     this.y,
    //     this.width, this.height);
  }

  stopped() {
    if (this.x + 2*this.radius < 0) {
      this.x = fullWidth + (Math.random()*400 + 375)
    }
    // this.x += this.dx;
    this.draw();
  }

  move() {
    if (this.x + this.d + 2 * this.width< 0) {
      this.x = fullWidth
    }
    this.dx = -0.5
    this.x += this.dx;
    // console.log(this.dx);
    this.draw();
  }
} // end of Background class

// let b = new Background

class Player {
  constructor() {
    this.x = 200
    this.y = 150
    this.width = 45
    this.height = 100
    this.gravity = 0
    this.gravitySpeed = 0
  }

  draw() {
    c.fillStyle = "#008000"
    c.fillRect(this.x, this.y, this.width, this.height)
  }
}


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
function createObstacles() {
  for (var i = 0; i < 2; i++) {
    var x = fullWidth + i * (Math.random()*525 + 475)
    var height = 30
    obstacles.push(new Obstacle(x, height))
  }
}

function createPizzas() {
  for (var i = 0; i < 3; i++) {
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

let player = new Player

function firstRender() {
  createObstacles()
  obstacles.forEach( o => o.draw() )
  createBackground()
  bgs.forEach( b => b.draw() )
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
function moveRight() {
  // requestAnimationFrame( () => {
  //   moveRight()
  // });
  c.clearRect(0, 0, innerWidth, innerHeight);
  createFloor();
  player.draw()

  obstacles.forEach( o => o.moveRight() )

  pizzas.forEach( p => p.moveRight() )

  bgs.forEach( b => b.move() )

}

function stop() {
  requestAnimationFrame( () => {
    stop()
  });
  c.clearRect(0, 0, innerWidth, innerHeight);
  createFloor();
  player.draw()

  obstacles.forEach( o => o.stopped() )

  pizzas.forEach( p => {
    p.draw()
  })
  //
  bgs.forEach( b => {
    b.draw()
  })
}


/**************************************************
                EVENT LISTENERS
**************************************************/
window.addEventListener("keydown", event => {
  if (event.code === "ArrowRight") {
    moveRight()
  } else if (event.code === "ArrowLeft") {
    moveLeft()
  }
})

window.addEventListener("keyup", event => {
  // console.log(event.code);
  if (event.code === "ArrowRight") {
    // controls.right = true
    // console.log(controls.right);
    stop()
    console.log("released the right arrow!");
  }
})

/**************************************************
                INVOKING FUNCTIONS
**************************************************/

// createObstacles()
// createPizzas()
// createBackground()
// animate()
firstRender()



// b.draw()
// let pizza = new Pizza(300)
// pizza.draw()
// draw()
