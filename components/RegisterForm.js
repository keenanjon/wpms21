import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {View, Alert} from 'react-native';
import {Button, Text} from 'react-native-elements';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {MainContext} from '../contexts/MainContext';
import {useLogin, login, register} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterForm = () => {
  /*
  const doRegister = async () => {
    const serverResponse = await register(inputs);
    if (serverResponse) {
      Alert.alert(serverResponse.message);
    } else {
      Alert.alert('register failed');
    }
  };
  */
  const {setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);
  const {inputs, errors, handleInputChange, checkUsername} = useSignUpForm();

  // lisäsin itse
  const {login} = useLogin();

  const doRegister = async () => {
    const serverResponse = await register(inputs);
    if (serverResponse) {
      Alert.alert(serverResponse.message);

      // originally was: await useLogin(inputs);

      const loginServerResponse = await login(JSON.stringify(inputs));
      // const loginServerResponse = await login(inputs);

      if (loginServerResponse) {
        Alert.alert(loginServerResponse.message);
        await AsyncStorage.setItem('userToken', loginServerResponse.token);
        setUser(loginServerResponse.user);
        console.log('user is: ', user);
        setIsLoggedIn(true);
      } else {
        Alert.alert('Login failed');
      }
    } else {
      Alert.alert('register failed');
    }
  };

  return (
    <View>
      <Text h4>Register:</Text>
      <Text h4></Text>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={(event) => {
          console.log('onendediting value', event.nativeEvent.text);
          checkUsername(event.nativeEvent.text);
        }}
        errorMessage={errors.username}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button title="Register!" onPress={doRegister} raised />
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default RegisterForm;
