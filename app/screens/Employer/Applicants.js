import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import Container from '../../components/Container';

export default class Applicants extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          jobId: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  render() {
    return (
      <Container>
        <Text>{this.props.navigation.state.params.jobId}</Text>
      </Container>
    );
  }
}
