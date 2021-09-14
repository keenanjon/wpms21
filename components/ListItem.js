import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {
  Image,
  Button,
  Text,
  Divider,
  Icon,
  ListItem as RNEListItem,
} from 'react-native-elements';

const ListItem = ({singleMedia, navigation}) => {
  // console.log('singleMedia', singleMedia);
  return (
    <View>
      <RNEListItem>
        <View>
          <Image
            style={styles.image}
            PlaceholderContent={<ActivityIndicator />}
            source={{
              uri: uploadsUrl + singleMedia.thumbnails?.w160,
            }}
          />
        </View>
        <View style={styles.textbox}>
          <Text h4>{singleMedia.title}</Text>
          <Text>{singleMedia.description}</Text>
        </View>

        <Button
          title="View"
          onPress={() => {
            navigation.navigate('Single', singleMedia);
          }}
          raised
        ></Button>
      </RNEListItem>
      <Icon name="rowing" />
      <Divider />
    </View>
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
  row: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'pink',
    borderRadius: 0,
    flex: 1,
  },
  imagebox: {
    flex: 1,
  },
  textbox: {
    flex: 2,
    padding: 10,
  },
  image: {
    flex: 1,
    borderRadius: 3,
    width: 50,
    height: 50,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ListItem;
