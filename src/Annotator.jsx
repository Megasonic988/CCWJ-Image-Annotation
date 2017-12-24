import React, { Component } from 'react';
import { Row, Button } from 'react-bootstrap';

const labels = [
  "PF - Primary Ferrite",
  "PF (I) - Primary Ferrite Intragranular",
  "P - Pearlite",
  "FS (A) - Ferrite and Second Phases Aligned",
  "FS (I) - Ferrite and Second Phases Intragranular",
  "AF - Acicular Ferrite",
  "M - Martensite"
];

class Annotator extends Component {

  constructor() {
    super();
    this.state = {
      labels: labels
    };
  }

  render() {
    const { labels } = this.state;
    return (
      <div>
        <p>You are labelling region {this.props.dotIndex + 1}.</p>
        <div>
          <p>Please select the label:</p>
          {labels.map(label => (
            <Row key={label}>
              <Button 
                bsStyle="primary"
                onClick={() => this.props.labelRegion(this.props.dotIndex, label)}>
                {label}
              </Button>
            </Row>
          ))}
        </div>
      </div>
    );
  }
}

export default Annotator;