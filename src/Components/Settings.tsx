import { Card, Select, Text } from "@geist-ui/core";
interface ISettings {
  cmTheme: string;
  theme: string;
}

interface ISettingsProp {
  prop: ISettings;
  onChange: (a: ISettings) => void;
}

export const defaultSettings = { cmTheme: "Tokyo Night Storm", theme: "light" };

const Settings = (props: ISettingsProp) => {
  const SetCodeMirrorTheme = () => {
    const codeMirrorThemeNames = ["Material Light", "Material Dark", "Nord", "Tokyo Night Storm"]
    return (
      <div className="row">
        <Text>选择 CodeMirror 主题</Text>
        <Select
          placeholder="选择主题"
          value={props.prop.cmTheme}
          onChange={(val) =>
            props.onChange({ ...props.prop, cmTheme: val as string })
          }
        >
          {codeMirrorThemeNames.map((val) => (
            <Select.Option value={val} key={val}>
              {val}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  };

  return (
    <Card>
      <SetCodeMirrorTheme />
    </Card>
  );
};

export default Settings;
