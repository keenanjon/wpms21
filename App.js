import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

import List from './components/List';

const image = {uri: 'http://placekitten.com/2041/1923'};

import {Aperture} from 'react-native-feather';

const Flex = () => {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <StatusBar animated={true} barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.catLogoArea}
            imageStyle={styles.catLogoImg}
          >
            <View style={styles.box}>
              <Text style={styles.text}>Koira?</Text>
            </View>
            <Aperture style={styles.aperture} />
          </ImageBackground>
        </View>
        <List />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: 'black',
  },
  header: {
    flexBasis: 300,
    backgroundColor: 'black',
    paddingBottom: 15,
  },
  middle: {
    flex: 1,
    backgroundColor: 'darkorange',
  },
  bottom: {
    flex: 4,
    backgroundColor: 'yellow',
    flexDirection: 'row',
  },
  left: {
    flexBasis: 50,
    backgroundColor: 'yellow',
  },
  right: {
    flex: 1,
    backgroundColor: 'pink',
  },
  box: {
    width: 70,
    height: 30,
    backgroundColor: 'black',
    opacity: 0.5,
    position: 'absolute',
    bottom: 20,
    left: 0,
  },
  text: {
    textAlign: 'center',
    fontSize: 19,
    color: 'white',
    paddingTop: 3,
  },
  catLogoArea: {
    flex: 1,
  },
  catLogoImg: {
    borderBottomRightRadius: 50,
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  aperture: {
    position: 'absolute',
    right: '5%',
    top: '5%',
    color: 'white',
  },
});

export default Flex;
