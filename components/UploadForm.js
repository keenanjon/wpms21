import React from 'react';
import PropTypes from 'prop-types';
import {Button, Input} from 'react-native-elements';
import RegisterForm from './RegisterForm';
// import useUploadForm from '../hooks/UploadHooks';

const UploadForm = ({title, handleSubmit, handleInputChange, loading}) => {
  return (
    <>
      <Input
        autoCapitalize="none"
        placeholder="title"
        onChangeText={(txt) => handleInputChange('title', txt)}
      />
      <Input
        autoCapitalize="none"
        placeholder="description"
        onChangeText={(txt) => handleInputChange('description', txt)}
      />

      <Button raised title={title} onPress={handleSubmit} loading={loading} />
      <Button title="Reset form" />
    </>
  );
};

UploadForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default UploadForm;
