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
// constructor (src, x, y, w, h)
let bowlingGreenSign = new StationSign("img/1/bowling-green-sign.png", 400, 100, 270, 60)
let wallStreetSign = new StationSign("img/2/wall-st-sign.png", 400, 100, 270, 60)
let fultonStreetSign = new StationSign("img/3/fulton-st-sign.png", 400, 100, 270, 60)
let unionSqSign = new StationSign("img/5/union-sq-sign.png", 400, 100, 270, 60)
let grandCentralSign = new StationSign("img/6/grand-central-sign.png", 400, 100, 270, 60)

function createTicketWindows() {
  for (var i = 1; i < 4; i++) {
    var x = i*200 + (i-1)*100
    ticketWindows.push(new StationSign("img/7/ticket-window.png", x, 50, 150, 200))
  }

  for (var i = 1; i < 5; i++) {
    var x = i*200 + (i-1)*100 - 125
    lamps.push(new StationSign("img/7/lamp.png", x, 100, 80, 80))
  }
}

let streetSign = new StationSign("img/8/st-sign.png", 400, 23, 150, 287)


// columns
// constructor (x, src, w, h)
let bgColumn = new Column(fullWidth*1.5, "img/1/bowling-green-col.png", 23, 90, 287) // column for level one: Bowling Green
let wsColumn = new Column(fullWidth*1.75, "img/2/wall-st-col.png", 23, 90, 287)
let fsColumn = new Column(fullWidth*2, "img/3/fulton-st-col.png", 23, 90, 287)
let usColumn = new Column(fullWidth*2, "img/5/union-sq-col.png", 23, 90, 287)
let gcColumn = new Column(fullWidth*2, "img/6/grand-central-col.png", 90, 287)
let gcDoor = new Column(fullWidth*2.5-350, "img/7/door.jpg", 23, 250, 287)
// let taxi42 = new Column(fullWidth*2, "img/8/door.png", 450)
let taxi42 = new Column(fullWidth, "img/taxi.png", 170, 400, 175)


// rats --> 2 rats per each level
function createRats() {
  for (var i = 0; i < 2; i++) {
    var x = fullWidth + i * (Math.random()*525 + 475)
    rats.push(new Rat(x))
  }
}

// pigeon --> 2 pigeon per each level
function createPigeons() {
  for (var i = 0; i < 2; i++) {
    var x = fullWidth + i * (Math.random()*525 + 475)
    pigeons.push(new Pigeon(x))
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

// hearts/lives
function createHearts() {
  for (var i = 0; i < levelHeart[curLevel]; i++) {
    var x = fullWidth*1.5 + i * (Math.random()*400 + 375) + 350
    // hearts take in arguments (x, num, src) --> num is like an index
    hearts.push(new Heart(x, i+1, "img/collect/heart.png"))
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
    gcDoor.draw()
    ticketWindows.forEach( t => t.draw())
  } else if (curLevel == 8) {
    streetSign.draw()
    taxi42.draw()
  } else if (curLevel == 9) {

  }

  player.draw()
}

function levelMovesExceptBoss() {
  cans.forEach( o => o.move())
  pizzas.forEach( p => p.move())
  rats.forEach( o => o.move())
  hearts.forEach( h => h.move())
}

function levelMovesIntro() {
  requestAnimationFrame(levelMovesIntro) // looping animation
  c.clearRect(0, 0, innerWidth, innerHeight); // clearing canvas each time
  rats.forEach( o => o.introMove())
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
    rats.forEach( o => o.move())
    throws.forEach( t => t.move())
  } else if (curLevel == 5) {
    unionSqSign.move()
    usColumn.move()
    pigeons.forEach( p => p.move() )
    levelMovesExceptBoss()
  } else if (curLevel == 6) {
    grandCentralSign.move()
    gcColumn.move()
    pigeons.forEach( p => p.move() )
    levelMovesExceptBoss()
  } else if (curLevel == 7) {
    gcDoor.move()
    ticketWindows.forEach( t => t.move())
    lamps.forEach(l => l.move())
    levelMovesExceptBoss()
    pigeons.forEach( p => p.move() )
  } else if (curLevel == 8) {
    streetSign.move()
    levelMovesExceptBoss()
    pigeons.forEach( p => p.move() )
    taxi42.move()
  }

  player.draw()
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
