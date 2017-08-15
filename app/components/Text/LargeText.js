import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styles from './styles';

const LargeText = props => {
  const text = Array.isArray(props.children) ? props.children.join('') : props.children;
  return (
    <Text style={styles.large}>
      {text}
    </Text>
  );
};

LargeText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

LargeText.defaultProps = {
  children: '',
};

export default LargeText;
