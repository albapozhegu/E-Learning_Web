import WORD_CONSTANT from "../constants/wordConstant";
import wordApi from "./../../apis/wordApi";
import authReducer from "../reducers/authReducer";


export const getWord = (word) => {
    return async (dispatch) => {
        try { 

          const response = await wordApi.getWord(word);
          console.log(response.data);
            if(response.status===200){
              dispatch({
                  type: WORD_CONSTANT.GET_WORD,
                  payload: response.data,
                })
            }
            else
            {
              dispatch({
                type: WORD_CONSTANT.SET_WORD_ERROR,
                payload: response.data.message,
              })
            }
        } catch (error) {
          dispatch({
            type: WORD_CONSTANT.SET_WORD_ERROR,
            payload: error.response.message,
          })
        }
      }
};

export const getAllWord = () => {
    return async (dispatch, getState) => {
        try { 
          dispatch({
            type: WORD_CONSTANT.SET_WORD_LOADING,
          });

          const {
            authReducer: { user },
          } = getState();
          
          const response = await wordApi.getAllWord(user.access_token);
            if(response.status===200){
              dispatch({
                  type: WORD_CONSTANT.GET_ALL_WORD,
                  payload: response.data.words,
                })
            }
            else
            {
              dispatch({
                type: WORD_CONSTANT.SET_WORD_ERROR,
                payload: response.data.message,
              })
            }
        } catch (error) {
          dispatch({
            type: WORD_CONSTANT.SET_WORD_ERROR,
            payload: error.response.message,
          })
        }
      }
};

export const getWordByTopic = (topic) => {
    return async (dispatch, getState) => {
        try { 
          dispatch({
            type: WORD_CONSTANT.SET_WORD_LOADING,
          });

          const {
            authReducer: { user },
          } = getState();
          
          const response = await wordApi.getWordByTopic(topic, user.access_token);
            if(response.status===200){
              dispatch({
                  type: WORD_CONSTANT.GET_WORD_BY_TOPIC,
                  payload: response.data.words,
                })
            }
            else
            {
              dispatch({
                type: WORD_CONSTANT.SET_WORD_ERROR,
                payload: response.data.message,
              })
            }
        } catch (error) {
          dispatch({
            type: WORD_CONSTANT.SET_WORD_ERROR,
            payload: error.response.message,
          })
        }
      }
};

export const getWordTopics = () => {
    return async (dispatch, getState) => {
        try { 
          dispatch({
            type: WORD_CONSTANT.SET_WORD_LOADING,
          });

          const {
            authReducer: { user },
          } = getState();
          
          const response = await wordApi.getWordTopics(user.access_token);
            if(response.status===200){
              dispatch({
                  type: WORD_CONSTANT.GET_WORD_TOPICS,
                  payload: response.data.topics,
                })
            }
            else
            {
              dispatch({
                type: WORD_CONSTANT.SET_WORD_ERROR,
                payload: response.data.message,
              })
            }
        } catch (error) {
          dispatch({
            type: WORD_CONSTANT.SET_WORD_ERROR,
            payload: error.response.message,
          })
        }
      }
};

export const searchWord = (word) => {
    return async (dispatch, getState) => {
        try { 
          const {
            authReducer: { user },
          } = getState();
          
          const response = await wordApi.getWordTopics(word, user.access_token);
            if(response.status===200){
              dispatch({
                  type: WORD_CONSTANT.SEARCH_WORD,
                  payload: response.data.words,
                })
            }
            else
            {
              dispatch({
                type: WORD_CONSTANT.SET_WORD_ERROR,
                payload: response.data.message,
              })
            }
        } catch (error) {
          dispatch({
            type: WORD_CONSTANT.SET_WORD_ERROR,
            payload: error.response.message,
          })
        }
      }
};

export const checkWordExist = (formData) => {
    return async (dispatch, getState) => {
        try { 
          const {
            authReducer: { user },
          } = getState();
          
          const response = await wordApi.checkWordExist(formData, user.access_token);
            if(response.status===200){
              dispatch({
                  type: WORD_CONSTANT.EXIST_WORD,
                  payload: response.data.word,
                })
            }
            else
            {
              dispatch({
                type: WORD_CONSTANT.SET_WORD_ERROR,
                payload: response.data.isExist,
              })
            }
        } catch (error) {
          dispatch({
            type: WORD_CONSTANT.SET_WORD_ERROR,
            payload: error.response.message,
          })
        }
      }
};

export const getWordPack = (formData) => {
    return async (dispatch, getState) => {
        try { 
          const {
            authReducer: { user },
          } = getState();
          
          const response = await wordApi.getWordPack(formData, user.access_token);
            if(response.status===200){
              dispatch({
                  type: WORD_CONSTANT.EXIST_WORD,
                  payload: response.data.packList,
                })
            }
            else
            {
              dispatch({
                type: WORD_CONSTANT.SET_WORD_ERROR,
                payload: response.data.message,
              })
            }
        } catch (error) {
          dispatch({
            type: WORD_CONSTANT.SET_WORD_ERROR,
            payload: error.response.message,
          })
        }
      }
};

export const postWord = (formData) => {
  return async (dispatch, getState) => {
    try {
      const response = await wordApi.postWord(formData);
      if (response.status === 200) {
        dispatch({
          type: WORD_CONSTANT.CREATE_WORD,
          payload: response.data.word,
        });
        //  toast.success("Add successfully")
      } else {
        dispatch({
          type: WORD_CONSTANT.SET_WORD_ERROR,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: WORD_CONSTANT.SET_WORD_ERROR,
        payload: error.response.message,
      });
    }
  };
};

export const putWord = (word, formData) => {
  return async (dispatch) => {
    try {
      const response = await wordApi.putWord(word, formData);
      console.log(response.data.word);
      if (response.status === 200) {
        dispatch({
          type: WORD_CONSTANT.EDIT_WORD,
          payload: response.data.word,
        });
      } else {
        dispatch({
          type: WORD_CONSTANT.SET_WORD_ERROR,
          payload: response.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: WORD_CONSTANT.SET_WORD_ERROR,
        payload: error.response.message,
      });
    }
  };
};

export const deleteWord = (word, type) => {
    return async (dispatch) => {
        try { 
         
          const response = await wordApi.deleteWord(word, type);
            if(response.status===200){
              dispatch({
                  type: WORD_CONSTANT.DELETE_WORD,
                  payload: {word, type},
                })
          //  toast.success(response.data.message)
            }
            else
            {
              dispatch({
                type: WORD_CONSTANT.SET_WORD_ERROR,
                payload: response.data.message,
              })
            }
        } catch (error) {
          dispatch({
            type: WORD_CONSTANT.SET_WORD_ERROR,
            payload: error.response.message,
          })
        }
      }
};




