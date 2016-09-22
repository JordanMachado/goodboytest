import PIXI from 'pixi.js';

import {
  COLUMN_SPAWN_MIN,
  COLUMN_SPAWN_MAX,
} from 'Const';
import {
  COLUMN_SPAWN,
} from 'Messages';
import Mediator from 'Mediator';

import Pool from './Pool.js';
import Column from './Column';

export default class ColumnManager {
  constructor({ container, renderer }) {
    this.container = container;
    this.renderer = renderer;

    this.columns = [];
    this.pool = new Pool({
      type: Column,
    });
    this.create();
  }
  create() {
    const rand = Math.round(Math.random() * (COLUMN_SPAWN_MAX - COLUMN_SPAWN_MIN)) + COLUMN_SPAWN_MIN;
    setTimeout(() => {
      const column = this.pool.get();
      column.reset();
      column.position.x = this.renderer.width;
      this.container.addChild(column);
      this.columns.push(column);
      this.create();
      Mediator.emit(COLUMN_SPAWN, { column });
    }, rand);

  }
  update() {
    for (let i = 0; i < this.columns.length; i += 1) {
      this.columns[i].update();
      if (this.columns[i].position.x < -this.columns[i].width) {
        this.pool.release(this.columns[i]);
        this.container.removeChild(this.columns[i]);
        this.columns.splice(i, 1);
        i -= 1;
      }
    }
  }
}
