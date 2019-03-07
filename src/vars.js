/**************************************************
              CONSTANTS & VARIABLES
**************************************************/
// document elements
const canvas = document.querySelector("#canvas");
const container = document.querySelector("#container")
const instructions = document.querySelector("#instructions")
const restart = document.querySelector(".restart")
const score = document.querySelector("#score");
const cansCollected = document.querySelector("#cans");
const livesLeft = document.querySelector("#lives");
const instructions = document.querySelector("#instructions");


// canvas screen adjustments
const fullWidth = 1200 //window.innerWidth
const fullHeight = 450
canvas.width = fullWidth
canvas.height = fullHeight
const floorPos = 315

const levelPizza = {
  1: 10,
  2: 15,
  3: 18,
  4: 0,
  5: 15,
  6: 15,
  7: 18,
  8: 15,
  9: 0,
  10: 0
}

const levelCan = {
  1: 0,
  2: 1,
  3: 4,
  4: 0,
  5: 3,
  6: 2,
  7: 3,
  8: 2,
  9: 2,
  10: 0
}

const levelHeart = {
  1: 0,
  2: 0,
  3: 1,
  4: 0,
  5: 1,
  6: 0,
  7: 1,
  8: 0,
  9: 1
}

const hitsNeeded = {
  4: 3,
  10: 10
}

// setting object speeds
let bgSpeed = -0.9 // background speed
let pizzaSpeed = -2.5 // pizza speed
let ratSpeed = -4 // rat speed
let bossSpeed = -1.5 // rat speed
let throwSpeed = 6
let playerSpeed = 5
let pigeonSpeed = -4 // pigeon speed

// setting the draw area of canvas
let c = canvas.getContext("2d");

// arrays
let rats = []
let pizzas = []
let cans = []
let throws = []
let hearts = []
let pigeons = [] // used in Level 6
let ticketWindows = [] // used in Level 7
let lamps = [] // used in Level 7

// collected variables
let collectedPizzas = 0
let collectedCans = 0
let lives = 3


// for animation
let counter = 1
let gif = {
  0: "img/mario/0.gif",
  1: "img/mario/1.gif",
  2: "img/mario/2.gif",
  3: "img/mario/3.gif",
  4: "img/mario/4.gif",
  5: "img/mario/5.gif",
  6: "img/mario/6.gif",
  7: "img/mario/7.gif",
  8: "img/mario/8.gif",
  9: "img/mario/9.gif",
  10: "img/mario/10.gif"
}



// game play logic
let jumpKey = false
let rightKey = false
let leftKey = false
let paused = false
let curLevel = 1 // will change this
let levelComplete = false
let throwing = false
let hits = 0
