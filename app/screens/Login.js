import React from 'react';
import PropTypes from 'prop-types';

import Container from '../components/Container';
/* NOTE: components imported on next line are built using react-native-elements, which
* will throw 'propTypes' errors in console (even though everything's fine, see:
* https://github.com/react-native-training/react-native-elements/issues/502#issuecomment-317446366.)
*/
import { Input, PrimaryButton } from '../components/Form';
import { ErrorText, LargeText } from '../components/Text';

class Login extends React.Component {
  render() {
    const {
      error,
      email,
      password,
      login,
      handleEmailChange,
      handlePasswordChange,
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
        <PrimaryButton title="Submit" onPress={() => login(email, password)} />
      </Container>
    );
  }
}

Login.propTypes = {
  screenProps: PropTypes.shape({
    error: PropTypes.string,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
