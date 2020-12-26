import React from "react";
import { Col, Text } from "@geist-ui/react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike.js";
import "codemirror/theme/dracula.css";

export default function Cmirror(props) {
  const options = {
    tabSize: 4,
    mode: "x-shader/x-vertex",
    theme: "dracula",
    matchBrackets: true,
    lineNumbers: true,
  };
  return (
    <Col
      style={{
        height: "calc( 50vh - (var(--nav-height) / 2) - 10px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text h5>{props.title}</Text>
      <CodeMirror
        value={props.value}
        onBeforeChange={(editor, data, value) => {
          props.onChange(value);
        }}
        options={options}
        style={{height:"100%"}}
      ></CodeMirror>
    </Col>
  );
}
