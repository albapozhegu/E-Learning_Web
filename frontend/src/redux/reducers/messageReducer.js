
import MESSAGE_CONSTANT from './../constants/messageConstant';
let initialState = {
  open: false,
  duration: 2000,
  message: 'This is a message',
  variant: 'filled',
  type: 'success'
}

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_CONSTANT.SET_MESSAGE:
      const res = action.payload;
      const arr = { ...state };
      if (typeof res === 'string') {
        return { ...arr, open: true, message: res.message };
      }
      return { ...arr, open: true, ...res };
    case MESSAGE_CONSTANT.CLOSE_MESSAGE:
      const data = { ...state };
      data.open = false;
      return data;
    default:
      return state;
  }
}

export default messageReducer;
