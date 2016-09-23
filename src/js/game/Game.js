import PIXI from 'pixi.js';
import raf from 'raf';

import {
  RESIZE,
  START_GAME,
  SOUND_LOADED,
  PIXI_BOY_DIED,
  GAME_OVER,
  CLICK,
} from 'Messages';
import {
  GAME_PAUSE_SPEED,
  GAME_START_SPEED,
} from 'Const';
import GLOBAL from 'Global';
import Mediator from 'Mediator';

import Intro from './views/Intro';
import GameOver from './views/GameOver';
import Score from './Score';
import Particles from './Particles';
import LayerManager from './LayerManager';
import PixiBoy from './PixiBoy';
import CollisionManager from './CollisionManager';
import Effects from './effects/Effects';
import Sound from './Sound';

export default class Game {
  constructor() {

    this.stage = new PIXI.Container();
    this.renderer = new PIXI.autoDetectRenderer(GLOBAL.GAME.width, GLOBAL.GAME.height, {
      antialiasing: true,
    });
    this.resize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.view);
    window.game = this;
    this.events();
    this.createContainers();
    this.createAudio();
    this.load();
  }
  load() {
    PIXI.loader
    .add('assets/images/WorldAssets.json')
    .add('assets/images/flyingPixie.png')
    .add('assets/images/flyingJojo.png')
    .add('assets/images/playButton.png')
    .add('assets/images/column.png')
    .add('assets/images/particle.png')
    .add('assets/images/displace.jpg')
    .load(this.setup.bind(this));
    if (GLOBAL.CLIENT.device !== 'desktop') {
      this.sound.audio.on('load', () => {
        Mediator.emit(SOUND_LOADED);
      });
    }

  }
  events() {
    Mediator.on(RESIZE, ({ width, height }) => {
      this.resize(width, height);
    });
    Mediator.on(CLICK, () => {
      if (GLOBAL.GAME.finished) this.restart();
    });
    Mediator.on(START_GAME, this.start.bind(this));
    Mediator.on(PIXI_BOY_DIED, () => {
      Mediator.emit(GAME_OVER);
      GLOBAL.GAME.finished = true;
      this.pixiboy.die();
      this.gameOverView.show();
      TweenMax.to(GLOBAL.GAME, 0.5, {
        speed: 0,
        ease: Quad.easeOut,
      });
    });
  }
  createContainers() {

    this.background = new PIXI.Container();
    this.stage.addChild(this.background);

    this.middleGround = new PIXI.Container();
    this.stage.addChild(this.middleGround);

    this.forGround = new PIXI.Container();
    this.stage.addChild(this.forGround);

    this.ui = new PIXI.Container();
    this.stage.addChild(this.ui);
  }
  start() {
    GLOBAL.GAME.started = true;
    TweenMax.to(GLOBAL.GAME, 1, {
      speed: GAME_START_SPEED,
      ease: Quad.easeOut,
    });
  }
  restart() {
    GLOBAL.GAME.started = false;
    GLOBAL.GAME.speed = GAME_PAUSE_SPEED;
    this.pixiboy.init();
    this.introView.countDown.reset();
    this.layerManager.reset();
    this.effects.reset();
    this.introView.countDown.start();
    this.gameOverView.hide();
    GLOBAL.GAME.finished = false;

  }
  createAudio() {
    this.sound = new Sound();
  }
  setup() {
    // hide loaderEl
    const loaderEl = document.querySelector('.loader');
    loaderEl.style.display = 'none';

    const textures = PIXI.loader.resources['assets/images/WorldAssets.json'].textures;

    this.introView = new Intro({ container: this.ui, renderer: this.renderer });
    if (GLOBAL.CLIENT.device === 'desktop') Mediator.emit(SOUND_LOADED);
    this.gameOverView = new GameOver({ container: this.ui, renderer: this.renderer });


    this.layerManager = new LayerManager({
      background: this.background,
      middleGround: this.middleGround,
      forGround: this.forGround,
      renderer: this.renderer,
    });

    this.particles = new Particles({
      container: this.stage,
      texture: textures['starPops0004.png'],
    });

    this.pixiboy = new PixiBoy();
    this.pixiboy.init();
    this.stage.addChild(this.pixiboy);

    this.effects = new Effects({
      stage: this.stage,
      texture: PIXI.loader.resources['assets/images/particle.png'].texture,
    });

    this.score = new Score({
      player: this.pixiboy,
      columns: this.layerManager.columnManager.columns,
    });

    this.collisionManager = new CollisionManager({
      player: this.pixiboy,
      columns: this.layerManager.columnManager.columns,
      bonus: this.layerManager.bonusManager.bonus,
    });

    this.update();
  }

  update() {

    this.renderer.render(this.stage);
    raf(this.update.bind(this));

    this.layerManager.update();
    this.particles.update();
    this.pixiboy.update();

    this.collisionManager.update();
    this.score.update();
    this.sound.update();

  }
  resize(width, height) {
    const h = 250;
    const ratio = height / h;
    const newWidth = (width / ratio);

    this.renderer.view.style.height = `${h * ratio}px`;
    this.renderer.view.style.width = `${width}px`;
    this.renderer.resize(newWidth, h);

    GLOBAL.GAME.width = (width / ratio);
    GLOBAL.GAME.height = h;
  }
}
