import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';

import { firebaseDb } from '../config/firebase';
import { PrimaryButton } from '../components/Form';
import Container from '../components/Container';
import { PlainCard } from '../components/Card';
import colors from '../config/colors';

class Welcome extends React.Component {
  state = {
    jobs: [],
  };
  componentDidMount() {
    const jobsRef = firebaseDb().ref('jobs');
    jobsRef.once('value', dataSnapshot => {
      const firebaseJobsObject = dataSnapshot.val();
      if (!firebaseJobsObject) {
        return this.setState({ jobs: [] });
      }
      const jobsArray = Object.keys(firebaseJobsObject).map(oneObj => {
        return Object.assign({}, firebaseJobsObject[oneObj], {
          key: oneObj,
          applied: firebaseJobsObject[oneObj].applied || 0,
        });
      });
      this.setState({ jobs: jobsArray });
    });
  }
  componentWillUnmount() {
    const jobsRef = firebaseDb().ref('jobs');
    jobsRef.off('value');
  }
  render() {
    return (
      <Container>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <PrimaryButton
            title="I have an account"
            onPress={() => this.props.navigation.navigate('Login')}
          />
          <PrimaryButton
            title="Sign me up"
            onPress={() => this.props.navigation.navigate('Register')}
          />
        </View>
        <View style={{ flex: 5, width: '100%', borderColor: colors.iconSubtle, borderWidth: 2 }}>
          <FlatList data={this.state.jobs} renderItem={item => <PlainCard item={item.item} />} />
        </View>
      </Container>
    );
  }
}

Welcome.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
};

export default Welcome;
