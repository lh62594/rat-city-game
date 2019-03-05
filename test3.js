/*=====================================
        TO DO LIST / CHALLENGES
=======================================
[ ] render the images (pizza, rats, etc)
[X] collision check (KP)
[ ] render score (LH)
[ ] end level
    --> stops everyting
    --> hidden div
[ ] BONUS STUFF
    --> lives?
    --> gravity
*/

/**************************************************
            CONSTANTS & VARIABLES
**************************************************/
const canvas = document.querySelector("#canvas");
const score = document.querySelector("#score");
const fullWidth = 1200 //window.innerWidth
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
// let bgs = []

let collectedPizzas = 0


let lives = 3 // MAYBE LATER
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

    if (this.x > player.x
      && this.x < (player.x + player.width)
      && this.y < (player.y + player.height)
      && this.y > player.y ) {
        endLevel()
    }
  }

} // end of Obstacle class

class StationSign {
  constructor() {
    this.x = 400
    this.y = 100
    this.dx = - 1.2
    this.width = 250
    this.height = 60
  }

  draw() {
    c.strokeStyle = "rgba(0, 0, 0)" // sign black outside border
    c.lineWidth = 20 // sign black outside border
    c.strokeRect(this.x, this.y, this.width, this.height) // sign black outside border
    c.strokeStyle = "rgba(255, 255, 255)" // sign white inside border
    c.lineWidth = 5 // sign white inside border
    c.strokeRect(this.x, this.y, this.width, this.height) // sign white inside border
    c.fillStyle = "rgba(0, 0, 0)" // sign black background
    c.fillRect(this.x, this.y, this.width, this.height); // sign black background


    c.fillStyle = "rgba(255, 255, 255)" // sign text
    c.font = "24px Arial"; // sign text
    c.fillText("BOWLING GREEN", this.x + 24, this.y + 40); // sign text
  }

  move() {
    if (this.x + this.width < 0) {
      this.x = fullWidth + 100
    }
    this.x += this.dx;
    this.draw();
  }

} // end of StationSign class

class Pizza {
  constructor(x, num) {
    this.num = num
    this.x = x
    this.y = floorPos - 50
    this.dx = pizzaSpeed
    this.radius = 10
    this.image = new Image();
    this.image.src = "img/pizza.png"
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
    // if the pizza hits the left side of canvas, it gets destroyed
    if (this.x < 0) {
      pizzas.shift()
      // console.log("length", pizzas.length);
    }

    // this is moving the pizza left
    this.x += this.dx;
    this.draw();

    // if the pizza hits the player, pizza collection goes up by 1
    // that pizza disappears from the screen & pizza array
    if (this.x > player.x
      && this.x < (player.x + player.width)
      && this.y < (player.y + player.height)
      && this.y > player.y ) {
        // pizzas.splice(this.num, 1)
        this.x = 0
        collectedPizzas += 1
        score.innerText = `PIZZAS: ${collectedPizzas}`
        // console.log("hitting the pizza");
        // console.log("score:", collectedPizzas);
        // console.log(pizzas.length);
    }
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

class Player {
  constructor() {
    this.x = 200
    this.y = floorPos - 100
    this.width = 45
    this.height = 100
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
      endLevel()
    }
  }
} // end of Door class

class Subway {
  constructor(x) {
    this.x = x
    this.y = floorPos - 200
    this.dx = -10
    this.width = fullWidth
    this.height = 275
  }

  draw() {
    c.fillStyle = ("rgb(211,211,211)") // drawing the rectangle of the train
    c.fillRect(this.x, this.y, this.width, this.height)

    c.fillStyle = ("rgba(228, 233, 237, 1)") // window color
    c.fillRect(this.x + 20, 160, 150, 120) // this is first window
    c.fillRect(this.x + 450, 160, 280, 120) // this is second window
    c.fillRect(this.x + 220, 180, 80, 100) // left door window
    c.fillRect(this.x + 320, 180, 80, 100) // right door window

    c.fillStyle = ("rgba(80, 80, 80, 0.3)") // door color
    c.fillRect(this.x + 210, 160, 200, 200) // this is the door
    c.strokeStyle = ("rgba(30, 30, 30, 0.5)") // door outline color
    c.strokeRect(this.x + 210, 160, 100, 200) // left door outline
    c.strokeRect(this.x + 310, 160, 100, 200) // right door outline
    c.strokeRect(this.x + 20, 160, 150, 120) // first window outline
    c.strokeRect(this.x + 450, 160, 280, 120) // second window outline

    c.fillStyle = ("rgba(50, 50, 50, 0.8)") // step color
    c.fillRect(this.x + 200, 360, 220, 10) // this is the step

    // drawing the wheels
    c.beginPath() // outer wheel
    c.arc((this.x + 50), (this.y + this.height + 10), 30, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(5, 5, 5, 1)"
    c.fill()

    c.beginPath() // inner wheel
    c.arc((this.x + 52), (this.y + this.height + 12), 15, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(240, 240, 240, 1)"
    c.fill()


    c.beginPath() // outer wheel
    c.arc((this.x + 130), (this.y + this.height + 10), 30, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(5, 5, 5, 1)"
    c.fill()

    c.beginPath() // inner wheel
    c.arc((this.x + 132), (this.y + this.height + 12), 15, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(240, 240, 240, 1)"
    c.fill()

    c.beginPath() // outer wheel
    c.arc((this.x + 50), (this.y + this.height + 10), 30, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(5, 5, 5, 1)"
    c.fill()

    c.beginPath() // inner wheel
    c.arc((this.x + 52), (this.y + this.height + 12), 15, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(240, 240, 240, 1)"
    c.fill()


    c.beginPath() // outer wheel
    c.arc((this.x + 550), (this.y + this.height + 10), 30, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(5, 5, 5, 1)"
    c.fill()

    c.beginPath() // inner wheel
    c.arc((this.x + 552), (this.y + this.height + 12), 15, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(240, 240, 240, 1)"
    c.fill()

    c.beginPath() // outer wheel
    c.arc((this.x + 630), (this.y + this.height + 10), 30, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(5, 5, 5, 1)"
    c.fill()

    c.beginPath() // inner wheel
    c.arc((this.x + 632), (this.y + this.height + 12), 15, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(240, 240, 240, 1)"
    c.fill()
  }

  move() {
    if (this.x > 200) {
      this.x += this.dx;
      this.draw();
    } else {
      this.draw();
    }
  }
} // end of Subway class




/**************************************************
            BACKGROUND CREATIONS
**************************************************/
let sign = new StationSign
let player = new Player
let door = new Door(fullWidth*2)
let subway = new Subway(fullWidth)


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
    pizzas.push(new Pizza(x, i+1))
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
  if (obstacles != "") {
    requestAnimationFrame( () => {
      animate()
    });

    c.clearRect(0, 0, innerWidth, innerHeight);
    sign.move()

    player.draw()

    obstacles.forEach( o => o.move() )

    pizzas.forEach( p => p.move() )

    door.move()
    // subway.move()


    if(jumpKey == true && player.y == (floorPos - player.height)) {
      player.y = 150
    } else if (jumpKey == false){
      player.y = floorPos - player.height
    }
  }
}
/**************************************************
                EVENT LISTENERS
**************************************************/
window.addEventListener("keydown", event => {
  if (event.code == "ArrowUp" && jumpKey == false) {
    jumpKey = true
  }
})

window.addEventListener("keyup", event => {
  if (event.code == "ArrowUp") {
  jumpKey = false
  }
})

/**************************************************
                HELPER FUNCTIONS
**************************************************/
function endLevel() {
  obstacles = []
  pizzas = []
  canvas.style.animation = "none"
  bringSubway()
  // console.log(obstacles, pizzas);
}

function bringSubway() {
  if (subway.x > 200) {
    requestAnimationFrame(bringSubway)
    c.clearRect(0, 0, innerWidth, innerHeight);
    player.draw()
    door.draw()
    sign.draw()
    subway.move()
    // console.log("running animation on subway");
    // console.log(subway.x);
  }
}

function showStats() {

}

function countPizzas() {

}

// function createHearts() {
//   let img = new Image();
//   img.src = 'img/heart.png'
//   // debugger
//   canvas.onload( () => {
//     // debugger
//     c.drawImage(img, 100, 100, 50, 50)
//   })
// }
//
// createHearts()

/**************************************************
                INVOKING FUNCTIONS
**************************************************/
renderAll()
animate()
// pizzas[0].draw()
// subway.draw()

// let heart = new Life
// heart.draw()

// window.onload = function() {
//   let img = new Image();
//   img.src = 'img/heart.png'
//   c.drawImage(img, 100, 100)
// }
