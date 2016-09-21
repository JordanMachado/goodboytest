import {
  UPDATE_SCORE,
} from 'Messages';
import Mediator from 'Mediator';

export default class Score {
  constructor() {
    this.el = document.createElement('div');
    this.el.innerHTML = 'score:0';
    document.body.appendChild(this.el);
    this.pts = 0;
    Mediator.on(UPDATE_SCORE, () => {
      this.update();
    });
  }
  update() {
    this.pts += 1;
    console.log(`score: ${this.pts}`);
  }
}
