// inspiration http://www.goodboydigital.com/runpixierun/
// http://www.rocketshipgames.com/blogs/tjkopena/2015/09/basic-scaling-animation-and-parallax-in-pixi-js-v3/
import gsap from 'gsap';

import {
  CLICK,
  KEYDOWN,
  RESIZE,
} from 'Messages';
import Mediator from 'Mediator';
import Game from './game/Game';

const domify = require('domify');

let game;

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
  game = new Game();
});

window.addEventListener('resize', resize);
window.addEventListener('click', click);
window.addEventListener('keydown', keyDown);
