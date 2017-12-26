import React, { Component } from 'react';
import './App.css';
import { Row, Col, Navbar } from 'react-bootstrap';
import ImageCanvas from './ImageCanvas';
import Annotator from './Annotator';
import * as firebase from 'firebase';

class App extends Component {

  constructor() {
    super();
    this.state = {
      imageUrl: null,
      file: null,
      dotIndex: 0,
      canvas: {
        width: null,
        height: null
      }
    };
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
    const metadata = {
      type: file.type,
      size: file.size
    };
    const imageRef = firebase.storage().ref().child('images/' + file.name)
    imageRef.put(file, metadata).then(function(snapshot) {
      console.log('uploaded file!');
    });
  }

  labelRegion(dotIndex, label) {
    this.setState({
      dotIndex: dotIndex + 1
    });
    const dotCoordinates = [];
    for (let y = 10; y < this.state.canvas.height; y = y + 20) {
      for (let x = 10; x < this.state.canvas.width; x = x + 20) {
        dotCoordinates.push({ x: x, y: y });
      }
    }
    firebase
      .database()
      .ref('annotations/')
      .push({
        name: this.state.file.name,
        dotIndex: dotIndex,
        label: label,
        x: dotCoordinates[dotIndex].x,
        y: dotCoordinates[dotIndex].y
      });
  }

  setCanvasDimensions(width, height) {
    this.setState({
      canvas: {
        width: width,
        height: height
      }
    });
  }

  render() {
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
            {this.state.imageUrl?
              <ImageCanvas
                imageUrl={this.state.imageUrl}
                dotIndex={this.state.dotIndex}
                setCanvasDimensions={(width, height) => this.setCanvasDimensions(width, height)} /> :
              <h3>
                Welcome to the CCWJ Image Annotation application! Please upload an image to begin.
              </h3>
            }
          </Col>
          <Col md={3}>
            <Row>
              <input
                style={{marginTop: '25px'}}
                type="file"
                accept="image/*"
                onChange={e => this.handleImageChange(e)}
                className={this.state.imageUrl ? "hidden" : ""} />
              {this.state.imageUrl ?
                <Annotator
                  dotIndex={this.state.dotIndex}
                  labelRegion={(dotIndex, label) => this.labelRegion(dotIndex, label)} /> : ""}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
