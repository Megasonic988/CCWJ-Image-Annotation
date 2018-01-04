import React from 'react';
import { Segment, Container, Header } from 'semantic-ui-react';

const Welcome = () => (
  <Segment
    inverted
    textAlign='center'
    style={{ minHeight: 700, padding: '1em 0em' }}
    vertical
  >
    <Container text>
      <Header
        as='h1'
        content='CCWJ Image Annotations'
        inverted
        style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
      />
      <Header
        as='h2'
        content="Let's label some microstructures."
        inverted
        style={{ fontSize: '1.7em', fontWeight: 'normal' }}
      />
      {/* <Button primary size='huge'>
        Get Started
        <Icon name='right arrow' />
      </Button> */}
    </Container>
  </Segment>
);



export default Welcome;