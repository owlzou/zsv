import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { shader } from "@codemirror/legacy-modes/mode/clike";
// Themes
import { materialDark, materialLight } from '@uiw/codemirror-theme-material';
import { nord } from '@uiw/codemirror-theme-nord';
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm';

interface ICmirror {
  value: string;
  onChange: (a: string) => void;
  theme: string;
}

export default function Cmirror(props: ICmirror) {

  const basicSetupOptions = {
    lineNumbers: true,
    bracketMatching: true
  }

  const parseTheme = (theme: string) => {
    switch (theme) {
      case ("Nord"):
        return nord
      case ("Material Light"):
        return materialLight
      case ("Material Dark"):
        return materialDark
      case ("Tokyo Night Storm"):
        return tokyoNightStorm
      default:
        return nord
    }
  }

  return (
    <CodeMirror
      value={props.value}
      onChange={(value, _viewUpdate) => {
        props.onChange(value);
      }}
      theme={parseTheme(props.theme)}
      basicSetup={basicSetupOptions}
      extensions={[StreamLanguage.define(shader)]}
    ></CodeMirror>
  );
}
