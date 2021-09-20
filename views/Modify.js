import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, ActivityIndicator, Alert} from 'react-native';
import UploadForm from '../components/UploadForm';
import {Button, Image} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Modify = ({route}) => {
  const navigation = route.params.navigation;
  // const [image, setImage] = useState(require('../assets/icon3.png'));
  const {
    inputs,
    handleInputChange,
    handleReset,
    errors,
    handleOnEndEditing,
    setInputs,
  } = useUploadForm();
  const {modifyMedia, loading} = useMedia();

  const {update, setUpdate} = useContext(MainContext);

  useEffect(() => {
    (() => {
      setInputs({
        title: route.params.singleMedia.title,
        description: route.params.singleMedia.description,
      });
    })();
  }, []);

  const doModify = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      // console.log('doUpload', formData);
      const result = await modifyMedia(inputs, userToken);
      // console.log('doUpload', result);

      if (result.message) {
        Alert.alert(
          'Modify',
          result.message,
          [
            {
              text: 'Ok',
              onPress: () => {
                setUpdate(update + 1);
                // handleReset();

                navigation.navigate('My Files');
              },
            },
          ],
          {cancelable: false}
        );
      }
    } catch (e) {
      console.log('doModify error', e.message);
    }
  };

  return (
    <View>
      <UploadForm
        title="Upload"
        handleSubmit={doModify}
        handleInputChange={handleInputChange}
        handleOnEndEditing={handleOnEndEditing}
        errors={errors}
        loading={loading}
        inputs={inputs}
      />
      {loading && <ActivityIndicator />}
      <Button
        title={'Reset'}
        onPress={() => {
          handleReset();
        }}
      />
    </View>
  );
};

Modify.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Modify;
