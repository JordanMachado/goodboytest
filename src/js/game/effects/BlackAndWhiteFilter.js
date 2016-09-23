import PIXI from 'pixi.js';

export default class BlackAndWhiteFilter extends PIXI.Filter {
  constructor() {
    const vertexShader = null;
    const fragmentShader = [
      'precision mediump float;',
      '',
      'varying vec2 vTextureCoord;',
      'uniform sampler2D uSampler;',
      '',
      'void main(void)',
      '{',
      '    vec4 pixel = texture2D(uSampler,vTextureCoord);',
      '    gl_FragColor = vec4( vec3(pixel.r+pixel.g+pixel.b)/3.0, pixel.a);',
      '}',
    ].join('\n');
    const uniforms = {};

    super(vertexShader, fragmentShader, uniforms);
  }
}
