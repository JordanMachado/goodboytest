import PIXI from 'pixi.js';


import {
  TREE_SPAWN_MIN,
  TREE_SPAWN_MAX,
} from 'Const';

import Pool from './Pool.js';
import Tree from './Tree';

export default class TreeManager {
  constructor({ container, renderer }) {
    this.container = container;
    this.renderer = renderer;

    this.trees = [];
    this.pool = new Pool({
      type: Tree,
    });
    this.create();
    const textures = PIXI.loader.resources['assets/WorldAssets.json'].textures;
    this.textures = [
      textures['02_tree_1.png'],
      textures['02_tree_2.png'],
    ];
  }
  create() {
    const rand = Math.round(Math.random() * (TREE_SPAWN_MAX - TREE_SPAWN_MIN)) + TREE_SPAWN_MIN;
    setTimeout(() => {
      const tree = this.pool.get();
      tree.texture = this.textures[Math.floor(Math.random() * this.textures.length)];
      const random = Math.random() + 0.7;
      tree.scale = new PIXI.Point(random, random);
      tree.position.x = this.renderer.width;
      tree.position.y = this.renderer.height - tree.height;
      this.container.addChild(tree);
      this.trees.push(tree);
      this.create();
    }, rand);

  }
  update() {
    for (let i = 0; i < this.trees.length; i += 1) {
      this.trees[i].update();
      if (this.trees[i].position.x < -this.trees[i].width) {
        this.pool.release(this.trees[i]);
        this.container.removeChild(this.trees[i]);
        this.trees.splice(i, 1);
        i -= 1;
      }
    }
  }
}
