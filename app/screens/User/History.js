import React from 'react';

import Container from '../../components/Container';
import { LargeText } from '../../components/Text';

export default class History extends React.Component {
  render() {
    return (
      <Container>
        <LargeText>Welcome to this app.</LargeText>
        <LargeText>(This is `./screens/History.js`.)</LargeText>
      </Container>
    );
  }
}
