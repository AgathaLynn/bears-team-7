import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import styles from './styles';

const Input = props =>
  (<View style={styles.view}>
    <FormLabel labelStyle={styles.label}>
      {props.label}
    </FormLabel>
    <FormInput autoCapitalize="none" autoCorrect={false} inputStyle={styles.input} {...props} />
  </View>);

Input.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Input;
