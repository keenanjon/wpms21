import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';
import {doFetch} from '../utils/http';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  useEffect(() => {
    (async () => {
      setMediaArray(await loadMedia());
    })(); // self-invoking function CHECK CHECK
  }, []);

  const loadMedia = async () => {
    try {
      const mediaIlmanThumbNailia = await doFetch(baseUrl + 'media');
      const kaikkiTiedot = mediaIlmanThumbNailia.map(async (media) => {
        try {
          return await loadSingleMedia(media.file_id);
        } catch (e) {
          return {};
        }
      });
      return Promise.all(kaikkiTiedot);
    } catch (e) {
      console.log('List.js - List: ', e.message);
    }
  };

  const loadSingleMedia = async (id) => {
    try {
      const tiedosto = await doFetch(baseUrl + 'media/' + id);
      return tiedosto;
    } catch (e) {
      console.log('loadMedia' + e.message);
    }
  };

  return {mediaArray, loadSingleMedia, loadMedia};
};

const useLogin = () => {
  const login = async (userCredentials) => {
    const requestOptions = {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: userCredentials,
    };
    try {
      const loginResponse = await doFetch(baseUrl + 'login', requestOptions);
      return loginResponse;
    } catch (error) {
      console.log('useLogin ', error);
    }
  };

  return {login};
};

const useUser = () => {
  const checkToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const userInfo = doFetch(baseUrl + 'users/user', options);
      return userInfo;
    } catch (error) {
      console.log('checkToken error ', error);
    }
  };
  return {checkToken};
};

export {useMedia, useLogin, useUser};
