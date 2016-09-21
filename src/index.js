// inspiration http://www.goodboydigital.com/runpixierun/
// http://www.rocketshipgames.com/blogs/tjkopena/2015/09/basic-scaling-animation-and-parallax-in-pixi-js-v3/
import gsap from 'gsap';
import Game from './Game';

const domify = require('domify');

let game;
function click() {
  if (window.pixiboy) window.pixiboy.onClick();
}

function resize() {
  if (game) game.resize(window.innerWidth, window.innerHeight);
}
require('domready')(() => {
  game = new Game();
});

window.addEventListener('resize', resize);
window.addEventListener('click', click);
