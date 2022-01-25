import { Code } from "@geist-ui/react";
const commonVex = "attribute vec3 aPosition;\nattribute vec2 aTexCoord;\nvarying lowp vec2 vTexCoord;\nvoid main(){\n    vTexCoord = aTexCoord;\n    gl_Position=vec4(aPosition,1.0);\n}"
export const preset = [
  {
    vex: commonVex,
    frag: "#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying lowp vec2 vTexCoord;\nuniform sampler2D uSampler;\nvoid main(){\n    // vTexCoord是当前处理的点在图片里的坐标 \n    // texture2D 是提取纹理中对应坐标的颜色\n    gl_FragColor = texture2D(uSampler,vTexCoord);\n}",
    name: "图片-基础",
  },
  {
    vex: commonVex,
    frag: "#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying lowp vec2 vTexCoord;\nuniform sampler2D uSampler;\nvoid main(){\n    lowp vec4 color = texture2D(uSampler,vTexCoord);\n    lowp float gray = color[0]*0.3 + color[1]*0.59 + color[2]*0.11;\n    lowp vec4 new_color = vec4(gray,gray,gray,1);\n    gl_FragColor = new_color;\n}",
    name: "图片-灰度",
  },
  {
    vex: commonVex,
    frag: "#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying lowp vec2 vTexCoord;\nuniform sampler2D uSampler;\nuniform lowp vec2 uResolution;\n\nlowp vec4 getColor(lowp vec2 pos) {\n  // step(a,b) b>=a 返回1 否则为0\n  lowp float valid =\n      step(0.0, pos.x) * step(pos.x, 1.0) * step(0.0, pos.y) * step(pos.y, 1.0);\n  ; //如果合法返回1\n  return valid * texture2D(uSampler, pos) + vec4(.0, .0, .0, .0);\n}\n\nlowp vec4 getAdv(lowp float rad) {\n  lowp vec2 texel = vec2(1.0 / uResolution.x, 1.0 / uResolution.y);\n\n  lowp vec4 c1 = getColor(vTexCoord + texel * rad * vec2(-1, 1));\n  lowp vec4 c2 = getColor(vTexCoord + texel * rad * vec2(1, 1));\n  lowp vec4 c3 = getColor(vTexCoord + texel * rad * vec2(1, -1));\n  lowp vec4 c4 = getColor(vTexCoord + texel * rad * vec2(1, 1));\n\n  lowp vec4 color = c1 + c2 + c3 + c4;\n\n  return color * 0.25;\n}\n\nvoid main() {\n  // 模糊半径\n  lowp float rad = 4.0;\n  // 取特定点的颜色\n  gl_FragColor = getAdv(rad);\n}",
    name: "均值模糊（测试）",
  },
  {
    vex: commonVex,
    frag: "#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform float uTime;\nuniform lowp vec2 uResolution;\n\nvoid main(){\n    vec2 st = gl_FragCoord.xy/uResolution.xy;\n    gl_FragColor = vec4(abs(sin(uTime))*st.x,abs(cos(uTime))*st.y,1.0,1.0);\n}",
    name: "时间测试",
  },
];

export const note = [
  {
    attribute: "attribute",
    type: "vec3",
    name: <Code>aPosition</Code>,
    description: "输入坐标",
  },
  {
    attribute: "attribute",
    type: "vec2",
    name: <Code>aTexCoord</Code>,
    description: "顶点的纹理坐标",
  },
  {
    attribute: "uniform",
    type: "sampler2D",
    name: <Code>uSampler</Code>,
    description: "纹理数据",
  },
  {
    attribute: "uniform",
    type: "vec2",
    name: <Code>uResolution</Code>,
    description: "画布的大小",
  },
  {
    attribute:"uniform",
    type:"float",
    name: <Code>uTime</Code>,
    description:"Shader 运行的时间（秒）"
  } 
];
