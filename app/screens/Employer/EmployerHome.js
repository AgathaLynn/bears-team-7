import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';

import { firebaseDb } from '../../config/firebase';
import { JobOwnerCard } from '../../components/Card';
import Container from '../../components/Container';
import { LargeText } from '../../components/Text';
import colors from '../../config/colors';

export default class Home extends React.Component {
  static propTypes = {
    screenProps: PropTypes.object.isRequired, // eslint-disable-line
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    jobs: [],
    jobsRef: firebaseDb().ref(`users/${this.props.screenProps.user.uid}/createdJobs`),
  };

  componentDidMount() {
    this.state.jobsRef.on('value', dataSnapshot => {
      const jobs = dataSnapshot.val();
      if (!jobs) {
        return this.setState({ jobs: [] });
      }
      firebaseDb()
        .ref('jobs')
        .on('value', snapshot => {
          const jobDetails = snapshot.val();
          const jobDetailsArray = Object.keys(jobs).map(j => {
            if (!jobDetails[j]) return null;
            jobDetails[j].key = j;
            jobDetails[j].applied = jobDetails[j].applied || 0;
            return jobDetails[j];
          });
          this.setState({ jobs: jobDetailsArray });
        });
    });
  }
  componentWillUnmount() {
    this.state.jobsRef.off('value');
    firebaseDb()
      .ref('jobs')
      .off('value');
  }

  handleViewApplicants = jobId => this.props.navigation.navigate('Applicants', { jobId });
  handleEditJob = jobId => this.props.navigation.navigate('EditJob', { jobId });

  checkForSaved = item => {
    if (!item.savedBy) return false;
    const { uid } = this.props.screenProps.user;
    return Object.keys(item.savedBy).includes(uid);
  };
  render() {
    if (!this.state.jobs) {
      return (
        <Container>
          <LargeText>Loading</LargeText>
        </Container>
      );
    }
    return (
      <Container>
        <View style={{ flex: 1, justifyContent: 'flex-end', width: '80%' }}>
          <LargeText>Your Open Job Postings</LargeText>
        </View>
        <View style={{ flex: 5, width: '100%', borderColor: colors.iconSubtle, borderWidth: 2 }}>
          <FlatList
            data={this.state.jobs}
            renderItem={item => (
              <JobOwnerCard
                handleViewApplicants={this.handleViewApplicants}
                handleEditJob={this.handleEditJob}
                item={item.item}
              />
            )}
          />
        </View>
      </Container>
    );
  }
}
