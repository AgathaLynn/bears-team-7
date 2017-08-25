import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { firebaseDb } from '../config/firebase';
import { InteractiveCard } from '../components/Card';
import Container from '../components/Container';
import { LargeText } from '../components/Text';
import colors from '../config/colors';

const initialState = {
  jobs: [],
  isSearching: false,
  searchTerm: '',
};

class Home extends React.Component {
  static propTypes = {
    screenProps: PropTypes.object.isRequired, // eslint-disable-line
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = initialState;

  componentDidMount() {
    const jobsRef = firebaseDb().ref('jobs');
    jobsRef.on('value', dataSnapshot => {
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

  _listBuild = searchTerm => {
    const term = searchTerm; // to work on case later
    return this.state.jobs.filter(
      entry =>
        entry.tags.indexOf(term) > -1 ||
        entry.description.includes(term) ||
        entry.title.includes(term),
    );
  };

  _search = searchTerm => {
    this.setState({ searchTerm });
    if (!this.state.isSearching) {
      this.setState({ isSearching: true });
    }
    return this._listBuild(this.state.searchTerm);
  };

  handleLearnMore = jobId => this.props.navigation.navigate('JobDetail', { jobId });
  handleSaveJob = (jobId, saved) => {
    const { uid } = this.props.screenProps.user;
    const oneJobRef = firebaseDb().ref(`jobs/${jobId}/savedBy/`);
    const userJobRef = firebaseDb().ref(`users/${uid}/jobs/`);
    if (!saved) {
      oneJobRef.child(uid).set(true);
      userJobRef.child(jobId).set(true);
      return;
    }
    userJobRef.child(jobId).remove();
    oneJobRef.child(uid).remove();
  };
  checkForSaved = item => {
    if (!item.savedBy) return false;
    const { uid } = this.props.screenProps.user;
    return Object.keys(item.savedBy).includes(uid);
  };
  render() {
    let jobs;
    if (!this.state.isSearching) {
      jobs = this.state.jobs.filter(entry => entry.featured); // need to limit #, IRL
    } else {
      jobs = this._listBuild(this.state.searchTerm);
    }
    return (
      <Container>
        <View style={{ flex: 1, justifyContent: 'flex-end', width: '80%' }}>
          <SearchBar
            ref={search => (this.search = search)} // eslint-disable-line
            round
            lightTheme
            value={this.state.searchTerm}
            onChangeText={term => this._search(term)}
            placeholder="Search..."
          />
          {!this.state.isSearching &&
            <LargeText style={{ textAlign: 'center' }}>Featured Jobs:</LargeText>}
        </View>
        <View style={{ flex: 5, width: '100%', borderColor: colors.iconSubtle, borderWidth: 2 }}>
          <FlatList
            data={jobs}
            renderItem={item =>
              (<InteractiveCard
                item={item.item}
                handleSaveJob={this.handleSaveJob}
                handleLearnMore={this.handleLearnMore}
                saved={this.checkForSaved(item.item)}
              />)}
          />
        </View>
      </Container>
    );
  }
}

export default Home;
