import React from 'react';
import { Grid } from 'semantic-ui-react';

const Uploader = (props) => (
  <Grid style={{ 'paddingTop': '50px' }}>
    <Grid.Row>
      <Grid.Column textAlign='center' verticalAlign='middle'>
        <h3>
          Please upload an image to begin.
        </h3>
        <input
          style={{ marginTop: '25px' }}
          type="file"
          accept="image/*"
          onChange={e => props.handleImageChange(e)}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Uploader;