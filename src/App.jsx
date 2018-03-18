import React, { Component } from 'react';
import './App.css';
import { Dimmer, Loader } from 'semantic-ui-react';
import * as firebase from 'firebase';
import * as GridCoordinates from './helpers/GridCoordinates';

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
      region: {
        point1: null,
        point2: null
      },
      annotationsComplete: false,
      user: null,
      authLoaded: false,
      labelledPoints: []
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

    // Get already labelled points from Firebase
    const id = file.name.replace(/[^a-zA-Z0-9]/g, '');
    firebase
      .database()
      .ref('annotations/' + id)
      .once('value', snapshot => {
        if (!snapshot.val()) return;
        const indexes = Object.keys(snapshot.val());
        const maxIndex = indexes[indexes.length - 1];
        const loadedLabelledPoints = []
        for (let i = 0; i < maxIndex; i++) {
          if (snapshot.val()[i]) {
            loadedLabelledPoints.push(snapshot.val()[i]);
          } else {
            loadedLabelledPoints.push(null);
          }
        }
        this.setState({
          labelledPoints: loadedLabelledPoints
        });
      });
  }

  labelPoint(dotIndex, label) {
    if (this.state.region.point1 && this.state.region.point2) return;
    const dotCoordinates = GridCoordinates.getCoordinates(this.state.canvas.width, this.state.canvas.height);
    const id = this.state.file.name.replace(/[^a-zA-Z0-9]/g, '');
    const point = {
      name: this.state.file.name,
      label: label,
      x: dotCoordinates[dotIndex].x,
      y: dotCoordinates[dotIndex].y,
      dotIndex: dotIndex,
      date: new Date().toISOString()
    };
    firebase
      .database()
      .ref('annotations/' + id + '/' + dotIndex)
      .set(point);
    const labelledPointsCopy = this.state.labelledPoints.slice();
    labelledPointsCopy[dotIndex] = point;
    this.setState({
      dotIndex: dotIndex + 1,
      annotationsComplete: (dotIndex + 1) >= dotCoordinates.length,
      labelledPoints: labelledPointsCopy
    });
  }

  labelRegion(label) {
    if (this.state.region.point1 && this.state.region.point2) {
      const dotCoordinates = GridCoordinates.getCoordinatesInRegion(
        this.state.canvas.width, this.state.canvas.height,
        this.state.region.point1, this.state.region.point2);
      const id = this.state.file.name.replace(/[^a-zA-Z0-9]/g, '');
      const labelledPointsCopy = this.state.labelledPoints.slice();
      dotCoordinates.forEach(c => {
        const point = {
          name: this.state.file.name,
          label: label,
          x: c.x,
          y: c.y,
          dotIndex: c.dotIndex,
          date: new Date().toISOString()
        };
        firebase
          .database()
          .ref('annotations/' + id + '/' + c.dotIndex)
          .set(point);
        labelledPointsCopy[c.dotIndex] = point;
      });
      this.setState({
        labelledPoints: labelledPointsCopy
      });
      this.setRegion(null, null);
    }
  }

  backDotIndex() {
    if (this.state.dotIndex > 0) {
      this.setState({
        dotIndex: this.state.dotIndex - 1,
        annotationsComplete: false
      });
    }
  }

  skipDotIndex() {
    const dotCoordinates = GridCoordinates.getCoordinates(this.state.canvas.width, this.state.canvas.height);
    this.setState({
      dotIndex: this.state.dotIndex + 1,
      annotationsComplete: (this.state.dotIndex + 1) >= dotCoordinates.length,
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

  setRegion(regionPoint1, regionPoint2) {
    this.setState({
      region: {
        point1: regionPoint1,
        point2: regionPoint2
      }
    });
  }

  restart() {
    this.setState({
      imageUrl: null,
      file: null,
      dotIndex: 0,
      canvas: {
        width: null,
        height: null
      },
      annotationsComplete: false
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
            fileName={this.state.file.name}
            dotIndex={this.state.dotIndex}
            labelledPoints={this.state.labelledPoints}
            setCanvasDimensions={(width, height) => this.setCanvasDimensions(width, height)}
            canvasDimensions={this.state.canvas}
            labelPoint={(dotIndex, label) => this.labelPoint(dotIndex, label)}
            labelRegion={(label) => this.labelRegion(label)}
            region={this.state.region}
            backDotIndex={() => this.backDotIndex()}
            skipDotIndex={() => this.skipDotIndex()}
            annotationsComplete={this.state.annotationsComplete}
            setRegion={(point1, point2) => this.setRegion(point1, point2)}
            restart={() => this.restart()}
          />
        }
      </div>
    );
  }
}

export default App;
