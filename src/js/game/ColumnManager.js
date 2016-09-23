import PIXI from 'pixi.js';

import {
  COLUMN_SPAWN_MIN,
  COLUMN_SPAWN_MAX,
} from 'Const';
import {
  COLUMN_SPAWN,
} from 'Messages';
import Mediator from 'Mediator';
import GLOBAL from 'Global';


import Pool from 'Pool';
import Column from './Column';

export default class ColumnManager {
  constructor({ container }) {
    this.container = container;

    this.columns = [];
    this.pool = new Pool({
      type: Column,
    });
  }

  spawn(direct = false) {

    if (GLOBAL.GAME.finished) return;
    const delay = Math.round(Math.random()
    * (COLUMN_SPAWN_MAX - COLUMN_SPAWN_MIN)) + COLUMN_SPAWN_MIN;
    setTimeout(() => {

      const column = this.pool.get();
      column.reset();
      column.position.x = GLOBAL.GAME.width;
      this.container.addChild(column);
      this.columns.push(column);
      this.spawn();
      Mediator.emit(COLUMN_SPAWN, { column });
    }, direct ? 0 : delay);

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
  reset() {
    for (let i = 0; i < this.columns.length; i += 1) {
      this.pool.release(this.columns[i]);
      this.container.removeChild(this.columns[i]);
      this.columns.splice(i, 1);
      i -= 1;
    }
  }
}
