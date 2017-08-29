import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Avatar, CheckBox } from 'react-native-elements';
import md5 from 'md5';

import { firebaseDb } from '../../config/firebase';
import Container from '../../components/Container';
import { PrimaryButton, Input } from '../../components/Form';

export default class Profile extends React.Component {
  static propTypes = {
    screenProps: PropTypes.shape({
      logout: PropTypes.func.isRequired,
      user: PropTypes.shape({
        uid: PropTypes.string,
        email: PropTypes.string,
        displayName: PropTypes.string,
        photoURL: PropTypes.string,
        needsProfile: PropTypes.bool,
      }).isRequired,
    }).isRequired,
  };

  state = {
    displayName: '',
    dbUser: {},
    touched: false,
    userRef: firebaseDb().ref(`users/${this.props.screenProps.user.uid}`),
  };
  componentDidMount() {
    this.state.userRef.on('value', dataSnapshot => {
      const dbUser = dataSnapshot.val();
      this.setState({ dbUser });
    });
  }
  componentWillUnmount() {
    this.state.userRef.off('value');
  }
  _handleDisplayName = displayName => this.setState({ displayName, touched: true });
  _handleSubmit = () => {
    const { displayName } = this.state;
    if (!displayName.length) return false;
    this.state.userRef.update({
      displayName,
      needsProfile: false,
    });
    return this.setState({ displayName: '', touched: false });
  };
  _handleCheck = () => {
    this.state.userRef.update({
      isEmployer: !this.state.dbUser.isEmployer,
    });
  };
  render() {
    if (!this.state.dbUser.email) {
      return (
        <Container>
          <Text>Loading</Text>
        </Container>
      );
    }
    const { logout } = this.props.screenProps;
    const { email, displayName } = this.state.dbUser;
    let { photoURL } = this.state.dbUser;
    if (!photoURL) {
      const hash = md5(email);
      photoURL = `https://www.gravatar.com/avatar/${hash}`;
    }
    return (
      <Container>
        <Avatar style={{ flex: 2 }} large rounded source={{ uri: photoURL }} activeOpacity={0.7} />
        <View style={{ flex: 3, alignItems: 'center' }}>
          <Input label="Your email (this is not changable)" value={email} disabled />
          <Input
            label="Display Name"
            placeholder={displayName}
            value={this.state.displayName}
            onChangeText={this._handleDisplayName}
          />
          <CheckBox
            title="I am an Employer, not a job-seeker"
            iconRight
            checked={this.state.dbUser.isEmployer}
            onIconPress={this._handleCheck}
          />
          <Text style={{ textAlign: 'center', fontSize: 10 }}>
            (you must log out and sign in again for this checkbox to take effect.)
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <PrimaryButton title="Log out" onPress={logout} />
            <PrimaryButton
              title="Update Profile"
              disabled={!this.state.touched}
              onPress={() => this._handleSubmit(this.state.displayName)}
            />
          </View>
        </View>
      </Container>
    );
  }
}
