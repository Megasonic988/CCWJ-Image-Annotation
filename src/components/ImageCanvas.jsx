import React, { Component } from 'react';
import * as GridCoordinates from '../helpers/GridCoordinates';

class ImageCanvas extends Component {

  componentDidMount() {
    const canvas = this.refs.canvas;
    canvas.addEventListener("mousedown", this.getCursorPosition.bind(this), false);
  }

  componentDidUpdate() {
    this.clearCanvas();
    this.drawImage();
    this.drawDots();
    this.drawSelectedRegion();
  }

  shouldComponentUpdate(nextProps) {
    const imageUrlChanged = nextProps.imageUrl !== this.props.imageUrl;
    const dotIndexChanged = nextProps.dotIndex !== this.props.dotIndex;
    const regionChanged = (nextProps.region.point1 !== this.props.region.point1) || 
                          (nextProps.region.point2 !== this.props.region.point2);
    const labelledPointsChanged = nextProps.labelledPoints.filter(c => c).length !== 
                                  this.props.labelledPoints.filter(c => c).length;
    return imageUrlChanged || dotIndexChanged || regionChanged || labelledPointsChanged;
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

  calculateCanvasHeight(canvasWidth, imageWidth, imageHeight) {
    return canvasWidth / imageWidth * imageHeight;
  }

  drawImage() {
    const canvas = this.refs.canvas;
    const image = this.refs.image;
    canvas.width = image.width;
    canvas.height = image.height;
    // canvas.width = canvas.offsetWidth;
    // canvas.height = this.calculateCanvasHeight(canvas.offsetWidth, image.width, image.height);
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
      // Draw circle at coordinate
      ctx.beginPath();
      ctx.arc(c.x, c.y, radius, 0, 2 * Math.PI, false);
      if (index === dotIndex) {
        ctx.fillStyle = 'red';
      } else {
        ctx.fillStyle = 'white'
      }
      ctx.fill();
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "black";
      ctx.stroke();
    });
    dotCoordinates.forEach((c, index) => {
      // Draw class label if coordinate already labelled
      if (this.props.labelledPoints[index]) {
        ctx.beginPath();
        ctx.arc(c.x, c.y, radius, 0, 2 * Math.PI, false);
        if (index === dotIndex) {
          ctx.fillStyle = 'red';
        } else {
          ctx.fillStyle = 'green';
        }
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.font = "bold 10px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText(this.props.labelledPoints[index].label.split(' - ')[0], c.x + 3, c.y - 3);      
      }
    });
  }

  drawSelectedRegion() {
    if (this.props.region.point1 && this.props.region.point2) {
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");
      const { point1, point2 } = this.props.region;
      ctx.fillStyle = "red";
      ctx.globalAlpha = 0.2;
      ctx.fillRect(point1.x, point1.y, point2.x - point1.x, point2.y - point1.y);
    }
  }

  getCursorPosition(event) {
    const canvas = this.refs.canvas;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (!this.props.region.point1 && !this.props.region.point1) {
      this.props.setRegion({ x: x, y: y }, null);
    } else if (this.props.region.point1 && !this.props.region.point2) {
      this.props.setRegion(this.props.region.point1, { x: x, y: y });
    } else {
      this.props.setRegion(null, null);
    }
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
      <div style={{overflow: 'scroll'}}>
        <canvas ref="canvas" />
        {image}
      </div>
    );
  }
}

export default ImageCanvas;