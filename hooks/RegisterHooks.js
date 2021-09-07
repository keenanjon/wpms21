// RegisterHooks.js:
import {useState} from 'react';
import {useUser} from './ApiHooks';

const useSignUpForm = (callback) => {
  const {checkUsernameAvailable} = useUser();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (name, text) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };
  const checkUsername = async (username) => {
    // TODO: add check username functionality to Api hooks and use it
    // add error to input element if username is reserved
    if (username.length < 3) {
      return;
    }
    try {
      const isAvailable = await checkUsernameAvailable(username);
      console.log('checkUsername available', isAvailable);
      if (!isAvailable) {
        setErrors((errors) => {
          return {...errors, username: 'Username already exists'};
        });
      } else {
        setErrors((errors) => {
          return {...errors, username: null};
        });
      }
    } catch (error) {
      console.log('username check failed', error);
    }
  };

  return {
    handleInputChange,
    inputs,
    errors,
    checkUsername,
  };
};

export default useSignUpForm;
