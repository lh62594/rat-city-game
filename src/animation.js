/**************************************************
            BACKGROUND CREATIONS
**************************************************/
// player & subway
let player = new Player
let subway = new Subway(fullWidth + 100)

// boss characters
// takes in the arguments (src, x, y, w, h)
let bbBoss = new Boss("img/boss/boss-rat-1.png", 800, floorPos - 150, 200, 200)
let zombieBoss = new Boss("img/boss/zombie.png", 800, floorPos - 150, 200, 200)

const bosses = {
  4: bbBoss
}

// game signs
let continueSign = new GameSign("img/sign/continue.png")
let gameOverSign = new GameSign("img/sign/game-over.png")

// station signs
let bowlingGreenSign = new StationSign("img/1/bowling-green-sign.png")
let wallStreetSign = new StationSign("img/2/wall-st-sign.png")
let fultonStreetSign = new StationSign("img/3/fulton-st-sign.png")
let unionSqSign = new StationSign("img/5/union-sq-sign.png")
let grandCentralSign = new StationSign("img/6/grand-central-sign.png")

// columns
let bgColumn = new Column(fullWidth, "img/1/bowling-green-col.png") // column for level one: Bowling Green
let wsColumn = new Column(fullWidth, "img/2/wall-st-col.png")
let fsColumn = new Column(fullWidth, "img/3/fulton-st-col.png")
let usColumn = new Column(fullWidth, "img/5/union-sq-col.png")
let gcColumn = new Column(fullWidth, "img/6/grand-central-col.png")


// rats
function createRats() {
  for (var i = 0; i < 2; i++) {
    var x = fullWidth + i * (Math.random()*525 + 475)
    rats.push(new Rat(x))
  }
}

function createCoffees() {
  for (var i = 0; i < 2; i++) {
    var x = fullWidth + i * (Math.random()*525 + 475)
    coffees.push(new CoffeeCup(x))
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

// cans
function createCans() {
  for (var i = 0; i < levelCan[curLevel]; i++) {
    var x = fullWidth*2.5 + i * (Math.random()*800 + 775)
    // cans take in arguments (x, num) --> num is like an index
    cans.push(new Can(x, i+1))
  }
}

// throws
// function createThrows() {
//   for (var i = 0; i < collectedCans; i++) {
//       throws.push(new Throw(i+1))
//   }
// }

/**************************************************
              ANIMATION FUNCTIONS
**************************************************/
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
  } else if (curLevel == 5) {
    unionSqSign.draw()
    usColumn.draw()
  } else if (curLevel == 6) {
    grandCentralSign.draw()
    gcColumn.draw()
  } else if (curLevel == 7) {

  }

  player.draw()
}

function levelMovesExceptBoss() {
  cans.forEach( o => o.move())
  pizzas.forEach( p => p.move())
}

function levelMoves() {
  if (curLevel == 1) {
    bowlingGreenSign.move() // move also includes this.draw()
    bgColumn.move()
    levelMovesExceptBoss()
  } else if (curLevel == 2) {
    wallStreetSign.move() // move also includes this.draw()
    wsColumn.move()
    levelMovesExceptBoss()
  } else if (curLevel == 3) {
    fultonStreetSign.move()
    fsColumn.move()
    levelMovesExceptBoss()
  } else if (curLevel == 4) {
    bbBoss.move()
    throws.forEach( t => t.move())
  } else if (curLevel == 5) {
    unionSqSign.move()
    usColumn.move()
    levelMovesExceptBoss()
  } else if (curLevel == 6) {
    grandCentralSign.move()
    gcColumn.move()
    coffees.forEach( p => p.move() )
    levelMovesExceptBoss()
  } else if (curLevel == 7) {

  }

  player.draw()
  rats.forEach( o => o.move())
}

function playerMovements() {
  if(jumpKey == true && player.y == (floorPos - player.height)) {
    player.y = 150
  } else if (rightKey == true) {
    player.x += 5
  } else if (leftKey == true) {
    player.x -= 5
  } else if (jumpKey == false){
    player.y = floorPos - player.height
  }
}

function animate() {
  if (paused == false && lives != 0 && levelComplete == false) {
    requestAnimationFrame(animate) // looping animation

    c.clearRect(0, 0, innerWidth, innerHeight); // clearing canvas each time

    levelMoves()
    playerMovements()

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

    // console.log("is the subway coming?");
  }
}

function animateTest() {
  if (paused == false && lives != 0 && levelComplete == false) {
    requestAnimationFrame(animateTest) // looping animation
    c.clearRect(0, 0, innerWidth, innerHeight); // clearing canvas each time

    levelMoves()

    playerMovements()


  } else if (paused == true && lives != 0 && levelComplete == false) {
    continueLevel()
  } else if (paused == true && lives == 0 && levelComplete == false) {
    gameOver()
  } else if (levelComplete == true) {
    completedLevel()
  }
}


/**************************************************
                EVENT LISTENERS
**************************************************/
// window.addEventListener("keydown", event => {
//   if (event.code == "ArrowUp" && jumpKey == false) {
//     jumpKey = true
//   }
// })
//
// window.addEventListener("keyup", event => {
//   if (event.code == "ArrowUp") {
//   jumpKey = false
//   }
// })

window.addEventListener("keydown", event => {
  if (event.code == "ArrowUp" && jumpKey == false) {
    jumpKey = true
  } else if (event.code == "ArrowRight") {
    rightKey = true
  } else if (event.code == "ArrowLeft") {
    leftKey = true
  } else if (event.code == "Space") {
    if (collectedCans > 0 && curLevel == 4) {
      collectedCans -= 1
      cansCollected.innerText = `🍺 ${collectedCans}`
      throws.push(new Throw(player.x, player.y, bosses[curLevel]))
    } else {
      console.log("what happens here?");
    }
  }
})

window.addEventListener("keyup", event => {
  if (event.code == "ArrowUp") {
    jumpKey = false
  } else if (event.code == "ArrowRight") {
    rightKey = false
  } else if (event.code == "ArrowLeft") {
    leftKey = false
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
