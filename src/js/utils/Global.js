import {
  GAME_PAUSE_SPEED,
} from 'Const';

const GLOBAL = {
  CLIENT: {
    device: 'desktop',
  },
  GAME: {
    finished: false,
    started: false,
    width: 480,
    height: 250,
    speed: GAME_PAUSE_SPEED,
  },
  SOUND: {
    volume: 0,
  },
};
export default GLOBAL;
