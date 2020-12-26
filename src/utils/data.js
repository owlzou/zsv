export const preset = [
  {
    vex:
      "attribute vec3 aPosition;\nattribute vec2 aTexCoord;\nvarying lowp vec2 vTexCoord;\nvoid main(){\n    vTexCoord = aTexCoord;\n    gl_Position=vec4(aPosition,1.0);\n}",
    frag:
      "varying lowp vec2 vTexCoord;\nuniform sampler2D uSampler;\nvoid main(){\n    gl_FragColor = texture2D(uSampler,vTexCoord);\n}",
    name: "图片 - 基础",
  },
];
