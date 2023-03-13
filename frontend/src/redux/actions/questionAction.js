import questionApi from "./../../apis/questionApi";
import authReducer from "../reducers/authReducer";
import QUESTION_CONSTANT from "../constants/questionConstant";

export const getQuestion = (id) => {
    return async (dispatch, getState) => {
        try { 
          const {
            authReducer: { user },
          } = getState();

          const response = await questionApi.getQuestion(id, user.access_token);
          if(response.status===200){
            dispatch({
              type: QUESTION_CONSTANT.GET_QUESTION,
              payload: response.data.question,
            })
          }
          else
          {
            dispatch({
              type: QUESTION_CONSTANT.SET_QUESTION_ERROR,
              payload: response.data.message,
            })
          }
        } catch (error) {
          dispatch({ type: QUESTION_CONSTANT.SET_QUESTION_ERROR, payload: error.message})

        }
      }        
    };

export const getQuestionByQuiz = (id) => {
    return async (dispatch, getState) => {
        try { 
          const {
            authReducer: { user },
          } = getState();

          const response = await questionApi.getQuestionByQuiz(id, user.access_token);
          if(response.status===200){
            dispatch({
              type: QUESTION_CONSTANT.GET_QUESTION_BY_QUIZ,
              payload: response.data.questions,
            })
          }
          else
          {
            dispatch({
              type: QUESTION_CONSTANT.SET_QUESTION_ERROR,
              payload: response.data.message,
            })
          }
        } catch (error) {
          dispatch({ type: QUESTION_CONSTANT.SET_QUESTION_ERROR, payload: error.message})
        }
      }
    };

export const postQuestionByQuiz = (id, formData) => {
    return async (dispatch, getState) => {
        try { 
          const {
            authReducer: { user },
          } = getState();

          const response = await questionApi.postQuestion(id, formData, user.access_token);
          if(response.status===200){
            dispatch({
              type: QUESTION_CONSTANT.CREATE_QUESTION,
              payload: response.data.question,
            })
          }
          else
          {
            dispatch({
              type: QUESTION_CONSTANT.SET_QUESTION_ERROR,
              payload: response.data.message,
            })
          }
        } catch (error) {
          dispatch({ type: QUESTION_CONSTANT.SET_QUESTION_ERROR, payload: error.message})
        }
      }
    };

export const putQuestion = (id, formData) => {
    return async (dispatch, getState) => {
        try { 
          const {
            authReducer: { user },
          } = getState();

          const response = await questionApi.putQuestion(id, formData, user.access_token);
          if(response.status===200){
            dispatch({
              type: QUESTION_CONSTANT.EDIT_QUESTION,
              payload: response.data.question,
            })
          }
          else
          {
            dispatch({
              type: QUESTION_CONSTANT.SET_QUESTION_ERROR,
              payload: response.data.message,
            })
          }
        } catch (error) {
          dispatch({ type: QUESTION_CONSTANT.SET_QUESTION_ERROR, payload: error.message})
        }
      }
    };

export const deleteQuestion = (id) => {
    return async (dispatch) => {
        try { 
      
          const response = await questionApi.deleteQuestion(id);
          if(response.status===200){
            dispatch({
              type: QUESTION_CONSTANT.DELETE_QUESTION,
              payload: id,
            })
          }
          else
          {
            dispatch({
              type: QUESTION_CONSTANT.SET_QUESTION_ERROR,
              payload: response.data.message,
            })
          }
        } catch (error) {
          dispatch({ type: QUESTION_CONSTANT.SET_QUESTION_ERROR, payload: error.message})

        }
      }
            };

export const deleteQuestionByQuiz = (id, formData) => {
    return async (dispatch, getState) => {
        try { 
          const {
            authReducer: { user },
          } = getState();

          const response = await questionApi.deleteQuestionByQuiz(id, formData, user.access_token);
          if(response.status===200){
            dispatch({
              type: QUESTION_CONSTANT.DELETE_QUESTION_BY_QUIZ,
              payload: id,
            })
          }
          else
          {
            dispatch({
              type: QUESTION_CONSTANT.SET_QUESTION_ERROR,
              payload: response.data.message,
            })
          }
        } catch (error) {
          dispatch({ type: QUESTION_CONSTANT.SET_QUESTION_ERROR, payload: error.message})
        }
      }
    
  };
