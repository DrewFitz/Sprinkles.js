// program.js
// a simple driver for experimenting and testing Sprinkles
//
// Written by Drew Fitzpatrick
//

var canvas = document.getElementById("canvas");
var canvas2 = document.getElementById("canvas2");
var ctx = canvas.getContext("2d");
var ctx2 = canvas2.getContext("2d");

// Setup
var pm = new ParticleManager(ctx);
var pm2 = new ParticleManager(ctx2);
pm2.origin.x = 50;
pm2.origin.y = 50;
pm2.setGlobalAcceleration(.5, 0);
pm2.drawOrigin = true;
pm2.particleFill = "rgb(255,255,255)";


function clearContextWithFill(ctx, fill) {
  ctx.fillStyle = fill;
  ctx.fillRect(0,0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
}

function clearContext(ctx) {
  clearContextWithFill(ctx, "rgba(0,0,0,0.2)");
}

var pm2y = 0;
var t = 0;
var toRad = function toRad(num) {
  return (num * (Math.PI / 180));
};
// Main loop
function tick() {
  clearContext(ctx);
  pm.update();
  pm.render();

  // Make the second origin move
  t = t+4;
  t = t%360;
  pm2y = Math.sin(toRad(t));
  pm2y *= 70;
  pm2y += 120;
  pm2.origin.y = pm2y;

  clearContextWithFill(ctx2, "rgba(0,0,0,1)");
  pm2.update();
  pm2.render();
}

var interval, logInterval, toggleInterval;
function startAllTheThings() {
  // Set up run loop
  interval = setInterval(tick, 34); // ~= 30fps
  // Debug loop
  logInterval = setInterval(function() {
    console.log("Particles: " + pm.count());
  }, 1000);
  // Start/stop spray loop
  toggleInterval = setInterval(function() {
    if(pm.active) {
      pm.active = false;
      pm2.active = true;
    } else {
      pm.active = true;
      pm2.active = false;
    }
  }, 1000);
}

startAllTheThings();

function stopAllTheThings() {
  clearInterval(interval);
  clearInterval(toggleInterval);
  clearInterval(logInterval);
};

