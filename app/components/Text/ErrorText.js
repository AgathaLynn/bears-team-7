import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styles from './styles';

const ErrorText = props => {
  const passedStyles = props.style ? props.style : {};
  const text = Array.isArray(props.children) ? props.children.join('') : props.children;
  return (
    <Text style={[styles.large, passedStyles]}>
      {text}
    </Text>
  );
};

ErrorText.propTypes = {
  style: PropTypes.object, // eslint-disable-line
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

ErrorText.defaultProps = {
  children: '',
  style: {},
};
export default ErrorText;
