import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styles from './styles';

const ErrorText = props => {
  const text = Array.isArray(props.children) ? props.children.join('') : props.children;
  return (
    <Text style={styles.large}>
      {text}
    </Text>
  );
};

ErrorText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

ErrorText.defaultProps = {
  children: '',
};
export default ErrorText;
