import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles, { ICON_COLOR, ICON_SIZE, UNDERLAY_COLOR } from './styles';

const BigIcon = ({ name, onPress = () => null, loading = false }) => {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={onPress}
      underlayColor={UNDERLAY_COLOR}
      disabled={loading}
    >
      <View style={styles.button}>
        {loading
          ? <FontAwesome name="spinner" size={ICON_SIZE} color={ICON_COLOR} style={styles.icon} />
          : <Icon name={name} size={ICON_SIZE} color={ICON_COLOR} style={styles.icon} />}
      </View>
    </TouchableHighlight>
  );
};

BigIcon.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
};
BigIcon.defaultProps = {
  name: 'my-location',
  onPress: () => null,
  loading: false,
};
export default BigIcon;
