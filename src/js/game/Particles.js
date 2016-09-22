import PIXI from 'pixi.js';
import particles from 'pixi-particles';
import {
  PIXIBOY_JUMP,
} from 'Messages';
import Mediator from 'Mediator';

export default class Particles {
  constructor({ container, texture }) {
    console.log('particles');
    Mediator.on(PIXIBOY_JUMP, ({ position }) => {
      this.emit(position);

    });
    this.emitterContainer = new PIXI.Container();
    container.addChild(this.emitterContainer);
    this.emitterContainer.position.x = 100;
    this.emitterContainer.position.y = 100;
    this.emitter = new PIXI.particles.Emitter(
      this.emitterContainer,
      [texture],
      {
        alpha: {
          start: 0.8,
          end: 0.1,
        },
        startRotation: {
          min: 0,
          max: 360,
        },
        scale: {
          start: 1,
          end: 0.1,
        },
        color: {
          start: 'ffffff',
          end: 'E3E3E3',
        },
        speed: {
          start: 100,
          end: 10,
        },
        lifetime: {
          min: 0.5,
          max: 0.5,
        },
        frequency: 0.008,
        emitterLifetime: 0.2,
        maxParticles: 300,
        pos: {
          x: 0,
          y: 0,
        },
      }
    );
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

  }
}
