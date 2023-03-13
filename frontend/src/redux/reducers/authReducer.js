import USER_CONSTANT from "../constants/userConstant";

const initialState = {
  user: [],
  isAuth: false,
  role: "",
  coin: 0,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CONSTANT.GET_USER_INFO:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        role: action.payload.roleType,
        coin: action.payload.coin,
      };
    case USER_CONSTANT.LOGOUT:
      return {
        ...state,
        user: [],
        isAuth: false,
        role: "",
      };
    case USER_CONSTANT.SET_USER_COIN:
      return {
        ...state,
        coin: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
