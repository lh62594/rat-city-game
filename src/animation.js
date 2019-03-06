/**************************************************
            BACKGROUND CREATIONS
**************************************************/
let player = new Player
let subway = new Subway(fullWidth + 100)

// game signs
let continueSign = new GameSign("img/continue.png")
let gameOverSign = new GameSign("img/game-over.png")

// station signs
let bowlingGreenSign = new StationSign("img/bowling-green-sign.png")
let wallStreetSign = new StationSign("img/wall-st-sign.png")
let fultonStreetSign = new StationSign("img/fulton-st-sign.png")
let unionSqSign = new StationSign("img/union-sq-sign.png")

// columns
let bgColumn = new Column(fullWidth, "img/bowling-green-col.png")
let wsColumn = new Column(fullWidth, "img/wall-st-col.png")
let fsColumn = new Column(fullWidth, "img/fulton-st-col.png")
let usColumn = new Column(fullWidth, "img/union-sq-col.png")

// rats
function createRats() {
  for (var i = 0; i < 2; i++) {
    var x = fullWidth + i * (Math.random()*525 + 475)
    rats.push(new Rat(x))
  }
}

// pizzas
function createPizzas() {
  for (var i = 0; i < levelPizza[curLevel]; i++) {
    var x = fullWidth + i * (Math.random()*400 + 375) + 350
    // pizzas take in arguments (x, num) --> num is like an index
    pizzas.push(new Pizza(x, i+1))
  }
}

function levelDraws() {
  if (curLevel == 1) {
    bowlingGreenSign.draw()
    bgColumn.draw()
  } else if (curLevel == 2) {
    wallStreetSign.draw()
    wsColumn.draw()
  } else if (curLevel == 3) {
    fultonStreetSign.draw()
    fsColumn.draw()
  } else if (curLevel == 4) {

  } else if (curLevel == 5) {
    unionSqSign.draw()
    usColumn.draw()
  }
  player.draw()
}

function levelMoves() {
  if (curLevel == 1) {
    bowlingGreenSign.move() // move also includes this.draw()
    bgColumn.move()
  } else if (curLevel == 2) {
    wallStreetSign.move() // move also includes this.draw()
    wsColumn.move()
  } else if (curLevel == 3) {
    fultonStreetSign.move()
    fsColumn.move()
  } else if (curLevel == 4) {

  } else if (curLevel == 5) {
    unionSqSign.move()
    usColumn.move()
  }

  player.draw()
  rats.forEach( o => o.move() )
  pizzas.forEach( p => p.move() )
}

/**************************************************
              ANIMATION FUNCTIONS
**************************************************/
// to "move right" function
// add event listeners on the left/right arrows
// gives illusion that character is moving, without actually moving the character
function animate() {
  if (paused == false && lives != 0 && levelComplete == false) {
    requestAnimationFrame(animate) // looping animation

    c.clearRect(0, 0, innerWidth, innerHeight); // clearing canvas each time

    levelMoves()

    if(jumpKey == true && player.y == (floorPos - player.height)) {
      player.y = 150
    } else if (jumpKey == false){
      player.y = floorPos - player.height
    }

  } else if (paused == true && lives != 0 && levelComplete == false) {
    continueLevel()
  } else if (paused == true && lives == 0 && levelComplete == false) {
    gameOver()
  } else if (levelComplete == true) {
    completedLevel()
  }
}


function bringSubway() { // subway animation goes, nothing else goes)
  if (subway.x > 200) {
    requestAnimationFrame(bringSubway)
    c.clearRect(0, 0, innerWidth, innerHeight);
    levelDraws()
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

// window.addEventListener("keydown", event => {
//   if (event.code == "ArrowUp" && jumpKey == false) {
//     jumpKey = true
//
//   if (player.y === floorPos - 100) {
//     player.gravitySpeed = 0
//   }
//     player.gravity = -0.7
//   }
// })
//
// window.addEventListener("keyup", event => {
//   if (event.code == "ArrowUp") {
//   jumpKey = false
//   player.gravity = 0.3
//   }
// })
