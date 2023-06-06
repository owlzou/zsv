/**
 * 编译着色器
 *
 * @param {WebGLRenderingContext} gl - gl上下文
 * @param {string} source - 着色器源码
 * @param {*} type - 类型，gl.VERTEX_SHADER 或 gl.FRAGMENT_SHADER
 * @returns
 */
function createShader(gl: WebGLRenderingContext, source: string, type: number) {
  let shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(`ShaderInfoLog:\n${gl.getShaderInfoLog(shader)}`);
  }
  return shader;
}

/**
 * 编译并连接着色器
 *
 * @export
 * @param {WebGLRenderingContext} gl - gl上下文
 * @param {string} vsource - 顶点着色器源码
 * @param {string} fsource - 片段着色器源码
 * @returns {WebGLProgram|null} - 连接好的WebGLProgram，失败则返回null
 */
export function getProgram(gl: WebGLRenderingContext, vsource: string, fsource: string) {
  let vertShader = createShader(gl, vsource, gl.VERTEX_SHADER);
  let fragShader = createShader(gl, fsource, gl.FRAGMENT_SHADER);
  let shaderProgram = gl.createProgram()!;
  gl.attachShader(shaderProgram, vertShader);
  gl.attachShader(shaderProgram, fragShader);
  gl.linkProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    throw new Error(`ProgramInfoLog:\n${gl.getProgramInfoLog(shaderProgram)}`);
  }
  return shaderProgram;
}

/**
 * 简单缓冲绑定
 *
 * @param {WebGLRenderingContext} gl - gl上下文
 * @param {WebGLProgram} shaderProgram - shaderProgram
 * @param {string} name - 着色器里的属性名称
 * @param {number[]} data - 数据源
 * @param {number} size - 一组数据长度
 * @param {number} offset - 偏移
 * @param {number} stride - 步长
 * @param {number} indices - 索引（如果有）
 * @returns buffer
 */
export function simpleBindBuffer(
  gl: WebGLRenderingContext,
  shaderProgram: WebGLProgram,
  name: string,
  data: number[],
  size: number,
  offset: number,
  stride: number,
  indices = null
) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  const index = gl.getAttribLocation(shaderProgram, name);
  gl.vertexAttribPointer(index, size, gl.FLOAT, false, offset, stride);

  if (indices != null) {
    const indexesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexesBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      gl.STATIC_DRAW
    );
  }

  gl.enableVertexAttribArray(index);
  return buffer;
}

/**
 * 绑定纹理
 *
 * @param {WebGLRenderingContext} gl - gl上下文
 * @param {WebGLProgram} shaderProgram - shaderProgram
 * @param {TexImageSource} image - 图片元素
 * @returns
 */
export function bindTexture(gl: WebGLRenderingContext, shaderProgram: WebGLProgram, image: TexImageSource) {
  let texture = gl.createTexture();
  //绑定纹理
  gl.bindTexture(gl.TEXTURE_2D, texture);
  //指定二维纹理贴图，详细级别。颜色组件，数据格式，数据类型，数据源
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  //设置纹理在放大和缩小时候采用的采样方案。
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR_MIPMAP_NEAREST
  );
  //生成mipmap webgl 1.0 只能给图片边长为2的幂的图片生成 mipmap
  gl.generateMipmap(gl.TEXTURE_2D);
  //结束设置
  //gl.activeTexture(gl.TEXTURE0);
  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);
}

/**
 * 最终画图
 *
 * @export
 * @param {WebGLRenderingContext} gl
 * @param {string} vertexSource
 * @param {string} fragmentSource
 * @param {TexImageSource} image
 * @param {number} [uTime=0] 经过时间
 * @param {number[]} [uMouseClick=[0.5, 0.5]] 鼠标点击位置
 */
export function draw(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string, image: TexImageSource, uTime = 0, uMouseClick = [0.5, 0.5]) {
  //正方形
  const vertices = [-1, -1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0];
  //纹理对应坐标
  const tex = [0, 1, 0, 0, 1, 1, 1, 0];
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  //创建着色器
  const shaderProgram = getProgram(gl, vertexSource, fragmentSource);
  //设置缓冲
  simpleBindBuffer(gl, shaderProgram, "aPosition", vertices, 3, 0, 0);
  simpleBindBuffer(gl, shaderProgram, "aTexCoord", tex, 2, 0, 0);
  gl.useProgram(shaderProgram);
  //-----------------------未来添加其他可以绑定的参数也在这里-----------------------
  // - canvas 的大小
  gl.uniform2f(
    gl.getUniformLocation(shaderProgram, "uResolution"),
    image.width,
    image.height
  );
  // - 运行时间
  gl.uniform1f(gl.getUniformLocation(shaderProgram, "uTime"), uTime / 1000);
  // - 鼠标点击位置
  gl.uniform2f(gl.getUniformLocation(shaderProgram, "uMouseClick"), uMouseClick[0], uMouseClick[1]);
  //-----------------------添加参数位置结束-----------------------
  bindTexture(gl, shaderProgram, image);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}