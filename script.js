let score = 0;
const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");
const gameContainer = document.getElementById("game-container");

let ballSpeed = 3;
let ballFalling = true;

document.addEventListener("mousemove", (event) => {
    let rect = gameContainer.getBoundingClientRect();
    let x = event.clientX - rect.left - paddle.clientWidth / 2;
    x = Math.max(0, Math.min(gameContainer.clientWidth - paddle.clientWidth, x));
    paddle.style.left = x + "px";
});

function dropBall() {
    let ballY = 0;
    let ballX = Math.random() * (gameContainer.clientWidth - ball.clientWidth);
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    let fallInterval = setInterval(() => {
        ballY += ballSpeed;
        ball.style.top = ballY + "px";

        let paddleRect = paddle.getBoundingClientRect();
        let ballRect = ball.getBoundingClientRect();

        if (ballRect.bottom >= paddleRect.top && 
            ballRect.left >= paddleRect.left && 
            ballRect.right <= paddleRect.right) {
            score++;
            scoreDisplay.textContent = score;
            clearInterval(fallInterval);
            dropBall();
        }

        if (ballY >= gameContainer.clientHeight) {
            score = 0;
            scoreDisplay.textContent = score;
            clearInterval(fallInterval);
            dropBall();
        }
    }, 20);
}

dropBall();