import {
  CLICK_START,
  START_GAME,
  COUNDOWN_START,
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
    Mediator.on(CLICK_START, this.start.bind(this));
  }
  reset() {
    this.step = 1;
    this.el.innerHTML = this.text[0];
    TweenMax.set(this.el, { autoAlpha: 0, y: 0 });


  }
  start() {

    // ugly I know
    if (this.step === 1) {
      Mediator.emit(COUNDOWN_START);
      TweenMax.set(this.el, { autoAlpha: 1, scale: 0.5 });
      TweenMax.to(this.el, 0.5, {
        scale: 1,
        ease: Elastic.easeOut,
      });
    }

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
          delay: 1,
          onComplete: () => {
            Mediator.emit(START_GAME);
          },
        });

      }
    }, 1000);
  }
}
