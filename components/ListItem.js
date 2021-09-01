import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-web';

const ListItem = ({singleMedia}) => {
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.imagebox}>
        <Image
          style={styles.image}
          source={{uri: singleMedia.thumbnails.w160}}
        />
      </View>
      <View style={styles.textbox}>
        <Text style={styles.listtitle}>{singleMedia.title}</Text>
        <Text style={styles.descriptiontext}>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
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
    marginBottom: 15,
    backgroundColor: '#20202d',
    borderRadius: 0,
    flex: 1,
  },
  imagebox: {
    flex: 1,
  },
  textbox: {
    flex: 1,
    paddingLeft: 10,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    borderRadius: 3,
    borderBottomLeftRadius: 50,
  },
  listtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
    color: 'white',
  },
  descriptiontext: {
    color: '#EAEAEE',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
