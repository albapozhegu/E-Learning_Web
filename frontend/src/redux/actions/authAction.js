import USER_CONSTANT from "../constants/userConstant";
import userApi from "./../../apis/userApi";
export const login = () => {
  return {
      type: USER_CONSTANT.LOGIN
  }
}

export const getUserInfo = (res) => {
  return {
    type: USER_CONSTANT.GET_USER_INFO,
    payload: res.data.user
  }
}

export const logout = () => {
  return async (dispatch) => {
     await userApi.logout();
      
        dispatch({
          type: USER_CONSTANT.LOGOUT,
        })
  }
};

export const setUserCoin = (newCoin)  => {
  return {
    type: USER_CONSTANT.SET_USER_COIN,
    payload: newCoin,
  }
}
