
// Variables
let gameBoard = document.querySelector(".gameContainer__gameBoard");
const scorePlace = document.getElementById("score");

let xFood = randomPlace();
let yFood = randomPlace();
let xSnake = randomPlace();
let ySnake = randomPlace();
let deltaX = 0;
let deltaY = 0;
let score = 0;
scorePlace.innerHTML = score;

let snakeBody = [];

function initGame() {
    if (xSnake === xFood && ySnake === yFood) {
        score++;
        scorePlace.innerHTML = score;
        snakeBody.unshift([xFood, yFood]);
        xFood = randomPlace();
        yFood = randomPlace();
    }


    xSnake += deltaX;
    ySnake += deltaY;

    if (xSnake <= 0 || xSnake > 20 || ySnake <= 0 || ySnake > 20) {
        xSnake = randomPlace();
        ySnake = randomPlace();
        xFood = randomPlace();
        yFood = randomPlace();
        deltaX = 0;
        deltaY = 0;
        snakeBody = [];
        score = 0;
        scorePlace.innerHTML = score;
        alert("game over");
    }

    if (snakeBody.length === 0) {
        snakeBody.push([xSnake, ySnake]);
    } else {
        snakeBody.unshift([xSnake, ySnake]);
        snakeBody.pop();
    }

    for (let i = 1; i < snakeBody.length; i++) {
        if (xSnake === snakeBody[i][0] && ySnake === snakeBody[i][1]) {
            xSnake = randomPlace();
            ySnake = randomPlace();
            deltaX = 0;
            deltaY = 0;
            snakeBody = [];
            score = 0;
        }
    }


    let htmlAdditives = `<div class="food" style="grid-column: ${xFood}; grid-row: ${yFood};"></div>`;
    for (let i = 0; i < snakeBody.length; i++) {
        htmlAdditives += `<div class="snakeHead" style="grid-column: ${snakeBody[i][0]}; grid-row: ${snakeBody[i][1]};"></div>`;
    }
    gameBoard.innerHTML = htmlAdditives;
}

function randomPlace() {
    let randNum = Math.floor(Math.random() * 20) + 1;
    return randNum;
}

function moveSnake(e) {
    if (e.code === "ArrowUp" && deltaY !== 1) {
        deltaX = 0;
        deltaY = -1;
    } else if (e.code === "ArrowDown" && deltaY !== -1) {
        deltaX = 0;
        deltaY = 1;
    } else if (e.code === "ArrowRight" && deltaX !== -1) {
        deltaX = 1;
        deltaY = 0;
    } else if (e.code === "ArrowLeft" && deltaX !== 1) {
        deltaX = -1;
        deltaY = 0;
    }
}

// Calling functions
setInterval(initGame, 100);

// events
window.addEventListener("keydown", moveSnake);


