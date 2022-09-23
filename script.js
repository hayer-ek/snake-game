/** @type {HTMLCanvasElement} */
let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');

let gameActive = true;
let score = 0;
let size = 16;
let steps = 0;
let newTail = false;
let scoreBlock = document.querySelector(".game-score .score-count");

let berry = {
    x: randomNumber(2, 24) * 16,
    y: randomNumber(2, 24) * 16
}

let snake = {
    x: 160,
    y: 160,
    tails: [{ x: 144, y: 160 }, { x: 144, y: 160 }],
    rotateY: 0,
    rotateX: 16
}

function game() {
    setInterval(() => {
        if (!gameActive) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (newTail) {
            if (steps == snake.tails.length) {
                snake.tails[snake.tails.length] = { x: snake.x, y: snake.y };
            } else {
                for (let i = snake.tails.length; i > steps; --i) {
                    if (Number(i - 1) == steps) {
                        snake.tails[i] = { x: snake.x, y: snake.y };
                        break;
                    }
                    snake.tails[i] = snake.tails[i - 1]
                }
            }
        }
        newTail = false;

        ctx.fillStyle = '#ff0000';
        ctx.fillRect(berry.x + 4, berry.y + 4, size - 8, size - 8)

        snake.tails[steps] = { x: snake.x, y: snake.y };

        snake.x += snake.rotateX;
        snake.y += snake.rotateY;

        if (snake.x > 400) {
            snake.x = 0
        }

        if (snake.y > 400) {
            snake.y = 0
        }

        if (snake.x < 0) {
            snake.x = 400
        }

        if (snake.y < 0) {
            snake.y = 400
        }

        ctx.fillStyle = "#FA0556";
        ctx.fillRect(snake.x, snake.y, size, size)

        if (snake.x == berry.x && snake.y == berry.y) {
            eatBerry()
        }

        snake.tails.forEach((elem, index) => {
            if (elem.x == snake.x && elem.y == snake.y) {
                restartGame();
            } else {
                ctx.fillStyle = "#A00034"
                ctx.fillRect(elem.x, elem.y, size, size)
            }
        })

        steps--;
        if (steps < 0) steps = snake.tails.length - 1;

    }, 80)
}

function eatBerry() {
    score++;
    newTail = true;
    berry = {
        x: randomNumber(2, 25) * 16,
        y: randomNumber(2, 25) * 16
    }
    while(snake.tails.findIndex(x => x.y == berry.y && x.x == berry.x) != -1) {
        console.log('rechange')
        berry = {
            x: randomNumber(2, 25) * 16,
            y: randomNumber(2, 25) * 16
        }
    }
    scoreBlock.innerHTML = score;
}

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function restartGame() {
    snake = {
        x: 160,
        y: 160,
        tails: [{ x: 144, y: 160 }, { x: 144, y: 160 }],
        rotateY: 0,
        rotateX: 16
    }

    score = 0;
    size = 16;
    steps = 0;

    scoreBlock.innerHTML = score;

    berry = {
        x: randomNumber(1, 26) * 16,
        y: randomNumber(1, 26) * 16
    }
}

document.addEventListener("keydown", function (e) {
    if (snake.rotateX == 0 && snake.rotateY == -16 && e.code == "KeyS") return;
    if (snake.rotateX == 16 && snake.rotateY == 0 && e.code == "KeyA") return;
    if (snake.rotateX == 0 && snake.rotateY == 16 && e.code == "KeyW") return;
    if (snake.rotateX == -16 && snake.rotateY == 0 && e.code == "KeyD") return;

    if (e.code == "KeyW") {
        snake.rotateX = 0;
        snake.rotateY = -16;
    } else if (e.code == "KeyA") {
        snake.rotateX = -16;
        snake.rotateY = 0
    } else if (e.code == "KeyS") {
        snake.rotateX = 0;
        snake.rotateY = 16;
    } else if (e.code == "KeyD") {
        snake.rotateX = 16;
        snake.rotateY = 0;
    }
});

document.getElementById('pause').onclick = () => {
    gameActive = !gameActive
}

document.getElementById('restart').onclick = () => {
    restartGame()
}

game()