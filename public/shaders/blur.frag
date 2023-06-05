#ifdef GL_ES
precision mediump float;
#endif
varying lowp vec2 vTexCoord;
uniform sampler2D uSampler;
uniform lowp vec2 uResolution;

lowp vec4 getColor(lowp vec2 pos) {
  // step(a,b) b>=a 返回1 否则为0
  lowp float valid =
      step(0.0, pos.x) * step(pos.x, 1.0) * step(0.0, pos.y) * step(pos.y, 1.0);
  ; //如果合法返回1
  return valid * texture2D(uSampler, pos) + vec4(.0, .0, .0, .0);
}

lowp vec4 getAdv(lowp float rad) {
  lowp vec2 texel = vec2(1.0 / uResolution.x, 1.0 / uResolution.y);

  lowp vec4 c1 = getColor(vTexCoord + texel * rad * vec2(-1, 1));
  lowp vec4 c2 = getColor(vTexCoord + texel * rad * vec2(1, 1));
  lowp vec4 c3 = getColor(vTexCoord + texel * rad * vec2(1, -1));
  lowp vec4 c4 = getColor(vTexCoord + texel * rad * vec2(1, 1));

  lowp vec4 color = c1 + c2 + c3 + c4;

  return color * 0.25;
}

void main() {
  // 模糊半径
  lowp float rad = 4.0;
  // 取特定点的颜色
  gl_FragColor = getAdv(rad);
}