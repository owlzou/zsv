import { useEffect, useState } from "react";
import { Input, Card, Text } from "@geist-ui/core";

function rgb2vec(rgb: string) {
  const reg = /#?(?<R>[0-9a-f]{2})(?<G>[0-9a-f]{2})(?<B>[0-9a-f]{2})/g;
  const m = reg.exec(rgb.toLowerCase());
  if (m) {
    const r = (parseInt(m.groups!.R, 16) / 255).toFixed(2);
    const g = (parseInt(m.groups!.G, 16) / 255).toFixed(2);
    const b = (parseInt(m.groups!.B, 16) / 255).toFixed(2);
    return `(${r},${g},${b})`;
  } else {
    throw new Error("Invaild Input");
  }
}

function RGB2Vec() {
  const [rgbInput, setRgbInput] = useState("");
  const [rgbOutput, setRgbOutput] = useState("");

  useEffect(() => {
    let out = "";
    try {
      out = rgb2vec(rgbInput);
    } catch (_e) {}
    setRgbOutput(out);
  }, [rgbInput]);

  return (
    <div className="row">
      <Text>RGB 转 vec3</Text>
      <Input
        value={rgbInput}
        placeholder="#79FFE1"
        onChange={(e: any) => setRgbInput(e.target.value)}
      />
      <Input readOnly value={rgbOutput} placeholder="(0.47,1.00,0.88)" />
    </div>
  );
}

function Tools() {
  return (
    <Card>
      <RGB2Vec />
    </Card>
  );
}

export default Tools;
