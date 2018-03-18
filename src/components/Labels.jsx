import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import * as GridCoordinates from '../helpers/GridCoordinates';

const labels = [
  "PF - Primary Ferrite",
  "PF(I) - Primary Ferrite Intragranular",
  "P - Pearlite",
  "FS - Ferrite and Second Phases",
  // "FS (A) - Ferrite and Second Phases Aligned",
  // "FS (I) - Ferrite and Second Phases Intragranular",
  "AF - Acicular Ferrite",
  "M - Martensite",
  "U - Undefined"
];

class Labels extends Component {

  constructor() {
    super();
    this.state = {
      labels: labels
    };
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  handleKeyDown(event) {
    const startingKeyCode = 49; // keycode for 1
    const labelIndex = event.keyCode - startingKeyCode;
    if (labelIndex >= 0 && labelIndex < this.state.labels.length) {
      const label = this.state.labels[labelIndex];
      this.label(this.props.dotIndex, label);
    }
  }

  label(dotIndex, label) {
    this.props.labelPoint(dotIndex, label);
    this.props.labelRegion(label);
  }

  render() {
    const { labels } = this.state;
    return (
      <div style={{paddingTop: '100px'}}>
        <p>Image {this.props.fileName}</p>
        <p><strong>You are labelling point {this.props.dotIndex + 1}.</strong></p>
        {this.props.region.point1 && this.props.region.point2 &&
          <p>You have selected a region with
            <strong>
              {' '}{GridCoordinates.getCoordinatesInRegion(
                this.props.canvasDimensions.width, this.props.canvasDimensions.height,
                this.props.region.point1, this.props.region.point2
              ).length}{' '}
            </strong> 
            points. Please label this region or click again to discard the region.
          </p>
        }
        <p>Please select the label:</p>
        <Grid style={{padding: '10px'}}>
          {labels.map((label, index) => (
            <Grid.Row key={label} style={{ paddingTop: '5px', paddingBottom: '5px' }}>
              <Button
                fluid
                color='brown'
                onClick={() => this.label(this.props.dotIndex, label)}>
                {'(' + (index + 1) + ') ' + label}
              </Button>
            </Grid.Row>
          ))}
        </Grid>
      </div>
    );
  }
}

export default Labels;