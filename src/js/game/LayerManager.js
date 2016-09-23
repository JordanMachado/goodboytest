import PIXI from 'pixi.js';
import GLOBAL from 'Global';
import {
  START_GAME,
} from 'Messages';
import Mediator from 'Mediator';
import Layer from './Layer';
import TreeManager from './TreeManager';
import FlowerManager from './FlowerManager';
import ColumnManager from './ColumnManager';
import LavaParticles from './LavaParticles';
import BonusManager from './BonusManager';



export default class LayerManager {
  constructor({ background, middleGround, forGround }) {
    this.back = background;
    this.mid = middleGround;
    this.for = forGround;

    // todo in json
    const layerData = [
      {
        id: '05_far_BG.jpg',
        position: {
          x: 0,
          y: 0,
        },
        damping: 0.3,
        container: this.back,
      },
      {
        id: '03_rear_canopy.png',
        position: {
          x: 0,
          y: 0,
        },
        damping: 0.4,
        container: this.back,
      },
      {
        id: '02_front_canopy.png',
        position: {
          x: 0,
          y: 0,
        },
        container: this.mid,
        damping: 0.5,
      },
      {
        id: '00_roof_leaves.png',
        position: {
          x: 0,
          y: 0,
        },
        damping: 0.9,
        container: this.for,
      },
      {
        id: '03_rear_silhouette.png',
        position: {
          x: 0,
          y: GLOBAL.GAME.height - 96,
        },
        damping: 0.45,
        container: this.mid,
      },

      {
        id: '01_front_silhouette.png',
        position: {
          x: 0,
          y: GLOBAL.GAME.height - 108,
        },
        damping: 0.95,
        container: this.for,
      },
    ];
    this.layers = [];
    const textures = PIXI.loader.resources['assets/images/WorldAssets.json'].textures;

    for (let i = 0; i < layerData.length; i += 1) {
      const layer = new Layer({
        texture: textures[layerData[i].id],
        width: GLOBAL.GAME.width,
        height: textures[layerData[i].id].height,
        damping: layerData[i].damping,
        position: {
          x: layerData[i].position.x,
          y: layerData[i].position.y,
        },
      });
      layerData[i].container.addChild(layer);
      this.layers.push(layer);
    }

    this.treeManager = new TreeManager({
      container: this.back
    });

    this.flowerManager = new FlowerManager({
      container: this.mid,
    });

    this.lavaparticles = new LavaParticles({
      container: this.for,
      texture: PIXI.loader.resources['assets/images/particle.png'].texture,
    });

    this.bonusManager = new BonusManager({
      container: this.for,
    });

    window.columnManager = this.columnManager = new ColumnManager({
      container: this.for,
    });
    Mediator.on(START_GAME, () => {
      this.columnManager.spawn(true);
    });
  }
  init() {
    this.treeManager.start();
    this.flowerManager.start();
  }
  update() {
    for (let i = 0; i < this.layers.length; i += 1) {
      this.layers[i].update();
    }
    this.treeManager.update();
    this.flowerManager.update();
    this.columnManager.update();
    this.lavaparticles.update();
    this.bonusManager.update();

  }
  reset() {
    this.treeManager.reset();
    this.treeManager.start();
    this.flowerManager.reset();
    this.flowerManager.start();
    this.columnManager.reset();
    this.bonusManager.reset();
  }
}
