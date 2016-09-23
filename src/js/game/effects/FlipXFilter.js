import PIXI from 'pixi.js';

export default class FlipXFilter extends PIXI.Filter {
  constructor() {
    const vertexShader = null;
    const fragmentShader = [
      'precision mediump float;',
      '',
      'varying vec2 vTextureCoord;',
      'uniform sampler2D uSampler;',
      'uniform float active;',
      '',
      'void main(void)',
      '{',
      '    vec4 pixel = texture2D(uSampler,vec2(1.0 - vTextureCoord.x, vTextureCoord.y));',
      '    gl_FragColor = pixel;',
      '}',
    ].join('\n');
    const uniforms = {};

    super(vertexShader, fragmentShader, uniforms);
  }
}
