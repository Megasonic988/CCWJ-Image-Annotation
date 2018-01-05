import React, { Component } from 'react';
import * as GridCoordinates from '../helpers/GridCoordinates';

class ImageCanvas extends Component {

  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate() {
    this.clearCanvas();
    this.drawImage();
    this.drawDots();
  }

  shouldComponentUpdate(nextProps) {
    const imageUrlChanged = nextProps.imageUrl !== this.props.imageUrl;
    const dotIndexChanged = nextProps.dotIndex !== this.props.dotIndex;
    return imageUrlChanged || dotIndexChanged;
  }

  handleImageLoaded() {
    this.drawImage();
    this.drawDots();
  }

  clearCanvas() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawCanvas() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  calculateCanvasHeight(canvasWidth, imageWidth, imageHeight) {
    return canvasWidth / imageWidth * imageHeight;
  }

  drawImage() {
    const canvas = this.refs.canvas;
    const image = this.refs.image;
    canvas.width = canvas.offsetWidth;
    canvas.height = this.calculateCanvasHeight(canvas.offsetWidth, image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    this.props.setCanvasDimensions(canvas.width, canvas.height);
  }

  drawDots() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const radius = 2;
    const { dotIndex } = this.props;
    const dotCoordinates = GridCoordinates.getCoordinates(canvas.width, canvas.height);
    dotCoordinates.forEach((c, index) => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = index === dotIndex ? "red" : "white";
      ctx.fill();
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "black";
      ctx.stroke();
    });
  }

  handleImageLoadError() {
    console.log("Image Load Error!");
  }

  render() {
    const { imageUrl } = this.props;
    let image = null;
    if (imageUrl) {
      image = (
        <img
          ref="image"
          alt="Placeholder element"
          src={imageUrl}
          className="hidden"
          onLoad={() => this.handleImageLoaded()}
          onError={() => this.handleImageLoadError()}
        />
      );
    }
    return (
      <div>
        <canvas ref="canvas" />
        {image}
      </div>
    );
  }
}

export default ImageCanvas;