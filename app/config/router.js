/* eslint-disable import/prefer-default-export */

import React from 'react';
import PropTypes from 'prop-types';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import colors from '../config/colors';
import Main from '../screens/Main';
import Profile from '../screens/Profile';

import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import Register from '../screens/Register';

// https://github.com/react-community/react-navigation/issues/710#issuecomment-287132056
const tabIcon = ({ tintColor, iconName }) => <Icon name={iconName} size={35} color={tintColor} />;
tabIcon.propTypes = {
  tintColor: PropTypes.string,
  iconName: PropTypes.string.isRequired,
};
tabIcon.defaultProps = {
  tintColor: 'red',
};

export const Tabs = TabNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      tabBarLabel: 'Main',
      tabBarIcon: tabIcon({ iconName: 'list', tintColor: colors.iconSubtle }),
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: tabIcon({ iconName: 'account-circle', tintColor: colors.iconSubtle }),
    },
  },
});

Profile.propTypes = {
  tintColor: PropTypes.string,
};

export const WelcomeRouter = StackNavigator({
  Welcome: {
    screen: Welcome,
  },
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  },
});
