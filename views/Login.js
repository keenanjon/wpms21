import React, {useEffect, useContext} from 'react';
import {StyleSheet, View, Text, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import {baseUrl} from '../utils/variables';

const Login = ({navigation}) => {
  // const {setIsLoggedIn} = useContext(MainContext);
  const {setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);
  // const {login} = useLogin();
  const {checkToken} = useUser();
  /*
  const doLogin = async () => {
    try {
      const loginInfo = await login(
        JSON.stringify({
          username: 'jon',
          password: 'asukkipasukki2',
        })
      );
      console.log('doLogin response ', loginInfo);
      await AsyncStorage.setItem('userToken', loginInfo.token);
      // TODO: Save user info to main context
      setIsLoggedIn(true);
    } catch (error) {
      console.log('doLogin error ', error);
    }
  };
  */
  /*
  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('logIn asyncstorage token: ', userToken);
    if (userToken) {
      const userInfo = await checkToken(userToken);
      if (userInfo.user_id) {
        // TODO: save user into to maincontext
        setIsLoggedIn(true);
      }
    }
  };
  */

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
    <KeyboardAvoidingView style={styles.container}>
      <Text>Login</Text>
      <LoginForm navigation={navigation} />
      <RegisterForm navigation={navigation} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
