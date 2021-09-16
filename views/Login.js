import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
// import {baseUrl} from '../utils/variables';
import {Card, ListItem, Text} from 'react-native-elements';
import {ImageBackground} from 'react-native';

const Login = ({navigation}) => {
  // const {setIsLoggedIn} = useContext(MainContext);
  const {setUser, setIsLoggedIn} = useContext(MainContext);
  // const {login} = useLogin();
  const {checkToken} = useUser();
  const [registerFormToggle, setRegisterFormToggle] = useState(false);

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('logIn asyncstorage token:', userToken);
    if (userToken) {
      try {
        const userInfo = await checkToken(userToken);
        if (userInfo.user_id) {
          setUser(userInfo);
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.log('getToken', e.message);
      }
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
        // eslint-disable-next-line no-undef
        source={require('../assets/splash.png')}
        style={styles.image}
      >
        {registerFormToggle ? (
          <Card>
            <Card.Divider />
            <Card.Title h4>Register</Card.Title>
            <RegisterForm navigation={navigation} />
          </Card>
        ) : (
          <Card>
            <Card.Title h4>Login</Card.Title>
            <LoginForm navigation={navigation} />
          </Card>
        )}

        <ListItem
          onPress={() => {
            setRegisterFormToggle(!registerFormToggle);
          }}
        >
          <ListItem.Content>
            <Text style={styles.text}>
              {registerFormToggle
                ? 'Already registered? Login here'
                : 'No account? Register here.'}
            </Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
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
