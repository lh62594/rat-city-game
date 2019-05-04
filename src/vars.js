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

// music
let music = []


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
  7: 20,
  8: 15,
  9: 24,
  10: 0,
  11: 25,
  12: 23,
  13: 26
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
  10: 0,
  11: 3,
  12: 3,
  13: 3,
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
  9: 2,
  10: 0,
  11: 1,
  12: 1,
  13: 1,
}

const levelDonut = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 2,
  10: 1,
  11: 2,
  12: 2,
  13: 1,
  14: 1,
}

const hitsNeeded = {
  4: 3,
  10: 6,
  14: 8
}

// setting object speeds
let bgSpeed = -0.9 // background speed
let pizzaSpeed = -2.5 // pizza speed
let ratSpeed = -4 // rat speed
let bossSpeed = -1.5 // rat speed
let throwSpeed = 6
let playerSpeed = 5
let pigeonSpeed = -4 // pigeon speed
let cockroachSpeed = 4

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
let donuts = [] // used in Level 9
let cockroaches = [] // used in level 11

// collected variables
let collectedPizzas = 0
let collectedCans = 10
let lives = 3


// for animation
let counter = 1
let a = 1
// let gif = {
//   0: "img/mario/0.gif",
//   1: "img/mario/1.gif",
//   2: "img/mario/2.gif",
//   3: "img/mario/3.gif",
//   4: "img/mario/4.gif",
//   5: "img/mario/5.gif",
//   6: "img/mario/6.gif",
//   7: "img/mario/7.gif",
//   8: "img/mario/8.gif",
//   9: "img/mario/9.gif",
//   10: "img/mario/10.gif"
// }

let right = {
  0: "img/character/0.png",
  1: "img/character/1.png",
  2: "img/character/2.png",
  3: "img/character/3.png",
  4: "img/character/4.png",
  5: "img/character/5.png",
  6: "img/character/6.png",
  7: "img/character/7.png",
}

let left = {
  0: "img/character/l0.png",
  1: "img/character/l1.png",
  2: "img/character/l2.png",
  3: "img/character/l3.png",
  4: "img/character/l4.png",
  5: "img/character/l5.png",
  6: "img/character/l6.png",
  7: "img/character/l7.png",
}


// game play logic
let jumpKey = false
let rightKey = false
let leftKey = false
let paused = false
let curLevel = 1
let levelComplete = false
let throwing = false
let hits = 0
let direction = "right"
