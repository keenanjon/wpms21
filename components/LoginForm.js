import React, {useContext} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';

import {useLogin} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/LoginHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-ui-kitten';

const LoginForm = ({navigation}) => {
  const {inputs, handleInputChange} = useLoginForm();
  const {isLoggedIn, setIsLoggedIn, user, setUser} = useContext(MainContext);
  const {login} = useLogin();

  const doLogin = async () => {
    try {
      const loginInfo = await login(JSON.stringify(inputs));
      console.log('doLogin response ', loginInfo);
      await AsyncStorage.setItem('userToken', loginInfo.token);
      setUser(loginInfo.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('doLogin error ', error);
    }
  };

  return (
    <View>
      <Text h4>Login:</Text>
      <Text h4></Text>
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
      <Button title="Login!" onPress={doLogin} raised />
      <Button>BUTTON</Button>;
    </View>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginForm;
