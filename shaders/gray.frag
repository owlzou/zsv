#ifdef GL_ES
precision mediump float;
#endif
varying lowp vec2 vTexCoord;
uniform sampler2D uSampler;
void main(){
    lowp vec4 color = texture2D(uSampler,vTexCoord);
    lowp float gray = color[0]*0.3 + color[1]*0.59 + color[2]*0.11;
    lowp vec4 new_color = vec4(gray,gray,gray,1);
    gl_FragColor = new_color;
}