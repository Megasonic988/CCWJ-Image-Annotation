import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';

const labels = [
  "PF - Primary Ferrite",
  "PF (I) - Primary Ferrite Intragranular",
  "P - Pearlite",
  "FS (A) - Ferrite and Second Phases Aligned",
  "FS (I) - Ferrite and Second Phases Intragranular",
  "AF - Acicular Ferrite",
  "M - Martensite",
  "Undefined"
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
      this.props.labelRegion(this.props.dotIndex, label);
    }
  }

  render() {
    const { labels } = this.state;
    return (
      <div style={{paddingTop: '100px'}}>
        <p><strong>You are labelling region {this.props.dotIndex + 1}.</strong></p>
        <p>Please select the label:</p>
        <Grid style={{padding: '10px'}}>
          {labels.map((label, index) => (
            <Grid.Row key={label} style={{ paddingTop: '5px', paddingBottom: '5px' }}>
              <Button
                fluid
                color='brown'
                onClick={() => this.props.labelRegion(this.props.dotIndex, label)}>
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