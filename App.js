import React from 'react';

import { firebaseApp, firebaseDb } from './app/config/firebase';
import { Tabs, EmployerTabs, WelcomeRouter } from './app/config/router';
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
      if (!this.state.user.isEmployer) {
        // react-navigation allows one object called `screenProps` to be passed to a navigator.
        // Screens inside <Tabs> require user obj and the logoutUser function...
        return <Tabs screenProps={{ user: this.state.user, logout: this.logoutUser }} />;
      }
      // if user checks the `isEmployer`, send a different TabNavigator
      return <EmployerTabs screenProps={{ user: this.state.user, logout: this.logoutUser }} />;
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
