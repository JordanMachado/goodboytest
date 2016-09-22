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
import LavaParticles from './LavaParticles';
import LayerManager from './LayerManager';
import PixiBoy from './PixiBoy';
import CollisionManager from './CollisionManager';
import BonusManager from './BonusManager';
import Effects from './Effects';

const createPlayer = require('web-audio-player')
const createAnalyser = require('web-audio-analyser')

export default class Game {
  constructor() {

    this.stage = new PIXI.Container();
    this.renderer = new PIXI.autoDetectRenderer(GLOBAL.width, GLOBAL.height, {
      antialiasing: true,
    });
    this.resize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.view);
    this.gameStarted = false;

    this.events();
    this.createContainers();

    PIXI.loader
    .add('assets/WorldAssets.json')
    .add('assets/flyingPixie.png')
    .add('assets/flyingJojo.png')
    .add('assets/playButton.png')
    .add('assets/column.png')
    .add('assets/particle.png')
    .add('assets/displace.jpg')
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
    this.createAudio();



  }
  start() {
    // this.update();
    this.gameStarted = true;
  }
  createAudio() {
    this.audio = createPlayer('assets/audio.mp3',{
       buffer: (this.desktop === 'desktop')?false:true
    })
    this.analyser = createAnalyser(this.audio.node, this.audio.context, {
      stereo: false
    })
    this.audio.play();
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
    this.lavaparticles = new LavaParticles({
      container: this.stage,
      texture: PIXI.loader.resources['assets/particle.png'].texture,
    });
    this.effect = new Effects({
      stage: this.stage,
      texture: PIXI.loader.resources['assets/particle.png'].texture,
    });




    // this.stage.filters = [new PIXI.filters.DisplacementFilter(displacementTexture, 20)];
    // this.stage.filters = [displacementFilter];
    // console.log();

    const pixiboy = window.pixiboy = this.pixiboy = new PixiBoy({ texture: PIXI.loader.resources['assets/flyingJojo.png'].texture });
    this.stage.addChild(pixiboy);
    pixiboy.position.x = 50;
    pixiboy.position.y = this.renderer.height / 2;



    this.score = new Score({
      player: pixiboy,
      columns: this.layerManager.columnManager.columns,
    });

    this.bonusManager = new BonusManager({
      container: this.forGround,
      renderer: this.renderer,
    });


    this.collisionManager = new CollisionManager({
      player: pixiboy,
      columns: this.layerManager.columnManager.columns,
      bonus: this.bonusManager.bonus,
    });

    this.update();

    this.renderer.render(this.stage);

  }

  update() {
    raf(this.update.bind(this));
    this.renderer.render(this.stage);

    this.particles.update();
    this.lavaparticles.update();

    // const freq = this.analyser.frequencies();
    // let volume = 0;
    // for (let i = 0; i < freq.length; i += 1) {
    //
    //   volume += freq[i] / 256.0;
    // }
    // this.volume = volume / freq.length;
    // console.log(this.volume);

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
