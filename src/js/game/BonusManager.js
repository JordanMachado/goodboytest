import PIXI from 'pixi.js';


import {
  FLOWER_SPAWN_MIN,
  FLOWER_SPAWN_MAX,
  COLUMN_SPACE,
} from 'Const';

import {
  COLUMN_SPAWN,
} from 'Messages';
import Mediator from 'Mediator';

import Pool from './Pool.js';
import Bonus from './Bonus';


export default class BonusManager {
  constructor({ container, renderer }) {
    this.container = container;
    this.renderer = renderer;

    this.bonus = [];
    this.pool = new Pool({
      type: Bonus,
    });

    const textures = PIXI.loader.resources['assets/WorldAssets.json'].textures;
    this.textures = [
      textures['pickup_01.png'],
      textures['pickup_02.png'],
      textures['pickup_03.png'],
      textures['pickup_04.png'],
      textures['pickup_05.png'],
      textures['pickup_06.png'],
      textures['pickup_07.png'],
      textures['pickup_08.png'],
    ];
    Mediator.on(COLUMN_SPAWN, ({ column }) => {
      this.spawn(column);
    });
  }
  spawn(column) {
    console.log(column.bottom.position.y);
    const bonus = this.pool.get();
    const id = Math.floor(Math.random() * this.textures.length);
    bonus.set({
      type: id,
      texture: this.textures[id],
      position: {
        x: column.x + (column.width / 2),
        y: column.bottom.position.y - (COLUMN_SPACE / 2),
      },
    });
    this.container.addChild(bonus);
    this.bonus.push(bonus);
  }
  update() {
    for (let i = 0; i < this.bonus.length; i += 1) {
      this.bonus[i].update();
      if (this.bonus[i].position.x < -this.bonus[i].width - 50) {
        this.pool.release(this.bonus[i]);
        this.container.removeChild(this.bonus[i]);
        this.bonus.splice(i, 1);
        i -= 1;
      }
    }
  }
}
