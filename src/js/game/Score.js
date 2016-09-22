import {
  UPDATE_SCORE,
} from 'Messages';
import Mediator from 'Mediator';

export default class Score {
  constructor({ player, columns }) {
    this.player = player;
    this.columns = columns;

    this.el = document.createElement('div');
    this.el.innerHTML = 'score: 0';
    document.body.appendChild(this.el);
    this.pts = 0;
    Mediator.on(UPDATE_SCORE, () => {
      this.update();
    });
  }
  check() {
    for (let i = 0; i < this.columns.length; i += 1) {
      if (this.columns[i].position.x + (this.columns[i].width / 2) < this.player.position.x
        && !this.columns[i].passed) {
        this.columns[i].passed = true;
        this.update();
      }
    }
  }
  update() {
    this.pts += 1;
    this.el.innerHTML = `score: ${this.pts}`;
  }
}
