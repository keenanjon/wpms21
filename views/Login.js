import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import {baseUrl} from '../utils/variables';
import {Button, Text} from 'react-native-elements';

const Login = ({navigation}) => {
  // const {setIsLoggedIn} = useContext(MainContext);
  const {setUser, setIsLoggedIn} = useContext(MainContext);
  // const {login} = useLogin();
  const {checkToken} = useUser();
  const [registerFormToggle, setRegisterFormToggle] = useState(false);

  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await fetch(baseUrl + 'users/user', {
        method: 'GET',
        headers: {
          'x-access-token': userToken,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setUser(json);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      console.log('error on token', e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text h4></Text>

      {registerFormToggle ? (
        <RegisterForm navigation={navigation} />
      ) : (
        <LoginForm navigation={navigation} />
      )}
      {/* To do link button*/}
      <Button
        type="outline"
        title={
          registerFormToggle
            ? 'Already registered? Login here...'
            : 'Register here =>'
        }
        onPress={() => {
          setRegisterFormToggle(!registerFormToggle);
        }}
      ></Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
