import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {format} from 'date-fns';
import {Card, Text} from 'react-native-elements';

const Single = ({route}) => {
  const {params} = route;
  return (
    <Card>
      <Card.Image
        source={{uri: uploadsUrl + params.filename}}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
      />
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
  },
  description: {
    marginBottom: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Single;
