import { useCallback, useRef, useEffect, useState } from "react";
import { draw } from "../Utils/webgl.js";
import textureImage from "../Assets/jessica-pamp-sGRMspZmfPE-unsplash.jpg";
import textureImage2 from "../Assets/anh-nguyen-_Uqj5BQb-mw-unsplash.jpg";
import { Upload, Download } from "@geist-ui/icons";
import {
  Button,
  Toggle,
  Select,
  Divider,
  Text,
  Textarea,
  Grid,
} from "@geist-ui/core";

interface IZCanvas {
  vertexSource: string;
  fragmentSource: string;
}

interface IForm {
  background: BaseCanvas;
}

type BaseCanvas = "Image" | "Image2" | "CustomImage";
type Error = string | undefined;

function ZCanvas(props: IZCanvas) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [form, setForm] = useState<IForm>({ background: "Image" });
  const [autoRun, setAutoRun] = useState(false); // auto play animation
  const [error, setError] = useState<Error>(undefined);
  const [clickPosition, setClickPosition] = useState<Number[]>([0.5, 0.5]);
  const gl = useRef<WebGL2RenderingContext | null>(null);
  const animRef = useRef<number | null>(null);

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
        const c = canvasRef!.current!;
        const cw = canvasWrapperRef!.current!;
        if (cw.clientWidth >= img!.width && cw.clientHeight >= img!.height) {
          c.width = img!.width;
          c.height = img!.height;
        } else if (cw.clientHeight/cw.clientWidth < img!.height/img!.width) {
          c.height = cw.clientHeight;
          c.width = img!.width / img!.height * cw.clientHeight;
        } else {
          c.width = cw.clientWidth;
          c.height = img!.height / img!.width * cw.clientWidth;
        }
        const gl = c.getContext("webgl2")!;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        setImage(img);
      };
    },
    [canvasRef, canvasWrapperRef]
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

  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = [(e.clientX - rect.left) / canvasRef.current!.clientWidth, (e.pageY - rect.top) / canvasRef.current!.clientHeight]
    setClickPosition(position)
    console.log(`click canvas:(${position})`)
  }


  // callback 里的值本身会被缓存（闭包）
  // 如果在 callback 里改变 state 值不会反映在递归的 callback 里（会反映在外面的 useEffect 里，ref 没有这个限制
  // 所以 autoRun 的值在递归里不会变，取消动画搬到了 useEffect 中
  const anim = useCallback(
    (time: number = 0) => {
      try {
        draw(gl.current, props.vertexSource, props.fragmentSource, image, time, clickPosition);
        setError("");
      } catch (e: any) {
        setError(e.message);
        animRef.current = null;
      }
      if (animRef.current) {
        animRef.current = window.requestAnimationFrame(anim);
      }
    },
    [props.vertexSource, props.fragmentSource, image, clickPosition]
  );

  // init
  useEffect(() => {
    gl.current = canvasRef!.current!.getContext("webgl2", {
      preserveDrawingBuffer: true,
    });
  }, []);

  useEffect(() => {
    if (autoRun) {
      if (animRef.current == null) {
        console.log("Start Animation");
        animRef.current = window.requestAnimationFrame(anim);
      } else {
        console.log(`Cancel animation: ${animRef.current}, rebuild ...`);
        window.cancelAnimationFrame(animRef.current);
        animRef.current = window.requestAnimationFrame(anim);
      }
    } else if (!autoRun) {
      anim();
      if (animRef.current !== null) {
        console.log("Cancel animation: " + animRef.current);
        window.cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    }
  }, [anim, autoRun]);

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
    <Grid.Container direction="column">
      <div style={{ textAlign: "center", height: "50vh", width: "100%" }} ref={canvasWrapperRef}>
        <canvas
          ref={canvasRef}
          style={{ objectFit: "contain" }}
          onClick={onCanvasClick}
        ></canvas>
      </div>
      <Divider />
      <form>
        <div className="row">
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
                scale={0.8}
                icon={<Upload />}
                type="secondary"
                onClick={uploadImage}
                auto
              >
                上传图片
              </Button>
              <Button
                scale={0.8}
                icon={<Download />}
                onClick={downloadImage}
                auto
              >
                下载图片
              </Button>
            </>
          )}
        </div>
        <div className="row">
          <Text>运行动画</Text>
          <Toggle
            checked={autoRun}
            onChange={(e) => setAutoRun(e.target.checked)}
          />
        </div>
        <Textarea
          value={error ? error : ""}
          width="100%"
          style={{ minHeight: "150px" }}
          readOnly
        ></Textarea>
      </form>
    </Grid.Container>
  );
}

export default ZCanvas;
