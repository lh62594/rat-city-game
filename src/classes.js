/**************************************************
                  GAME PIECE CLASSES
**************************************************/
class CoffeeCup {
  constructor(x) {
    this.x = x
    this.y = floorPos - 40
    this.dx = coffeeSpeed
    this.width = 40
    this.height = 45
    this.image = new Image(50,50)
    this.image.src = "img/coffee-cup.webp"
    this.flight = true
  }

  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  move() {
    if (lives > -1) {
      if (this.x + this.width < 0) {
        this.x = fullWidth + (Math.random()*525 + 475)
      }

      this.x += this.dx

      // flying coffee cups
      if (this.y < 50) {
        this.y += 3
        this.flight = false
      }
      else if (this.flight == false) {
        this.y += 3
        if (this.y > floorPos - 40) {
          this.flight = true
        }
      }
      else if (Math.random() > 0 && Math.random() < 0.3 && this.flight == true) {
        this.y -= 3
      }
      else if (Math.random() > 0.3 && Math.random() < 0.4 && this.flight == true) {
        if (this.y != floorPos - 40) {
          this.y += 0.5
        }
      }

      this.draw();

      //if player hits a coffee
      if (this.x > player.x && this.x < (player.x + player.width)
        && this.y < (player.y + player.height) && this.y > player.y ) {
          lives -= 1  // lives decrease
          paused = true // the game is paused
        }
    }
  }

} // end of CoffeeCup class

class Rat {
  constructor(x) {
    this.x = x
    this.y = floorPos - 40
    this.dx = ratSpeed
    this.width = 100
    this.height = 50
    this.image = new Image(50,50)
    this.image.src = "img/rat/1.png"
  }

  draw() {

    if (counter > 1 && counter <= 8) {
      this.image.src = "img/rat/1.png"
    } else if (counter > 8 && counter <= 16) {
      this.image.src = "img/rat/2.png"
    } else if (counter > 16 && counter <= 24) {
      this.image.src = "img/rat/3.png"
    } else if (counter > 24 && counter <= 32) {
      this.image.src = "img/rat/4.png"
    } else if (counter > 32 && counter <= 40) {
      this.image.src = "img/rat/5.png"
    } else if (counter > 40 && counter <= 48) {
      this.image.src = "img/rat/1.png"
    } else if (counter > 48 && counter <= 56) {
      this.image.src = "img/rat/2.png"
    } else if (counter > 56 && counter <= 64) {
      this.image.src = "img/rat/3.png"
    } else if (counter > 64 && counter <= 72) {
      this.image.src = "img/rat/4.png"
    } else if (counter > 72 && counter <= 80) {
      this.image.src = "img/rat/5.png"
    }

    c.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  move() {
    if (lives > -1) {
      if (this.x + this.width < 0) {
        this.x = fullWidth + (Math.random()*525 + 475)
      }

      this.x += this.dx
      this.draw();

      //if player hits an rat
      if (this.x > player.x && this.x < (player.x + player.width)
        && this.y < (player.y + player.height) && this.y > player.y ) {
          lives -= 1  // lives decrease
          paused = true // the game is paused
        }
    }
  }

} // end of Rat class

class Boss {
  constructor(src, x, y, w, h) {
    this.x = x
    this.y = y
    this.dx = bossSpeed
    this.width = w
    this.height = h
    this.image = new Image(50,50)
    this.image.src = src
  }

  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  move() {

    this.x += this.dx
    this.draw()

    if (this.x > 1000) {
      this.dx = -this.dx
      this.x += this.dx
      this.draw()
    } else if (this.x < 600) {
      this.dx = -this.dx
      this.x += this.dx
      this.draw()
    }

    if (this.x > player.x && this.x < (player.x + player.width)
      && this.y < (player.y + player.height) && this.y > player.y ) {
        lives = 0  // lives decrease
        paused = true // the game is paused
    }
  }

} // end of Boss class

class Player {
  constructor() {
    this.x = 100
    this.y = floorPos - 100
    this.dx = playerSpeed
    this.width = 90
    this.height = 100
    this.image = new Image(50, 50)
    // this.image.src = "img/mario-pose2.png"
    this.image.src = "img/mario/1.gif"
    // this.gif = GIF()
    // this.gif.load("img/mario-run.gif")
    this.gravity = 0
    this.gravitySpeed = 0
    this.jumping = false
  }

  draw() {

    if (counter > 1 && counter <= 8) {
      this.image.src = gif[0]
    } else if (counter > 8 && counter <= 16) {
      this.image.src = gif[1]
    } else if (counter > 16 && counter <= 24) {
      this.image.src = gif[2]
    } else if (counter > 24 && counter <= 32) {
      this.image.src = gif[3]
    } else if (counter > 32 && counter <= 40) {
      this.image.src = gif[4]
    } else if (counter > 40 && counter <= 48) {
      this.image.src = gif[5]
    } else if (counter > 48 && counter <= 56) {
      this.image.src = gif[6]
    } else if (counter > 56 && counter <= 64) {
      this.image.src = gif[7]
    } else if (counter > 64 && counter <= 72) {
      this.image.src = gif[8]
    } else if (counter > 72 && counter <= 80) {
      this.image.src = gif[9]
    } else if (counter > 80) {
      counter = 1
    }
    // this.image.src = gif[counter/counter - counter]
    c.drawImage(this.image, this.x, this.y, this.width, this.height)
    // c.drawImage(this.gif.image, 100, 100)
    counter += 1

    if (player.x < 1) {
      player.x = 1
    } else if ( (player.x + player.width) > fullWidth) {
      player.x = fullWidth - player.width
    }

    if (player.y > 60) {
      this.gravitySpeed += this.gravity;
      this.y += this.gravitySpeed;
    }
    else {
      this.gravitySpeed = 0
      player.y = 60.0001
    }
    this.hitBottom()
  }

  hitBottom() {
    let rockbottom = floorPos - 100
    if (this.y > rockbottom) {
      this.y = rockbottom;
    }
  }
}

/**************************************************
                THINGS TO COLLECT
**************************************************/
class Pizza {
  constructor(x, num) {
    this.num = num
    this.x = x
    this.y = floorPos - 50
    this.dx = pizzaSpeed
    this.size = 40
    this.image = new Image(50,50);
    this.image.src = "img/collect/pizza.png"
  }

  draw() {
    c.drawImage(this.image, this.x, this.y, this.size, this.size)
  }

  move() {
    // if the pizza hits the left side of canvas, it gets destroyed
    if (this.x < 0) {
      pizzas.shift()
    }

    // this is moving the pizza left
    this.x += this.dx;
    this.draw();

    // if the pizza hits the player, pizza collection goes up by 1
    // that pizza disappears from the screen & pizza array
    if (this.x > player.x && this.x < (player.x + player.width)
      && this.y < (player.y + player.height) && this.y > player.y ) {
        pizzas = pizzas.filter( p => p.num != this.num)
        collectedPizzas += 1
        score.innerText = `🍕 ${collectedPizzas}`
    }
  }
} // end of Pizza class

class Can {
  constructor(x, num) {
    this.num = num
    this.x = x
    this.y = floorPos - 50
    this.dx = pizzaSpeed
    this.width = 60
    this.height = 40
    this.image = new Image(50,50);
    this.image.src = "img/collect/stella.png"
  }

  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  move() {
    // if the can hits the left side of canvas, it gets destroyed
    if (this.x < 0) {
      cans.shift()
    }

    // this is moving the can left
    this.x += this.dx;
    this.draw();

    // if the can hits the player, can collection goes up by 1
    // that can disappears from the screen & can array
    if (this.x > player.x && this.x < (player.x + player.width)
      && this.y < (player.y + player.height) && this.y > player.y ) {
        cans = cans.filter( p => p.num != this.num)
        collectedCans += 1
        cansCollected.innerText = `🍺 ${collectedCans}`
    }
  }
}

class Throw {
  constructor(x, y, obstacle) {
    this.x = x
    this.y = y + 50
    // this.num = num
    this.dx = throwSpeed
    this.size = 40
    this.image = new Image(50,50);
    this.image.src = "img/collect/stella.png"
    this.obstacle = obstacle
  }

  draw() {
    c.drawImage(this.image, this.x, this.y, this.size, this.size)
  }

  move() {
    // console.log(this.obstacle.x);
    this.x += this.dx
    this.draw()

    if (this.x > fullWidth) {
      throws.shift()
    } else if (this.x > this.obstacle.x) {
      throws.shift()
      hits += 1

      if (hits == hitsNeeded[curLevel]) {
        levelComplete = true
        hits = 0
      }
    }
  }
}

class Heart {
  constructor(x, num, src) {
    this.num = num
    this.x = x
    this.y = floorPos - 150
    this.dx = bgSpeed
    this.size = 40
    this.image = new Image(50,50);
    this.image.src = src
  }

  draw() {
    c.drawImage(this.image, this.x, this.y, this.size, this.size)
  }

  move() {
    if (this.x < 0) {
      hearts.shift()
    }

    this.x += this.dx;
    this.draw();

    if (this.x > player.x && this.x < (player.x + player.width)
      && this.y < (player.y + player.height) && this.y > player.y ) {
        hearts = hearts.filter( h => h.num != this.num)
        lives += 1
        livesLeft.innerText += `❤️`
    }
  }
}


/**************************************************
                  BACKGROUND CLASSES
**************************************************/
class StationSign {
  constructor(src, x, y, w, h) {
    this.x = x
    this.y = y
    this.dx = bgSpeed
    this.width = w
    this.height = h
    this.image = new Image(50,50)
    this.image.src = src
  }

  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  move() {
    if (this.x + this.width < 0) {
      this.x = fullWidth + 250 + this.x
    }
    this.x += this.dx;
    this.draw();
  }
} // end of StationSign class

class Subway {
  constructor(x) {
    this.x = x
    this.y = floorPos - 200
    this.dx = -10
    this.width = fullWidth
    this.height = 275
  }

  draw() {
    c.fillStyle = ("rgb(211,211,211)") // drawing the rectangle of the train
    c.fillRect(this.x, this.y, this.width, this.height)

    c.fillStyle = ("rgba(228, 233, 237, 1)") // window color
    c.fillRect(this.x + 20, 160, 150, 120) // first window
    c.fillRect(this.x + 450, 160, 320, 120) // second window
    c.fillRect(this.x + 220, 180, 80, 100) // left door window (1)
    c.fillRect(this.x + 320, 180, 80, 100) // right door window (1)
    c.fillRect(this.x + 820, 180, 80, 100) // left door window (2)
    c.fillRect(this.x + 920, 180, 80, 100) // right door window (2)

    c.fillStyle = ("rgba(80, 80, 80, 0.3)") // door color
    c.fillRect(this.x + 210, 160, 200, 200) // first door
    c.fillRect(this.x + 810, 160, 200, 200) // second door

    c.strokeStyle = ("rgba(30, 30, 30, 0.5)") // door outline color
    c.strokeRect(this.x + 20, 160, 150, 120) // first window outline
    c.strokeRect(this.x + 450, 160, 320, 120) // second window outline

    c.strokeRect(this.x + 210, 160, 100, 200) // left door outline (1)
    c.strokeRect(this.x + 310, 160, 100, 200) // right door outline (1)
    c.strokeRect(this.x + 810, 160, 100, 200) // left door outline (2)
    c.strokeRect(this.x + 910, 160, 100, 200) // right door outline (2)


    c.fillStyle = ("rgba(50, 50, 50, 0.8)") // step color
    c.fillRect(this.x + 200, 360, 220, 10) // this is the 1st step
    c.fillRect(this.x + 800, 360, 220, 10) // this is the 2nd step

    c.fillStyle = ("rgba(10, 10, 10, 0.8)") // sign color
    // c.fillRect(this.x + 20, 160, 150, 40) // first window sign
    c.fillRect(this.x + 450, 160, 320, 40) // second window sign
    c.font = "18px Arial"; // 4 train circle
    c.fillStyle = ("#afff14")
    c.fillText("4      LEXINGTON EXPRESS", this.x + 495, 187)
    c.font = "14px Arial"; // continue sign
    c.fillStyle = "rgba(0,0,0,1)"
    c.fillText("CLICK HERE FOR NEXT LEVEL", this.x + 500, 310)

    c.beginPath() // 4 train sign circle
    c.arc((this.x + 500), 180, 15, 0, Math.PI * 2, false)
    c.strokeStyle = "rgba(0, 240, 0, 1)"
    c.stroke()

    //********************drawing the wheels**********************
    c.beginPath() // outer wheel
    c.arc((this.x + 50), (this.y + this.height + 10), 30, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(5, 5, 5, 1)"
    c.fill()

    c.beginPath() // inner wheel
    c.arc((this.x + 52), (this.y + this.height + 12), 15, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(240, 240, 240, 1)"
    c.fill()


    c.beginPath() // outer wheel
    c.arc((this.x + 130), (this.y + this.height + 10), 30, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(5, 5, 5, 1)"
    c.fill()

    c.beginPath() // inner wheel
    c.arc((this.x + 132), (this.y + this.height + 12), 15, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(240, 240, 240, 1)"
    c.fill()

    c.beginPath() // outer wheel
    c.arc((this.x + 50), (this.y + this.height + 10), 30, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(5, 5, 5, 1)"
    c.fill()

    c.beginPath() // inner wheel
    c.arc((this.x + 52), (this.y + this.height + 12), 15, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(240, 240, 240, 1)"
    c.fill()


    c.beginPath() // outer wheel
    c.arc((this.x + 550), (this.y + this.height + 10), 30, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(5, 5, 5, 1)"
    c.fill()

    c.beginPath() // inner wheel
    c.arc((this.x + 552), (this.y + this.height + 12), 15, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(240, 240, 240, 1)"
    c.fill()

    c.beginPath() // outer wheel
    c.arc((this.x + 630), (this.y + this.height + 10), 30, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(5, 5, 5, 1)"
    c.fill()

    c.beginPath() // inner wheel
    c.arc((this.x + 632), (this.y + this.height + 12), 15, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(240, 240, 240, 1)"
    c.fill()
  }

  move() {
    if (this.x > 200 || subway.x < 200) {
      this.x += this.dx;
      this.draw();
    } else if (this.x == 200){
      this.draw();
    }
  }
} // end of Subway class

class GameSign {
  constructor(src) {
    this.image = new Image(50,50);
    this.image.src = src
  }

  draw() {
    c.drawImage(this.image, 300, 60, 600, 300)
  }
} // end of GameSign class

class Column {
  constructor(x, src) {
    this.x = x
    this.y = 23
    this.dx = bgSpeed
    this.width = 90
    this.height = floorPos - this.y - 5
    this.image = new Image(50,50)
    this.image.src = src
  }

  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  move() {
    this.x += this.dx;
    this.draw();

    if (this.x < (player.x + player.width / 2)) {
      this.draw();
      levelComplete = true
    }
  }
} // end of Column class
