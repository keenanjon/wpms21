import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {format} from 'date-fns';

const Single = ({route}) => {
  const {params} = route;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.listtitle}>{params.title}</Text>
      <Image
        style={{width: 200, height: 200}}
        source={{uri: uploadsUrl + params.filename}}
      />
      <Text style={styles.listdescription}>{params.description}</Text>
      <Text>{params.user_id}</Text>
      <Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  listtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
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
