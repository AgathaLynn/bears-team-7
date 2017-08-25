import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styles from './styles';

const LargeText = props => {
  const passedStyle = props.style ? props.style : {};
  const text = Array.isArray(props.children) ? props.children.join('') : props.children;
  return (
    <Text style={[styles.large, passedStyle]}>
      {text}
    </Text>
  );
};

LargeText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  style: PropTypes.object, // eslint-disable-line
};

LargeText.defaultProps = {
  children: '',
};

export default LargeText;
