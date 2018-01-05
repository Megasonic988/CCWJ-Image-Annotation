import React from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';

import ImageCanvas from './ImageCanvas';
import Labels from './Labels';
import Downloader from './Downloader';

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
        {!props.annotationsComplete ? 
          <Labels
            dotIndex={props.dotIndex}
            labelRegion={(dotIndex, label) => props.labelRegion(dotIndex, label)} /> :
          <Downloader 
            fileName={props.fileName} 
            restart={() => props.restart()} />
        }
        <Grid.Row style={{paddingTop: '50px'}}>
          <Button 
            color='red' 
            onClick={() => props.backDotIndex()} 
            icon
            labelPosition='left'>
            <Icon name='left arrow' />
            Last Label
          </Button>
        </Grid.Row>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Annotator;