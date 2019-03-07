/**************************************************
                RENDER LEVELS
**************************************************/
function allLevelRender() {
  createRats()
  createPizzas()
  createCans()
  player.draw()
}

function renderLevelOne() {
  curLevel = 1
  canvas.style.backgroundImage = "url('img/1/bowling_green_1.png')";
  allLevelRender()
}

function renderLevelTwo() {
  player.x = 100
  pizzaSpeed = -4
  ratSpeed = -6
  curLevel = 2
  levelComplete = false
  subway.x = fullWidth + 100
  canvas.style.backgroundImage = "url('img/2/wall_st.png')";
  canvas.classList.add("scrolling-bg")
  allLevelRender()
}

function renderLevelThree() {
  player.x = 100
  pizzaSpeed = -5.5
  ratSpeed = -8
  curLevel = 3
  levelComplete = false
  subway.x = fullWidth + 100
  canvas.style.backgroundImage = "url('img/3/fulton-st-bg.png')";
  canvas.classList.add("scrolling-bg")
  allLevelRender()
  // console.log("is render level three going again?");
}

function renderLevelFour() {
  player.x = 100
  ratSpeed = -2
  curLevel = 4

  canvas.style.backgroundImage = "url('img/4/bklyn-br-bg.png')";
  canvas.style.backgroundSize = "1200px 450px"
  canvas.classList.remove("scrolling-bg")

  levelComplete = false
  subway.x = fullWidth + 100
  createRats()
  player.draw()
}

function renderLevelFive() {
  player.x = 100
  pizzaSpeed = -7
  ratSpeed = -10
  curLevel = 5
  levelComplete = false
  subway.x = fullWidth + 100
  canvas.style.backgroundImage = "url('img/5/union-sq-bg.png')";
  canvas.style.backgroundSize = "750px 450px"
  canvas.classList.add("scrolling-bg")
  allLevelRender()
}

function renderLevelSix() {
  player.x = 100
  pizzaSpeed = -5.5
  ratSpeed = -5
  curLevel = 6
  coffeeSpeed = -6
  levelComplete = false
  subway.x = fullWidth + 100
  canvas.style.backgroundImage = "url('img/6/grand-central-bg.png')";
  canvas.classList.add("scrolling-bg")
  allLevelRender()
  createCoffees()
}

function renderLevelSeven() {
  player.x = 100
  pizzaSpeed = -5.5
  ratSpeed = -5
  curLevel = 7
  coffeeSpeed = -6
  levelComplete = false
  subway.x = fullWidth + 100
  canvas.style.backgroundImage = "url('img/7/gc-concourse-bg.png')";
  canvas.classList.add("scrolling-bg")
  allLevelRender()
  // createCoffees()
}

/**************************************************
          COMPLETE / CONTINUE / GAME OVER
**************************************************/
function continueLevel() {
  if (lives == 3) {
    livesLeft.innerText = `❤️ ❤️ ❤️`
  } else if (lives == 2) {
    livesLeft.innerText = `❤️ ❤️`
  } else if (lives == 1) {
    livesLeft.innerText = `❤️ `
  }
  continueSign.draw()
  canvas.classList.remove("scrolling-bg")
  canvas.addEventListener("click", continueAfterClick)
}

function completedLevel() {
  rats = []
  pizzas = []
  bringSubway()
  canvas.classList.remove("scrolling-bg")
  canvas.addEventListener("click", continueToNextLevel)
}

function gameOver() {
  livesLeft.innerText = `😭 `
  canvas.classList.remove("scrolling-bg")
  gameOverSign.draw()
  canvas.addEventListener("click", clearCanvas)
}

/**************************************************
              EVENT LISTENER HELPERS
**************************************************/
function continueAfterClick() {
  // makes all the rats and pizza disappear
  rats = []
  createRats()
  // changes the pause to false
  paused = false
  canvas.classList.add("scrolling-bg")

  animate()
  // removes the event listener
  canvas.removeEventListener("click", continueAfterClick, false)
}

function continueToNextLevel() {
  if (curLevel == 1) {
    startLevelTwo()
  } else if (curLevel == 2) {
    startLevelThree()
  } else if (curLevel == 3) {
    startLevelFour()
  } else if (curLevel == 4) {
    startLevelFive()
  } else if (curLevel == 5) {
    startLevelSix()
  } else if (curLevel == 6) {
    startLevelSeven()
  } else if (curLevel == 7) {
    startLevelEight()
  } else if (curLevel == 8) {
    startLevelNine()
  } else if (curLevel == 9) {
    startLevelTen()
  } else if (curLevel == 10) {
    winGame()
  }
  canvas.removeEventListener("click", continueToNextLevel)
}

function clearCanvas() {
  location.reload()
}

/**************************************************
                START LEVEL FUNCTIONS
**************************************************/
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
function startTest() {
  renderTest()
  animate()
}

/**************************************************
                INVOKING FUNCTIONS
**************************************************/
// startLevelOne()
// startLevelTwo()
// startLevelThree()
// startLevelSix()
// startTest()

/**************************************************
                      TESTS
**************************************************/
// clearCanvas()
// firstRun()
// subway.draw()
// column.draw()
startLevelSeven()
