import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';

import LargeText from '../Text/LargeText';
import colors from '../../config/colors';

const styles = StyleSheet.create({
  detailsText: {
    paddingTop: 24,
    fontSize: 20,
    color: 'black',
  },
  standardText: {
    paddingTop: 20,
    color: colors.textSubtle,
  },
  redText: {
    color: colors.red,
    paddingVertical: 20,
  },
  tagTitleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  tagText: {
    color: colors.textSubtle,
    borderWidth: 1,
    borderColor: colors.textSubtle,
  },
});

const InteractiveCard = ({ item, details, handleLearnMore, handleSaveJob, saved }) =>
  (<Card>
    <View>
      <LargeText>
        {item.title}
      </LargeText>
      <Text style={details ? styles.detailsText : styles.standardText}>
        {item.description}
      </Text>
      {details &&
        <Text style={styles.tagTitleText}>
          Tags:{'  '}
          {item.tags.split(',').map(t =>
            (<Text key={t} style={styles.tagText}>
              {t}
            </Text>),
          )}
        </Text>}
      <Text style={[details ? styles.detailsText : styles.standardText, styles.redText]}>
        {item.applied} people have applied
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          raised
          fontSize={14}
          backgroundColor={saved ? colors.primary : colors.iconSubtle}
          icon={{ name: 'star' }}
          title={saved ? 'Saved!' : 'Save job'}
          onPress={() => handleSaveJob(item.key, saved)}
        />
        {!details &&
          <Button
            raised
            fontSize={14}
            backgroundColor={colors.iconSubtle}
            icon={{ name: 'list' }}
            title="Learn More"
            onPress={() => handleLearnMore(item.key)}
          />}
      </View>
    </View>
  </Card>);

InteractiveCard.propTypes = {
  item: PropTypes.object.isRequired, // eslint-disable-line
  handleLearnMore: PropTypes.func,
  handleSaveJob: PropTypes.func.isRequired,
  saved: PropTypes.bool.isRequired,
  details: PropTypes.bool,
};

InteractiveCard.defaultProps = {
  handleLearnMore: () => console.log('hLM'),
  details: false,
};

export default InteractiveCard;
