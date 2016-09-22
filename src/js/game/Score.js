import {
  UPDATE_SCORE,
} from 'Messages';
import Mediator from 'Mediator';

export default class Score {
  constructor({ player, columns }) {
    this.player = player;
    this.columns = columns;

    this.el = document.createElement('div');
    this.el.innerHTML = 'Score: 0';
    this.el.id = 'score';
    document.body.appendChild(this.el);
    this.pts = 0;
    Mediator.on(UPDATE_SCORE, () => {
      this.update();
    });
    TweenMax.set(this.el, {
      autoAlpha: 0,
      scale: 0,
    });
    TweenMax.to(this.el, 1.3, {
      autoAlpha: 1,
      scale: 1,
      ease: Elastic.easeInOut,
      delay: 3
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
    this.el.innerHTML = `Score: ${this.pts}`;
  }
}
