import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';

const labels = [
  "PF - Primary Ferrite",
  "PF (I) - Primary Ferrite Intragranular",
  "P - Pearlite",
  "FS (A) - Ferrite and Second Phases Aligned",
  "FS (I) - Ferrite and Second Phases Intragranular",
  "AF - Acicular Ferrite",
  "M - Martensite"
];

class Labels extends Component {

  constructor() {
    super();
    this.state = {
      labels: labels
    };
  }

  render() {
    const { labels } = this.state;
    return (
      <div style={{paddingTop: '100px'}}>
        <p><strong>You are labelling region {this.props.dotIndex + 1}.</strong></p>
        <p>Please select the label:</p>
        <Grid style={{padding: '10px'}}>
          {labels.map(label => (
            <Grid.Row key={label} style={{ paddingTop: '5px', paddingBottom: '5px' }}>
              <Button
                fluid
                color='brown'
                onClick={() => this.props.labelRegion(this.props.dotIndex, label)}>
                {label}
              </Button>
            </Grid.Row>
          ))}
        </Grid>
      </div>
    );
  }
}

export default Labels;