#ifdef GL_ES
precision mediump float;
#endif
varying lowp vec2 vTexCoord;
uniform sampler2D uSampler;
void main(){
    // vTexCoord是当前处理的点在图片里的坐标 
    // texture2D 是提取纹理中对应坐标的颜色
    gl_FragColor = texture2D(uSampler,vTexCoord);
}