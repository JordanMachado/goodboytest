import PIXI from 'pixi.js';
import raf from 'raf';

import {
  RESIZE,
  START_GAME,
} from 'Messages';
import GLOBAL from 'Global';
import Mediator from 'Mediator';

import Intro from './Intro';
import Score from './Score';
import Particles from './Particles';
import LayerManager from './LayerManager';
import PixiBoy from './PixiBoy';
import CollisionManager from './CollisionManager';
import BonusManager from './BonusManager';

export default class Game {
  constructor() {

    this.stage = new PIXI.Container();
    this.renderer = new PIXI.autoDetectRenderer(GLOBAL.width, GLOBAL.height, {
      antialiasing: true,
    });

    document.body.appendChild(this.renderer.view);
    this.gameStarted = false;

    this.events();
    this.createContainers();

    PIXI.loader
    .add('assets/WorldAssets.json')
    .add('assets/flyingPixie.png')
    .add('assets/playButton.png')
    .add('assets/column.png')
    .load(this.setup.bind(this));

  }
  events() {
    Mediator.on(RESIZE, ({ width, height }) => {
      this.resize(width, height);
    });
    Mediator.on(START_GAME, this.start.bind(this));
  }
  createContainers() {

    this.background = new PIXI.Container();
    this.stage.addChild(this.background);

    this.middleGround = new PIXI.Container();
    this.stage.addChild(this.middleGround);

    this.forGround = new PIXI.Container();
    this.stage.addChild(this.forGround);

    this.intro = new PIXI.Container();
    this.stage.addChild(this.intro);

    this.gameOver = new PIXI.Container();
    this.stage.addChild(this.gameOver);

  }
  start() {
    // this.update();
    this.gameStarted = true;
  }
  setup() {

    this.introView = new Intro({ container: this.intro, renderer: this.renderer });
    this.layerManager = new LayerManager({
      background: this.background,
      middleGround: this.middleGround,
      forGround: this.forGround,
      renderer: this.renderer,
    });
    const textures = PIXI.loader.resources['assets/WorldAssets.json'].textures;
    console.log(textures['starPops0004.png']);
    this.particles = new Particles({
      container: this.stage,
      texture: textures['starPops0004.png'],
    });

    const pixiboy = window.pixiboy = this.pixiboy = new PixiBoy({ texture: PIXI.loader.resources['assets/flyingPixie.png'].texture });
    this.stage.addChild(pixiboy);
    pixiboy.position.x = 50;
    pixiboy.position.y = this.renderer.height / 2;


    this.collisionManager = new CollisionManager({
      player: pixiboy,
      columns: this.layerManager.columnManager.columns,
    });

    this.score = new Score({
      player: pixiboy,
      columns: this.layerManager.columnManager.columns,
    });

    this.bonusManager = new BonusManager({
      container: this.forGround,
      renderer: this.renderer,
    });

    this.update();

    this.renderer.render(this.stage);

  }

  update() {
    raf(this.update.bind(this));
    this.renderer.render(this.stage);

    this.particles.update();

    if (!this.gameStarted) return;
    this.score.check();
    // update objects
    this.layerManager.update();
    this.collisionManager.update();
    this.pixiboy.update();
    this.bonusManager.update();
  }
  resize(width, height) {
    const h = 250;
    const ratio = height / h;
    const newWidth = (width / ratio);

    this.renderer.view.style.height = `${h * ratio}px`;
    this.renderer.view.style.width = `${width}px`;
    this.renderer.resize(newWidth, h);

    GLOBAL.width = (width / ratio);
    GLOBAL.height = h;
  }
}
