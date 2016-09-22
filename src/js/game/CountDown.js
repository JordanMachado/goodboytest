import {
  START_GAME,
} from 'Messages';
import Mediator from 'Mediator';

export default class CountDown {
  constructor() {
    this.el = document.createElement('div');
    this.el.id = 'countdown';
    document.body.appendChild(this.el);
    this.text = [
      '3',
      '2',
      '1',
      'GO !',
    ];

    this.el.innerHTML = this.text[0];
    this.step = 1;
    TweenMax.set(this.el, { autoAlpha: 0 });
    Mediator.on(START_GAME, this.start.bind(this));
  }
  start() {
    // ugly I know
    TweenMax.set(this.el, { autoAlpha: 1 });

    setTimeout(() => {
      this.el.innerHTML = this.text[this.step];
      this.step += 1;
      TweenMax.to(this.el, 0.5, {
        scale: this.step,
        ease: Elastic.easeOut,
      });
      if (this.step < this.text.length) {
        this.start();
      } else {
        TweenMax.to(this.el, 0.5, {
          autoAlpha: 0,
          y: -400,
          ease: Expo.easeOut,
          delay:1
        });

      }
    }, 1000);
  }
}
