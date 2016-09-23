import GLOBAL from 'Global';
import {
  PIXI_BOY_DIED,
  ACTIVE_BONUS,
} from 'Messages';
import Mediator from 'Mediator';


export default class CollisionManager {
  constructor({ player, columns, bonus }) {
    this.player = player;
    this.columns = columns;
    this.bonus = bonus;

  }
  update() {
    if (GLOBAL.GAME.finished) return;
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
    for (let i = 0; i < this.bonus.length; i+= 1) {
      const xdist = p.position.x - this.bonus[i].position.x;
      if (xdist > -(this.bonus[i].width / 2) && (xdist < this.bonus[i].width / 2) && !this.bonus[i].active) {
        this.bonus[i].active = true;
        this.bonus[i].hit();
        Mediator.emit(ACTIVE_BONUS, { type: this.bonus[i].type });
      }
    }

    if (this.player.position.y > GLOBAL.GAME.height) {
      Mediator.emit(PIXI_BOY_DIED);
    }
  }
}
