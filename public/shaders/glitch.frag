#ifdef GL_ES
precision mediump float;
#endif
varying lowp vec2 vTexCoord;
uniform sampler2D uSampler;
uniform vec2 uResolution;
uniform float uTime;

float random (in float x) {
    return fract(sin(x)*1e4);
}

void main(){
    float wave = 0.08; //偏移系数
    vec2 grid = 200.0*vec2(uResolution.x/uResolution.y,1.0);

    vec2 st = vTexCoord * grid; //细分行数
    vec2 ipos = floor(st); // 提取整数部分
    
    float dir = (mod(ipos.y,2.0)-0.5)*2.0; // 运动方向

    float x = vTexCoord.x + random(ipos.y*uTime)*wave*dir; // 移动后的x
	vec2 newCoord = vec2(x,vTexCoord.y);
    vec4 color = texture2D(uSampler,newCoord);

    // 添加一些扫描线色块
    // color *= step(random(ipos.y*uTime),0.95);

    // 添加左右偏移色块
    color *= step(random(ipos.x+random(ipos.y*uTime)*dir*wave),0.95);
  
    gl_FragColor = color;
}