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

/*********** MOVING BACKGROUNDS ******************/

let bg11 = new Background("img/1/bowling_green_1.png", 0)
let bg12 = new Background("img/1/bowling_green_1.png", 750)
let bg13 = new Background("img/1/bowling_green_1.png", 750*2)

let bg21 = new Background("img/2/wall_st.png", 0)
let bg22 = new Background("img/2/wall_st.png", 750)
let bg23 = new Background("img/2/wall_st.png", 750*2)

let bg31 = new Background("img/3/fulton-st-bg.png", 0)
let bg32 = new Background("img/3/fulton-st-bg.png", 750)
let bg33 = new Background("img/3/fulton-st-bg.png", 750*2)

let bg51 = new Background("img/5/union-sq-bg.png", 0)
let bg52 = new Background("img/5/union-sq-bg.png", 750)
let bg53 = new Background("img/5/union-sq-bg.png", 750*2)

let bg61 = new Background("img/6/grand-central-bg.png", 0)
let bg62 = new Background("img/6/grand-central-bg.png", 750)
let bg63 = new Background("img/6/grand-central-bg.png", 750*2)

let bg71 = new Background("img/7/gc-concourse-bg.png", 0)
let bg72 = new Background("img/7/gc-concourse-bg.png", 750)
let bg73 = new Background("img/7/gc-concourse-bg.png", 750*2)

let bg81 = new Background("img/8/42-st-bg.png", 0)
let bg82 = new Background("img/8/42-st-bg.png", 750)
let bg83 = new Background("img/8/42-st-bg.png", 750*2)

let bg91 = new Background("img/9/hudson-piers-bg.png", 0)
let bg92 = new Background("img/9/hudson-piers-bg.png", 750)
let bg93 = new Background("img/9/hudson-piers-bg.png", 750*2)

let bg111 = new Background("img/11/level11-bg.png", 0)
let bg112 = new Background("img/11/level11-bg.png", 750)
let bg113 = new Background("img/11/level11-bg.png", 750*2)

let bg121 = new Background("img/12/columbus-circle-bg.png", 0)
let bg122 = new Background("img/12/columbus-circle-bg.png", 750)
let bg123 = new Background("img/12/columbus-circle-bg.png", 750*2)

let bg131 = new Background("img/13/72-bg.png", 0)
let bg132 = new Background("img/13/72-bg.png", 750)
let bg133 = new Background("img/13/72-bg.png", 750*2)

let ad1 = new Background("img/13/casper-ad.png", 690, 100, 320, 180, false)
let ad2 = new Background("img/13/seamless-ad.png", 2110, 100, 500, 180, false)
let ad3 = new Background("img/13/streeteasy-ad.png", 3590, 100, 300, 180, false)

// player & subway
let player = new Player
// subway takes in x, train, color
let subway = new Subway(fullWidth + 100, "4      LEXINGTON EXPRESS")
let ctrain = new Subway(fullWidth + 100, "C      EIGTH AVENUE LOCAL")

// boss characters
// takes in the arguments (src, x, y, w, h)
let daBoss = new Boss(900, floorPos - 200, 200, 200)

const bosses = {
  4: daBoss,
  10: daBoss,
  14: daBoss
}

// game signs
let continueSign = new GameSign("you lost a life", "press enter to continue")
let continueTo8 = new GameSign("  go outside!", "press enter to continue")
let continueTo9 = new GameSign(" ride the taxi", "press enter to continue")
let begin9 = new GameSign("  get ready...", "")
let continueTo10 = new GameSign("   GET READY!", "press enter for battle")
let continueTo11 = new GameSign(" boss defeated!", "press enter to continue")
let continueTo12 = new GameSign("level complete!", "press enter to continue")

// game over sign
let gameOverSign = new GameOverBanner("GAME OVER")
let winGameSign = new GameOverBanner("YOU WIN!")

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
let warehouse = new StationSign("img/9/warehouse.png", fullWidth * 1.75 + 745, 23, 700, 287)
let oldLamp1 = new StationSign("img/11/old-lamp.png", 400, 50, 100, 100)
let oldLamp2 = new StationSign("img/11/old-lamp.png", 1100, 50, 100, 100)
let station72 = new StationSign("img/13/72-sign.png", -10, 70, 300, 70)




// columns
// constructor (x, src, y, w, h)
let col1 = new Column(fullWidth + 500, "img/1/bowling-green-col.png", 23, 90, 287) // column for level one: Bowling Green
let wsColumn = new Column(fullWidth*1.5, "img/2/wall-st-col.png", 23, 90, 287)
let fsColumn = new Column(fullWidth*1.8, "img/3/fulton-st-col.png", 23, 90, 287)
let usColumn = new Column(fullWidth*2, "img/5/union-sq-col.png", 23, 90, 287)
let gcColumn = new Column(fullWidth*2.25, "img/6/grand-central-col.png", 23, 90, 287)
let gcDoor = new Column(fullWidth*2.5-350, "img/7/door.jpg", 23, 250, 287)
let taxi42 = new Column(fullWidth*2.5, "img/taxi.png", 170, 400, 175) // level 8
let warehouseDoor = new Column(fullWidth * 1.75 + 1000, "img/9/warehouse-door.png", 150, 195, 160)
let oldDoor = new Column(fullWidth * 2.25, "img/11/old-door.png", 100, 140, 210)
let col59 = new Column(fullWidth *2.2 , "img/12/59th-column.png", 23, 90, 291)
let col72 = new Column(4200, "img/13/72-column.png", 23, 90, 291)

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
    var x = fullWidth * 2 + i * (Math.random()*525 + 475)
    rats.push(new Rat(x))
  }
}

// pigeon --> 2 pigeon per each level
function createPigeons() {
  for (var i = 0; i < 2; i++) {
    var x = fullWidth + i * (Math.random()*625 + 575) + 200
    pigeons.push(new Pigeon(x))
  }
}
  // this is for when player hits a donut
function createDelayedPigeons() {
  for (var i = 0; i < 2; i++) {
    var x = fullWidth * 2 + i * (Math.random()*625 + 575) + 200
    pigeons.push(new Pigeon(x))
  }
}

function createOnePigeon() {
  var x = fullWidth + (Math.random()*625 + 575) + 200
  pigeons.push(new Pigeon(x))
}

// pizzas
function createPizzas() {
  for (var i = 0; i < levelPizza[curLevel]; i++) {
    var x = fullWidth + i * ((Math.random()*200 + 200) + 250)
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
  // console.log(levelDonut[curLevel]);
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

// cockroaches --> 2 cockroaches per each level
function createCockroaches() {
  if (curLevel === 12) {
    for (var i = 0; i < 2; i++) {
      var x = ( Math.floor(Math.random() * 20) + 4) * 50
      var y = (Math.random() * -600) + -300
      cockroaches.push(new Cockroach(x, y))
    }
  } else {
    var x = ( Math.floor(Math.random() * 20) + 4) * 50
    cockroaches.push(new Cockroach(x, (Math.random() * -600) + -300))
  }
}

function createDelayedCockroaches() {
  if (curLevel === 12) {
    for (var i = 0; i < 2; i++) {
      var x = ( Math.floor(Math.random() * 20) + 4) * 50
      cockroaches.push(new Cockroach(x, -1200))
    }
  } else {
    var x = ( Math.floor(Math.random() * 20) + 4) * 50
    cockroaches.push(new Cockroach(x, -1200))
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

  if (curLevel > 10) {
    cockroaches = []
    createDelayedCockroaches()
  }
}

function levelDraws() {
  if (curLevel == 1) {
    bg11.draw()
    bg12.draw()
    bg13.draw()
    bowlingGreenSign.draw()
    col1.draw()
  } else if (curLevel == 2) {
    bg21.draw()
    bg22.draw()
    bg23.draw()
    wallStreetSign.draw()
    wsColumn.draw()
  } else if (curLevel == 3) {
    bg31.draw()
    bg32.draw()
    bg33.draw()
    fultonStreetSign.draw()
    fsColumn.draw()
  } else if (curLevel == 5) {
    bg51.draw()
    bg52.draw()
    bg53.draw()
    unionSqSign.draw()
    usColumn.draw()
  } else if (curLevel == 6) {
    bg61.draw()
    bg62.draw()
    bg63.draw()
    grandCentralSign.draw()
    gcColumn.draw()
  } else if (curLevel == 7) {
    bg71.draw()
    bg72.draw()
    bg73.draw()
    gcDoor.draw()
    ticketWindows.forEach( t => t.draw())
  } else if (curLevel == 8) {
    bg81.draw()
    bg82.draw()
    bg83.draw()
    streetSign.draw()
    taxi42.draw()
  } else if (curLevel == 9) {
    warehouse.draw()
    warehouseDoor.draw()
  } else if (curLevel == 11) {
    bg111.draw()
    bg112.draw()
    bg113.draw()
    oldLamp1.draw()
    oldLamp2.draw()
    oldDoor.draw()
  } else if (curLevel == 12) {
    bg121.draw()
    bg122.draw()
    bg123.draw()
    col59.draw()
  } else if (curLevel == 13) {
    bg131.draw()
    bg132.draw()
    bg133.draw()
    station72.draw()
    ad1.draw()
    ad2.draw()
    ad3.draw()
    col72.draw()
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
    bg11.move()
    bg12.move()
    bg13.move()
    bowlingGreenSign.move() // move also includes this.draw()
    col1.move()
    levelMovesExceptBoss()
  } else if (curLevel == 2) {
    bg21.move()
    bg22.move()
    bg23.move()
    wallStreetSign.move() // move also includes this.draw()
    wsColumn.move()
    levelMovesExceptBoss()
  } else if (curLevel == 3) {
    bg31.move()
    bg32.move()
    bg33.move()
    fultonStreetSign.move()
    fsColumn.move()
    levelMovesExceptBoss()
  } else if (curLevel == 4) { // first boss level
    daBoss.move()
    rats.forEach( o => o.move())
    throws.forEach( t => t.move())
  } else if (curLevel == 5) {
    bg51.move()
    bg52.move()
    bg53.move()
    unionSqSign.move()
    usColumn.move()
    pigeons.forEach( p => p.move() )
    levelMovesExceptBoss()
  } else if (curLevel == 6) {
    bg61.move()
    bg62.move()
    bg63.move()
    grandCentralSign.move()
    gcColumn.move()
    pigeons.forEach( p => p.move() )
    levelMovesExceptBoss()
  } else if (curLevel == 7) {
    bg71.move()
    bg72.move()
    bg73.move()
    gcDoor.move()
    ticketWindows.forEach( t => t.move())
    lamps.forEach(l => l.move())
    levelMovesExceptBoss()
    pigeons.forEach( p => p.move() )
  } else if (curLevel == 8) {
    bg81.move()
    bg82.move()
    bg83.move()
    streetSign.move()
    levelMovesExceptBoss()
    pigeons.forEach( p => p.move() )
    taxi42.move()
  } else if (curLevel == 9) {
    bg91.move()
    bg92.move()
    bg93.move()
    warehouse.move()
    warehouseDoor.move()
    levelMovesExceptBoss()
    pigeons.forEach( p => p.move() )
  } else if (curLevel == 10) {
    daBoss.move()
    rats.forEach( o => o.move())
    pigeons.forEach( p => p.move())
    donuts.forEach( d => d.move())
    throws.forEach( t => t.move())
  } else if (curLevel == 11) {
    bg111.move()
    bg112.move()
    bg113.move()
    oldLamp1.move()
    oldLamp2.move()
    oldDoor.move()
    levelMovesExceptBoss()
    cockroaches.forEach( c => c.move())
  } else if (curLevel == 12) {
    bg121.move()
    bg122.move()
    bg123.move()
    col59.move()
    levelMovesExceptBoss()
    cockroaches.forEach( c => c.move())
  } else if (curLevel == 13) {
    bg131.move()
    bg132.move()
    bg133.move()
    station72.move()
    ad1.move()
    ad2.move()
    ad3.move()
    col72.move()
    levelMovesExceptBoss()
    cockroaches.forEach( c => c.move())
    pigeons.forEach( p => p.move())
  } else if (curLevel == 14) {
    daBoss.move()
    rats.forEach( o => o.move())
    pigeons.forEach( p => p.move())
    cockroaches.forEach( c => c.move())
    donuts.forEach( d => d.move())
    throws.forEach( t => t.move())
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

function bringCTrain() {
  if (ctrain.x > 200) {
    requestAnimationFrame(bringCTrain)
    c.clearRect(0, 0, innerWidth, innerHeight);
    levelDraws()
    ctrain.move()
    // console.log("is the ctrain coming?");
  } else {
    ctrain.x = fullWidth + 100
  }
}

function driveTaxi() {
  // taxi42.x = player.x
  if (taxi42.x >= player.x && taxi42.x < fullWidth + taxi42.width + 100 ) {
    requestAnimationFrame(driveTaxi)
    c.clearRect(0, 0, innerWidth, innerHeight);
    taxi42.x += 5
    bg81.draw()
    bg82.draw()
    bg83.draw()
    streetSign.draw()
    taxi42.draw()
  } else if (taxi42.x + 20 > fullWidth) {
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
    if (taxi9.x > 50 && taxi9.x <= 500) {
      begin9.draw()
    }
  } else {
    startLevelNine()
  }
}

function runPlayerToDoor() {
  beatBoss.play()
  direction = "right"
  if (player.x <= 990) {
    requestAnimationFrame(runPlayerToDoor)
    c.clearRect(0, 0, innerWidth, innerHeight);
    player.x += 5
    player.draw()
  } else {
    continueTo11.draw()
    pass3.play()
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
    direction = "right"
  } else if (event.code == "ArrowLeft") {
    leftKey = true
    direction = "left"
  } else if (event.code == "Space") {
    if (curLevel === 4 || curLevel === 10 || curLevel === 14) {
      if (collectedCans > 0) {
        collectedCans -= 1
        cansCollected.innerText = `🍺 ${collectedCans}`
        if (direction === "right") {
          throws.push(new Throw(player.x, player.y, 4, bosses[curLevel]))
        } else if (direction === "left") {
          throws.push(new Throw(player.x, player.y, -4, bosses[curLevel]))
        }
        throwCan.play()
      }
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
