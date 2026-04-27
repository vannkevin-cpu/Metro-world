const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const sprite = new Image();
sprite.src = "assets/player.png";

let frame = 0;
let direction = 0;
let x = canvas.width / 2 - 32;
let y = canvas.height / 2 - 32;
let speed = 4;

let holding = null;

function drawCity() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#2b2b2b";
  ctx.lineWidth = 2;

  for (let i = 0; i < canvas.width; i += 60) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }

  for (let j = 0; j < canvas.height; j += 60) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(canvas.width, j);
    ctx.stroke();
  }

  ctx.fillStyle = "#222";
  ctx.fillRect(40, 80, 90, 90);
  ctx.fillRect(canvas.width - 140, 120, 100, 130);
  ctx.fillRect(70, canvas.height - 220, 120, 100);

  ctx.fillStyle = "#ffd166";
  ctx.font = "20px Arial";
  ctx.fillText("METRO WORLD", 20, 35);
}

function drawPlayer() {
  if (!sprite.complete) return;

  const frameW = sprite.width / 4;
  const frameH = sprite.height / 4;

  ctx.drawImage(
    sprite,
    frame * frameW,
    direction * frameH,
    frameW,
    frameH,
    x,
    y,
    72,
    72
  );
}

function drawControls() {
  ctx.fillStyle = "rgba(255,255,255,.85)";
  ctx.fillRect(40, canvas.height - 130, 70, 70);
  ctx.fillRect(125, canvas.height - 130, 70, 70);
  ctx.fillRect(210, canvas.height - 130, 70, 70);
  ctx.fillRect(295, canvas.height - 130, 70, 70);

  ctx.fillStyle = "#000";
  ctx.font = "35px Arial";
  ctx.fillText("↑", 62, canvas.height - 82);
  ctx.fillText("←", 147, canvas.height - 82);
  ctx.fillText("↓", 232, canvas.height - 82);
  ctx.fillText("→", 317, canvas.height - 82);
}

function update() {
  if (holding === "up") {
    y -= speed;
    direction = 1;
  }
  if (holding === "down") {
    y += speed;
    direction = 0;
  }
  if (holding === "left") {
    x -= speed;
    direction = 2;
  }
  if (holding === "right") {
    x += speed;
    direction = 3;
  }

  if (holding) frame = (frame + 1) % 4;
}

canvas.addEventListener("touchstart", e => {
  const tx = e.touches[0].clientX;
  const ty = e.touches[0].clientY;

  if (ty > canvas.height - 150) {
    if (tx < 110) holding = "up";
    else if (tx < 195) holding = "left";
    else if (tx < 280) holding = "down";
    else holding = "right";
  }
});

canvas.addEventListener("touchend", () => {
  holding = null;
});

function loop() {
  update();
  drawCity();
  drawPlayer();
  drawControls();
  requestAnimationFrame(loop);
}

sprite.onload = () => {
  loop();
};

setTimeout(() => {
  if (!sprite.complete) {
    drawCity();
    drawControls();
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.fillText("Sprite not loaded. Check assets/player.png", 20, 70);
  }
}, 2000);
