import GLOBAL from 'Global';
import {
  PIXI_BOY_DIED,
} from 'Messages';
import Mediator from 'Mediator';

export default class CollisionManager {
  constructor({ player, columns, bonus, renderer }) {
    this.player = player;
    this.columns = columns;

  }
  update() {
    // console.log(this.columns.length);
    const p = this.player;
    const cls = this.columns;

    for (let i = 0; i < cls.length; i += 1) {
      const ct = cls[i].children[0];
      const cb = cls[i].children[1];

      const xdist = p.position.x - cls[i].position.x;
      if (xdist > -(cls[i].width / 2) && (xdist < cls[i].width / 2)) {
        if (p.position.y - (p.width / 2) < ct.position.y + ct.height
            || p.position.y + (p.height / 2) > cb.position.y) {
          Mediator.emit(PIXI_BOY_DIED);
        }
      }
    }

    if (this.player.position.y > GLOBAL.height) {
      Mediator.emit(PIXI_BOY_DIED);
    }


  }
}
