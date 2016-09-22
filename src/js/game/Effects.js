import PIXI from 'pixi.js';
import {
  ACTIVE_BONUS,
  PIXI_BOY_TOGGLE,
} from 'Messages';
import Mediator from 'Mediator';

import InvertFilter from './InvertFilter';
import BlackAndWhiteFilter from './BlackAndWhiteFilter';
import FlipXFilter from './FlipXFilter';

require('pixi-filters');


export default class Effect {
  constructor({ stage }) {
    this.stage = stage;
    this.createFilters();
    this.events();
  }
  createFilters() {
    this.filtersCollection = [];

    const displacementTexture = PIXI.loader.resources['assets/displace.jpg'].texture;
    const displace = new PIXI.Sprite(displacementTexture);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(displace, 0);
    this.displacementFilter.padding = 0;
    this.displacementFilter.active = false;
    this.filtersCollection.push(this.displacementFilter);

    this.invertFilter = new InvertFilter();
    this.invertFilter.active = false;
    this.filtersCollection.push(this.invertFilter);

    this.bw = new BlackAndWhiteFilter();
    this.bw.active = false;
    this.filtersCollection.push(this.bw);

    this.flip = new FlipXFilter();
    this.flip.active = false;
    this.filtersCollection.push(this.flip);

    this.rgbFilter = new PIXI.filters.RGBSplitFilter();
    this.rgbFilter.red = new PIXI.Point(10, 0);
    this.rgbFilter.blue = new PIXI.Point(0, 1);
    this.rgbFilter.green = new PIXI.Point(1, 0);
    this.rgbFilter.padding = 0;
    this.rgbFilter.active = false;
    this.filtersCollection.push(this.rgbFilter);

    this.updateFilter();

  }
  events() {
    Mediator.on(ACTIVE_BONUS, ({ type }) => {
      console.log(type);
      switch (type) {
        case 0:
          this.panda();
          break;
        case 1:
          this.arcenciel();
          break;
        case 2:
          this.licorne();
          break;
        case 3:
          this.sourire();
          break;
        case 4:
          this.candy();
          break;
        case 5:
          Mediator.emit(PIXI_BOY_TOGGLE);
          break;
        default:
      }
      this.updateFilter();
    });

  }
  updateFilter() {
    this.filters = [];
    for (let i = 0; i < this.filtersCollection.length; i += 1) {
      if (this.filtersCollection[i].active) this.filters.push(this.filtersCollection[i]);
    }
    this.stage.filters = this.filters;
  }
  candy() {
    // displace
    this.displacementFilter.active = !this.displacementFilter.active;
    this.displacementFilter.scale.x += 2;
    this.displacementFilter.scale.y += 2;
  }
  arcenciel() {
    this.rgbFilter.active = !this.rgbFilter.active;
  }
  licorne() {
    this.invertFilter.active = !this.invertFilter.active;
    // invert background
  }
  sourire() {
    for (let i = 0; i < this.filtersCollection.length; i += 1) {
      this.filtersCollection[i].active = false;
    }
  }
  panda() {
    this.bw.active = !this.bw.active;

  }
}
