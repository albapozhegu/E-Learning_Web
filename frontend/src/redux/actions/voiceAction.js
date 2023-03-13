
import VOICE_CONSTANT from "redux/constants/voiceConstant";

export const setVoiceItem = (payload) => {
  return {
    type: VOICE_CONSTANT.SET_VOICE_ITEM,
    payload,
  }
}

export const setVoice = (payload) => {
  return {
    type: VOICE_CONSTANT.SET_VOICE,
    payload,
  }
}
