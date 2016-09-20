import PIXI from 'pixi.js';
import raf from 'raf';

import {
  SPEED,
} from 'Const';
import Layer from './Layer';
import PixiBoy from './PixiBoy';

export default class Game {
  constructor() {
    console.log(SPEED);

    this.stage = new PIXI.Container();
    this.renderer = new PIXI.autoDetectRenderer(512, 512);
    // this.renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.view);
    this.loader = PIXI.loader;
    this.resources = PIXI.loader.resources;
    this.loader
    .add('assets/WorldAssets.json')
    .add('assets/flyingPixie.png')
    .load(this.setup.bind(this));
  }
  setup() {
    const id = this.resources['assets/WorldAssets.json'].textures;
    const layers = [
      {
        id: '05_far_BG.jpg',
        x: 0,
        y: 0,
      },
      {
        id: '03_rear_canopy.png',
        x: 0,
        y: 0,
      },
      {
        id: '02_front_canopy.png',
        x: 0,
        y: 0,
      },
      {
        id: '00_roof_leaves.png',
        x: 0,
        y: 0,
      },
      {
        id: '03_rear_silhouette.png',
        x: 0,
        y: this.renderer.height - 120,
      },

      {
        id: '01_front_silhouette.png',
        x: 0,
        y: this.renderer.height - 105,
      },
      {
        id: '00_forest_floor.png',
        x: 0,
        y: this.renderer.height - 70,
      },

    ];

    this.layers = [];
    for (let i = 0; i < layers.length; i += 1) {
      const layer = new Layer({
        texture: id[layers[i].id],
        width: id[layers[i].id].width,
        height: id[layers[i].id].height,
        speed: Math.random(),
        position: {
          x: layers[i].x,
          y: layers[i].y,
        },
      });
      this.stage.addChild(layer);
      this.layers.push(layer);
    }
    const pixiboy = window.pixiboy = this.pixiboy = new PixiBoy({ texture: this.resources['assets/flyingPixie.png'].texture });
    this.stage.addChild(pixiboy);
    this.update();
  }
  update() {
    this.renderer.render(this.stage);
    for (let i = 0; i < this.layers.length; i += 1) {
      this.layers[i].update();
    }
    this.pixiboy.update();
    raf(this.update.bind(this));
  }
}
