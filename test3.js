/*=================================================
            TO DO LIST / CHALLENGES
===================================================
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
// document elements
const canvas = document.querySelector("#canvas");
const container = document.querySelector("#container")
const restart = document.querySelector(".restart")
const score = document.querySelector("#score");
const livesLeft = document.querySelector("#lives");

// canvas screen adjustments
const fullWidth = 1200 //window.innerWidth
const fullHeight = 450
canvas.width = fullWidth
canvas.height = fullHeight
const floorPos = 315

// setting constant speeds
const bgSpeed = -0.9 // background speed
const pizzaSpeed = -2.5 // pizza speed
const obSpeed = -4 // obstacle speed

let c = canvas.getContext("2d");

//arrays
let obstacles = []
let pizzas = []
let collectedPizzas = 0
let lives = 3 // MAYBE LATER
let jumpKey = false
let paused = false


/**************************************************
                      CLASSES
**************************************************/
class Obstacle {
  constructor(x) {
    this.x = x
    this.y = floorPos - 40
    this.dx = obSpeed
    this.width = 100
    this.height = 50
    this.image = new Image(50,50)
    this.image.src = "img/rat.png"
  }

  draw() {
    // c.fillStyle = "rgba(0, 0, 0)"
    // c.fillRect(this.x, this.y, this.width, this.height);
    c.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  move() {
    // debugger
    if (lives > -1) {
      if (this.x + this.width < 0) {
        this.x = fullWidth + (Math.random()*525 + 475)
      }

      this.x += obSpeed
      this.draw();

      //if player hits an obstacle
      if (this.x > player.x
        && this.x < (player.x + player.width)
        && this.y < (player.y + player.height)
        && this.y > player.y ) {
          // lives decrease
          lives -= 1
          // the game is paused
          paused = true
        }
    }
  }

} // end of Obstacle class

class StationSign {
  constructor() {
    this.x = 400
    this.y = 100
    this.dx = bgSpeed
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
    this.size = 40
    this.image = new Image(50,50);
    this.image.src = "img/pizza.png"
  }

  draw() {
    c.drawImage(this.image, this.x, this.y, this.size, this.size)
  }

  move() {
    // if the pizza hits the left side of canvas, it gets destroyed
    if (this.x < 0) {
      pizzas.shift()
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
        this.x = 0
        collectedPizzas += 1
        score.innerText = `PIZZAS: ${collectedPizzas}`
    }
  }

} // end of Pizza class

class Player {
  constructor() {
    this.x = 200
    this.y = floorPos - 100
    this.width = 70
    this.height = 100
    this.image = new Image(50, 50)
    this.image.src = "img/mario-pose2.png"
  }

  draw() {
    // c.fillStyle = "rgba(255,255,255,1)"
    // c.fillRect(this.x, this.y, this.width, this.height)
    c.drawImage(this.image, this.x, this.y, this.width, this.height)
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
    c.fillRect(this.x + 20, 160, 150, 120) // first window
    c.fillRect(this.x + 450, 160, 320, 120) // second window
    c.fillRect(this.x + 220, 180, 80, 100) // left door window (1)
    c.fillRect(this.x + 320, 180, 80, 100) // right door window (1)
    c.fillRect(this.x + 820, 180, 80, 100) // left door window (2)
    c.fillRect(this.x + 920, 180, 80, 100) // right door window (2)

    c.fillStyle = ("rgba(80, 80, 80, 0.3)") // door color
    c.fillRect(this.x + 210, 160, 200, 200) // first door
    c.fillRect(this.x + 810, 160, 200, 200) // second door

    c.strokeStyle = ("rgba(30, 30, 30, 0.5)") // door outline color
    c.strokeRect(this.x + 20, 160, 150, 120) // first window outline
    c.strokeRect(this.x + 450, 160, 320, 120) // second window outline

    c.strokeRect(this.x + 210, 160, 100, 200) // left door outline (1)
    c.strokeRect(this.x + 310, 160, 100, 200) // right door outline (1)
    c.strokeRect(this.x + 810, 160, 100, 200) // left door outline (2)
    c.strokeRect(this.x + 910, 160, 100, 200) // right door outline (2)


    c.fillStyle = ("rgba(50, 50, 50, 0.8)") // step color
    c.fillRect(this.x + 200, 360, 220, 10) // this is the 1st step
    c.fillRect(this.x + 800, 360, 220, 10) // this is the 2nd step

    c.fillStyle = ("rgba(10, 10, 10, 0.8)") // sign color
    // c.fillRect(this.x + 20, 160, 150, 40) // first window sign
    c.fillRect(this.x + 450, 160, 320, 40) // second window sign

    c.beginPath() // 4 train sign
    c.arc((this.x + 500), 180, 15, 0, Math.PI * 2, false)
    c.strokeStyle = "rgba(0, 240, 0, 1)"
    c.stroke()

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

class ContinueSign {
  constructor() {
    this.image = new Image(50,50);
    this.image.src = "img/continue.png"
  }

  draw() {
    c.drawImage(this.image, 400, 100, 400, 200)
  }
}



/**************************************************
            BACKGROUND CREATIONS
**************************************************/
let sign = new StationSign
let player = new Player
let door = new Door(fullWidth*3)
let subway = new Subway(fullWidth + 100)
let continueSign = new ContinueSign


function createObstacles() {
  for (var i = 0; i < 2; i++) {
    var x = fullWidth + i * (Math.random()*525 + 475)
    obstacles.push(new Obstacle(x))
  }
}

function createPizzas() {
  for (var i = 0; i < 10; i++) {
    var x = fullWidth + i * (Math.random()*400 + 375) + 350
    pizzas.push(new Pizza(x, i+1))
  }
}


function renderLevelOne() {
  createObstacles()
  obstacles.forEach( o => o.draw() )
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
  if (obstacles != "" && paused == false && lives != 0) {
    requestAnimationFrame(animate)

    c.clearRect(0, 0, innerWidth, innerHeight); // clearing canvas each time

    sign.move() // move also includes this.draw()

    player.draw()

    obstacles.forEach( o => o.move() ) // this is doing each obstacle.move()

    pizzas.forEach( p => p.move() )

    door.move()

    if(jumpKey == true && player.y == (floorPos - player.height)) {
      player.y = 150
    } else if (jumpKey == false){
      player.y = floorPos - player.height
    }
  } else if (paused == true && lives != 0) {
    restartLevel()
  } else if (paused == true && lives == 0) {
    // console.log("did I hit this?");
    gameOver()
  }
}

function bringSubway() { // subway animation goes, nothing else goes)
  if (subway.x > 200) {
    requestAnimationFrame(bringSubway)
    c.clearRect(0, 0, innerWidth, innerHeight);
    player.draw()
    door.draw()
    sign.draw()
    subway.move()
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
}

function restartLevel() {
  livesLeft.innerText = `LIVES: ${lives}`
  continueSign.draw()
  canvas.addEventListener("click", continueAfterClick)
}

function continueAfterClick() {
  // makes all the obstacles and pizza disappear
  obstacles = []
  pizzas = []
  // recreates all the pizzas and obstacles
  createPizzas()
  createObstacles()
  // changes the pause to false
  paused = false
  animate()
  // removes the event listener
  canvas.removeEventListener("click", continueAfterClick, false)
}

function gameOver() {
  console.log("GAME OVERRRR!!!");
}

/**************************************************
                INVOKING FUNCTIONS
**************************************************/
renderLevelOne()
animate()
// firstRun()
// subway.draw()
