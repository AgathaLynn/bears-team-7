/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import styles from './styles';

const Container = ({ scroll, children, passProps }) => {
  if (scroll === true) {
    return (
      <ScrollView style={styles.scrollView} {...passProps}>
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={styles.view} {...passProps}>
      {children}
    </View>
  );
};

Container.propTypes = {
  scroll: PropTypes.bool,
  children: PropTypes.any,
  passProps: PropTypes.object,
};

Container.defaultProps = {
  scroll: false,
  children: null,
  passProps: {},
};

export default Container;
