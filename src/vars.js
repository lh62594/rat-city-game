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
const obSpeed = -4 // rat speed

const levelPizza = {
  1: 10,
  2: 15,
  3: 20
}
// setting the draw area of canvas
let c = canvas.getContext("2d");

//arrays & other variables
let rats = []
let pizzas = []
let collectedPizzas = 0
let lives = 3
let jumpKey = false
let paused = false
let curLevel = 1 // will change this
let levelComplete = false


/**************************************************
                  GAME PIECE CLASSES
**************************************************/
class Rat {
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
    c.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  move() {
    if (lives > -1) {
      if (this.x + this.width < 0) {
        this.x = fullWidth + (Math.random()*525 + 475)
      }

      this.x += this.dx
      this.draw();

      //if player hits an rat
      if (this.x > player.x && this.x < (player.x + player.width)
        && this.y < (player.y + player.height) && this.y > player.y ) {
          lives -= 1  // lives decrease
          paused = true // the game is paused
        }
    }
  }

} // end of Rat class

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
    if (this.x > player.x && this.x < (player.x + player.width)
      && this.y < (player.y + player.height) && this.y > player.y ) {
        pizzas = pizzas.filter( p => p.num != this.num)

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
    this.gravity = 0
    this.gravitySpeed = 0
    this.jumping = false
  }

  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height)
    if (player.y > 60) {
      this.gravitySpeed += this.gravity;
      this.y += this.gravitySpeed;
    }
    else {
      this.gravitySpeed = 0
      player.y = 60.0001
    }
    this.hitBottom()
  }

  hitBottom() {
    let rockbottom = floorPos - 100
    if (this.y > rockbottom) {
      this.y = rockbottom;
    }
  }
}

class Column {
  constructor(x, src) {
    this.x = x
    this.y = 23
    this.dx = bgSpeed
    this.width = 90
    this.height = floorPos - this.y - 5
    this.image = new Image(50,50)
    this.image.src = src
  }

  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  move() {
    if (this.x > 200) {
      this.x += this.dx;
      this.draw();
    } else {
      this.draw();
      levelComplete = true // when you reach the column, you've completed the level
    }
  }
} // end of Column class


/**************************************************
                  BACKGROUND CLASSES
**************************************************/
class StationSign {
  constructor(src) {
    this.x = 400
    this.y = 100
    this.dx = bgSpeed
    this.width = 270
    this.height = 60
    this.image = new Image(50,50)
    this.image.src = src
  }

  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  move() {
    if (this.x + this.width < 0) {
      this.x = fullWidth + 100
    }
    this.x += this.dx;
    this.draw();
  }
} // end of StationSign class

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

class GameSign {
  constructor(src) {
    this.image = new Image(50,50);
    this.image.src = src
  }

  draw() {
    c.drawImage(this.image, 300, 60, 600, 300)
  }
} // end of GameSign class
