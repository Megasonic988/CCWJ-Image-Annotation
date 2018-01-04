import React from 'react';
import { Grid } from 'semantic-ui-react'; 

import ImageCanvas from './ImageCanvas';
import Labels from './Labels';

const Annotator = (props) => (
  <Grid style={{padding: '40px'}}>
    <Grid.Row>
      <Grid.Column width={12}>
        <ImageCanvas
          imageUrl={props.imageUrl}
          dotIndex={props.dotIndex}
          setCanvasDimensions={(width, height) => props.setCanvasDimensions(width, height)} />
      </Grid.Column>
      <Grid.Column width={4}>
        <Labels
          dotIndex={props.dotIndex}
          labelRegion={(dotIndex, label) => props.labelRegion(dotIndex, label)} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Annotator;