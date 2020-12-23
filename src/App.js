import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import {
  Col,
  Row,
  Button,
  Text,
  Select,
  Divider,
  useToasts,
  Note,
} from "@geist-ui/react";
import { Upload, Github } from "@geist-ui/react-icons";
import { preset } from "./utils/data.js";
import ZCanvas from "./ZCanvas";
import PresetModal from "./PresetModal";
import Cmirror from "./Cmirror";

function Options(props) {
  const bgHandle = (val) => {
    let obj = { ...props.value, background: val };
    props.onLoadImage(val);
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
        };
        reader.readAsDataURL(input.files[0]);
      }
    };
    input.click();
  };

  return (
    <form className="control">
      <Row>
        <label>背景</label>
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
            auto
          >
            上传图片
          </Button>
        )}
      </Row>
    </form>
  );
}

function App() {
  const [vertexSource, setVertexSource] = useState(preset[0].vex);
  const [fragmentSource, setFragmentSource] = useState(preset[0].frag);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ background: "1" });
  const [toasts, setToast] = useToasts();

  const canvasRef = useRef();

  const onPreset = (preset) => {
    console.log(`Load preset ${preset.name}`);
    setVertexSource(preset.vex);
    setFragmentSource(preset.frag);
  };

  return (
    <div className="App">
      <div className="nav">
        <div className="nav-left">
          <Text h4 style={{ margin: "0" }}>
            Z ShaderViewer
          </Text>
        </div>
        <div className="nav-right">
          {error && (
            <Note type="error" label="error">
              {error}
            </Note>
          )}
          <PresetModal onPreset={onPreset} />
          <Button icon={<Github />} auto type="abort">
            Github
          </Button>
        </div>
      </div>
      <Row gap={0.8} style={{ marginBottom: "15px" }}>
        <Col>
          <div style={{ textAlign: "center" }}>
            <ZCanvas
              ref={canvasRef}
              src={null}
              vertexSource={vertexSource}
              fragmentSource={fragmentSource}
              onError={(e) => setError(e)}
            ></ZCanvas>
          </div>
          <Divider />
          <Options
            value={form}
            onChange={(obj) => {
              setForm(obj);
            }}
            onLoadImage={(val) => {
              canvasRef.current.load(val);
            }}
          ></Options>
        </Col>
        <Col>
          <Cmirror
            title="顶点着色器"
            value={vertexSource}
            onChange={(code) => {
              setVertexSource(code);
            }}
          ></Cmirror>
          <Cmirror
            title="片段着色器"
            value={fragmentSource}
            onChange={(code) => setFragmentSource(code)}
          ></Cmirror>
        </Col>
      </Row>
    </div>
  );
}

export default App;
