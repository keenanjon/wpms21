import React from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, Button, ListItem as RNEListItem} from 'react-native-elements';

const ListItem = ({singleMedia, navigation, showButtons}) => {
  // console.log('singleMedia', singleMedia);
  return (
    <RNEListItem
      bottomDivider
      onPress={() => {
        navigation.navigate('Single', singleMedia);
      }}
    >
      <Avatar
        size="large"
        square
        source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
      ></Avatar>
      <RNEListItem.Content>
        <RNEListItem.Title h4>{singleMedia.title}</RNEListItem.Title>
        <RNEListItem.Subtitle>{singleMedia.description}</RNEListItem.Subtitle>
        {showButtons && (
          <>
            <Button title="Modify"></Button>
            <Button title="Delete"></Button>
          </>
        )}
      </RNEListItem.Content>
      <RNEListItem.Chevron />
    </RNEListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  showButtons: PropTypes.bool,
};

export default ListItem;
