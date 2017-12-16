import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Grid, Row, Col } from 'react-bootstrap';

const forestUrl = "https://vignette.wikia.nocookie.net/tya-universe/images/c/ca/Tangerine-forest.jpg/revision/latest/scale-to-width-down/640?cb=20130818014507";
const appleUrl = "https://static.pexels.com/photos/39803/pexels-photo-39803.jpeg";

class App extends Component {

  constructor() {
    super();
    this.state = {
      
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const img = this.refs.image;

    img.onload = () => {
      const radius = 1;

      ctx.drawImage(img, 0, 0, 640, 425);
      for (let x = 10; x < 640; x = x + 20) {
        for (let y = 10; y < 425; y = y + 20) {
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = "white";
          ctx.fill();
        }
      }
    }
  }

  render() {
    return (
      <Row>
        <Col xs={8} className="text-center">
          <canvas ref="canvas" width={640} height={425} />
          <img
            ref="image"
            src={forestUrl}
            className="hidden"
          />
        </Col>
        <Col xs={4} className="outline">
          Labelling Controls
        </Col>
      </Row>
    );
  }
}

export default App;
