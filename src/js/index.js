import gsap from 'gsap';
import deviceType from 'ua-device-type';

import {
  CLICK,
  KEYDOWN,
  RESIZE,
} from 'Messages';
import Mediator from 'Mediator';
import GLOBAL from 'Global';
import Game from './game/Game';

let game;
let device;

function resize() {
  Mediator.emit(RESIZE, { width: window.innerWidth, height: window.innerHeight });
}
function click() {
  Mediator.emit(CLICK);
}
function keyDown(e) {
  Mediator.emit(KEYDOWN, { keyCode: e.keyCode });
}

require('domready')(() => {
  device = deviceType(navigator.userAgent);
  GLOBAL.CLIENT.device = device;
  document.querySelector('html').classList.add(device);
  game = new Game();
  window.addEventListener('resize', resize);
  window.addEventListener(device === 'desktop' ? 'click' : 'touchend', click);
  window.addEventListener('keydown', keyDown);
  if (device !== 'desktop') window.addEventListener('orientationchange', resize);
});
