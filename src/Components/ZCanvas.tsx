import React, { useCallback, useRef, useEffect, useState } from "react";
import { draw } from "../utils/webgl.js";
import imgph from "../assets/jessica-pamp-sGRMspZmfPE-unsplash.jpg";
import { Upload, Download } from "@geist-ui/react-icons";
import { Button, Row, Select, Divider, Text } from "@geist-ui/react";

interface IZCanvas {
  vertexSource: string;
  fragmentSource: string;
  onError: (a: string | undefined) => void;
}

interface IForm {
  background: BaseCanvas;
}

enum BaseCanvas {
  Image,
  CustomImage,
}

function str2BaseCanvas(val: string): BaseCanvas {
  switch (val) {
    case "Image":
      return BaseCanvas.Image;
    case "CustomImage":
      return BaseCanvas.CustomImage;
    default:
      return BaseCanvas.Image;
  }
}

function baseCanvas2str(val: BaseCanvas): string {
  switch (val) {
    case BaseCanvas.Image:
      return "Image";
    case BaseCanvas.CustomImage:
      return "CustomImage";
  }
}

function ZCanvas(props: IZCanvas) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [form, setForm] = useState<IForm>({ background: BaseCanvas.Image });

  const loadImage = useCallback(
    (src: string | ArrayBuffer | null) => {
      if (typeof src == "object") {
        return;
      }
      console.log("Load Image");
      let img = new Image();
      img.src = src || imgph;
      img.onload = () => {
        console.log("Image loaded");
        canvasRef!.current!.width = img!.width;
        canvasRef!.current!.height = img!.height;
        const gl = canvasRef!.current!.getContext("webgl2")!;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        setImage(img);
      };
    },
    [canvasRef]
  );

  const bgHandle = (val: String | string[]) => {
    if (typeof val == "string") {
      let bc: BaseCanvas = str2BaseCanvas(val);
      let obj = { ...form, background: bc };
      setForm(obj);
    }
  };

  const uploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      if (input.files![0]) {
        var reader = new FileReader();
        reader.onload = (event) => {
          loadImage(event.target!.result);
        };
        reader.readAsDataURL(input.files![0]);
      }
    };
    input.click();
  };

  const downloadImage = () => {
    const url = canvasRef!.current!.toDataURL("image/png");
    const a = document.createElement("a");
    a.download = "download";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  //当shader变化的时候，重新编译＆绘图
  useEffect(() => {
    try {
      const gl = canvasRef!.current!.getContext("webgl2", {
        preserveDrawingBuffer: true,
      });
      image && draw(gl, props.vertexSource, props.fragmentSource, image);
      props.onError("");
    } catch (e) {
      //console.log(e.message);
      props.onError(e.message);
    }
  }, [image, props]);

  //初始化
  useEffect(() => {
    loadImage(imgph);
  }, [loadImage]);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <canvas
          ref={canvasRef}
          style={{ height: "50vh", width: "100%", objectFit: "contain" }}
        ></canvas>
      </div>
      <Divider />
      <form className="control">
        <Row gap={0.8} style={{ flexWrap: "wrap" }}>
          <Text>背景</Text>

          <Select
            placeholder="选择背景"
            onChange={bgHandle}
            value={baseCanvas2str(form.background)}
          >
            <Select.Option value="Image">图片一</Select.Option>
            <Select.Option value="CustomImage">自定义图片</Select.Option>
          </Select>

          {form.background === BaseCanvas.CustomImage && (
            <>
              <Button
                size="small"
                icon={<Upload />}
                type="secondary"
                onClick={uploadImage}
                auto
              >
                上传图片
              </Button>
              <Button
                size="small"
                icon={<Download />}
                onClick={downloadImage}
                auto
              >
                下载图片
              </Button>
            </>
          )}
        </Row>
      </form>
    </>
  );
}

export default ZCanvas;
