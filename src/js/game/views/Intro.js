import StartButton from './StartButton';
import CountDown from './CountDown';

export default class Intro {
  constructor({ container, renderer }) {
    this.container = container;
    this.renderer = renderer;

    this.startButton = new StartButton({
      container,
      renderer,
    });
    this.container.addChild(this.startButton);
    this.countDown = new CountDown();
  }
}
