import USER_CONSTANT from "../constants/userConstant";

export const getToken = (res) => {
  return {
    type: USER_CONSTANT.GET_TOKEN,
    payload: res.data.access_token
  }
}
