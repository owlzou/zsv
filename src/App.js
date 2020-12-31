import "./App.css";
import React, { useRef, useState } from "react";
import {
  Row,
  Button,
  Text,
  Select,
  Divider,
  Badge,
  Grid,
  Tabs,
  Textarea,
} from "@geist-ui/react";
import { Upload, Github } from "@geist-ui/react-icons";
import { preset } from "./utils/data.js";
import ZCanvas from "./ZCanvas";
import PresetModal from "./PresetModal";
import Cmirror from "./Cmirror";
import VaribleModal from "./VaribleModal";
import logo from "./assets/favicon-32x32.png";

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
          <img src={logo} style={{marginRight:"10px",transform:"translateY(25%)"}} alt="logo"></img>
          <Text
            h4
            style={{
              margin: "0",
              display: "inline-block",
              marginRight: "10px",
            }}
          >
            Z ShaderViewer
          </Text>
          <Badge size="small">Beta</Badge>
        </div>
        <div className="nav-right">
          <VaribleModal />
          <PresetModal onPreset={onPreset} />
          <Button
            icon={<Github />}
            auto
            type="abort"
            onClick={() => {
              window.open("https://github.com/owlzou/zsv", "_blank");
            }}
          >
            Github
          </Button>
        </div>
      </div>
      <Grid.Container gap={2} style={{ padding: "0 20px" }}>
        <Grid md={12} xs={24}>
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
          <div className="control">
            <Textarea
              value={error ? error : ""}
              width="100%"
              minHeight="200px"
              readOnly
            ></Textarea>
          </div>
        </Grid>
        <Grid xs={12}>
          <Tabs initialValue="1">
            <Tabs.Item label="顶点着色器" value="1">
              <Cmirror
                value={vertexSource}
                onChange={(code) => {
                  setVertexSource(code);
                }}
              ></Cmirror>
            </Tabs.Item>
            <Tabs.Item label="片段着色器" value="2">
              <Cmirror
                value={fragmentSource}
                onChange={(code) => setFragmentSource(code)}
              ></Cmirror>
            </Tabs.Item>
          </Tabs>
        </Grid>
      </Grid.Container>
    </div>
  );
}

export default App;
