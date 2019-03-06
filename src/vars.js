/**************************************************
              CONSTANTS & VARIABLES
**************************************************/
// document elements
const canvas = document.querySelector("#canvas");
const container = document.querySelector("#container")
const restart = document.querySelector(".restart")
const score = document.querySelector("#score");
const livesLeft = document.querySelector("#lives");

// canvas screen adjustments
const fullWidth = 1200 //window.innerWidth
const fullHeight = 450
canvas.width = fullWidth
canvas.height = fullHeight
const floorPos = 315

const levelPizza = {
  1: 10,
  2: 15,
  3: 20,
  4: 0,
  5: 20
}

const levelBottle = {
  1: 1,
  2: 2,
  3: 4,
  4: 0,
  5: 5
}

const levelHeart = {
  1: 0,
  2: 0,
  3: 1,
  4: 0,
  5: 1
}

// setting object speeds
let bgSpeed = -0.9 // background speed
let pizzaSpeed = -2.5 // pizza speed
let ratSpeed = -4 // rat speed
let bossSpeed = -0.5 // rat speed

// setting the draw area of canvas
let c = canvas.getContext("2d");

//arrays & other variables
let rats = []
let pizzas = []
let collectedPizzas = 0
let lives = 3
let jumpKey = false
let paused = false
let curLevel = 1 // will change this
let levelComplete = false
