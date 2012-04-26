// program.js
// a simple driver for experimenting and testing Sprinkles
//
// Written by Drew Fitzpatrick
//

var canvas = document.getElementById("canvas");
var canvas2 = document.getElementById("canvas2");
var ctx = canvas.getContext("2d");
var ctx2 = canvas2.getContext("2d");

function clear(ctx) {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0,0, canvas.clientWidth, canvas.clientHeight);
}

//
//
// Here's where we start everything
// 
//

var pm = new ParticleManager(ctx);
var pm2 = new ParticleManager(ctx2);

pm2.origin.x = 50;
pm2.origin.y = 50;
pm2.setGlobalAcceleration(2, 1);
pm2.drawOrigin = true;
pm2.particleFill = "rgb(255,255,255)";

function tick() {
  clear(ctx);
  pm.update();
  pm.render();

  clear(ctx2);
  pm2.update();
  pm2.render();
}

// Set up run loop
var interval = setInterval(tick, 20);
// Debug loop
var logInterval = setInterval(function() {
  console.log("Particles: " + pm.count());
}, 1000);
// Start/stop spray loop
var toggleInterval = setInterval(function() {
  if(pm.active) {
    pm.active = false;
    pm2.active = true;
  } else {
    pm.active = true;
    pm2.active = false;
  }
}, 1000);

// stop everything after 100 seconds
// (In case I forget and just leave it running in the background)
setTimeout(function(){
  clearInterval(interval);
  clearInterval(toggleInterval);
  clearInterval(logInterval);
}, 100000);

