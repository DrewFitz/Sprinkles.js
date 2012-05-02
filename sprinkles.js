// Sprinkles.js
// A canvas particle system
// 
// Written by Drew Fitzpatrick
//
//
// TODO:
// - Animate particles over time
// - Configurable particles
// -- 

function Particle() { 
  // Guard against forgotten new
  if (!(this instanceof Particle)) {
    return new Particle();
  }

  this.copyFromParticle = function(particle) {
    this.width = particle.width;
    this.height = particle.height;
    this.fill = particle.fill;
  }

  this.reset = function() {
    this.x = 0; 
    this.y = 0;
    this.width = 20;
    this.height = 20;
    this.vX = (Math.random() * 10) - 5;
    this.vY = (Math.random() * 10) - 5;
    this.fill = "rgb(255,255,255)";

    return this;
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
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  this.reset();
  return this;
}

function ParticleManager(ctx) {
  // Guard against missing new statements
  if (!(this instanceof ParticleManager)) {
    return new ParticleManager(ctx);
  }

  // private
  var cachedParticles = [];
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
  this.count = function() {
    return activeParticles.length;
  };
  this.cacheCount = function() {
    return cachedParticles.length;
  };

  // public accessors and methods
  this.masterParticle;
  this.active = true;
  this.drawOrigin = false;
  this.particleFill = "";
  this.useRelativeCooridateSpace = false;
  this.origin = {
    x: graphicsContext.canvas.clientWidth / 2,
    y: graphicsContext.canvas.clientHeight / 2
  };

  this.setGlobalAcceleration = function(x,y){
    globalXAcc = x;
    globalYAcc = y;
  };
  this.update = function() {
    if (this.active) {
      var newParticle; 
      if (cachedParticles.length > 0) {
        newParticle = cachedParticles.pop();
      } else {
        newParticle = new Particle();
      }
      newParticle.reset();
      if (this.masterParticle) {
        newParticle.copyFromParticle(this.masterParticle);
      } else if (this.particleFill) {
        newParticle.fill = this.particleFill;
      }
      newParticle.x = this.origin.x;
      newParticle.y = this.origin.y;
      activeParticles.push(newParticle);
    }
    activeParticles.forEach(function(particle, index, particles) {
      particle.vX += globalXAcc;
      particle.vY += globalYAcc;
      particle.x += particle.vX;
      particle.y += particle.vY;
      if(!(particle.isVisible(graphicsContext))){
        cachedParticles.push(particle);
        particles.splice(index, 1);
      }
    }, this);
  };
  this.render = function() {
    activeParticles.forEach(function(particle) {
      particle.draw(graphicsContext);
    });
    if(this.drawOrigin)
      drawCross(this.origin.x, this.origin.y);
  };
}
