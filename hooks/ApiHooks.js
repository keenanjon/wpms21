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
        return await loadSingleMedia(media.file_id);
      });
      return Promise.all(kaikkiTiedot);
    } catch (e) {
      console.log('loadMedia', e.message);
    }
  };

  const loadSingleMedia = async (id) => {
    try {
      const tiedosto = await doFetch(baseUrl + 'media/' + id);
      return tiedosto;
    } catch (e) {
      console.log('loadSingleMedia', e.message);
      return {};
    }
  };

  return {mediaArray, loadMedia, loadSingleMedia};
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
      console.log('login error', error.message);
    }
  };
  return {login};
};

const register = async (inputs) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + 'users', fetchOptions);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log('ApiHooks register', e.message);
    return false;
  }
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
      const userInfo = await doFetch(baseUrl + 'users/user', options);
      return userInfo;
    } catch (error) {
      console.log('checkToken error ', error);
    }
  };
  const checkUsernameAvailable = async (username) => {
    try {
      const userNameInfo = await doFetch(
        baseUrl + 'users/username/' + username
      );
      return userNameInfo.available;
    } catch (error) {
      console.log('checkToken error ', error);
    }
  };

  return {checkToken, checkUsernameAvailable};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      const tiedosto = await doFetch(baseUrl + 'tags/' + tag);
      return tiedosto;
    } catch (e) {
      console.log('getFilesBytag', e.message);
      return {};
    }
  };
  return {getFilesByTag};
};

export {useMedia, useLogin, useUser, register, useTag};
