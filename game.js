const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const sprite = new Image();
sprite.src = "assets/player.png";

let frame = 0;
let direction = 0;
let x = 140;
let y = 220;
let speed = 4;
let holding = null;
let tick = 0;

function drawCity() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#2f2f2f";
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

  ctx.fillStyle = "#ffd166";
  ctx.font = "22px Arial";
  ctx.fillText("METRO WORLD", 20, 40);

  ctx.fillStyle = "#333";
  ctx.fillRect(40, 90, 90, 90);
  ctx.fillRect(canvas.width - 150, 120, 110, 140);
  ctx.fillRect(80, canvas.height - 260, 120, 100);
}

function drawPlayer() {
  if (sprite.complete && sprite.naturalWidth > 0) {
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
      76,
      76
    );
  } else {
    ctx.fillStyle = "#00aaff";
    ctx.fillRect(x, y, 50, 50);
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Sprite missing", 20, 75);
  }
}

function drawControls() {
  const bottom = canvas.height - 130;

  ctx.fillStyle = "rgba(255,255,255,.9)";
  ctx.fillRect(40, bottom, 70, 70);
  ctx.fillRect(125, bottom, 70, 70);
  ctx.fillRect(210, bottom, 70, 70);
  ctx.fillRect(295, bottom, 70, 70);

  ctx.fillStyle = "#000";
  ctx.font = "35px Arial";
  ctx.fillText("↑", 62, bottom + 48);
  ctx.fillText("←", 147, bottom + 48);
  ctx.fillText("↓", 232, bottom + 48);
  ctx.fillText("→", 317, bottom + 48);
}

function update() {
  let moving = false;

  if (holding === "up") {
    y -= speed;
    direction = 1;
    moving = true;
  }
  if (holding === "down") {
    y += speed;
    direction = 0;
    moving = true;
  }
  if (holding === "left") {
    x -= speed;
    direction = 2;
    moving = true;
  }
  if (holding === "right") {
    x += speed;
    direction = 3;
    moving = true;
  }

  x = Math.max(0, Math.min(canvas.width - 76, x));
  y = Math.max(50, Math.min(canvas.height - 180, y));

  tick++;
  if (moving && tick % 8 === 0) {
    frame = (frame + 1) % 4;
  }
}

canvas.addEventListener("touchstart", e => {
  e.preventDefault();

  const tx = e.touches[0].clientX;
  const ty = e.touches[0].clientY;
  const bottom = canvas.height - 150;

  if (ty > bottom) {
    if (tx < 110) holding = "up";
    else if (tx < 195) holding = "left";
    else if (tx < 280) holding = "down";
    else holding = "right";
  }
}, { passive: false });

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

loop();
