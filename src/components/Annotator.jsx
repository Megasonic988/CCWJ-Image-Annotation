import React from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';

import ImageCanvas from './ImageCanvas';
import Labels from './Labels';
import Downloader from './Downloader';

const Annotator = (props) => (
  <Grid style={{ padding: '40px' }}>
    <Grid.Row>
      <Grid.Column width={12}>
        <ImageCanvas
          imageUrl={props.imageUrl}
          dotIndex={props.dotIndex}
          labelledPoints={props.labelledPoints}
          setRegion={(point1, point2) => props.setRegion(point1, point2)}
          region={props.region}
          setCanvasDimensions={(width, height) => props.setCanvasDimensions(width, height)} />
      </Grid.Column>
      <Grid.Column width={4}>
        {!props.annotationsComplete ?
          <Labels
            dotIndex={props.dotIndex}
            labelPoint={(dotIndex, label) => props.labelPoint(dotIndex, label)}
            region={props.region}
            fileName={props.fileName}
            canvasDimensions={props.canvasDimensions}
            labelRegion={(label) => props.labelRegion(label)} /> :
          <Downloader
            fileName={props.fileName}
            restart={() => props.restart()} />
        }
        <Grid.Row style={{ paddingTop: '50px' }}>
          <Button
            color='red'
            onClick={() => props.backDotIndex()}
            icon
            labelPosition='left'>
            <Icon name='left arrow' />
            Back
          </Button>
          <Button
            color='grey'
            onClick={() => props.skipDotIndex()}
            icon
            labelPosition='right'>
            <Icon name='right arrow' />
            Skip
          </Button>
        </Grid.Row>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Annotator;