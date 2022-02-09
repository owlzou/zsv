import "./App.css";
import { useState } from "react";
import {
  Button,
  Text,
  Badge,
  Grid,
  Tabs,
  CssBaseline,
  GeistProvider,
  Themes,
} from "@geist-ui/core";
import { Github, Folder, Info, Lambda, Sun, Moon } from "@geist-ui/icons";
import { preset } from "./utils/data.js";
import ZCanvas from "./Components/ZCanvas";
import PresetModal, { Preset } from "./Components/PresetModal";
import Cmirror from "./Components/Cmirror";
import VaribleModal from "./Components/VaribleModal";
import logo from "./assets/favicon-32x32.png";
import CreditModal from "./Components/CreditModal";
import Tools from "./Components/Tools";

function App() {
  const [vertexSource, setVertexSource] = useState(preset[0].vex);
  const [fragmentSource, setFragmentSource] = useState(preset[0].frag);
  // Modal
  const [presetModalVisible, setPresetModalVisible] = useState(false);
  const [creditModalVisible, setCreditModalVisible] = useState(false);
  const [varibleModalVisible, setVaribleModalVisible] = useState(false);
  // Theme
  const [themeType, setThemeType] = useState("light");

  const switchThemes = () => {
    setThemeType((last) => (last === "softDark" ? "light" : "softDark"));
  };

  const softDarkTheme = Themes.createFromDark({
    type: "softDark",
    palette: {
      //todo
    },
  });

  const onPreset = (preset: Preset) => {
    console.log(`Load preset ${preset.name}`);
    setVertexSource(preset.vex);
    setFragmentSource(preset.frag);
  };

  const Header = () => (
    <Grid.Container gap={2} alignContent="center">
      <Grid sm={24} md={12}>
        <img src={logo} style={{ marginRight: "10px" }} alt="logo"></img>
        <Badge.Anchor>
          <Text h4 style={{ margin: "0" }}>
            Z ShaderViewer
          </Text>
          <Badge scale={0.8}>Beta</Badge>
        </Badge.Anchor>
      </Grid>
      <Grid.Container justify="flex-end" alignContent="center" sm={24} md={12}>
        <Grid>
          <Button
            icon={themeType === "light" ? <Sun /> : <Moon />}
            auto
            type="abort"
            onClick={() => switchThemes()}
          >
            {themeType === "light" ? "白天" : "黑夜"}
          </Button>
        </Grid>
        <Grid>
          <Button
            icon={<Lambda />}
            auto
            type="abort"
            onClick={() => setVaribleModalVisible(true)}
          >
            变量支持
          </Button>
        </Grid>
        <Grid>
          <Button
            icon={<Folder />}
            auto
            type="abort"
            onClick={() => setPresetModalVisible(true)}
          >
            加载预设
          </Button>
        </Grid>
        <Grid>
          <Button
            icon={<Info />}
            auto
            type="abort"
            onClick={() => setCreditModalVisible(true)}
          >
            关于
          </Button>
        </Grid>
        <Grid>
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
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );

  return (
    <GeistProvider themes={[softDarkTheme]} themeType={themeType}>
      <CssBaseline />
      <div className="App">
        <Header />
        <Grid.Container gap={2} style={{ padding: "0 20px" }}>
          <Grid sm={24} md={12}>
            <ZCanvas
              vertexSource={vertexSource}
              fragmentSource={fragmentSource}
            ></ZCanvas>
          </Grid>
          <Grid sm={24} md={12}>
            <Tabs initialValue="2" style={{ width: "100%" }}>
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
              <Tabs.Item label="工具" value="3">
                <Tools />
              </Tabs.Item>
            </Tabs>
          </Grid>
        </Grid.Container>
      </div>
      <PresetModal
        onPreset={onPreset}
        visible={presetModalVisible}
        onClose={() => setPresetModalVisible(false)}
      />
      <VaribleModal
        visible={varibleModalVisible}
        onClose={() => setVaribleModalVisible(false)}
      />
      <CreditModal
        visible={creditModalVisible}
        onClose={() => setCreditModalVisible(false)}
      />
    </GeistProvider>
  );
}

export default App;
