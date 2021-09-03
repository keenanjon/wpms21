// RegisterHooks.js:
import {useState} from 'react';

const useSignUpForm = (callback) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
  });

  const handleInputChange = (name, text) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };
  return {
    handleInputChange,
    inputs,
  };
};

export default useSignUpForm;
