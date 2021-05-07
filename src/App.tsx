import "./App.css";
import React, { useState } from "react";
import { Button, Text, Badge, Grid, Tabs, Textarea } from "@geist-ui/react";
import { Github } from "@geist-ui/react-icons";
import { preset } from "./utils/data.js";
import ZCanvas from "./Components/ZCanvas";
import PresetModal from "./PresetModal";
import Cmirror from "./Components/Cmirror";
import VaribleModal from "./VaribleModal";
import logo from "./assets/favicon-32x32.png";

interface Preset {
  name: string;
  vex: string;
  frag: string;
}

type Error = string | undefined;

function App() {
  const [vertexSource, setVertexSource] = useState(preset[0].vex);
  const [fragmentSource, setFragmentSource] = useState(preset[0].frag);
  const [error, setError] = useState<Error>(undefined);

  const onPreset = (preset: Preset) => {
    console.log(`Load preset ${preset.name}`);
    setVertexSource(preset.vex);
    setFragmentSource(preset.frag);
  };

  return (
    <div className="App">
      <div className="nav">
        <div className="nav-left">
          <img
            src={logo}
            style={{ marginRight: "10px", transform: "translateY(25%)" }}
            alt="logo"
          ></img>
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
          <ZCanvas
            vertexSource={vertexSource}
            fragmentSource={fragmentSource}
            onError={(e: Error) => setError(e)}
          ></ZCanvas>

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
                onChange={(code: string) => {
                  setVertexSource(code);
                }}
              ></Cmirror>
            </Tabs.Item>
            <Tabs.Item label="片段着色器" value="2">
              <Cmirror
                value={fragmentSource}
                onChange={(code: string) => setFragmentSource(code)}
              ></Cmirror>
            </Tabs.Item>
          </Tabs>
        </Grid>
      </Grid.Container>
    </div>
  );
}

export default App;
