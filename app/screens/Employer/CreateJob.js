import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Yup from 'yup';

import { Button, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { LargeText } from '../../components/Text';
import { firebaseDb } from '../../config/firebase';
import Container from '../../components/Container';

const styles = StyleSheet.create({
  multilineContainer: {
    backgroundColor: '#feffff',
    flex: 1,
    height: 150,
    padding: 4,
    marginBottom: 4,
  },
  smallerMultilineContainer: {
    backgroundColor: '#feffff',
    flex: 1,
    height: 70,
    padding: 4,
    marginBottom: 4,
  },
  oneLineContainer: {
    backgroundColor: '#feffff',
    flex: 1,
    height: 35,
    padding: 4,
    marginBottom: 4,
  },
  textInputInsideContainer: {
    width: '100%',
  },
  buttonWrapper: {
    width: '95%',
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const MyInnerForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    handleReset,
    uploaderUid,
  } = props;
  values.uploaderUid = uploaderUid;
  return (
    <ScrollView style={{ width: '95%' }}>
      <FormLabel>contact email</FormLabel>
      <FormInput
        name="uploaderEmail"
        placeholder="email"
        value={values.uploaderEmail}
        onChangeText={text => setFieldValue('uploaderEmail', text)}
        onBlur={setFieldTouched}
        keyboardType={'email-address'}
        containerStyle={styles.oneLineContainer}
        inputStyle={styles.textInputInsideContainer}
      />
      {errors.uploaderEmail &&
      touched.uploaderEmail &&
        <FormValidationMessage className="input-feedback">
          {errors.uploaderEmail}
        </FormValidationMessage>
      }

      <FormLabel>Job Title/Position</FormLabel>
      <FormInput
        name="title"
        placeholder="job title"
        value={values.title}
        onChangeText={text => setFieldValue('title', text)}
        onBlur={setFieldTouched}
        containerStyle={styles.oneLineContainer}
        inputStyle={styles.textInputInsideContainer}
      />
      {errors.title && touched.title &&
        <FormValidationMessage>{errors.title}</FormValidationMessage>
      }
      <FormLabel>Summary description of the job</FormLabel>
      <FormInput
        name="shortDescription"
        placeholder="summary"
        value={values.shortDescription}
        onChangeText={text => setFieldValue('shortDescription', text)}
        onBlur={setFieldTouched}
        multiline
        containerStyle={styles.smallerMultilineContainer}
        inputStyle={styles.textInputInsideContainer}
      />
      {errors.shortDescription && touched.shortDescription &&
        <FormValidationMessage>{errors.shortDescription}</FormValidationMessage>
      }
      <FormLabel>A longer description of the position, requirements, etc.</FormLabel>
      <FormInput
        name="longDescription"
        placeholder="a long description of the job"
        value={values.longDescription}
        onChangeText={text => setFieldValue('longDescription', text)}
        onBlur={setFieldTouched}
        multiline
        containerStyle={styles.multilineContainer}
        inputStyle={styles.textInputInsideContainer}
      />
      {errors.longDescription && touched.longDescription &&
        <FormValidationMessage>{errors.longDescription}</FormValidationMessage>
      }
      <FormLabel>Tags (comma-separated)</FormLabel>
      <FormInput
        name="tags"
        placeholder="tags"
        value={values.tags}
        onChangeText={text => setFieldValue('tags', text)}
        onBlur={setFieldTouched}
        multiline
        containerStyle={styles.smallerMultilineContainer}
        inputStyle={styles.textInputInsideContainer}
      />
      {errors.tags && touched.tags &&
        <FormValidationMessage>{errors.tags}</FormValidationMessage>
      }

      <View style={styles.buttonWrapper}>
        <Button
          title="Reset"
          raised
          icon={{ name: 'code' }}
          onPress={handleReset}
          disabled={!dirty || isSubmitting}
        />
        <Button
          title="Submit"
          raised
          icon={{ name: 'assignment-turned-in' }}
          onPress={handleSubmit}
          disabled={isSubmitting}
        />
      </View>
      {/* <DisplayFormikState {...props} /> */}
    </ScrollView>
  );
};

// const DisplayFormikState = props => (
//   <View>
//     <Text style={{ paddingHorizontal: 20 }}>{JSON.stringify(props, null, 2)}</Text>
//   </View>
// );

MyInnerForm.propTypes = {
  values: PropTypes.object.isRequired, // eslint-disable-line
  touched: PropTypes.object.isRequired, // eslint-disable-line
  errors: PropTypes.object.isRequired, // eslint-disable-line
  uploaderUid: PropTypes.string.isRequired,
  dirty: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
};

const EnhancedForm = Formik({
  mapPropsToValues: () => ({
    uploaderEmail: '',
    title: '',
    shortDescription: '',
    longDescription: '',
    tags: '',
  }),
  validationSchema: Yup.object().shape({
    tags: Yup.string().required('At least 1 tag is required'),
    uploaderEmail: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    title: Yup.string().required('A Title is required'),
    shortDescription: Yup.string().required('A short desc is required'),
    longDescription: Yup.string().required('A long desc is required'),
  }),
  handleSubmit: (values, { setSubmitting, resetForm, props }) => {
    firebaseDb()
      .ref('jobs')
      .push(values)
      .then(() => {
        setSubmitting(false);
        Alert.alert(
          'Job successfully posted',
          'Your job will be listed immediately',
          [
            { text: 'Post another job', onPress: () => resetForm() },
            { text: 'Return to Employer Home', onPress: () => { resetForm(); props.nav('EmployerHome'); } },
          ],
          { cancelable: false },
        );
      });
  },
})(MyInnerForm);

const CreateJob = ({ screenProps, navigation }) =>
  (<Container>
    <View style={{ justifyContent: 'space-around' }}>
      <LargeText style={{ textAlign: 'center', paddingTop: 40 }}>Create a new job</LargeText>
      <LargeText style={{ textAlign: 'center' }}>(All fields required)</LargeText>
    </View>
    <EnhancedForm nav={navigation.navigate} uploaderUid={screenProps.user.uid} />
  </Container>);

CreateJob.propTypes = {
  navigation: PropTypes.object.isRequired, // eslint-disable-line
  screenProps: PropTypes.shape({
    user: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CreateJob;
