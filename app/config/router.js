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
import EmployerHome from '../screens/EmployerHome';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import Register from '../screens/Register';
import JobDetail from '../screens/JobDetail';

// https://github.com/react-community/react-navigation/issues/710#issuecomment-287132056
const tabIcon = ({ focused, iconName }) =>
  <Icon name={iconName} size={35} color={focused ? 'white' : colors.primary} />;
tabIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  iconName: PropTypes.string.isRequired,
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
        tabBarIcon: ({ focused }) => tabIcon({ iconName: 'home', focused }),
      },
    },
    Favs: {
      screen: Favs,
      navigationOptions: {
        tabBarLabel: 'Favs',
        tabBarIcon: ({ focused }) => tabIcon({ iconName: 'star', focused }),
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({ focused }) => tabIcon({ iconName: 'list', focused }),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ focused }) => tabIcon({ iconName: 'account-circle', focused }),
      },
    },
  },
  {
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeBackgroundColor: '#ccc',
      activeTintColor: '#fff',
    },
  },
);
export const EmployerTabs = TabNavigator(
  {
    EmployerHome: {
      screen: EmployerHome,
      navigationOptions: {
        tabBarLabel: 'Employer Home',
        tabBarIcon: ({ focused }) => tabIcon({ iconName: 'home', focused }),
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({ focused }) => tabIcon({ iconName: 'list', focused }),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ focused }) => tabIcon({ iconName: 'account-circle', focused }),
      },
    },
  },
  {
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeBackgroundColor: '#ccc',
      activeTintColor: '#fff',
    },
  },
);

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
