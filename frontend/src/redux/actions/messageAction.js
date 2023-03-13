
import MESSAGE_CONSTANT from './../constants/messageConstant';

export const setMessage = (message, type)  => {
  return {
    type: MESSAGE_CONSTANT.SET_MESSAGE,
    payload: {
      message,
      type
    }
  }
}

export const closeMessage = () => {
  return {
    type: MESSAGE_CONSTANT.CLOSE_MESSAGE
  }
}

