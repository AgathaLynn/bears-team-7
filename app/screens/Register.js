import React from 'react';
import PropTypes from 'prop-types';

import Container from '../components/Container';
/* NOTE: components imported on next line are built using react-native-elements, which
* will throw 'propTypes' errors in console (even though everything's fine, see:
* https://github.com/react-native-training/react-native-elements/issues/502#issuecomment-317446366.)
*/
import { Input, PrimaryButton } from '../components/Form';
import { ErrorText, LargeText } from '../components/Text';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      repeatPassword: '',
    };
  }
  handleRepeatPassword = repeatPassword => this.setState({ repeatPassword });
  // handleLogin = (email, password, repeatPassword) => {
  //   if (!email || !password || !repeatPassword) return false;
  //   if (password !== repeatPassword) return false;
  //   return create(email, password);
  // }
  render() {
    const {
      error,
      email,
      password,
      handleEmailChange,
      handlePasswordChange,
      create,
    } = this.props.screenProps;
    return (
      <Container>
        {error
          ? <ErrorText>
            {error}
          </ErrorText>
          : <LargeText>the user object is currently null.</LargeText>}
        <Input label="email" value={email} onChangeText={handleEmailChange} />
        <Input label="password" value={password} onChangeText={handlePasswordChange} />
        <Input
          label="repeatPassword"
          value={this.state.repeatPassword}
          onChangeText={this.handleRepeatPassword}
        />
        <PrimaryButton title="Create Account" onPress={() => create(email, password)} />
      </Container>
    );
  }
}

Register.propTypes = {
  screenProps: PropTypes.shape({
    error: PropTypes.string,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    create: PropTypes.func.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
  }).isRequired,
};

export default Register;
