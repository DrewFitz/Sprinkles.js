// Particle system
// 
// Just a little particle system written in javascript for fun
//
//

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function Particle() { 
  this.x; 
  this.y;
  this.width = 20;
  this.height = 20;
  this.vX = (Math.random() * 10) - 5;
  this.vY = (Math.random() * 10) - 5;
  this.isOutOfBounds = function() {
    if (this.x > canvas.clientWidth) 
      return true;
    else if (this.x < 0)
      return true;
    else if (this.y > canvas.clientHeight)
      return true;
    else if (this.y < 0)
      return true;

    return false;
  };
}

function ParticleManager() {
  var particles = [];
  var globalXAcc = 0;
  var globalYAcc = -2;

  this.origin = {
    x: canvas.clientWidth / 2,
    y: canvas.clientHeight / 2
  };
  this.active = true;

  this.count = function() {
    return particles.length;
  };
  this.update = function() {
    if (this.active) {
      var newParticle = new Particle();
      newParticle.x = this.origin.x;
      newParticle.y = this.origin.y;
      particles.push(newParticle);
    }
    particles.forEach(function(particle, index, particles) {
      particle.vX += globalXAcc;
      particle.vY += globalYAcc;
      particle.x += particle.vX;
      particle.y += particle.vY;
      if(particle.isOutOfBounds()){
        particles.splice(index, 1);
      }
    });
  };
  this.render = function() {
    ctx.fillStyle = "rgb(200,0,0)";
    particles.forEach(function(particle) {
      ctx.fillRect(particle.x, particle.y, particle.width, particle.height);
    });
  };
}

function clear() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0,0, canvas.clientWidth, canvas.clientHeight);
}


var pm = new ParticleManager();

function tick() {
  clear();
  pm.update();
  pm.render();
}

var interval = setInterval(tick, 20);
var logInterval = setInterval(function() {
  console.log("Particles: " + pm.count());
}, 1000);
var toggleInterval = setInterval(function() {
  if(pm.active) {
    pm.active = false;
  } else {
    pm.active = true;
  }
}, 1000);

setTimeout(function(){
  clearInterval(interval);
  clearInterval(toggleInterval);
  clearInterval(logInterval);
}, 100000);

