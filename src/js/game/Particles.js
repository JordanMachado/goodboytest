import PIXI from 'pixi.js';
import particles from 'pixi-particles';

export default class Particles {
  constructor({ container, texture}) {
    console.log('particles');
    this.emitter = new PIXI.particles.Emitter(
    container,
    [texture],
    {
        alpha: {
            start: 0.8,
            end: 0.1
        },
        scale: {
            start: 1,
            end: 0.3
        },
        color: {
            start: "fb1010",
            end: "f5b830"
        },
        speed: {
            start: 200,
            end: 100
        },
        startRotation: {
            min: 0,
            max: 360
        },
        rotationSpeed: {
            min: 0,
            max: 0
        },
        lifetime: {
            min: 0.5,
            max: 0.5
        },
        frequency: 0.008,
        emitterLifetime: 31,
        maxParticles: 1000,
        pos: {
            x: 0,
            y: 0
        },
        addAtBack: false,
        spawnType: "circle",
        spawnCircle: {
            x: 0,
            y: 0,
            r: 10
        }
    }
);
  this.emitter.emit = true;
  this.elapsed = Date.now();
  }
  update() {
    var now = Date.now();
    this.emitter.update((now - this.elapsed) * 0.001);
    this.elapsed = now;
  }
}
