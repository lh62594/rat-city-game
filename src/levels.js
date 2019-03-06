/**************************************************
                RENDER LEVELS
**************************************************/
function renderLevelOne() {
  curLevel = 1
  canvas.style.backgroundImage = "url('img/bowling_green_1.png')";
  createRats("img/rat.png")
  createPizzas()
  player.draw()
}

function renderLevelTwo() {
  pizzaSpeed = -4
  ratSpeed = -6
  curLevel = 2
  levelComplete = false
  subway.x = fullWidth + 100
  canvas.style.backgroundImage = "url('img/wall_st.png')";
  canvas.classList.add("scrolling-bg")
  createRats()
  createPizzas()
  player.draw()
}

function renderLevelThree() {
  pizzaSpeed = -5.5
  ratSpeed = -8
  curLevel = 3
  levelComplete = false
  subway.x = fullWidth + 100
  canvas.style.backgroundImage = "url('img/fulton-st-bg.png')";
  canvas.classList.add("scrolling-bg")
  createRats()
  createPizzas()
  player.draw()
}

function renderLevelFive() {
  pizzaSpeed = -7
  ratSpeed = -10
  curLevel = 5
  levelComplete = false
  subway.x = fullWidth + 100
  canvas.style.backgroundImage = "url('img/union-sq-bg.png')";
  canvas.classList.add("scrolling-bg")
  createRats()
  createPizzas()
  player.draw()
}

function renderTest() {
  ratSpeed = -2
  curLevel = 6
  levelComplete = false
  subway.x = fullWidth + 100
  canvas.style.backgroundImage = "url('img/union-sq-bg.png')";
  createRats()
  // createPizzas()
  player.draw()
}


/**************************************************
          COMPLETE / CONTINUE / GAME OVER
**************************************************/
function continueLevel() {
  livesLeft.innerText = `LIVES: ${lives}`
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
  livesLeft.innerText = `LIVES: ${lives}`
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
  pizzas = []
  // recreates all the pizzas and rats
  // canvas.style.animation = "backgroundScroll 8s linear infinite;"
  createPizzas()
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
    curLevel += 1
    startLevelTwo()
  } else if (curLevel == 2) {
    curLevel += 1
    startLevelThree()
  } else if (curLevel == 3) {
    curLevel += 1
    startLevelFour()
  } else if (curLevel == 4) {
    curLevel += 1
    startLevelFive
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

  // animate()
}

function startLevelFive() {
  renderLevelFive()
  animate()
}

function startTest() {
  renderTest()

}
/**************************************************
                INVOKING FUNCTIONS
**************************************************/
// startLevelOne()
// startLevelTwo()
// startLevelFive()
// startTest()

/**************************************************
                      TESTS
**************************************************/
// clearCanvas()
// firstRun()
// subway.draw()
// column.draw()
// renderLevelTwo()
