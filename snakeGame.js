
let gameOverMessage = document.getElementById('finalMessage');
let restartButton = document.getElementById('restartBtn');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let speed = 5;

let tileCount = 20; //total number of hor & ver movement of snake
let tileSize = canvas.width / tileCount -2;

// snake head
let headX = 10;
let headY = 10;

// food
let appleX = 5;
let appleY = 5;

//snake movement
let xvelocity = 0;
let yvelocity = 0;

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let snakePart = [];
let snakeLength = 1;

let score = 0;


function startGame() {
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }

    gameScreen();
    drawSnake();
    drawApple();
    
    checkAppleCollision();
    displayScore();

    if (score > 5) {
        speed = 10;
    }
    if (score > 10) {
        speed = 15;
    }
    if (score > 15) {
        speed = 20;
    }

    setTimeout(startGame, 1000 / speed);
    gameOverMessage.classList.remove('show');
}


// restart game
function restart() {
    headX = 10;
    headY = 10;

    appleX = 5;
    appleY = 5;

    xvelocity = 0;
    yvelocity = 0;

    snakeLength = 1;
    snakePart = [];

    score = 0;
    speed = 5;

    startGame();
}

// check possible gameover
function isGameOver() {
    let gameOver = false;
    if (xvelocity===0 && yvelocity===0) {
        return false;
    }

    if (headX < 0) {
        gameOver = true;
    }
    else if (headX === tileCount) {
        gameOver = true;
    }
    else if (headY < 0) {
        gameOver = true;
    }
    else if (headY === tileCount) {
        gameOver = true;
    }

    for (let i = 0; i < snakePart.length; i++) {
        let part = snakePart[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
        
    }

    if (gameOver) {
        gameOverMessage.classList.add('show');
    }

    return gameOver;
}

// display score
function displayScore() {
    ctx.fillStyle = 'white';
    ctx.font = '10px verdana'
    ctx.fillText('Score: ' + score, canvas.width-200, 10);

}

// draw game screen
function gameScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height)
}

// draw snake
function drawSnake() {
    //snake body
    ctx.fillStyle = '#555';
    for (let i = 0; i < snakePart.length; i++) {
        let part = snakePart[i];
        ctx.fillRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize)
    }
    snakePart.push(new SnakePart(headX, headY)); //put item at the end of snake

    if (snakePart.length > snakeLength) {
        snakePart.shift(); //remove first item from snake part
    }

    // snake head
    ctx.fillStyle = 'lightseagreen';
    ctx.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize)
}

// draw food
function drawApple() {
    ctx.fillStyle = 'green';
    ctx.fillRect(appleX*tileCount,appleY*tileCount, tileSize, tileSize)
}

// collides with food
function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        snakeLength++;
        score++;
    }
}

// moves snake
function changeSnakePosition() {
    headX += xvelocity
    headY += yvelocity
}

//control keys
document.addEventListener('keydown', keyControl);

function keyControl(event) {
    //up
    if (event.keyCode == 38) {
        if (yvelocity == 1) {
            return;
        }
        xvelocity = 0
        yvelocity = -1
    }
    //down
    if (event.keyCode == 40) {
        if (yvelocity == -1) {
            return;
        }
        xvelocity = 0
        yvelocity = 1
    }
    //left
    if (event.keyCode == 37) {
        if (xvelocity == 1) {
            return;
        }
        xvelocity = -1
        yvelocity = 0
    }
    //right
    if (event.keyCode == 39) {
        if (xvelocity == -1) {
            return;
        }
        xvelocity = 1
        yvelocity = 0
    }
}

startGame();
