#ifdef GL_ES
precision mediump float;
#endif
varying lowp vec2 vTexCoord;
uniform sampler2D uSampler;
uniform vec2 uResolution;
uniform float uTime;

vec4 circle(vec2 st, vec2 pos, vec2 center, float radius,float border,float factor, vec4 color, vec4 bottom, float antialias) {
    float d = length((pos - center)*st) - radius; //大于1在圆外，小于1在圆内
    float t0 = smoothstep(0.0,antialias,d); // 大圈,1在圈外
    // 放大
    vec4 new_bottom= texture2D(uSampler, (pos-center) * factor + center)*(1.0 - t0) + bottom * t0;
    // 画圆
    float t  = t0 + 1.0 - smoothstep(0.0,antialias,d+border) ; //大圈+小圈。圆外为1，圆内为0-1渐变
    vec4 res =  t*new_bottom + (1.0 - t)*color;
    return res;
}

void main(){
    // 放大镜的中心点
    vec2 zoom_center = vec2(noise(uTime*0.1),noise(uTime));
  	// 放大镜的半径
    float zoom_r = 0.1;
    // 放大镜的边框颜色
    vec4 zoom_color = vec4(0.88,0.91,0.78,1.0);
    // 边框柔和度
    float zoom_antialias = 0.002;
    // 边框宽度
    float zoom_border = 0.003;
    // 放大镜倍数
    float zoom_factor = 0.5;

  	vec4 color =  texture2D(uSampler,vTexCoord);
    vec2 st = vec2(1,uResolution.y/uResolution.x);
  
    color = circle(st,vTexCoord,zoom_center,zoom_r,zoom_border,zoom_factor,zoom_color,color,zoom_antialias);

    gl_FragColor = color;
}