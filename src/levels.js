/**************************************************
                RENDER LEVELS
**************************************************/
function renderLevelOne() {
  canvas.style.backgroundImage = "url('img/bowling_green_1.png')";
  createRats("img/rat.png")
  createPizzas()
  player.draw()
}

function renderLevelTwo() {
  curLevel = 2
  levelComplete = false
  subway.x = fullWidth + 100
  canvas.style.backgroundImage = "url('img/wall_st.png')";
  canvas.classList.add("scrolling-bg")
  createRats()
  createPizzas()
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

  console.log("did i hit this continue level thing");
}

function completedLevel() {
  rats = []
  pizzas = []
  canvas.classList.remove("scrolling-bg")
  bringSubway()
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

  if (curLevel == 1) {
    animateOne()
    console.log("did i hit? (1)");
  } else if (curLevel == 2) {
    animateTwo()
    console.log("did i hit? (2)");
  }
  // removes the event listener
  canvas.removeEventListener("click", continueAfterClick, false)
}

function continueToNextLevel() {
  if (curLevel == 1) {
    curLevel += 1
    startLevelTwo()
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
  animateOne()
}

function startLevelTwo() {
  renderLevelTwo()
  animateTwo()
}

/**************************************************
                INVOKING FUNCTIONS
**************************************************/
startLevelOne()
// startLevelTwo()


/**************************************************
                      TESTS
**************************************************/
// clearCanvas()
// firstRun()
// subway.draw()
// column.draw()
// renderLevelTwo()
