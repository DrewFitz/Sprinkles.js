// Sprinkles.js
// A canvas particle system
// 
// Written by Drew Fitzpatrick
//
//
//TODO:
// - Cache particles
// - Animate particles over time
// - Configurable particles
// - 

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function Particle() { 
  this.x; 
  this.y;
  this.width = 20;
  this.height = 20;
  this.vX = (Math.random() * 10) - 5;
  this.vY = (Math.random() * 10) - 5;
  this.isVisible = function() {
    if (this.x > canvas.clientWidth) 
      return false;
    else if (this.x < 0)
      return false;
    else if (this.y > canvas.clientHeight)
      return false;
    else if (this.y < 0)
      return false;

    return true;
  };
  this.fill = "";
  this.draw = function() {
    if (this.fill !== "") {
      ctx.fillStyle = this.fill;
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function ParticleManager() {
  if (!(this instanceof ParticleManager)) {
    return new ParticleManager();
  }
  var particles = [];
  var globalXAcc = 0;
  var globalYAcc = -2;

  this.setGlobalAcceleration = function(x,y){
    globalXAcc = x;
    globalYAcc = y;
  }
  this.origin = {
    x: canvas.clientWidth / 2,
    y: canvas.clientHeight / 2
  };
  this.active = true;
  this.drawOrigin = false;
  this.particleFill = "";

  this.count = function() {
    return particles.length;
  };
  this.update = function() {
    if (this.active) {
      var newParticle = new Particle();
      newParticle.x = this.origin.x;
      newParticle.y = this.origin.y;
      newParticle.fill = this.particleFill;
      particles.push(newParticle);
    }
    particles.forEach(function(particle, index, particles) {
      particle.vX += globalXAcc;
      particle.vY += globalYAcc;
      particle.x += particle.vX;
      particle.y += particle.vY;
      if(!(particle.isVisible())){
        particles.splice(index, 1);
      }
    });
  };
  function drawCross(x,y) {
    ctx.fillStyle = "";
    ctx.strokeStyle = "rgb(0,0,200)";
    ctx.beginPath();
    ctx.moveTo(x - 5, y);
    ctx.lineTo(x + 5, y);
    ctx.moveTo(x, y - 5);
    ctx.lineTo(x, y + 5);
    ctx.closePath();
    ctx.stroke();
  };
  this.render = function() {
    ctx.fillStyle = "rgb(200,0,0)";
    particles.forEach(function(particle) {
      particle.draw();
    });
    if(this.drawOrigin)
      drawCross(this.origin.x, this.origin.y);
  };
}
