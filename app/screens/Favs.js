import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';

import { InteractiveCard } from '../components/Card';
import { LargeText } from '../components/Text';
import { firebaseDb } from '../config/firebase';
import colors from '../config/colors';
import Container from '../components/Container';

class Favs extends React.Component {
  static propTypes = {
    screenProps: PropTypes.object.isRequired, // eslint-disable-line
    // navigation: PropTypes.shape({
    //   navigate: PropTypes.func.isRequired,
    // }).isRequired,
  };

  state = {
    jobs: [],
  };

  componentDidMount() {
    const { uid } = this.props.screenProps.user;
    const usersSavedJobsRef = firebaseDb().ref(`users/${uid}/jobs`);
    usersSavedJobsRef.on('value', dataSnapshot => {
      const jobs = dataSnapshot.val();
      if (!jobs) {
        return this.setState({ jobs: [] });
      }
      let jobDetailsArray = [];
      firebaseDb().ref('jobs/').once('value', snapshot => {
        const jobDetails = snapshot.val();
        jobDetailsArray = Object.keys(jobs).map(j => {
          jobDetails[j].key = j;
          return jobDetails[j];
        });
        this.setState({ jobs: jobDetailsArray });
      });
    });
  }
  componentWillUnmount() {
    const { uid } = this.props.screenProps.user;
    const usersSavedJobsRef = firebaseDb().ref(`users/${uid}/jobs`);
    usersSavedJobsRef.off('value');
  }
  handleSaveJob = jobId => {
    const { uid } = this.props.screenProps.user;
    firebaseDb().ref(`jobs/${jobId}/savedBy/${uid}`).remove();
    firebaseDb().ref(`users/${uid}/jobs/${jobId}`).remove();
  };
  render() {
    if (this.state.jobs.length > 0) {
      return (
        <Container>
          <View style={{ flex: 1, width: '100%', borderColor: colors.iconSubtle, borderWidth: 2 }}>
            <FlatList
              data={this.state.jobs}
              renderItem={item =>
                (<InteractiveCard
                  details
                  item={item.item}
                  handleSaveJob={this.handleSaveJob}
                  saved
                />)}
            />
          </View>
        </Container>
      );
    }
    return (
      <Container>
        <LargeText>no saved jobs!</LargeText>
      </Container>
    );
  }
}

export default Favs;
