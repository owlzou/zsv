import React, {
  useCallback,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import { draw } from "./utils/webgl.js";
import imgph from "./assets/jessica-pamp-sGRMspZmfPE-unsplash.jpg";

function ZCanvas(props, ref) {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);

  const loadImage = useCallback(
    (src) => {
      console.log("Load Image");
      let img = new Image();
      img.src = src || imgph;
      img.onload = () => {
        console.log("Image loaded");
        canvasRef.current.width = img.width;
        canvasRef.current.height = img.height;
        const gl = canvasRef.current.getContext("webgl2");
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        setImage(img);
      };
    },
    [canvasRef]
  );

  const load = (val) => {
    switch (val) {
      case "0":
        break;
      case "1":
        loadImage(imgph);
        break;
      case "2":
        break;
      default:
        loadImage(val);
        break;
    }
  };

  useImperativeHandle(ref, () => ({
    load,
  }));

  //当shader变化的时候，重新编译＆绘图
  useEffect(() => {
    try {
      const gl = canvasRef.current.getContext("webgl2");
      image && draw(gl, props.vertexSource, props.fragmentSource, image);
      props.onError(null);
    } catch (e) {
      props.onError(e);
    }
  }, [props.vertexSource, props.fragmentSource, image, props]);

  //初始化，加载图片
  useEffect(() => {
    loadImage(props.src);
  }, [loadImage, props.src]);

  return (
    <canvas
      ref={canvasRef}
      style={{ height: "50vh", width: "100%", objectFit: "contain" }}
    ></canvas>
  );
}

export default forwardRef(ZCanvas);
