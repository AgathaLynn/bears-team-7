import React from 'react';

import { firebaseApp, firebaseDb } from './app/config/firebase';
import { Tabs, EmployerTabs, WelcomeRouter } from './app/config/router';
import Splash from './app/screens/Welcome/Splash';

const initialState = {
  user: null,
  error: null,
  loading: false,
};
export default class App extends React.Component {
  constructor() {
    super();
    this.state = { ...initialState, loading: true };
  }

  componentDidMount() {
    const userRef = firebaseDb().ref('users');
    // start watching for successful login or logout
    firebaseApp.auth().onAuthStateChanged((user, error) => {
      if (user) {
        // check for 'found' user in DB
        userRef.child(user.uid).once('value', snapshot => {
          const found = snapshot.val();
          if (!found) {
            // put new user in firebaseDb 'users/'
            userRef.child(user.uid).set({
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              needsProfile: true,
              isEmployer: false,
            });
          }
          const localUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            needsProfile: !found ? true : found.needsProfile,
            isEmployer: !found ? false : found.isEmployer,
          };
          return this.setState(() => ({ user: localUser, email: '', password: '' })); // or down one line?
        });
      }
      if (error && error.message) {
        setTimeout(() => this.setState({ error: null }), 4000);
        return this.setState({ error: error.message });
      }
    });
    // splash screen loading timer
    setTimeout(() => this.setState({ loading: false }), 1000);
  }

  setError = error => {
    setTimeout(() => this.setState({ error: null }), 4000);
    return this.setState(() => ({ error: error.message }));
  };

  logoutUser = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        // return to initialState (after delay for splash screen)
        setTimeout(() => this.setState(initialState), 1000);
        this.setState({ loading: true });
      });
  };

  render() {
    if (this.state.loading) {
      return <Splash />;
    }
    if (this.state.user !== null) {
      if (!this.state.user.isEmployer) {
        return (
          <Tabs
            onNavigationStateChange={null}
            screenProps={{ user: this.state.user, logout: this.logoutUser }}
          />
        );
      }
      return (
        <EmployerTabs
          onNavigationStateChange={null}
          screenProps={{ user: this.state.user, logout: this.logoutUser }}
        />
      );
    }
    return (
      <WelcomeRouter
        onNavigationStateChange={null}
        screenProps={{ error: this.state.error, setError: this.setError }}
      />
    );
  }
}
