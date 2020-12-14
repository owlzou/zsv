import React from "react";
import { draw } from "./utils/webgl.js";

class ZCanvas extends React.Component {
  constructor(prop) {
    super(prop);
    this.canvas = React.createRef();
    this.state = {
      image: new Image(),
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    this.gl = this.canvas.current.getContext("webgl2");
    this.loadImage(this.props.src);
    this.props.onRef(this);
  }

  renderImage() {
    draw(
      this.gl,
      this.props.vertexSource,
      this.props.fragmentSource,
      this.state.image
    );
  }

  loadImage(src) {
    console.log("Load Image");
    let image = new Image();
    image.src = src;
    image.onload = () => {
      console.log("Image loaded");
      this.setState({ image: image, width: image.width, height: image.height });
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
      draw(this.gl, this.props.vertexSource, this.props.fragmentSource, image);
    };
  }

  render() {
    return (
      <canvas
        ref={this.canvas}
        width={this.state.width}
        height={this.state.height}
        style={{ height: "50vh", width: "100%", objectFit: "contain" }}
      ></canvas>
    );
  }
}

export default ZCanvas;
