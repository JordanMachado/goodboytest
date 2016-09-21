import PIXI from 'pixi.js';


import {
  GLOBAL_SPEED,
} from 'Const';

import Layer from './Layer';
import TreeManager from './TreeManager';
import FlowerManager from './FlowerManager';
import ColumnManager from './ColumnManager';

export default class LayerManager {
  constructor({ renderer, background, middleGround, forGround }) {
    this.back = background;
    this.mid = middleGround;
    this.for = forGround;
    this.renderer = renderer;



    // todo in json
    const layerData = [
      {
        id: '05_far_BG.jpg',
        position: {
          x: 0,
          y: 0,
        },
        speed: GLOBAL_SPEED * 0.3,
        container: this.back,
      },
      {
        id: '03_rear_canopy.png',
        position: {
          x: 0,
          y: 0,
        },
        speed: GLOBAL_SPEED * 0.4,
        container: this.back,
      },
      {
        id: '02_front_canopy.png',
        position: {
          x: 0,
          y: 0,
        },
        container: this.mid,
        speed: GLOBAL_SPEED * 0.5,
      },
      {
        id: '00_roof_leaves.png',
        position: {
          x: 0,
          y: 0,
        },
        speed: GLOBAL_SPEED * 0.9,
        container: this.for,
      },
      {
        id: '03_rear_silhouette.png',
        position: {
          x: 0,
          y: this.renderer.height - 96,
        },
        speed: GLOBAL_SPEED * 0.45,
        container: this.mid,
      },

      {
        id: '01_front_silhouette.png',
        position: {
          x: 0,
          y: this.renderer.height - 108,
        },
        speed: GLOBAL_SPEED * 0.95,
        container: this.for,
      },
    ];
    this.layers = [];
    const textures = PIXI.loader.resources['assets/WorldAssets.json'].textures;

    for (let i = 0; i < layerData.length; i += 1) {
      const layer = new Layer({
        texture: textures[layerData[i].id],
        width: textures[layerData[i].id].width,
        height: textures[layerData[i].id].height,
        speed: layerData[i].speed,
        position: {
          x: layerData[i].position.x,
          y: layerData[i].position.y,
        },
      });
      layerData[i].container.addChild(layer);
      this.layers.push(layer);
    }

    this.treeManager = new TreeManager({
      container: this.back,
      renderer: this.renderer,
    });

    this.flowerManager = new FlowerManager({
      container: this.mid,
      renderer: this.renderer,
    });

    window.columnManager = this.columnManager = new ColumnManager({
      container: this.for,
      renderer: this.renderer,
    });
  }
  update() {
    for (let i = 0; i < this.layers.length; i += 1) {
      this.layers[i].update();
    }
    this.treeManager.update();
    this.flowerManager.update();
    this.columnManager.update();

  }
  resize(width, height) {
    for (let i = 0; i < this.layers.length; i += 1) {
      this.layers[i].resize(width, height);
    }
  }
}
