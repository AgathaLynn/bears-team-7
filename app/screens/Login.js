import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native';

import { Input, PrimaryButton } from '../components/Form'; // *see Footnote
import { ErrorText, LargeText } from '../components/Text';

class Login extends React.Component {
  state = {
    email: 'w@w.com',
    password: '123456',
  };
  render() {
    const { error, login } = this.props.screenProps;
    return (
      <KeyboardAvoidingView behavior="position">
        {error
          ? <ErrorText
            style={{ paddingTop: 40, paddingBottom: 10, color: 'red', textAlign: 'center' }}
          >
            {error}
          </ErrorText>
          : <TouchableOpacity
            style={{
              width: '100%',
              paddingTop: 100,
              backgroundColor: 'transparent',
            }}
            onPress={() => Keyboard.dismiss()}
          />}
        <LargeText>Log in to your account</LargeText>
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
        <PrimaryButton
          title="Submit"
          onPress={() => login(this.state.email, this.state.password)}
        />
      </KeyboardAvoidingView>
    );
  }
}

Login.propTypes = {
  screenProps: PropTypes.shape({
    error: PropTypes.string,
    login: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;

/* FOOTNOTE: components imported on this line are built using react-native-elements, which
* will throw 'propTypes' errors in console (even though everything's fine, see:
* https://github.com/react-native-training/react-native-elements/issues/502#issuecomment-317446366.)
*/
