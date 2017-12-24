import React, { Component } from 'react';
import './App.css';
import { Row, Col, Navbar } from 'react-bootstrap';
import ImageCanvas from './ImageCanvas';
import Annotator from './Annotator';

class App extends Component {

  constructor() {
    super();
    this.state = {
      imageUrl: null,
      dotIndex: 0
    };
  }

  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imageUrl: reader.result
      });
    }
    reader.readAsDataURL(file);
  }

  labelRegion(dotIndex, label) {
    console.log("labelled", dotIndex, label);
    this.setState({
      dotIndex: dotIndex + 1
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
                dotIndex={this.state.dotIndex} /> :
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
