// inspiration http://www.goodboydigital.com/runpixierun/
// http://www.rocketshipgames.com/blogs/tjkopena/2015/09/basic-scaling-animation-and-parallax-in-pixi-js-v3/
// particles lava https://pixijs.github.io/pixi-particles/examples/bubblesVertical.html
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

const domify = require('domify');

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
