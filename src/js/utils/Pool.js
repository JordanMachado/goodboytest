export default class Pool {
  constructor({ type }) {
    this.Type = type;
    this.pool = [];
  }
  get() {
    let obj = null;
    if (this.pool.length > 0) {
      obj = this.pool.pop();
    } else {
      obj = new this.Type();
    }
    return obj;
  }
  release(obj) {
    this.pool.push(obj);
  }
}
