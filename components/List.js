import React from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';

const mediaArray = [
  {
    key: '0',
    title: 'Kissa 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    thumbnails: {
      w160: 'http://placekitten.com/160/161',
    },
    filename: 'http://placekitten.com/2048/1920',
  },
  {
    key: '1',
    title: 'Kissa 2',
    description:
      'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut.',
    thumbnails: {
      w160: 'http://placekitten.com/160/164',
    },
    filename: 'http://placekitten.com/2041/1922',
  },
  {
    key: '2',
    title: 'Kissa 3',
    description: 'Phasellus imperdiet nunc tincidunt molestie vestibulum.',
    thumbnails: {
      w160: 'http://placekitten.com/160/167',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
];

const List = (props) => {
  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

List.propTypes = {};

export default List;
