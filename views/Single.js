import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {format} from 'date-fns';
import {Image, Text} from 'react-native-elements';

const Single = ({route}) => {
  const {params} = route;
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{width: 400, height: 400}}
        source={{uri: uploadsUrl + params.filename}}
        resizeMode="cover"
      />
      <Text h4>{params.title}</Text>
      <Text h4>{params.description}</Text>
      <Text p>{params.user_id}</Text>
      <Text p>
        {'Date added: ' + format(new Date(params.time_added), 'dd.MM.yyyy')}
      </Text>
      <Text>{params.media_type}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    padding: 20,
  },

  listdescription: {
    fontWeight: 'normal',
    fontSize: 17,
    paddingBottom: 15,
  },
});

Single.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Single;
