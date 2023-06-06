export const preset = [
  {
    vex: "basic2D.vert",
    frag: "basic2D.frag",
    name: "图片-基础",
  },
  {
    vex: "basic2D.vert",
    frag: "gray.frag",
    name: "图片-灰度",
  },
  {
    vex: "basic2D.vert",
    frag: "blur.frag",
    name: "均值模糊（测试）",
  },
  {
    vex: "basic2D.vert",
    frag: "glitch.frag",
    name: "故障图像",
  },
  {
    vex: "basic2D.vert",
    frag: "zoom.frag",
    name: "放大镜",
  },
];

export const note = [
  {
    attribute: "attribute",
    type: "vec3",
    name: "aPosition",
    description: "输入坐标",
  },
  {
    attribute: "attribute",
    type: "vec2",
    name: "aTexCoord",
    description: "顶点的纹理坐标",
  },
  {
    attribute: "uniform",
    type: "sampler2D",
    name: "uSampler",
    description: "纹理数据",
  },
  {
    attribute: "uniform",
    type: "vec2",
    name: "uResolution",
    description: "画布的大小",
  },
  {
    attribute: "uniform",
    type: "float",
    name: "uTime",
    description: "Shader 运行的时间（秒）",
  },
  {
    attribute:"uniform",
    type:"vec2",
    name:"uMouseClick",
    description:"鼠标点击的坐标"
  }
];
