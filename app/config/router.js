/* eslint-disable import/prefer-default-export */

import React from 'react';
import PropTypes from 'prop-types';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import colors from '../config/colors';
import History from '../screens/History';
import Profile from '../screens/Profile';
import Home from '../screens/Home';
import Favs from '../screens/Favs';

import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import Register from '../screens/Register';
import JobDetail from '../screens/JobDetail';

// https://github.com/react-community/react-navigation/issues/710#issuecomment-287132056
const tabIcon = ({ tintColor, iconName }) => <Icon name={iconName} size={35} color={tintColor} />;
tabIcon.propTypes = {
  tintColor: PropTypes.string,
  iconName: PropTypes.string.isRequired,
};
tabIcon.defaultProps = {
  tintColor: 'red',
};

export const HomeStack = StackNavigator({
  Home: {
    screen: Home,
  },
  JobDetail: {
    screen: JobDetail,
  },
});

export const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: tabIcon({ iconName: 'home', tintColor: colors.iconSubtle }),
      },
    },
    Favs: {
      screen: Favs,
      navigationOptions: {
        tabBarLabel: 'Favs',
        tabBarIcon: tabIcon({ iconName: 'star', tintColor: colors.iconSubtle }),
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'History',
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
  },
  {
    lazy: true,
  },
);

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
