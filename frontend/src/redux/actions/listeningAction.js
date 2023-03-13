import LISTEN_CONSTANT from "../constants/listeningConstant";
import listeningApi from "./../../apis/listeningApi";
import authReducer from "../reducers/authReducer";


export const getListening = (id) => {
    return async (dispatch) => {
        try {           
          const response = await listeningApi.getListening(id);
            if(response.status===200){
              dispatch({
                  type: LISTEN_CONSTANT.GET_LISTENING,
                  payload: response.data,
                })
            }
           else
            {
              dispatch({
                type: LISTEN_CONSTANT.SET_LISTEN_ERROR,
                payload: response.data.message,
              })
            }
            
        } catch (error) {
          dispatch({ type: LISTEN_CONSTANT.SET_LISTEN_ERROR,
            payload: error.message,
         })
          
        }
      }
};

export const getListenByTopic = (topic) => {
  return async (dispatch, getState) => {
      try { 
        const {
          authReducer: { user },
        } = getState();

        const response = await listeningApi.getListenByTopic(topic, user.access_token);
        if(response.status===200){
          dispatch({
              type: LISTEN_CONSTANT.GET_LISTEN_BY_TOPIC,
              payload: response.data.topics,
            })
        }
        else
        {
          dispatch({
            type: LISTEN_CONSTANT.SET_LISTEN_ERROR,
            payload: response.data.message,
          })
        }
      } catch (error) {
        dispatch({ type: LISTEN_CONSTANT.SET_LISTEN_ERROR,
            payload: error.response.message,
        })
      }
    }
};

export const getAllListen = () => {
  return async (dispatch, getState) => {
      try { 
        dispatch({
          type: LISTEN_CONSTANT.SET_LISTEN_LOADING,
          payload:true,
        });

        const {
          authReducer: { user },
        } = getState();

        const response = await listeningApi.getAllListen(user.access_token);
        if(response.status===200){
          dispatch({
              type: LISTEN_CONSTANT.GET_ALL_LISTEN,
              payload: response.data.listens,
            })
        }
        else
        {
          dispatch({
            type: LISTEN_CONSTANT.SET_LISTEN_ERROR,
            payload: response.data.message,
          })
        }
      } catch (error) {
        dispatch({ type: LISTEN_CONSTANT.SET_LISTEN_ERROR,
            payload: error.response.message,
        })
      }
    }
};

export const getListenById = (id) => {
  return async (dispatch, getState) => {
      try { 
        const {
          authReducer: { user },
        } = getState();

        const response = await listeningApi.getListenById(id, user.access_token);
        if(response.status===200){
          dispatch({
              type: LISTEN_CONSTANT.GET_LISTEN_BY_ID,
              payload: response.data.listen,
            })
        }
        else
        {
          dispatch({
            type: LISTEN_CONSTANT.SET_LISTEN_ERROR,
            payload: response.data.message,
          })
        }
      } catch (error) {
        dispatch({ type: LISTEN_CONSTANT.SET_LISTEN_ERROR,
            payload: error.response.message,
        })
      }
    }
};

export const getListenTopics = () => {
  return async (dispatch, getState) => {
      try { 

        const {
          authReducer: { user },
        } = getState();

        const response = await listeningApi.getListenTopics(user.access_token);
        if(response.status===200){
          dispatch({
              type: LISTEN_CONSTANT.GET_LISTEN_TOPICS,
              payload: response.data.topics,
            })
        }
        else
        {
          dispatch({
            type: LISTEN_CONSTANT.SET_LISTEN_ERROR,
            payload: response.data.message,
          })
        }
      } catch (error) {
        dispatch({ type: LISTEN_CONSTANT.SET_LISTEN_ERROR,
            payload: error.response.message,
        })
      }
    }
};

export const postListen = (formData) => {
  return async (dispatch, getState) => {
      try { 
        const {
          authReducer: { user },
        } = getState();

        const response = await listeningApi.postListen(formData , user.access_token);
        if(response.status===200){
          dispatch({
              type: LISTEN_CONSTANT.CREATE_LISTEN,
              payload: response.data.listen,
            })
           // toast.success("Add successfully")
        }
        else
        {
          dispatch({
            type: LISTEN_CONSTANT.SET_LISTEN_ERROR,
            payload: response.data.message,
          })
        }
      } catch (error) {
        dispatch({ type: LISTEN_CONSTANT.SET_LISTEN_ERROR,
            payload: error.response.message,
        })
      }
    }
};

export const putListen = (id, formData) => {
  return async (dispatch, getState) => {
      try { 
        const {
          authReducer: { user },
        } = getState();

        const response = await listeningApi.putListen(id, formData , user.access_token);
        if(response.status===200){
          dispatch({
              type: LISTEN_CONSTANT.EDIT_LISTEN,
              payload: response.data.listen,
            })
          //  toast.success("Edit successfully")
        }
        else
        {
          dispatch({
            type: LISTEN_CONSTANT.SET_LISTEN_ERROR,
            payload: response.data.message,
          })
        }
      } catch (error) {
        dispatch({ type: LISTEN_CONSTANT.SET_LISTEN_ERROR,
            payload: error.response.message,
        })
      }
    }
};

export const deleteListen = (id) => {
  return async (dispatch) => {
    try {
      const response = await listeningApi.deleteListen(id);
      if (response.status===200) {
        dispatch({
          type: LISTEN_CONSTANT.DELETE_LISTEN,
          payload: id,
        })
      }
      else{
        dispatch({ type: LISTEN_CONSTANT.SET_LISTEN_ERROR,
          payload: response.data.message,
      })
      }
    } catch (error) {
        dispatch({ type: LISTEN_CONSTANT.SET_LISTEN_ERROR,
            payload: error.response.message,
        })
    }
  }
}
