attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying lowp vec2 vTexCoord;
void main(){
    vTexCoord = aTexCoord;
    gl_Position=vec4(aPosition,1.0);
}