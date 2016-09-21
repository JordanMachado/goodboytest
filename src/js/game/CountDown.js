export default class CountDown {
  constructor() {
    this.el = document.createElement('div');
    document.body.appendChild(this.el);
    this.text = [
      '3',
      '2',
      '1',
      'GO !',
    ];

    this.el.innerHTML = this.text[0];
    this.step = 1;
    this.start();
  }
  start() {
    // ugly I know
    setTimeout(() => {
      this.el.innerHTML = this.text[this.step];
      this.step += 1;
      if (this.step < this.text.length) {
        this.start();
      }
    }, 1000);
  }
}
