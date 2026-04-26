const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: 100,
  y: 100,
  size: 32,
  speed: 3
};

// Load sprite
const playerImg = new Image();
playerImg.src = "assets/player.png";

// Movement
let keys = {};

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

// Touch controls
window.addEventListener("touchstart", e => {
  let x = e.touches[0].clientX;
  if (x < window.innerWidth / 2) keys["ArrowLeft"] = true;
  else keys["ArrowRight"] = true;
});

window.addEventListener("touchend", () => {
  keys = {};
});

// Game loop
function update(){
  if(keys["ArrowUp"]) player.y -= player.speed;
  if(keys["ArrowDown"]) player.y += player.speed;
  if(keys["ArrowLeft"]) player.x -= player.speed;
  if(keys["ArrowRight"]) player.x += player.speed;

  // Random encounter
  if(Math.random() < 0.005){
    alert("Wild Beast Encounter!");
  }
}

function draw(){
  ctx.fillStyle = "#111";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // Draw player
  ctx.drawImage(playerImg, player.x, player.y, player.size, player.size);
}

function loop(){
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
