import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native';
// import Container from '../components/Container';
/* NOTE: components imported on next line are built using react-native-elements, which
* will throw 'propTypes' errors in console (even though everything's fine, see:
* https://github.com/react-native-training/react-native-elements/issues/502#issuecomment-317446366.)
*/
import { Input, PrimaryButton } from '../../components/Form';
import { ErrorText, LargeText } from '../../components/Text';
import { firebaseApp } from '../../config/firebase';

export default class Register extends React.Component {
  static propTypes = {
    screenProps: PropTypes.shape({
      error: PropTypes.string,
      setError: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    email: 'w@w.com',
    password: '123456',
    repeatPassword: '123456',
  };

  create = (email, password, repeatPassword) => {
    if (password !== repeatPassword) {
      return this.props.screenProps.setError({ error: 'Password and Repeat Password must match' });
    }
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        this.props.screenProps.setError(error);
      });
  };

  render() {
    const { error } = this.props.screenProps;
    return (
      <KeyboardAvoidingView behavior="position">
        {error ? (
          <ErrorText
            style={{ paddingTop: 40, paddingBottom: 10, color: 'red', textAlign: 'center' }}
          >
            {error}
          </ErrorText>
        ) : (
          <TouchableOpacity
            style={{
              width: '100%',
              paddingTop: 100,
              backgroundColor: 'transparent',
            }}
            onPress={() => Keyboard.dismiss()}
          />
        )}

        <LargeText>Register for a new account:</LargeText>
        <Input
          label="email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <Input
          label="password"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Input
          label="repeatPassword"
          value={this.state.repeatPassword}
          onChangeText={repeatPassword => this.setState({ repeatPassword })}
        />
        <PrimaryButton
          title="Create Account"
          onPress={() =>
            this.create(this.state.email, this.state.password, this.state.repeatPassword)}
        />
      </KeyboardAvoidingView>
    );
  }
}
