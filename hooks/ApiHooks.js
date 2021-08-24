import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetch(baseUrl + 'media');
        const mediaIlmanThumbNailia = await response.json();
        const kaikkiTiedot = mediaIlmanThumbNailia.map(async (media) => {
          const response = await fetch(baseUrl + 'media/' + media.file_id);
          const tiedosto = await response.json();
          return tiedosto;
        });
        setMediaArray(await Promise.all(kaikkiTiedot));
      } catch (e) {
        console.log(e.message);
      }
    };
    loadMedia();
  }, []);

  return {mediaArray};
};

export {useMedia};
