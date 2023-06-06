import { useCallback, useRef, useEffect, useState } from "react";
import { draw } from "../Utils/webgl.js";
import textureImage from "../Assets/jessica-pamp-sGRMspZmfPE-unsplash.jpg";
import textureImage2 from "../Assets/anh-nguyen-_Uqj5BQb-mw-unsplash.jpg";
import { Upload, Download, Play, Image as ImageIcon, Pause, StopCircle } from "@geist-ui/icons";
import {
  Button,
  Popover,
  Divider,
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
  const [clickPosition, setClickPosition] = useState<number[]>([0.5, 0.5]); // 鼠标点击位置
  const gl = useRef<WebGL2RenderingContext | null>(null);
  const animRef = useRef<number | null>(null);
  const animTimeRef = useRef<number>(0);

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
        c.width = img!.width;
        c.height = img!.height;
        if (cw.clientHeight / cw.clientWidth < img!.height / img!.width) {
          c.style.width = img!.width / img!.height * cw.clientHeight + "px";
          c.style.height = cw.clientHeight + "px";
        } else {
          c.style.width = cw.clientWidth + "px";
          c.style.height = img!.height / img!.width * cw.clientWidth + "px";
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
    bgHandle("CustomImage")
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
    const d = new Date()
    a.download = `zsv_${d.getFullYear()}${d.getMonth().toString().padStart(2, '0')}${d.getDay().toString().padStart(2, '0')}_${d.getHours().toString().padStart(2, '0')}${d.getMinutes().toString().padStart(2, '0')}${d.getSeconds().toString().padStart(2, '0')}`;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = [(e.clientX - rect.left) / canvasRef.current!.clientWidth, (e.pageY - rect.top) / canvasRef.current!.clientHeight]
    setClickPosition(position)
    //console.log(`click canvas:(${position})`)
  }

  const selectImageContent = () => (
    <>
      <Popover.Item onClick={() => bgHandle("Image")}>
        <span>默认图片一（海洋）</span>
      </Popover.Item>
      <Popover.Item onClick={() => bgHandle("Image2")}>
        <span>默认图片二（沙拉）</span>
      </Popover.Item>
    </>
  )

  // callback 里的值本身会被缓存（闭包）
  // 如果在 callback 里改变 state 值不会反映在递归的 callback 里（会反映在外面的 useEffect 里，ref 没有这个限制
  // 所以 autoRun 的值在递归里不会变，取消动画搬到了 useEffect 中
  const anim = useCallback(
    (time: number) => {
      try {
        draw(gl.current!, props.vertexSource, props.fragmentSource, image!, time, clickPosition);
        animTimeRef.current = time;
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

  const stopAnim = () => {
    setAutoRun(false)
    animTimeRef.current = 0;
    anim(0);
  }

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
      anim(animTimeRef.current);
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
        <div className="ui-button-group" >
          <Button auto title={autoRun ? "暂停动画" : "播放动画"} icon={autoRun ? <Pause /> : <Play />} onClick={(_e) => setAutoRun(!autoRun)} type="secondary">{autoRun ? "暂停动画" : "播放动画"}</Button>
          <Button auto title="停止动画" icon={<StopCircle />} onClick={(_e) => stopAnim()}>停止动画</Button>
          <Button auto title="选择图片" icon={<ImageIcon />}> <Popover content={selectImageContent as any}>选择图片</Popover></Button>
          <Button auto title="上传图片" icon={<Upload />} onClick={uploadImage}>上传图片</Button>
          <Button auto title="下载图片" icon={<Download />} onClick={downloadImage}>下载图片</Button>
        </div>
        <div style={{ marginTop: "16px" }}>
          <Textarea
            value={error ? error : ""}
            width="100%"
            style={{ minHeight: "150px" }}
            readOnly
          ></Textarea>
        </div>
      </form>
    </Grid.Container>
  );
}

export default ZCanvas;
