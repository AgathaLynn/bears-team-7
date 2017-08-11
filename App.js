import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { firebaseApp, firebaseDb } from './config/firebase';

/* NOTE: components imported on next line are built using react-native-elements, which
* will throw 'propTypes' errors in console (even though everything's fine, see:
* https://github.com/react-native-training/react-native-elements/issues/502#issuecomment-317446366.)
*/
import { Input, PrimaryButton } from './components/Form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  userText: {
    fontSize: 24,
  },
});

const initialState = {
  user: null,
  email: 'a@a.com',
  password: '123456',
  error: '',
};
export default class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }
  componentDidMount() {
    // start watching for successful login or logout
    firebaseApp.auth().onAuthStateChanged((user, error) => {
      if (user) {
        return this.setState(() => ({ user, email: '', password: '' }));
      }
      return error;
    });
  }

  loginUser = (email, password) => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      // a successful signin is seen by watchAuthState (above); a failure triggers this `catch`:
      .catch(error => {
        setTimeout(() => this.setState({ error: '' }), 4000);
        return this.setState({ error: error.message });
      });
  };

  logoutUser = () => {
    firebaseApp.auth().signOut().then(() => {
      this.setState(initialState);
    });
  };

  render() {
    // for now, in lieu of more-complex 'navigation' between pages, watch for a user object.
    // if this.state.user isn't null, there must be a user - so show some details and a logout btn
    if (this.state.user !== null) {
      const { displayName, email, emailVerified } = this.state.user;
      return (
        <View style={styles.container}>
          <Text style={styles.userText}>
            {email} is logged in
          </Text>
          <Text style={styles.userText}>
            displayName: {displayName || 'none'}
          </Text>
          <Text style={styles.userText}>
            emailVerified: {emailVerified ? 'yes' : 'no'}
          </Text>
          <PrimaryButton title="Log out" onPress={this.logoutUser} />
        </View>
      );
    }
    // ...else it *is* null, so return a View with 2 inputs and a Submit button.
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24 }}>this.state.user is currently null.</Text>
        <Input
          label="email"
          value={this.state.email}
          onChange={email => this.setState({ email })}
        />
        <Input
          label="password"
          value={this.state.password}
          onChange={password => this.setState({ password })}
        />
        <PrimaryButton
          title="Submit"
          onPress={() => this.loginUser(this.state.email, this.state.password)}
        />
      </View>
    );
  }
}
