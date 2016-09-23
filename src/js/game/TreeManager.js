import PIXI from 'pixi.js';


import {
  TREE_SPAWN_MIN,
  TREE_SPAWN_MAX,
} from 'Const';

import Pool from 'Pool';
import GLOBAL from 'Global';
import Tree from './Tree';

export default class TreeManager {
  constructor({ container }) {
    this.container = container;

    this.trees = [];
    this.pool = new Pool({
      type: Tree,
    });

    const textures = PIXI.loader.resources['assets/images/WorldAssets.json'].textures;
    this.textures = [
      textures['02_tree_1.png'],
      textures['02_tree_2.png'],
    ];
    this.start();
    this.spawn();
  }
  start() {
    const tree1 = this.pool.get();
    tree1.texture = this.textures[0];
    tree1.position.x = GLOBAL.GAME.width / 8;
    tree1.position.y = GLOBAL.GAME.height - tree1.height;
    this.container.addChild(tree1);
    this.trees.push(tree1);

    const tree2 = this.pool.get();
    tree2.texture = this.textures[1];
    tree2.position.x = GLOBAL.GAME.width / 2;
    tree2.position.y = GLOBAL.GAME.height - tree2.height;
    this.container.addChild(tree2);
    this.trees.push(tree2);


  }
  spawn() {

    if (GLOBAL.GAME.finished) return;

    const rand = Math.round(Math.random() * (TREE_SPAWN_MAX - TREE_SPAWN_MIN)) + TREE_SPAWN_MIN;
    setTimeout(() => {
      const tree = this.pool.get();
      tree.texture = this.textures[Math.floor(Math.random() * this.textures.length)];
      const random = Math.random() + 1;
      tree.scale = new PIXI.Point(random, random);
      tree.position.x = GLOBAL.GAME.width;
      tree.position.y = GLOBAL.GAME.height - tree.height;
      this.container.addChild(tree);
      this.trees.push(tree);
      this.spawn();
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
  reset() {
    for (let i = 0; i < this.trees.length; i += 1) {
      this.pool.release(this.trees[i]);
      this.container.removeChild(this.trees[i]);
      this.trees.splice(i, 1);
      i -= 1;
    }
  }
}
