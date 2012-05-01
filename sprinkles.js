// Sprinkles.js
// A canvas particle system
// 
// Written by Drew Fitzpatrick
//
//
// TODO:
// - Cache particles
// - Animate particles over time
// - Configurable particles
// -- 

function Particle() { 
  this.init = function() {
    this.x = 0; 
    this.y = 0;
    this.width = 20;
    this.height = 20;
    this.vX = (Math.random() * 10) - 5;
    this.vY = (Math.random() * 10) - 5;
    this.fill = "";
  };

  // Methods
  this.isVisible = function(ctx) {
    if (this.x > ctx.canvas.clientWidth) 
      return false;
    else if (this.x < 0)
      return false;
    else if (this.y > ctx.canvas.clientHeight)
      return false;
    else if (this.y < 0)
      return false;

    return true;
  };

  this.draw = function(ctx) {
    if (this.fill !== "") {
      ctx.fillStyle = this.fill;
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  this.init();
  return this;
}

function ParticleManager(ctx) {
  if (!(this instanceof ParticleManager)) {
    return new ParticleManager(ctx);
  }

  // private
  var particleCache = [];
  var graphicsContext = ctx;
  var activeParticles = [];
  var globalXAcc = 0;
  var globalYAcc = -2;
  function drawCross(x,y) {
    graphicsContext.fillStyle = "";
    graphicsContext.strokeStyle = "rgb(0,0,200)";
    graphicsContext.beginPath();
    graphicsContext.moveTo(x - 5, y);
    graphicsContext.lineTo(x + 5, y);
    graphicsContext.moveTo(x, y - 5);
    graphicsContext.lineTo(x, y + 5);
    graphicsContext.closePath();
    graphicsContext.stroke();
  };

  // public accessors and methods
  this.active = true;
  this.drawOrigin = false;
  this.particleFill = "";
  this.useRelativeCooridateSpace = false;

  this.setGlobalAcceleration = function(x,y){
    globalXAcc = x;
    globalYAcc = y;
  };

  this.origin = {
    x: graphicsContext.canvas.clientWidth / 2,
    y: graphicsContext.canvas.clientHeight / 2
  };

  this.count = function() {
    return activeParticles.length;
  };
  
  this.update = function() {
    if (this.active) {
      var newParticle; 
      if (particleCache.length > 0) {
        newParticle = particleCache.pop();
      } else {
        newParticle = new Particle();
      }
      newParticle.init();
      newParticle.x = this.origin.x;
      newParticle.y = this.origin.y;
      newParticle.fill = this.particleFill;
      activeParticles.push(newParticle);
    }
    activeParticles.forEach(function(particle, index, particles) {
      particle.vX += globalXAcc;
      particle.vY += globalYAcc;
      particle.x += particle.vX;
      particle.y += particle.vY;
      if(!(particle.isVisible(graphicsContext))){
        particleCache.push(particle);
        particles.splice(index, 1);
      }
    }, this);
  };
  this.render = function() {
    graphicsContext.fillStyle = "rgb(200,0,0)";
    activeParticles.forEach(function(particle) {
      particle.draw(graphicsContext);
    });
    if(this.drawOrigin)
      drawCross(this.origin.x, this.origin.y);
  };
}
