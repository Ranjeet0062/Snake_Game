let playbord = document.querySelector(".playbord");
let scorebord = document.querySelector(".scorebord");
let highscorebord = document.querySelector(".Highscorebord")
let eatmusic = new Audio("Metal Gear Menu.mp3");
let overeffect = new Audio("gameover.mp3");
let bacroundmusic = new Audio("bacround.mp3");
let snekX = 18, snekY = 9;
let snakebody = [];
let foodX, foodY
let setIntervalid;
let score = 0;
let velocityX = 0, velocityY = 0;
let gameover = false;
let highscore = localStorage.getItem("highscore") || 0
highscorebord.innerHTML = `High score: ${highscore}`;

let movesnek = e => {
    if (e.key === "ArrowUp") {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown") {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft") {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight") {
        velocityX = 1;
        velocityY = 0;
    }

}
function rendomfood() {
    foodX = Math.floor(Math.random() * 20) + 1;
    foodY = Math.floor(Math.random() * 20) + 1;
}
function updatefoodposition() {
    if (foodX == snekX && foodY == snekY) {
        
        rendomfood();
        score++;
        highscore = score >= highscore ? score : highscore
        localStorage.setItem("highscore", highscore)
        scorebord.innerHTML = `Score: ${score}`;
        highscorebord.innerHTML = `High score: ${highscore}`;


    }
}
function handelgameover() {
    overeffect.play();
    clearInterval(setIntervalid);
    alert("Gameover")
    location.reload();
}
function game() {
    if (gameover) {
        return handelgameover();
    }
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    if (snekX === foodX && snekY === foodY) {
        updatefoodposition();
        snakebody.push([foodY, foodX]);
    }
    snekX += velocityX;
    snekY += velocityY
    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1];
    }
    snakebody[0] = [snekX, snekY];
    if (snekX <= 0 || snekX > 20 || snekY <= 0 || snekY > 20) {
        return gameover = true;
    }
    for (let i = 0; i < snakebody.length; i++) {

        html += `<div class="head" style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
        if (i !== 0 && snakebody[0][1] === snakebody[i][1] && snakebody[0][0] === snakebody[i][0]) {
            return gameover = true;
        }
        playbord.innerHTML = html;
    }
}
rendomfood()
setIntervalid = setInterval(game, 200);
document.addEventListener("keyup", movesnek);