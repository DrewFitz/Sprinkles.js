# Sprinkles.js

## A canvas particle system. Why? Because.

### ParticleManager
Manages a list of particles, updates them, draws them to a 2D canvas context.

Example initialization:

    var ctx = document.querySelector("canvas").getContext("2d");
    var particleManager = new ParticleManager(ctx);

- ctx is the 2D canvas context in which the ParticleManager will draw.

#### Debug methods
- particleManager.count(); // Returns the number of active particles
- particleManager.cacheCount(); // Returns the number of cached (inactive) particles

#### Attributes
- masterParticle // A Particle object that the ParticleManager will base all future particles on
- active // Boolean controlling whether or not the ParticleManager will emit new particles
- drawOrigin // Boolean controlling whether or not the origin point of the PM will be drawn
- particleFill // Color definition of the particle fill
- useRelativeCoordinateSpace // (not implemented yet) Boolean controlling whether the PM draws particles relative to its origin
- origin // .x and .y are the coordinates for the PM's origin point, where all particles are first spawned

#### Methods
- setGlobalAcceleration(x, y) // Sets the x and y components of an acceleration vector applied to all particles
- update // Call to tell the PM to update the positions of the particles
- render // Call to tell the PM to draw the particles


### Particle
Not normally used directly, except to make a master particle for a Particle Manager.

Example initialization:

    var particle = new Particle();

#### Attributes
- x // The x coordinate of the particle
- y // The y coordinate of the particle
- width // Width of the particle box
- height // Height of the particle box
- vX // The x component of the particle's velocity vector
- vY // The y component of the particle's velocity vector 
- fill // The fill color string for the particle

#### Methods
- reset // Resets all attributes of the particle
- isVisible(ctx) // Returns a Boolean signifying whether the particle is within the coordinate system of 2D context ctx
- draw(ctx) // Draws the particle into 2D context ctx