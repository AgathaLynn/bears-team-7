import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import { LargeText } from '../../components/Text';

const JobDetail = props => {
  return (
    <Container>
      <LargeText>
        this is the job detail for {props.navigation.state.params.jobId}
      </LargeText>
    </Container>
  );
};

JobDetail.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        jobId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default JobDetail;
