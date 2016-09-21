import PIXI from 'pixi.js';
import raf from 'raf';


import {
  SPEED,
} from 'Const';

import CollisionManager from './CollisionManager';
import LayerManager from './LayerManager';

import PixiBoy from './PixiBoy';

export default class Game {
  constructor() {
    this.stage = new PIXI.Container();
    this.renderer = new PIXI.autoDetectRenderer(480, 250);
    document.body.appendChild(this.renderer.view);
    this.loader = PIXI.loader;
    this.resources = PIXI.loader.resources;
    this.loader
    .add('assets/WorldAssets.json')
    .add('assets/flyingPixie.png')
    .add('assets/column.png')
    .load(this.setup.bind(this));
  }
  setup() {
    this.background = new PIXI.Container();
    this.middleGround = new PIXI.Container();
    this.forGround = new PIXI.Container();

    this.stage.addChild(this.background);
    this.stage.addChild(this.middleGround);
    this.stage.addChild(this.forGround);

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








    // this.poolTree = new Pool({ type: Tree, size: 20, texture: id['02_tree_2.png']});
    // this.trees = [];
    // setInterval(() => {
    //   let tree = this.poolTree.get();
    //   tree.position.x = 300;
    //   this.stage.addChild(tree);
    //   this.trees.push(tree);
    // }, 400);

    this.update();
  }

  update() {
    this.renderer.render(this.stage);
    this.layerManager.update();

    this.collisionManager.update();
    this.pixiboy.update();

    raf(this.update.bind(this));
  }
  resize(width, height) {
    this.renderer.view.style.width = `${width}px`;
    this.renderer.view.style.height = `${height}px`;
    // this.renderer.resize(width, height);

  }
}
