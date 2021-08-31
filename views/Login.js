import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Button, Us} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  // props is needed for navigation
  const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
  console.log('ili', isLoggedIn);
  const logIn = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    console.log('login async token', await AsyncStorage.getItem('userToken'));
    setIsLoggedIn(true);
    //props.navigation.navigate('Home');
  };

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken === 'abc') {
      setIsLoggedIn(true);
      //navigation.navigate('Home');
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
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
