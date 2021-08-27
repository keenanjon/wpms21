import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import List from './components/List';

const App = () => {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View style={styles.container}>
        <List />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

export default App;
