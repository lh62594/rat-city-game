/**************************************************
              CONSTANTS & VARIABLES
**************************************************/
// document elements
const canvas = document.querySelector("#canvas");
const container = document.querySelector("#container")
const restart = document.querySelector(".restart")
const score = document.querySelector("#score");
const cansCollected = document.querySelector("#cans");
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
  5: 15
  6: 20
}

const levelCan = {
  1: 1,
  2: 2,
  3: 4,
  4: 0,
  5: 5,
  6: 4
}

const levelHeart = {
  1: 0,
  2: 0,
  3: 1,
  4: 0,
  5: 1
}

const hitsNeeded = {
  4: 3
}

// setting object speeds
let bgSpeed = -0.9 // background speed
let pizzaSpeed = -2.5 // pizza speed
let ratSpeed = -4 // rat speed
let bossSpeed = -1.5 // rat speed
let throwSpeed = 6
let playerSpeed = 5
let coffeeSpeed = -6 // coffee speed

// setting the draw area of canvas
let c = canvas.getContext("2d");

// arrays
let rats = []
let pizzas = []
let cans = []
let throws = []

// gif animations
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
let coffees = []
let collectedPizzas = 0
let lives = 3
let jumpKey = false
let paused = false
let curLevel = 1 // will change this
let levelComplete = false


let counter = 1
// collected variables
let lives = 3
let collectedPizzas = 0
let collectedCans = 0

// game play logic
let jumpKey = false
let rightKey = false
let leftKey = false

let spaceKey = 0
let paused = false
let throwing = false
let curLevel = 1 // will change this
let hits = 0
let levelComplete = false
