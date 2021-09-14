import {useState} from 'react';
import {useUser} from './ApiHooks';
import {validator} from '../utils/validator';

const constraints = {
  title: {
    presence: true,
    length: {
      minimum: 3,
      message: 'minimum 3 chars',
    },
  },
  description: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 characters',
    },
  },
};

const useUploadForm = (callback) => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (name, text) => {
    // console.log(name, text);
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  const handleOnEndEditing = (name, text) => {
    // 1. validate input value
    // const error = null;

    const error = validator(name, text, constraints);
    // 2. update error state
    setErrors((errors) => {
      return {
        ...errors,
        [name]: error,
      };
    });
  };

  return {
    handleInputChange,
    handleOnEndEditing,
    inputs,
    errors,
  };
};

export default useUploadForm;
