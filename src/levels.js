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
  canvas.style.backgroundImage = "url('img/bowling_green_1.png')";
  allLevelRender()
  // console.log("Is render level on");
}

function renderLevelTwo() {
  player.x = 100
  pizzaSpeed = -4
  ratSpeed = -6
  curLevel = 2
  levelComplete = false
  subway.x = fullWidth + 100
  canvas.style.backgroundImage = "url('img/wall_st.png')";
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
  canvas.style.backgroundImage = "url('img/fulton-st-bg.png')";
  canvas.classList.add("scrolling-bg")
  allLevelRender()
  // console.log("is render level three going again?");
}

function renderLevelFour() {
  player.x = 100
  ratSpeed = -2
  curLevel = 4

  canvas.style.backgroundImage = "url('img/bklyn-br-bg.png')";
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
  canvas.style.backgroundImage = "url('img/union-sq-bg.png')";
  canvas.style.backgroundSize = "750px 450px"
  canvas.classList.add("scrolling-bg")
  allLevelRender()
}

function renderTest() {
  player.x = 100
  ratSpeed = -2
  curLevel = 4
  collectedCans = 5
  cansCollected.innerText = `🍺 ${collectedCans}`
  levelComplete = false
  subway.x = fullWidth + 100
  canvas.removeAttribute("id")
  canvas.setAttribute("id", "boss")
  canvas.classList.remove("scrolling-bg")
  createRats()
  // createPizzas()
  // createThrows()
  player.draw()
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
  // pizzas = []
  // recreates all the pizzas and rats
  // canvas.style.animation = "backgroundScroll 8s linear infinite;"
  // createPizzas()
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
    startLevelFive()
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
// startLevelFour()
// startTest()

/**************************************************
                      TESTS
**************************************************/
// clearCanvas()
// firstRun()
// subway.draw()
// column.draw()
// renderLevelFour()
