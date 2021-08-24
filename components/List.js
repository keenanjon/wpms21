import React from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';

const List = (props) => {
  const url =
    'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';
  const mediaArray = [];
  const loadMedia = async () => {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
  };

  loadMedia();
  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

List.propTypes = {};

export default List;
