import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const Spacer = ({ height }) => <View style={{ height }} />;

Spacer.propTypes = {
  height: PropTypes.number,
};
Spacer.defaultProps = {
  height: 0,
};
export default Spacer;
