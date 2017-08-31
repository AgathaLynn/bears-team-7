/* eslint-disable import/prefer-default-export */

import React from 'react';
import PropTypes from 'prop-types';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import colors from '../config/colors';

import Login from '../screens/Welcome/Login';
import Welcome from '../screens/Welcome/Welcome';
import Register from '../screens/Welcome/Register';

import History from '../screens/User/History';
import JobDetail from '../screens/User/JobDetail';
import Home from '../screens/User/Home';
import Favs from '../screens/User/Favs';

import Profile from '../screens/Shared/Profile';

import EmployerHome from '../screens/Employer/EmployerHome';
import CreateJob from '../screens/Employer/CreateJob';

// https://github.com/react-community/react-navigation/issues/710#issuecomment-287132056
const tabIcon = ({ focused, iconName, iconSize = 35 }) => (
  <Icon name={iconName} size={iconSize} color={focused ? 'white' : colors.primary} />
);
tabIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.number,
};
tabIcon.defaultProps = {
  iconSize: 35,
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
    CreateJob: {
      screen: CreateJob,
      navigationOptions: {
        tabBarLabel: ({ focused }) => {
          return focused ? 'Create Job' : '';
        },
        tabBarIcon: ({ focused }) =>
          tabIcon({ iconName: 'add-circle', focused, iconSize: focused ? 35 : 80 }),
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
