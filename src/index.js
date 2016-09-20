import gsap from 'gsap';
import Game from './Game';

const domify = require('domify');
function click() {
  console.log('click');
  if (window.pixiboy) window.pixiboy.onClick()
}
require('domready')(() => {
  console.log('yo');
  new Game();
});

 window.addEventListener('click', click);
