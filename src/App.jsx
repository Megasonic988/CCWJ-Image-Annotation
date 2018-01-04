import React, { Component } from 'react';
import './App.css';
import { Dimmer, Loader } from 'semantic-ui-react';
import * as firebase from 'firebase';

import Annotator from './components/Annotator';
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import Uploader from './components/Uploader';

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
      },
      user: null,
      authLoaded: false
    };
    this.auth = firebase.auth();
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
  }

  onAuthStateChanged(user) {
    if (user) {
      this.setState({
        user: user,
        authLoaded: true
      });
    } else {
      this.setState({
        user: null,
        authLoaded: true
      });
    }
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
    imageRef.put(file, metadata).then(function (snapshot) {
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
        y: dotCoordinates[dotIndex].y,
        date: new Date()
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
        {!this.state.authLoaded &&
          <Dimmer active>
            <Loader />
          </Dimmer>
        }
        <NavBar user={this.state.user} />
        {this.state.authLoaded && !this.state.user && <Welcome />}
        {this.state.user && !this.state.imageUrl && 
          <Uploader
            handleImageChange={(e) => this.handleImageChange(e)}
          />
        }
        {this.state.user && this.state.imageUrl &&
          <Annotator
            imageUrl={this.state.imageUrl}
            dotIndex={this.state.dotIndex}
            setCanvasDimensions={(width, height) => this.setCanvasDimensions(width, height)}
            labelRegion={(dotIndex, label) => this.labelRegion(dotIndex, label)}
          />
        }
      </div>
    );
  }
}

export default App;
