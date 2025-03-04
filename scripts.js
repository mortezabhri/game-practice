let player = document.getElementById("player");
let obstacles = document.querySelectorAll(".obstacle");
let goal = document.getElementById("goal");
let message = document.getElementById("message");
let timeDisplay = document.getElementById("time");

let timeLeft = 30;
let timer;

function move(direction) {
    let left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    let top = parseInt(window.getComputedStyle(player).getPropertyValue("top"));

    if (direction === "right" && left < 360) player.style.left = left + 20 + "px";
    if (direction === "left" && left > 0) player.style.left = left - 20 + "px";
    if (direction === "up" && top > 0) player.style.top = top - 20 + "px";
    if (direction === "down" && top < 260) player.style.top = top + 20 + "px";

    checkCollision();
}

function checkCollision() {
    let playerRect = player.getBoundingClientRect();
    let goalRect = goal.getBoundingClientRect();

    for (let obstacle of obstacles) {
        let obstacleRect = obstacle.getBoundingClientRect();
        if (
            playerRect.x < obstacleRect.x + obstacleRect.width &&
            playerRect.x + playerRect.width > obstacleRect.x &&
            playerRect.y < obstacleRect.y + obstacleRect.height &&
            playerRect.y + playerRect.height > obstacleRect.y
        ) {
            message.innerText = "You Lose! Try Again";
            message.style.color = "red";
            clearInterval(timer);
            setTimeout(()=>{
                restartGame();
            } , 3000)
            return;
        }
    }

    if (
        playerRect.x < goalRect.x + goalRect.width &&
        playerRect.x + playerRect.width > goalRect.x &&
        playerRect.y < goalRect.y + goalRect.height &&
        playerRect.y + playerRect.height > goalRect.y
    ) {
        message.innerText = "Your Win!";
        message.style.color = "green";
        clearInterval(timer);
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            message.innerText = "Time Is Up! Try Again";
            message.style.color = "red";
            setTimeout(()=>{
                restartGame();
            } , 3000)
        }
    }, 1000);
}

function restartGame() {
    player.style.left = "10px";
    player.style.top = "250px";
    message.innerText = "";
    timeLeft = 30;
    timeDisplay.innerText = timeLeft;
    clearInterval(timer);
    startTimer();
}



startTimer();