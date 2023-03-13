import { VOICE_KEYS } from 'constants/index';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setVoice } from 'redux/actions/voiceAction';

// get custom voice to store into redux
function useVoice() {
  const dispatch = useDispatch();

  useEffect(() => {
    const customVoice = localStorage.getItem(VOICE_KEYS.LS_KEY);
    if (customVoice) {
      dispatch(setVoice(JSON.parse(customVoice)));
    }
  }, []);

  return null;
}

export default useVoice;
