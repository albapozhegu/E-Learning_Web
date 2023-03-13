import IPA_CONSTANT from "../constants/ipaConstant";
import ipaApi from "./../../apis/ipaApi";


export const getIPA = (id) => {
    return async (dispatch) => {
        try { 
          const response = await ipaApi.getIPA(id);
          if(response.status===200){
            dispatch({
              type: IPA_CONSTANT.GET_IPA,
              payload: response.data,
            })
          }
          else
          {
            dispatch({
              type: IPA_CONSTANT.SET_IPA_ERROR,
              payload: response.data.message,
            })
          }
        } catch (error) {
          dispatch({ type: IPA_CONSTANT.SET_IPA_ERROR,
            payload: error.response.message
          })
      }
    }
};

export const getIPARelative = (type, key) => {
  return async (dispatch) => {
      try { 
        const response = await ipaApi.getIPARelative(type, key);
        if(response.status===200){
          dispatch({
            type: IPA_CONSTANT.GET_IPA_RELATIVE,
            payload: response.data,
          })
        }
        else
        {
          dispatch({
            type: IPA_CONSTANT.SET_IPA_ERROR,
            payload: response.data.message,
          })
        }
      } catch (error) {
        dispatch({ type: IPA_CONSTANT.SET_IPA_ERROR,
          payload: error.response.message
        })
    }
  }
};

export const getIPAByType = (type) => {
  return async (dispatch) => {
      try { 
       
        const response = await ipaApi.getIPAByType(type);
        console.log(response.data)
        if(response.status===200){
          dispatch({
            type: IPA_CONSTANT.GET_IPA_BY_TYPE,
            payload: response.data.ipas,
          })
        }
        else
        {
          dispatch({
            type: IPA_CONSTANT.SET_IPA_ERROR,
            payload: response.data.message,
          })
        }
      } catch (error) {
        dispatch({ type: IPA_CONSTANT.SET_IPA_ERROR,
          payload: error.response.message
        })
    }
  }
};

export const postIPA = (formData) => {
    return async (dispatch, getState) => {
        try { 
          const {
            authReducer: { user },
          } = getState();

          const response = await ipaApi.postIPA(formData, user.access_token);
          if(response.status===200){
            dispatch({
              type: IPA_CONSTANT.CREATE_IPA,
              payload: response.data.ipa,
            })
          }
          else
          {
            dispatch({
              type: IPA_CONSTANT.SET_IPA_ERROR,
              payload: response.data.message,
            })
          }
        } catch (error) {
          dispatch({ type: IPA_CONSTANT.SET_IPA_ERROR,
             payload: error.response.message
          })
      }
    }
};

