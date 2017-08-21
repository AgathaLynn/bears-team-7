import React from 'react';

import { firebaseApp } from './app/config/firebase';
import { Tabs, WelcomeRouter } from './app/config/router';
import Splash from './app/screens/Splash';

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
    // start watching for successful login or logout
    firebaseApp.auth().onAuthStateChanged((user, error) => {
      if (user) {
        return this.setState(() => ({ user, email: '', password: '' }));
      }
      if (error && error.message) {
        setTimeout(() => this.setState({ error: null }), 4000);
        return this.setState({ error: error.message });
      }
    });
    // splash screen loading timer
    setTimeout(() => this.setState({ loading: false }), 1000);
  }

  loginUser = (email, password) => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      // a successful signin is seen by onAuthStateChanged (in cDM); failure triggers this `catch`:
      .catch(error => {
        setTimeout(() => this.setState({ error: null }), 4000);
        return this.setState({ error: error.message });
      });
  };

  logoutUser = () => {
    firebaseApp.auth().signOut().then(() => {
      // return to initialState (after delay for splash screen)
      setTimeout(() => this.setState(initialState), 1000);
      this.setState({ loading: true });
    });
  };

  createUser = (email, password, repeatPassword) => {
    if (password !== repeatPassword) {
      setTimeout(() => this.setState({ error: null }), 4000);
      return this.setState({ error: 'Password and Repeat Password must match' });
    }
    firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(error => {
      setTimeout(() => this.setState({ error: null }), 4000);
      return this.setState(() => ({ error: error.message }));
    });
  };

  render() {
    if (this.state.loading) {
      return <Splash />;
    }
    if (this.state.user !== null) {
      // react-navigation allows one object called `screenProps` to be passed to a navigator.
      // Screens inside <Tabs> require user obj and the logoutUser function...
      return <Tabs screenProps={{ user: this.state.user, logout: this.logoutUser }} />;
    }
    return (
      // and screens inside <WelcomeRouter> need user-auth functions and possible error
      <WelcomeRouter
        screenProps={{
          login: this.loginUser,
          create: this.createUser,
          error: this.state.error,
        }}
      />
    );
  }
}
