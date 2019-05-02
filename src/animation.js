/**************************************************
            GAME OVER BOARD
**************************************************/
function fetchScores() {
  fetch("https://rat-city-api.herokuapp.com/api/v1/users")
  .then(res => res.json())
  .then(json => {
    for (var i = 0; i < json.length; i++) {
      let scoreline = new GameOverScoreboard(`${json[i].username} - ${json[i].score}`, 180 + i*23)
      scoreline.draw()
    }

  })
}

/**************************************************
            BACKGROUND CREATIONS
**************************************************/
// player & subway
let player = new Player
let subway = new Subway(fullWidth + 100)

// boss characters
// takes in the arguments (src, x, y, w, h)
let daBoss = new Boss(900, floorPos - 200, 200, 200)

const bosses = {
  4: daBoss
}

// game signs
let continueSign = new GameSign("you lost a life", "click to continue")
let continueTo8 = new GameSign("  go outside!", "click to continue")
let continueTo9 = new GameSign(" ride the taxi", "click to continue")
let begin9 = new GameSign("  get ready...", "")

// game over sign
let gameOverSign = new GameOverBanner("   GAME OVER")

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
let warehouse = new StationSign("img/9/warehouse.png", fullWidth * 2 + 745, 23, 700, 287)



// columns
// constructor (x, src, y, w, h)
let bgColumn = new Column(fullWidth + 500, "img/1/bowling-green-col.png", 23, 90, 287) // column for level one: Bowling Green
let wsColumn = new Column(fullWidth*1.5, "img/2/wall-st-col.png", 23, 90, 287)
let fsColumn = new Column(fullWidth*1.8, "img/3/fulton-st-col.png", 23, 90, 287)
let usColumn = new Column(fullWidth*2, "img/5/union-sq-col.png", 23, 90, 287)
let gcColumn = new Column(fullWidth*2.25, "img/6/grand-central-col.png", 23, 90, 287)
let gcDoor = new Column(fullWidth*2.5-350, "img/7/door.jpg", 23, 250, 287)
let warehouseDoor = new Column(fullWidth * 2 + 1000, "img/9/warehouse-door.png", 150, 195, 160)

// taxi in level 8
// let taxi42 = new Column(fullWidth*2.5, "img/taxi.png", 170, 400, 175)
let taxi42 = new Column(fullWidth+100, "img/taxi.png", 170, 400, 175)

let startTaxi = new Taxi(-200)
let taxi9 = new Taxi(-200)


/**************************************************
            PLAYER/OBJECT CREATIONS
**************************************************/
// rats --> 2 rats per each level
function createRats() {
  for (var i = 0; i < 2; i++) {
    var x = fullWidth + i * (Math.random()*525 + 475)
    rats.push(new Rat(x))
  }
}
  // this is for when player hits a donut
function createDelayedRats() {
  for (var i = 0; i < 2; i++) {
    var x = fullWidth * 1.5 + i * (Math.random()*525 + 475)
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
  // this is for when player hits a donut
function createDelayedPigeons() {
  for (var i = 0; i < 2; i++) {
    var x = fullWidth * 1.5 + i * (Math.random()*525 + 475)
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
    var x = fullWidth * 1.5 + i * 1.75 * fullWidth + ((Math.random()*100 + 375) + 300)
    // hearts take in arguments (x, num, src) --> num is like an index
    hearts.push(new Heart(x, i+1, "img/collect/heart.png"))
  }
}

// donuts
function createDonuts() {
  for (var i = 0; i < levelDonut[curLevel]; i++) {
    var x = fullWidth * 4 + i * 4 * fullWidth + ((Math.random()*100 + 375) + 300)
    // donuts take in arguments (x, num) --> num is like an index
    donuts.push(new Donut(x, i+1))
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
              LEVEL ANIMATION FUNCTIONS
**************************************************/
function clearObstacles() {
  // this will be triggered when a player hits a donut
  rats = []
  createDelayedRats()
  pigeons = []
  createDelayedPigeons()
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
    warehouse.draw()
    warehouseDoor.draw()
  }

  player.draw()
}

function levelMovesExceptBoss() {
  cans.forEach( o => o.move())
  pizzas.forEach( p => p.move())
  rats.forEach( o => o.move())
  hearts.forEach( h => h.move())
  donuts.forEach( d => d.move())
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
  } else if (curLevel == 4) { // first boss level
    daBoss.move()
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
  } else if (curLevel == 9) {
    warehouse.move()
    warehouseDoor.move()
    levelMovesExceptBoss()
    pigeons.forEach( p => p.move() )
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
  } else {
    subway.x = fullWidth + 100
  }
}

function driveTaxi() {
  // taxi42.x = player.x
  if (taxi42.x >= player.x && taxi42.x < fullWidth + taxi42.width + 100 ) {
    requestAnimationFrame(driveTaxi)
    c.clearRect(0, 0, innerWidth, innerHeight);
    taxi42.x += 5
    taxi42.draw()
    streetSign.draw()
  } else if (taxi42.x + 100 > fullWidth) {
    renderLevelNineIntro()
  }
}

function showTaxi() {
  if (curLevel == "intro") {
    requestAnimationFrame(showTaxi)
    c.clearRect(0, 0, innerWidth, innerHeight);
    rats.forEach( r => r.introMove())
    if (startTaxi.x >= -400 && startTaxi.x < fullWidth + startTaxi.width) {
      startTaxi.move()
    } else {
      startTaxi.x = -400
    }
  }
}


/**************************************************
            BETWEEN LEVELS ANIMATIONS
**************************************************/

function driveTaxiToHudsonPiers() {
  if (taxi9.x <= 600 ) {
    requestAnimationFrame(driveTaxiToHudsonPiers)
    c.clearRect(0, 0, innerWidth, innerHeight);
    taxi9.x += 5
    taxi9.draw()
    if (taxi9.x > 100 && taxi9.x <= 400) {
      begin9.draw()
    }
  } else {
    startLevelNine()
  }
}


/**************************************************
                PLAYER MOVEMENTS
**************************************************/
window.addEventListener("keydown", event => {
  if (event.code == "ArrowUp" && jumpKey == false) {
    jumpKey = true
    jump.play()
  } else if (event.code == "ArrowRight") {
    rightKey = true
  } else if (event.code == "ArrowLeft") {
    leftKey = true
  } else if (event.code == "Space") {
    if (collectedCans > 0 && curLevel == 4) {
      collectedCans -= 1
      cansCollected.innerText = `🍺 ${collectedCans}`
      throws.push(new Throw(player.x, player.y, bosses[curLevel]))
      throwCan.play()
    } else {
      // console.log("what happens here?");
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
