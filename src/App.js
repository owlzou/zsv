import "./App.css";
import React from "react";
import {
  Col,
  Row,
  Button,
  Text,
  Select,
  Divider,
  Tag,
  useToasts,
} from "@geist-ui/react";
import { Play, Upload, Github } from "@geist-ui/react-icons";
import { preset } from "./utils/data.js";
import ZCanvas from "./ZCanvas";
import PresetModal from "./PresetModal";
import Cmirror from "./Cmirror";
import imgph from "./assets/jessica-pamp-sGRMspZmfPE-unsplash.jpg";

function Options(props) {
  const bgHandle = (val) => {
    let obj = { ...props.value, background: val };
    val !== "2" && (obj.bgTitle = "");
    val === "1" && props.onLoadImage(imgph);
    props.onChange(obj);
  };
  const uploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      if (input.files[0]) {
        var reader = new FileReader();
        reader.onload = (event) => {
          props.onLoadImage(event.target.result);
          props.onChange({ ...props.value, bgTitle: input.files[0].name });
        };
        reader.readAsDataURL(input.files[0]);
      }
    };
    input.click();
  };

  return (
    <form className="control">
      <Row>
        <label>纹理</label>
        <Select
          placeholder="选择背景"
          onChange={bgHandle}
          value={props.value.background}
        >
          <Select.Option value="1">图片一</Select.Option>
          <Select.Option value="2">自定义图片</Select.Option>
        </Select>
        {props.value.background === "2" && (
          <Button
            size="small"
            icon={<Upload />}
            type="secondary"
            onClick={uploadImage}
          >
            上传图片
          </Button>
        )}
        {props.value.bgTitle.length > 0 && (
          <Tag type="secondary">{props.value.bgTitle}</Tag>
        )}
      </Row>
    </form>
  );
}

class App extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      vertexSource: preset[0].vex,
      fragmentSource: preset[0].frag,
      form: { background: "1", bgTitle: "" },
    };
  }

  onRef = (ref) => {
    this.canvas = ref;
  };

  onRunClick = () => {
    try {
      this.canvas.renderImage();
    } catch (e) {
      const [toasts, setToast] = useToasts();
      const click = () => setToast({ text: e });
    }
  };

  onPreset = (preset) => {
    console.log(`Load preset ${preset.name}`);
    this.setState(
      (state) =>
        Object.assign(state, {
          vertexSource: preset.vex,
          fragmentSource: preset.frag,
        }),
      () => this.onRunClick()
    );
  };

  render() {
    return (
      <div className="App">
        <div className="nav">
          <div className="nav-left">
            <Text h4 style={{ margin: "0" }}>
              Z ShaderViewer
            </Text>
          </div>
          <div className="nav-right">
            <Button
              icon={<Play />}
              auto
              type="secondary"
              onClick={this.onRunClick}
            >
              运行
            </Button>
            <PresetModal onPreset={this.onPreset} />
            <Button icon={<Github />} auto type="abort">
              Github
            </Button>
          </div>
        </div>
        <Row gap={0.8} style={{ marginBottom: "15px" }}>
          <Col>
            <div style={{ textAlign: "center" }}>
              <ZCanvas
                onRef={this.onRef}
                src={imgph}
                vertexSource={this.state.vertexSource}
                fragmentSource={this.state.fragmentSource}
              ></ZCanvas>
            </div>
            <Divider />
            <Options
              value={this.state.form}
              onChange={(obj) => {
                this.setState((state) => Object.assign(state, { form: obj }));
              }}
              onLoadImage={(image) => {
                this.canvas.loadImage(image);
              }}
            ></Options>
          </Col>
          <Col>
            <Cmirror
              title="顶点着色器"
              value={this.state.vertexSource}
              onChange={(code) => {
                this.setState((state) =>
                  Object.assign(state, { vertexSource: code })
                );
              }}
            ></Cmirror>
            <Cmirror
              title="片段着色器"
              value={this.state.fragmentSource}
              onChange={(code) =>
                this.setState((state) =>
                  Object.assign(state, { fragmentSource: code })
                )
              }
            ></Cmirror>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
