import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-native-elements';

import { View, Text } from 'react-native';
import LargeText from '../Text/LargeText';

const PlainCard = ({ item }) =>
  (<Card>
    <View>
      <LargeText>
        {item.title}
      </LargeText>
      <Text style={{ paddingTop: 20, color: '#9e9e9e' }}>
        {item.description}
      </Text>
      <Text style={{ paddingTop: 20, color: 'red' }}>
        {item.applied} people have applied for this job
      </Text>
    </View>
  </Card>);
PlainCard.propTypes = {
  item: PropTypes.object.isRequired, // eslint-disable-line
};

export default PlainCard;
