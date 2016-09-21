import PIXI from 'pixi.js';


import {
  FLOWER_SPAWN_MIN,
  FLOWER_SPAWN_MAX,
} from 'Const';

import Pool from './Pool.js';
import Flower from './Flower';


export default class FlowerManager {
  constructor({ container, renderer }) {
    this.container = container;
    this.renderer = renderer;

    this.flowers = [];
    this.pool = new Pool({
      type: Flower,
    });

    const textures = PIXI.loader.resources['assets/WorldAssets.json'].textures;
    this.textures = [
      textures['01_hanging_flower1.png'],
      textures['01_hanging_flower2.png'],
      textures['01_hanging_flower3.png'],
    ];

    this.start();
    this.spawn();
  }
  start() {
    for (let i = 0; i < 10; i += 1) {
      const flower = this.pool.get();
      flower.texture = this.textures[Math.floor(Math.random() * this.textures.length)];
      flower.position.y = -Math.random() * flower.height;
      flower.position.x = this.renderer.width * Math.random();
      this.container.addChild(flower);
      this.flowers.push(flower);
    }
  }
  spawn() {
    const rand = Math.round(Math.random() * (FLOWER_SPAWN_MAX - FLOWER_SPAWN_MIN)) + FLOWER_SPAWN_MIN;
    setTimeout(() => {
      const flower = this.pool.get();
      flower.texture = this.textures[Math.floor(Math.random() * this.textures.length)];
      flower.position.y = -Math.random() * flower.height;
      flower.position.x = this.renderer.width;
      this.container.addChild(flower);
      this.flowers.push(flower);
      this.spawn();
    }, rand);

  }
  update() {
    for (let i = 0; i < this.flowers.length; i += 1) {
      this.flowers[i].update();
      if (this.flowers[i].position.x < -this.flowers[i].width) {
        this.pool.release(this.flowers[i]);
        this.container.removeChild(this.flowers[i]);
        this.flowers.splice(i, 1);
        i -= 1;
      }
    }
  }
}
