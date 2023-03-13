import quizApi from "./../../apis/quizApi";
import authReducer from "../reducers/authReducer";
import QUIZ_CONSTANT from "../constants/quizConstant";
import { TonalitySharp } from "@material-ui/icons";

export const getQuiz = (id) => {
    return async (dispatch, getState) => {
        try { 
          const {
            authReducer: { user },
          } = getState();

          const response = await quizApi.getQuiz(id, user.access_token);
          if(response.status===200){
            dispatch({
              type: QUIZ_CONSTANT.GET_QUIZ,
              payload: response.data.quiz,
            })
          }
          else
          {
            dispatch({
              type: QUIZ_CONSTANT.SET_QUIZ_ERROR,
              payload: response.data.message,
            })
          }
        } catch (error) {
          dispatch({ type: QUIZ_CONSTANT.SET_QUIZ_ERROR })
          error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        }
      }
};

export const getQuizByListen = (id) => {
    return async (dispatch, getState) => {
        try { 
          const {
            authReducer: { user },
          } = getState();

          const response = await quizApi.getQuizByListen(id, user.access_token);
          if(response.status===200){
            dispatch({
              type: QUIZ_CONSTANT.GET_QUIZ,
              payload: response.data.quiz,
            })
          }
          else
          {
            dispatch({
              type: QUIZ_CONSTANT.SET_QUIZ_ERROR,
              payload: response.data.message,
            })
          }
        } catch (error) {
          dispatch({ type: QUIZ_CONSTANT.SET_QUIZ_ERROR })
          error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        }
      }
};

export const getAllQuiz = () => {
    return async (dispatch, getState) => {
        try { 
          const {
            authReducer: { user },
          } = getState();

          const response = await quizApi.getAllQuiz(user.access_token);
          if(response.status===200){
            dispatch({
              type: QUIZ_CONSTANT.GET_QUIZ,
              payload: response.data.quizzes,
            })
          }
          else
          {
            dispatch({
              type: QUIZ_CONSTANT.SET_QUIZ_ERROR,
              payload: response.data.message,
            })
          }
        } catch (error) {
          dispatch({ type: QUIZ_CONSTANT.SET_QUIZ_ERROR })
          error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        }
      }
};

export const postQuizByListen = (id, formData) => {
    return async (dispatch, getState) => {
        try { 
          const {
            authReducer: { user },
          } = getState();

          const response = await quizApi.postQuizByListen(id, formData, user.access_token);
          if(response.status===200){
            dispatch({
              type: QUIZ_CONSTANT.CREATE_QUIZ,
              payload: response.data.quiz,
            })
            toast.success("Add successfully.")
          }
          else
          {
            dispatch({
              type: QUIZ_CONSTANT.SET_QUIZ_ERROR,
              payload: response.data.message,
            })
          }
        } catch (error) {
          dispatch({ type: QUIZ_CONSTANT.SET_QUIZ_ERROR })
          error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        }
      }
};

export const deleteQuiz = (id) => {
    return async (dispatch, getState) => {
        try { 
          const {
            authReducer: { user },
          } = getState();

          const response = await quizApi.deleteQuiz(id, user.access_token);
          if(response.status===200){
            dispatch({
              type: QUIZ_CONSTANT.DELETE_QUIZ,
              payload: id,
            })
            toast.success(response.data.message)
          }
          else
          {
            dispatch({
              type: QUIZ_CONSTANT.SET_QUIZ_ERROR,
              payload: response.data.message,
            })
          }
        } catch (error) {
          dispatch({ type: QUIZ_CONSTANT.SET_QUIZ_ERROR })
          error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        }
      }
};

export const deleteQuizByListen = (id) => {
    return async (dispatch, getState) => {
        try { 
          const {
            authReducer: { user },
          } = getState();

          const response = await quizApi.deleteQuizByListen(id, user.access_token);
          if(response.status===200){
            dispatch({
              type: QUIZ_CONSTANT.DELETE_QUIZ_BY_LISTEN,
              payload: id,
            })
            toast.success(response.data.message)
          }
          else
          {
            dispatch({
              type: QUIZ_CONSTANT.SET_QUIZ_ERROR,
              payload: response.data.message,
            })
          }
        } catch (error) {
          dispatch({ type: QUIZ_CONSTANT.SET_QUIZ_ERROR })
          error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        }
      }
};