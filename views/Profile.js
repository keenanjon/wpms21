import React, {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = (props) => {
  const {setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);
  console.log('profile', isLoggedIn);
  console.log('Nimi?', user.username);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    props.navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <Text style={styles.text}>{user.username}</Text>
      <Text style={styles.text}>{user.full_name}</Text>
      <Text style={styles.text}>{user.email}</Text>
      <Button title={'Logout'} onPress={logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  text: {
    color: 'red',
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
