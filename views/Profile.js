import React, {useContext, useState, useEffect} from 'react';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'react-native-elements';
import {uploadsUrl} from '../utils/variables';
import {useTag} from '../hooks/ApiHooks';

const Profile = (props) => {
  const {setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);
  const [avatar, setAvatar] = useState('https://placekitten.com/400/400');

  const {getFilesByTag} = useTag();

  useEffect(() => {
    (async () => {
      const file = await getFilesByTag('avatar_' + user.user_id);
      console.log('file', file);
      setAvatar(uploadsUrl + file.pop().filename);
    })();
  }, [user]);

  console.log('profile', isLoggedIn);
  console.log('Nimi?', user.username);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    props.navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textH}>Profile:</Text>
      <Image source={{uri: avatar}} style={{width: 300, height: 300}} />
      <Text style={styles.text}>Username: {user.username}</Text>
      <Text style={styles.text}>User ID: {user.user_id}</Text>
      <Text style={styles.text}>Full name: {user.full_name}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Button title={'Logout'} onPress={logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  textH: {
    color: 'red',
    fontSize: 17,
  },
  text: {
    color: 'grey',
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
