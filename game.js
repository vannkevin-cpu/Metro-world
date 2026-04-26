let playerX = 45;
let playerY = 40;

let playerHP = 100;
let enemyHP = 100;

function move(direction) {
    if (direction === "up") playerY -= 2;
    if (direction === "down") playerY += 2;
    if (direction === "left") playerX -= 2;
    if (direction === "right") playerX += 2;

    document.getElementById("player").style.top = playerY + "%";
    document.getElementById("player").style.left = playerX + "%";

    // Random encounter
    if (Math.random() < 0.2) {
        startBattle();
    }
}

function startBattle() {
    document.getElementById("battle").classList.remove("hidden");
    enemyHP = 100;
    playerHP = 100;
    updateHP();
}

function attack() {
    enemyHP -= Math.floor(Math.random() * 20);
    playerHP -= Math.floor(Math.random() * 15);

    updateHP();

    if (enemyHP <= 0) {
        alert("You won!");
        endBattle();
    } else if (playerHP <= 0) {
        alert("You lost!");
        endBattle();
    }
}

function run() {
    endBattle();
}

function endBattle() {
    document.getElementById("battle").classList.add("hidden");
}

function updateHP() {
    document.getElementById("enemyHP").innerText = enemyHP;
    document.getElementById("playerHP").innerText = playerHP;
}
