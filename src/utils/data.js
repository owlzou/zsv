import { Code } from "@geist-ui/react";
export const preset = [
  {
    vex:
      "attribute vec3 aPosition;\nattribute vec2 aTexCoord;\nvarying lowp vec2 vTexCoord;\nvoid main(){\n    vTexCoord = aTexCoord;\n    gl_Position=vec4(aPosition,1.0);\n}",
    frag:
      "varying lowp vec2 vTexCoord;\nuniform sampler2D uSampler;\nvoid main(){\n    // vTexCoord是当前处理的点在图片里的坐标 \n    // texture2D 是提取纹理中对应坐标的颜色\n    gl_FragColor = texture2D(uSampler,vTexCoord);\n}",
    name: "图片-基础",
  },
  {
    vex:
      "attribute vec3 aPosition;\nattribute vec2 aTexCoord;\nvarying lowp vec2 vTexCoord;\nvoid main(){\n    vTexCoord = aTexCoord;\n    gl_Position=vec4(aPosition,1.0);\n}",
    frag:
      "varying lowp vec2 vTexCoord;\nuniform sampler2D uSampler;\nvoid main(){\n    lowp vec4 color = texture2D(uSampler,vTexCoord);\n    lowp float gray = color[0]*0.3 + color[1]*0.59 + color[2]*0.11;\n    lowp vec4 new_color = vec4(gray,gray,gray,1);\n    gl_FragColor = new_color;\n}",
    name: "图片-灰度",
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
    name: <Code>uTextureSize</Code>,
    description: "图片的大小",
  },
];
