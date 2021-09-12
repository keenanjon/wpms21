import React, {useEffect, useContext} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import {baseUrl} from '../utils/variables';
import {Card} from 'react-native-elements';

const Login = ({navigation}) => {
  // const {setIsLoggedIn} = useContext(MainContext);
  const {setUser, setIsLoggedIn} = useContext(MainContext);
  // const {login} = useLogin();
  const {checkToken} = useUser();

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
      <ImageBackground
        source={require('../assets/splash.png')}
        style={styles.image}
      >
        <ScrollView>
          <Card>
            <Card.Title h4>Login</Card.Title>
            <LoginForm navigation={navigation} />
            <Card.Divider />
            <Card.Title h4>Register</Card.Title>
            <RegisterForm navigation={navigation} />
          </Card>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
