import {useEffect, useState} from 'react';
import {doFetch} from '../utils/http';
import {baseUrl} from '../utils/variables';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    (async () => {
      setMediaArray(await loadMedia());
    })();
  }, []);

  const loadMedia = async () => {
    try {
      const mediaIlmanThumbNailia = await doFetch(baseUrl + 'media');
      const kaikkiTiedot = mediaIlmanThumbNailia.map(async (media) => {
        try {
          return await loadSingleMedia(media.file_id);
        } catch (e) {
          console.log('promiseall');
          return {};
        }
      });
      return Promise.all(kaikkiTiedot);
    } catch (e) {
      console.log(e.message());
    }
  };

  const loadSingleMedia = async (id) => {
    try {
      const tiedosto = await doFetch(baseUrl + 'media/' + id);
      return tiedosto;
    } catch (e) {
      console.log('loadSingleMedia', e.message());
      throw new Error('loadSingleMedia fail');
    }
  };

  return {mediaArray, loadSingleMedia};
};

export {useMedia};
