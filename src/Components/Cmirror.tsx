import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike.js";
import "codemirror/theme/dracula.css";

interface ICmirror {
  value: string;
  onChange: (a: string) => void;
}

export default function Cmirror(props: ICmirror) {
  const options = {
    tabSize: 4,
    mode: "x-shader/x-vertex",
    theme: "dracula",
    matchBrackets: true,
    lineNumbers: true,
  };
  return (
    <CodeMirror
      value={props.value}
      onBeforeChange={(editor, data, value) => {
        props.onChange(value);
      }}
      options={options}
    ></CodeMirror>
  );
}
