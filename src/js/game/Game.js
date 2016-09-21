import PIXI from 'pixi.js';
import raf from 'raf';

import {
  RESIZE,
} from 'Messages';
import GLOBAL from 'Global';
import Mediator from 'Mediator';

import Intro from './Intro';
import CollisionManager from './CollisionManager';
import LayerManager from './LayerManager';

import PixiBoy from './PixiBoy';
import Particles from './Particles';

export default class Game {
  constructor() {
    this.stage = new PIXI.Container();
    this.renderer = new PIXI.autoDetectRenderer(GLOBAL.width, GLOBAL.height, {
      antialiasing: true,
    });
    document.body.appendChild(this.renderer.view);
    this.createContainers();
    this.loader = PIXI.loader;
    this.resources = PIXI.loader.resources;
    this.loader
    .add('assets/WorldAssets.json')
    .add('assets/flyingPixie.png')
    .add('assets/playButton.png')
    .add('assets/column.png')
    .load(this.setup.bind(this));

    Mediator.on(RESIZE, ({ width, height }) => {
      this.resize(width, height);
    });
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

  }
  start() {
    new Intro({ container: this.intro, renderer: this.renderer });
    this.renderer.render(this.stage);
  }
  setup() {


    // this.particles = new Particles({
    //   container: this.middleGround,
    //   texture: this.resources['assets/flyingPixie.png'].texture,
    // });
    this.layerManager = new LayerManager({
      background: this.background,
      middleGround: this.middleGround,
      forGround: this.forGround,
      renderer: this.renderer,
    });

    const pixiboy = window.pixiboy = this.pixiboy = new PixiBoy({ texture: this.resources['assets/flyingPixie.png'].texture });
    this.stage.addChild(pixiboy);
    pixiboy.position.x = 50;
    pixiboy.position.y = this.renderer.height / 2;

    this.collisionManager = new CollisionManager({
      player: pixiboy,
      columns: this.layerManager.columnManager.columns,
    });

    this.start();
    this.update();
  }

  update() {
    this.renderer.render(this.stage);
    this.layerManager.update();
    // this.particles.update();

    this.collisionManager.update();
    // this.pixiboy.update();

    raf(this.update.bind(this));
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
