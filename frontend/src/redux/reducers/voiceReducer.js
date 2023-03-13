import VOICE_CONSTANT from "redux/constants/voiceConstant";
import { DEFAULTS } from "constants/index";

const initialState = {
  voiceURI: DEFAULTS.VOICE_URI,
  speed: DEFAULTS.VOICE_SPEED,
  volume: DEFAULTS.VOICE_VOLUME,
};

const voiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case VOICE_CONSTANT.SET_VOICE_ITEM:
      const { key, value } = action.payload;
      state[key] = value;
      return {...state}
    case VOICE_CONSTANT.SET_VOICE:
      const arrState = { ...state };
      const arrPayload = { ...action.payload };
      return { ...arrState, ...arrPayload }
    default:
      return state
  }
}

export default voiceReducer;
