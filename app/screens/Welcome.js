import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { PrimaryButton } from '../components/Form';
import Container from '../components/Container';
import { LargeText } from '../components/Text';
import colors from '../config/colors';
import fakeJobs from '../data/fakeJobs';

class Welcome extends React.Component {
  state = {
    jobs: fakeJobs,
  };

  componentDidMount() {
    // fetch jobs here in real use
  }
  _renderCard = ({ item }) =>
    (<Card>
      <View>
        <LargeText>
          {item.title}
        </LargeText>
        <Text style={{ paddingTop: 20, color: '#9e9e9e' }}>
          {item.description}
        </Text>
        <Text style={{ paddingTop: 20, color: 'red' }}>
          {item.applied} people have applied for this job
        </Text>
      </View>
    </Card>);

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
          <FlatList
            data={this.state.jobs}
            keyExtractor={item => item.id}
            renderItem={item => this._renderCard(item)}
          />
        </View>
      </Container>
    );
  }
}

Welcome.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
};

export default Welcome;
