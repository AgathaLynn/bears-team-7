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

const JobOwnerCard = ({ item, handleViewApplicants, handleEditJob }) => (
  <Card>
    <View>
      <LargeText>{item.title}</LargeText>
      <Text style={styles.standardText}>{item.description}</Text>
      <Text style={styles.standardText}>{item.applied} people have applied</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          raised
          fontSize={14}
          backgroundColor={colors.primary}
          icon={{ name: 'list' }}
          title="Edit/Delete Job"
          onPress={() => handleEditJob(item.key)}
        />
        <Button
          raised
          fontSize={14}
          backgroundColor={colors.primary}
          icon={{ name: 'list' }}
          title="View Applicants"
          onPress={() => handleViewApplicants(item.key)}
        />
      </View>
    </View>
  </Card>
);

JobOwnerCard.propTypes = {
  item: PropTypes.object.isRequired, // eslint-disable-line
  handleViewApplicants: PropTypes.func.isRequired,
  handleEditJob: PropTypes.func.isRequired,
};

JobOwnerCard.defaultProps = {};

export default JobOwnerCard;
