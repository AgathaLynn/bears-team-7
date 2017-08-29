import React from 'react';
// import PropTypes from 'prop-types';
import { Text } from 'react-native';
// import { firebaseDb } from '../config/firebase';
import Container from '../components/Container';

const initialState = {};

class Home extends React.Component {
  static propTypes = {};
  state = initialState;
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    return (
      <Container>
        <Text>Employer Home screen</Text>
      </Container>
    );
  }
}

export default Home;
