import PIXI from 'pixi.js';
import particles from 'pixi-particles';
import {
  PIXIBOY_JUMP,
} from 'Messages';
import Mediator from 'Mediator';
import GLOBAL from 'Global';


export default class Particles {
  constructor({ container, texture }) {

    this.emitterContainer = new PIXI.Container();
    container.addChild(this.emitterContainer);
    this.emitterContainer.position.y = 100;
    this.emitter = new PIXI.particles.Emitter(
      this.emitterContainer,
      [texture],
      {
        alpha: {
          start: 1,
          end: 0.1,
        },
        startRotation: {
          min: 260,
          max: 280,
        },
        rotationSpeed: {
          min: 0,
          max: 50,
        },
        scale: {
          start: 0.6,
          end: 0.1,
        },
        color: {
          start: 'ff3600',
          end: 'ffff00',
        },
        speed: {
          start: 100,
          end: 10,
        },
        lifetime: {
          min: 1.5,
          max: 2.5,
        },
        frequency: 0.008,
        emitterLifetime: 200000,
        maxParticles: 500,
        pos: {
          x: 0,
          y: 0,
        },
        spawnType: 'rect',
        spawnRect: {
          x: 0,
          y: 250,
          w: 900,
          h: 0,
        },
      }
    );
    // this.emitter.emit = false;
    window.part = this;
    this.elapsed = Date.now();
  }
  emit(position) {
    this.emitter.emit = true;
    this.emitterContainer.position.x = position.x - 10;
    this.emitterContainer.position.y = position.y;
  }
  update() {
    const now = Date.now();
    this.emitter.update((now - this.elapsed) * 0.001);
    this.elapsed = now;
    this.emitter.endSpeed = GLOBAL.SOUND.volume * 100;
    // this.emitterContainer.position.y = 100 + GLOBAL.SOUND.volume * 20;
    // this.scale.y += GLOBAL.SOUND.volume * 0.1;


  }
}
