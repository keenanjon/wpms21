import React, {useContext} from 'react';
import {Button, View} from 'react-native';
import {useLogin} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/LoginHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = ({navigation}) => {
  const {inputs, handleInputChange} = useLoginForm();
  const {setIsLoggedIn} = useContext(MainContext);
  const {login} = useLogin();

  const doLogin = async () => {
    try {
      const loginInfo = await login(JSON.stringify(inputs));
      console.log('doLogin response ', loginInfo);
      await AsyncStorage.setItem('userToken', loginInfo.token);
      // TODO: Save user info to main context

      setIsLoggedIn(true);
    } catch (error) {
      console.log('doLogin error ', error);
    }
  };

  return (
    <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
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
      <Button title="Register!" onPress={doLogin} />
    </View>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginForm;
