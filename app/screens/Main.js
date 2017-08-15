import React from 'react';

import Container from '../components/Container';
import { LargeText } from '../components/Text';

class Main extends React.Component {
  render() {
    return (
      <Container>
        <LargeText>Welcome to this app.</LargeText>
        <LargeText>(This is `./screens/Main.js`.)</LargeText>
      </Container>
    );
  }
}

export default Main;
