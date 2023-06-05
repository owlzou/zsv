import "./App.css";
import { useEffect, useState } from "react";
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
import Cmirror from "./Components/Cmirror";
//
import logo from "./Assets/favicon-32x32.png";
import { preset } from "./Utils/data.js";
//
import ZCanvas from "./Components/ZCanvas";
import Tools from "./Components/Tools";
import Settings, { defaultSettings } from "./Components/Settings";
// Modals
import PresetModal, { Preset } from "./Components/PresetModal";
import VaribleModal from "./Components/VaribleModal";
import CreditModal from "./Components/CreditModal";

function App() {
  const [vertexSource, setVertexSource] = useState("");
  const [fragmentSource, setFragmentSource] = useState("");
  // Modal
  const [presetModalVisible, setPresetModalVisible] = useState(false);
  const [creditModalVisible, setCreditModalVisible] = useState(false);
  const [varibleModalVisible, setVaribleModalVisible] = useState(false);
  // Theme
  // const [themeType, setThemeType] = useState("light");
  const [settings, setSettings] = useState(defaultSettings);

  // init
  useEffect(() => {
    const storage = window.localStorage;
    try {
      setSettings(JSON.parse(storage["settings"]));
    } catch (_e) {}
    onPreset(preset[0]);
  }, []);

  const switchThemes = () => {
    const news = {
      ...settings,
      theme: settings.theme === "softDark" ? "light" : "softDark",
    };
    setSettings(news);
    const storage = window.localStorage;
    storage["settings"] = JSON.stringify(news);
  };

  const softDarkTheme = Themes.createFromDark({
    type: "softDark",
    palette: {
      //todo
    },
  });

  const onPreset = async (preset: Preset) => {
    console.log(`Load preset ${preset.name}`);
    const vex = await (await fetch(`./shaders/${preset.vex}`)).text();
    const frag = await (await fetch(`./shaders/${preset.frag}`)).text();
    setVertexSource(vex);
    setFragmentSource(frag);
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
            icon={settings.theme === "light" ? <Sun /> : <Moon />}
            auto
            type="abort"
            onClick={() => switchThemes()}
          >
            {settings.theme === "light" ? "白天" : "黑夜"}
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
    <GeistProvider themes={[softDarkTheme]} themeType={settings.theme}>
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
                  theme={settings.cmTheme}
                  onChange={(code: string) => {
                    setVertexSource(code);
                  }}
                ></Cmirror>
              </Tabs.Item>
              <Tabs.Item label="片段着色器" value="2">
                <Cmirror
                  value={fragmentSource}
                  theme={settings.cmTheme}
                  onChange={(code: string) => setFragmentSource(code)}
                ></Cmirror>
              </Tabs.Item>
              <Tabs.Item label="工具" value="3">
                <Tools />
              </Tabs.Item>
              <Tabs.Item label="设置" value="4">
                <Settings
                  prop={settings}
                  onChange={(val) => {
                    const storage = window.localStorage;
                    storage["settings"] = JSON.stringify(val);
                    setSettings(val);
                  }}
                />
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
