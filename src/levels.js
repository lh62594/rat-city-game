/**************************************************
                RENDER LEVELS
**************************************************/
function allLevelRender() {
  rats = []
  createRats()
  createPizzas()
  createCans()
  createHearts()
  player.draw()
  levelComplete = false
  player.x = 100
  console.log(subway.x);
}

function renderIntro() {
  curLevel = "intro"
  canvas.style.backgroundImage = "url('img/menu.png')"
  canvas.style.backgroundSize = "1200px 450px"
  canvas.classList.remove("scrolling-bg")
  instructions.innerText = "click to get on the subway!"

  addAllLevelSounds()
  // backgroundMusic.play()
}

// bowling green
function renderLevelOne() {
  curLevel = 1
  canvas.style.backgroundImage = "url('img/1/bowling_green_1.png')";
  score.innerHTML = "🍕 0"
  cansCollected.innerHTML = "🍺 0"
  livesLeft.innerHTML = "❤️ ❤️ ❤️ "
  instructions.innerHTML = "use the left, right, and up arrow to avoid rats and collect pizza"
  canvas.style.backgroundSize = "750px 450px"
  canvas.classList.add("scrolling-bg")
  allLevelRender()

  level1.play()
}

// wall street
function renderLevelTwo() {
  pizzaSpeed = -4
  ratSpeed = -6
  curLevel = 2

  instructions.innerHTML = "collect crumpled beer cans to throw at boss rats!"
  canvas.style.backgroundImage = "url('img/2/wall_st.png')";
  canvas.classList.add("scrolling-bg")
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
  canvas.classList.remove("scrolling-bg")

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
  canvas.style.backgroundImage = "url('img/5/union-sq-bg.png')";
  canvas.style.backgroundSize = "750px 450px"
  canvas.classList.add("scrolling-bg")
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
  canvas.style.backgroundImage = "url('img/6/grand-central-bg.png')";
  canvas.classList.add("scrolling-bg")
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
  subway.x = fullWidth + 100
  canvas.style.backgroundImage = "url('img/7/gc-concourse-bg.png')";
  canvas.classList.add("scrolling-bg")
  createTicketWindows()
  allLevelRender()
  createPigeons()
}

function renderLevelEight() {
  player.x = 100
  pizzaSpeed = -5.5
  ratSpeed = -5
  curLevel = 8
  pigeonSpeed = -6
  levelComplete = false
  subway.x = fullWidth + 100
  instructions.innerHTML = "head down 42nd street and get in a cab!"
  canvas.style.backgroundImage = "url('img/8/42-st-bg.png')";
  canvas.classList.add("scrolling-bg")
  allLevelRender()
  createPigeons()
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
  canvas.classList.remove("scrolling-bg")
  canvas.addEventListener("click", continueAfterClick)
  // document.addEventListener("keydown", event => {
  //   if (event.code == "Enter") {
  //     continueAfterClick()
  //   }
  // })
}

function completedLevel() {

  music.forEach( s => s.pause())

  rats = []
  pizzas = []
  pigeons = []

  if (curLevel < 7 && curLevel != "intro") {
    subwayMoving.play()
    bringSubway()

  } else if (curLevel == 8) {
    continueTo9.draw()
  }

  canvas.classList.remove("scrolling-bg")
  canvas.addEventListener("click", continueToNextLevel)
  // document.addEventListener("keydown", event => {
  //     continueToNextLevel(event)
  // })
}

/******************* GAME OVER SECTION **********************/
function gameOver() {
  gameOverSign.draw()
  fetchScores()

  gameOverSnd.play()
  livesLeft.innerText = `😭 `

  instructions.innerHTML = renderUsernameForm()

  canvas.classList.remove("scrolling-bg")
  // gameOverSign.draw()
  // canvas.addEventListener("click", clearCanvas)

  const userInput = document.querySelector('#user-input')
  const saveButton = document.querySelector('#save-button')
  const playButton = document.querySelector('#play-button')

  playButton.addEventListener('click', event => {
    clearCanvas()
  })

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
      playAgain.addEventListener('click', event => {
        clearCanvas()
      })
    })
  })


}

function renderUsernameForm() {
  return (`
    your final score is ${collectedPizzas}, enter your username to save your score!
    <br />
    <input id="user-input" type="text" placeholder="enter username" />
    <button id="save-button"> save </button>
    <button id="play-button"> play again </button>
  `)
}



/******************* GAME OVER SECTION **********************/



/**************************************************
              EVENT LISTENER HELPERS
**************************************************/
function continueAfterClick() {
  // makes all the rats and pizza disappear
  rats = []
  createRats()
  pigeons = []
  createPigeons()
  // changes the pause to false
  paused = false
  canvas.classList.add("scrolling-bg")

  if (curLevel < 4) {
    level1.play()
  } else if (curLevel == 4) {
    boss1.play()
  } else if (curLevel < 10) {
    level5.play()
  }

  animate()
  // removes the event listener
  canvas.removeEventListener("click", continueAfterClick)
}

function continueToNextLevel() {
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
      level5.play()
      startLevelSeven()
    } else if (curLevel == 7) {
      level5.play()
      startLevelEight()
    } else if (curLevel == 8) {
      taxiDriving.play()
      driveTaxi()
      level5.play()
      startLevelNine()
    } else if (curLevel == 9) {
      boss2.play()
      startLevelTen()
    } else if (curLevel == 10) {
      winGame()
    }
  canvas.removeEventListener("click", continueToNextLevel, false)
  // levelMusic.play()
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
  renderLevelEight()
  animate()
}

function startLevelNine() {
  renderLevelNine()
  animate()
}

function startLevelTen() {
  renderLevelTen()
  animate()
}


/**************************************************
                INVOKING FUNCTIONS
**************************************************/
// startLevelOne()
// startIntro()
// startLevelTwo()
// startLevelThree()
// startLevelFour()
// startTest()

// startLevelEight()

startIntro()
