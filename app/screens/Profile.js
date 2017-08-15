import React from 'react';
import PropTypes from 'prop-types';

import Container from '../components/Container';
import { PrimaryButton } from '../components/Form';
import { LargeText } from '../components/Text';

const Profile = ({ screenProps }) => {
  const { email, displayName, emailVerified } = screenProps.user;
  const { logout } = screenProps;
  return (
    <Container>
      <LargeText>
        {email} is logged in
      </LargeText>
      <LargeText>
        displayName: {displayName || 'none'}
      </LargeText>
      <LargeText>
        emailVerified: {emailVerified ? 'yes' : 'no'}
      </LargeText>
      <PrimaryButton title="Log out" onPress={logout} />
    </Container>
  );
};

Profile.propTypes = {
  screenProps: PropTypes.shape({
    email: PropTypes.string,
    displayName: PropTypes.string,
    emailVerified: PropTypes.bool,
  }).isRequired,
};

export default Profile;
