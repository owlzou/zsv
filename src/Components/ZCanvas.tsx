import { useCallback, useRef, useEffect, useState } from "react";
import { draw } from "../utils/webgl.js";
import textureImage from "../assets/jessica-pamp-sGRMspZmfPE-unsplash.jpg";
import textureImage2 from "../assets/anh-nguyen-_Uqj5BQb-mw-unsplash.jpg";
import { Upload, Download } from "@geist-ui/react-icons";
import { Button, Toggle, Select, Divider, Text } from "@geist-ui/react";

interface IZCanvas {
  vertexSource: string;
  fragmentSource: string;
  onError: (a: string | undefined) => void;
}

interface IForm {
  background: BaseCanvas;
}

type BaseCanvas = "Image" | "Image2" | "CustomImage";

function ZCanvas(props: IZCanvas) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [form, setForm] = useState<IForm>({ background: "Image" });
  const [time, setTime] = useState<number>(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [autoRun, setAutoRun] = useState(true);

  const loadImage = useCallback(
    (src: string | ArrayBuffer | null) => {
      if (typeof src == "object") {
        return;
      }
      console.log("Load Image");
      let img = new Image();
      img.src = src || textureImage;
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
      let obj = { ...form, background: val as BaseCanvas };
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
      if (!autoRun) {
        return;
      }
      const gl = canvasRef!.current!.getContext("webgl2", {
        preserveDrawingBuffer: true,
      });
      image && draw(gl, props.vertexSource, props.fragmentSource, image, time);

      // 设置时间
      const gap = 100.0;
      if (props.fragmentSource.match(/uTime/g)) {
        if (timer == null) {
          setTime(0);
          const newTimer = window.setInterval(
            () => setTime((oldTime) => oldTime + gap / 1000.0),
            gap
          );
          setTimer(newTimer);
        }
      } else if (timer != null) {
        window.clearInterval(timer);
        setTimer(null);
      }

      props.onError("");
    } catch (e: any) {
      if (timer != null) {
        window.clearInterval(timer);
        setTimer(null);
      }
      props.onError(e.message);
    }
  }, [image, props, time, timer, autoRun]); // time每秒都在变化，每秒更新一回

  useEffect(() => {
    switch (form.background) {
      case "Image":
        loadImage(textureImage);
        break;
      case "Image2":
        loadImage(textureImage2);
        break;
      default:
        break;
    }
  }, [form.background, loadImage]);

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
        <div className="row baseline">
          <Text>背景</Text>
          <Select
            placeholder="选择背景"
            onChange={bgHandle}
            value={form.background}
          >
            <Select.Option value="Image">图片一</Select.Option>
            <Select.Option value="Image2">图片二</Select.Option>
            <Select.Option value="CustomImage">自定义图片</Select.Option>
          </Select>
          {form.background === "CustomImage" && (
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
        </div>
        <div className="row center">
          <Text>自动编译</Text>
          <Toggle
            checked={autoRun}
            onChange={(e) => setAutoRun(e.target.checked)}
          />
        </div>
      </form>
    </>
  );
}

export default ZCanvas;
