import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Grid, Row, Col, Navbar } from 'react-bootstrap';

class App extends Component {

  constructor() {
    super();
    this.state = {
      file: null,
      imageUrl: null
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.fill();
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imageUrl: reader.result
      });
    }
    reader.readAsDataURL(file);
  }

  calculateCanvasHeight(canvasWidth, imageWidth, imageHeight) {
    console.log(canvasWidth)
    return canvasWidth / imageWidth * imageHeight;
  }

  handleImageLoaded() {
    const canvas = this.refs.canvas;
    const image = this.refs.image;
    canvas.width = canvas.offsetWidth;
    canvas.height = this.calculateCanvasHeight(canvas.offsetWidth, image.width, image.height);
    const ctx = canvas.getContext("2d");
    const radius = 1;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    for (let x = 10; x < canvas.width; x = x + 20) {
      for (let y = 10; y < canvas.height; y = y + 20) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "white";
        ctx.fill();
      }
    }
  }

  handleImageLoadError() {
    console.log("Image Load Error!");
  }

  render() {
    const { imageUrl } = this.state;
    let image = null;
    if (imageUrl) {
      image = (
        <img
          ref="image"
          src={imageUrl}
          className="hidden"
          onLoad={() => this.handleImageLoaded()}
          onError={() => this.handleImageLoadError()}
        />
      );
    }
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              CCWJ Image Annotation
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Navbar>
        <Row>
          <Col md={9} className="text-center">
            <canvas ref="canvas"/>
            {image}
          </Col>
          <Col md={3}>
            <input type="file" accept="image/*" onChange={e => this.handleImageChange(e)} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
