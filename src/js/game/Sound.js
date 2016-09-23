import createPlayer from 'web-audio-player';
import createAnalyser from 'web-audio-analyser';
import GLOBAL from 'Global';
import {
  COUNDOWN_START,
  GAME_OVER,
} from 'Messages';
import Mediator from 'Mediator';

export default class Sound {
  constructor() {
    this.audio = createPlayer('assets/sound/audio.mp3', {
      buffer: GLOBAL.CLIENT.device !== 'desktop',
    });
    this.analyser = createAnalyser(this.audio.node, this.audio.context, {
      stereo: false,
    });
    Mediator.on(COUNDOWN_START, () => {
      this.audio.play();
      TweenMax.to(this.audio, 0.5, {
        volume: 1,
      });
    });
    window.sound = this;
    Mediator.on(GAME_OVER, this.end.bind(this));
  }
  update() {
    const freq = this.analyser.frequencies();
    let volume = 0;
    for (let i = 0; i < freq.length; i += 1) {

      volume += freq[i] / 256.0;
    }
    this.volume = volume / freq.length;
    GLOBAL.SOUND.volume = this.volume;

  }
  end() {
    TweenMax.to(this.audio, 2, {
      volume: 0,
      onComplete: () => {
        this.audio.pause();
        this.audio.element.currentTime = 0;
      },
    });
  }
}
