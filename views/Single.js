import React, {useRef, useState} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {format} from 'date-fns';
import {Card, Text, Button} from 'react-native-elements';
import {Audio, Video} from 'expo-av';
import {ScrollView} from 'react-native-web';
// import * as React from 'react';

const Single = ({route}) => {
  const {params} = route;
  const videoRef = useRef(null);

  return (
    <Card>
      {params.media_type === 'image' && (
        <Card.Image
          source={{uri: uploadsUrl + params.filename}}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
      )}
      {params.media_type === 'video' && (
        <Video
          ref={videoRef}
          style={{width: '100%', height: 400}}
          source={{uri: uploadsUrl + params.filename}}
          resizeMode="contain"
          useNativeControls
          useposter
          posterSource={{uri: uploadsUrl + params.screenshot}}
        />
      )}

      {params.media_type === 'audio' &&
        (<Audio></Audio>)(
          <>
            <Text>Audio not supported YET.</Text>
          </>
        )}
      <Text h4>{params.title}</Text>
      <Text h4>{params.description}</Text>
      <Text p>User ID: {params.user_id}</Text>
      <Text p>
        {'Date added: ' + format(new Date(params.time_added), 'dd.MM.yyyy')}
      </Text>
      <Text>Media type: {params.media_type}</Text>
    </Card>
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
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 250,
  },

  description: {
    marginBottom: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Single;
