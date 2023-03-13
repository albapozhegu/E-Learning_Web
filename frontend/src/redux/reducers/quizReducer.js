import QUIZ_CONSTANT from "../constants/quizConstant";

const initialState = {
    quizzes: [],
    quiz: [],
    message: null,
    isQuizLoading: false,
}
const quizReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case QUIZ_CONSTANT.SET_QUIZ_LOADING:
      return {
        ...state,
        isQuizLoading: payload,
      }
    case QUIZ_CONSTANT.SET_QUIZ_ERROR:
      return {
        ...state,
        quizzes:[],
        message: payload,
        isQuizLoading: true,
      }
    case QUIZ_CONSTANT.GET_QUIZ:
      return {
        ...state,
        quiz: payload,
        isQuizLoading: true,
      }
    case QUIZ_CONSTANT.GET_QUIZ_BY_LISTEN:
      return {
        ...state,
        quiz: payload,
        isQuizLoading: true,
      }
    case QUIZ_CONSTANT.CREATE_QUIZ:
        return {
          ...state,
          quiz: payload,
          quizzes: [...state.quizzes, payload],
        }
    case QUIZ_CONSTANT.DELETE_QUIZ_BY_LISTEN:
        return {
            ...state,
            quizzes: state.quizzes.filter(
            (quiz) => quiz.ListeningId !== payload
            ),
        }
    case QUIZ_CONSTANT.DELETE_QUIZ:
        return {
            ...state,
            quizzes: state.quizzes.filter(
            (quiz) => quiz._id !== payload
            ),
        }
    case QUIZ_CONSTANT.GET_ALL_QUIZ:
        return {
            ...state,
            quizzes: payload,
        }     
    default:
      return state
  }
}

export default ipaReducer
