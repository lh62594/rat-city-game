/**************************************************
                RENDER LEVELS
**************************************************/
function allLevelRender() {
  direction = "right"
  rats = []
  createRats()
  createPizzas()
  createCans()
  createHearts()
  createDonuts()
  player.draw()
  levelComplete = false
  player.x = 100
}

function renderIntro() {
  curLevel = "intro"
  canvas.style.backgroundImage = "url('img/menu.png')"
  canvas.style.backgroundSize = "1200px 450px"
  instructions.innerText = ""

  addAllLevelSounds()
  // backgroundMusic.play()
}

// bowling green
function renderLevelOne() {
  curLevel = 1
  score.innerHTML = "🍕 0"
  cansCollected.innerHTML = "🍺 0"
  livesLeft.innerHTML = "❤️ ❤️ ❤️ "
  instructions.innerHTML = `use the left, right, and up arrow to avoid rats and collect pizza
    <br />
    reach the subway station column to move on to the next level!`
  allLevelRender()
  levelDraws()

  //reset all the variables
  collectedPizzas = 0
  collectedCans = 0
  lives = 3

  pizzaSpeed = -2.5 // pizza speed
  ratSpeed = -4 // rat speed
  bossSpeed = -1.5 // rat speed
  pigeonSpeed = -4 // pigeon speed
  cockroachSpeed = 4

  paused = false
  levelComplete = false

  // reset all the backgrounds
  bowlingGreenSign.x = 400
  col1.x = fullWidth + 500

  level1.play()
}

// wall street
function renderLevelTwo() {
  pizzaSpeed = -4
  ratSpeed = -6
  curLevel = 2

  instructions.innerHTML = "collect crumpled beer cans to throw at boss rats!"
  allLevelRender()
}

// fulton street
function renderLevelThree() {
  pizzaSpeed = -5
  ratSpeed = -8
  curLevel = 3
  levelComplete = false
  subway.x = fullWidth + 100
  instructions.innerHTML = "jump to collect hearts for extra lives!"
  canvas.style.backgroundImage = "url('img/3/fulton-st-bg.png')";
  canvas.classList.add("scrolling-bg")
  allLevelRender()
  // console.log("is render level three going again?");
}

// brooklyn bridge city hall
function renderLevelFour() {
  player.x = 100
  ratSpeed = -4
  curLevel = 4

  instructions.innerHTML = "press [space] to throw beer cans - hit the boss 3x!"
  canvas.style.backgroundImage = "url('img/4/bklyn-br-bg.png')";
  canvas.style.backgroundSize = "1200px 450px"

  levelComplete = false
  subway.x = fullWidth + 100
  createRats()
  player.draw()
}

// union square
function renderLevelFive() {
  curLevel = 5
  player.x = 100
  pizzaSpeed = -5
  ratSpeed = -6
  pigeonSpeed = -4
  levelComplete = false
  subway.x = fullWidth + 100
  instructions.innerHTML = "watch out for the pigeons!"
  // canvas.style.backgroundImage = "url('img/5/union-sq-bg.png')";
  // canvas.style.backgroundSize = "750px 450px"
  // canvas.classList.add("scrolling-bg")
  allLevelRender()
  createPigeons()
}

// grand central
function renderLevelSix() {
  curLevel = 6
  player.x = 100
  pizzaSpeed = -5.5
  ratSpeed = -6.5
  pigeonSpeed = -5
  levelComplete = false
  subway.x = fullWidth + 100
  instructions.innerHTML = "the speed of rats and pigeons increase every level"
  // canvas.style.backgroundImage = "url('img/6/grand-central-bg.png')";
  // canvas.classList.add("scrolling-bg")
  allLevelRender()
  createPigeons()
}

// grand central concourse
function renderLevelSeven() {
  player.x = 100
  pizzaSpeed = -5.5
  ratSpeed = -7
  curLevel = 7
  pigeonSpeed = -6
  levelComplete = false
  instructions.innerHTML = "make it through the grand central concourse to get outside!"
  // canvas.style.backgroundImage = "url('img/7/gc-concourse-bg.png')";
  // canvas.classList.add("scrolling-bg")
  createTicketWindows()
  allLevelRender()
  createPigeons()
}

// run down 42nd street!
function renderLevelEight() {
  player.x = 100
  pizzaSpeed = -5
  ratSpeed = -7
  curLevel = 8
  pigeonSpeed = -6.5
  levelComplete = false
  instructions.innerHTML = "head down 42nd street and get in a cab!"
  // canvas.style.backgroundImage = "url('img/8/42-st-bg.png')";
  // canvas.classList.add("scrolling-bg")
  allLevelRender()
  createPigeons()
}

// animation between level 8 and 9
function renderLevelNineIntro() {
  instructions.innerHTML = ""
  canvas.style.backgroundImage = "url('img/9/transition-bg.png')";
  canvas.style.backgroundSize = "1200px 450px"
  // canvas.classList.remove("scrolling-bg")
  driveTaxiToHudsonPiers()

}

function renderLevelNine() {
  curLevel = 9
  player.x = 100
  pizzaSpeed = -5.5
  ratSpeed = -7.5
  pigeonSpeed = -6.5

  levelComplete = false
  instructions.innerHTML = "collect donuts to make obstacles temporarily disappear!"
  // canvas.style.backgroundImage = "url('img/9/hudson-piers-bg.png')";
  // canvas.style.backgroundSize = "750px 450px"
  // canvas.classList.add("scrolling-bg")
  allLevelRender()
  createPigeons()
}

function renderLevelTen() {
  player.x = 100
  ratSpeed = -6
  pigeonSpeed = -4
  curLevel = 10
  bossSpeed = -2.5

  instructions.innerHTML = "you need to hit the boss with more beer cans!"
  canvas.style.backgroundImage = "url('img/10/warehouse-bg.png')";
  canvas.style.backgroundSize = "1200px 450px"
  // canvas.classList.remove("scrolling-bg")

  levelComplete = false
  allLevelRender()
  createPigeons()
  player.draw()
}

function renderLevelEleven() {
  curLevel = 11
  player.x = 100
  pizzaSpeed = -5.5
  ratSpeed = -7.5
  levelComplete = false
  instructions.innerHTML = "watch out for the falling cockroaches!"
  allLevelRender()
  createCockroaches()
  player.draw()
}

function renderLevelTwelve() {
  curLevel = 12
  player.x = 100
  pizzaSpeed = -5.5
  ratSpeed = -7.5
  cockroachSpeed = 4.5
  levelComplete = false
  instructions.innerHTML = "you're almost at the end... things get harder!"
  allLevelRender()
  createCockroaches()
  player.draw()
}

function renderLevelThirteen() {
  curLevel = 13
  player.x = 100
  pizzaSpeed = -5.5
  ratSpeed = -7.5
  cockroachSpeed = 4.5
  pigeonSpeed = -4
  levelComplete = false
  instructions.innerHTML = "watch out for the pigeons again!"
  allLevelRender()
  createCockroaches()
  createOnePigeon()
  player.draw()
}

function renderLevelFourteen() {
  curLevel = 14
  player.x = 100
  ratSpeed = -7.5
  cockroachSpeed = 4.5
  pigeonSpeed = -4
  bossSpeed = -3

  instructions.innerHTML = "this is the ultimate boss battle! "
  canvas.style.backgroundImage = "url('img/14/81-bg.png')";
  canvas.style.backgroundSize = "1200px 450px"

  levelComplete = false
  allLevelRender()
  createCockroaches()
  createOnePigeon()
  player.draw()
}

/**************************************************
          COMPLETE / CONTINUE / GAME OVER
**************************************************/
// function startGameOnClick() {
//   canvas.addEventListener("click", continueToNextLevel)
// }

function continueLevel() {
  music.forEach( s => s.pause())

  livesLeft.innerText = ""
  for (var i = 0; i < lives; i++) {
    livesLeft.innerText += "❤️"
  }

  continueSign.draw()
  // canvas.classList.remove("scrolling-bg")
  window.addEventListener("keypress", continueAfterClick)
}

function completedLevel() {
  music.forEach( s => s.pause())
  rats = []
  pizzas = []
  pigeons = []
  cockroaches = []

  if (curLevel < 7 && curLevel != "intro") {
    subwayMoving.play()
    bringSubway()
  } else if (curLevel === 7) {
    continueTo8.draw()
  } else if (curLevel === 8) {
    continueTo9.draw()
  } else if (curLevel === 9) {
    continueTo10.draw()
  } else if (curLevel === 10) {
    c.clearRect(0, 0, innerWidth, innerHeight);
    player.draw()
    daBoss.x = fullWidth + 100
    daBoss.draw()
    runPlayerToDoor()
  } else if (curLevel === 11) {
    continueTo12.draw()
  } else if (curLevel <= 14) {
    bringCTrain()
  }

  window.addEventListener("keypress", continueToNextLevel)
}

/******************* GAME OVER SECTION **********************/
function gameOver() {
  // renderIntro()
  music.forEach( s => s.pause())
  gameOverSign.draw()
  fetchScores()

  gameOverSnd.play()

  // replace the instructions with form
  livesLeft.innerText = `😭 `
  instructions.innerHTML = renderUsernameForm()

  // reset all the arrays
  rats = []
  pizzas = []
  cans = []
  throws = []
  hearts = []
  pigeons = [] // used in Level 6
  ticketWindows = [] // used in Level 7
  lamps = [] // used in Level 7
  donuts = [] // used in Level 9
  cockroaches = [] // used in level 11

  // canvas.classList.remove("scrolling-bg")
  // gameOverSign.draw()
  // canvas.addEventListener("click", clearCanvas)
  saveScore()
}

function renderUsernameForm() {
  return (`
    your final score is ${collectedPizzas}, enter your username to save your score!
    <br />
    <input id="user-input" maxlength="30" type="text" placeholder="enter username" />
    <button id="save-button"> save </button>
    <button id="play-button"> play again </button>
  `)
}

function restartGame(e) {
    e.target.removeEventListener(e.type, arguments.callee, false)
    startLevelOne()
}

/******************* GAME OVER SECTION **********************/

/************************************************************
*************************************************************
                        WIN GAME
*************************************************************
************************************************************/

function winGame() {
  music.forEach( s => s.pause())
  c.clearRect(0, 0, innerWidth, innerHeight); // clearing canvas each time
  instructions.innerHTML = renderUsernameForm()
  canvas.style.backgroundImage = "url('img/end-bg.png')";
  winGameSign.draw()
  fetchScores()
  saveScore()
}

function saveScore() {
  const userInput = document.querySelector('#user-input')
  const saveButton = document.querySelector('#save-button')
  const playButton = document.querySelector('#play-button')

  playButton.addEventListener('click', clearCanvas)

  saveButton.addEventListener('click', event => {
    let data = {
      username: userInput.value,
      score: collectedPizzas
    }
    fetch(`https://rat-city-api.herokuapp.com/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      fetchScores()

      instructions.innerHTML = `
        thanks for playing!

        <button id="play-again"> play again </button>
      `
      const playAgain = document.querySelector('#play-again')
      playAgain.addEventListener('click', clearCanvas)
    })
  })
}

/**************************************************
              EVENT LISTENER HELPERS
**************************************************/
function continueAfterClick(e) {
  if (e.key === "Enter") {
    // makes all the rats and pizza disappear
    rats = []
    createRats()
    pigeons = []
    if (curLevel >= 13) {
      createOnePigeon()
    } else {
      createPigeons()
    }

    if (curLevel > 10) {
      cockroaches = []
      createCockroaches()
    }

    // changes the pause to false
    paused = false
    // canvas.classList.add("scrolling-bg")

    if (curLevel < 4) {
      level1.play()
    } else if (curLevel == 4) {
      boss1.play()
    } else if (curLevel < 7) {
      level5.play()
    } else if (curLevel < 9) {
      level7.play()
    } else if (curLevel < 11) {
      level9.play()
    } else if (curLevel < 15) {
      level11.play()
    }

    animate()
    // removes the event listener
    window.removeEventListener("keypress", continueAfterClick)
  }
}

function continueToNextLevel(e) {
  if (e.key === "Enter") {
    if (curLevel == "intro") {
      startLevelOne()
    } else if (curLevel == 1) {
      level1.play()
      startLevelTwo()
    } else if (curLevel == 2) {
      level1.play()
      startLevelThree()
    } else if (curLevel == 3) {
      boss1.play()
      startLevelFour()
    } else if (curLevel == 4) {
      level5.play()
      startLevelFive()
    } else if (curLevel == 5) {
      level5.play()
      startLevelSix()
    } else if (curLevel == 6) {
      level7.play()
      startLevelSeven()
    } else if (curLevel == 7) {
      level7.play()
      startLevelEight()
    } else if (curLevel == 8) {
      // level9.play()
      taxiDriving.play()
      driveTaxi()
    } else if (curLevel == 9) {
      boss2.play()
      startLevelTen()
    } else if (curLevel == 10) {
      level11.play()
      startLevelEleven()
    } else if (curLevel == 11) {
      level11.play()
      startLevelTwelve()
    } else if (curLevel == 12) {
      level11.play()
      startLevelThirteen()
    } else if (curLevel == 13) {
      boss2.play()
      startLevelFourteen()
    } else if (curLevel == 14) {
      winGame()
    }
    window.removeEventListener("keypress", continueToNextLevel, false)
  }
}

function clearCanvas() {
  location.reload()
}

/**************************************************
                START LEVEL FUNCTIONS
**************************************************/

function startIntro() {
  // startGameOnClick()
  renderIntro()
  showTaxi()
  completedLevel()
  ratSpeed = -3
  createRats()
}

function startLevelOne() {
  renderLevelOne()
  animate()
}

function startLevelTwo() {
  renderLevelTwo()
  animate()
}

function startLevelThree() {
  renderLevelThree()
  animate()
}

function startLevelFour() {
  renderLevelFour()
  animate()
}

function startLevelFive() {
  renderLevelFive()
  animate()
}

function startLevelSix() {
  renderLevelSix()
  animate()
}

function startLevelSeven() {
  renderLevelSeven()
  animate()
}

function startLevelEight() {
  // REMOVE THIS LATER
  addAllLevelSounds()

  renderLevelEight()
  animate()
}

function startLevelNine() {
  // debugger
  renderLevelNine()
  level9.play()
  animate()
}

function startLevelTen() {
  renderLevelTen()
  animate()
}

function startLevelEleven() {
  renderLevelEleven()
  animate()
}

function startLevelTwelve() {
  // columbus circle
  renderLevelTwelve()
  animate()
}

function startLevelThirteen() {
  // 72nd street
  renderLevelThirteen()
  animate()
}

function startLevelFourteen() {
  // museum of natural history --> END GAME
  renderLevelFourteen()
  animate()
}


/**************************************************
                INVOKING FUNCTIONS
**************************************************/

// startLevelFour()
// startLevelSeven()
// startLevelNine()
// startLevelFourteen()
// startLevelThirteen()

// startLevelFour()

startIntro()
