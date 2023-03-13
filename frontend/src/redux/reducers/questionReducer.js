import QUESTION_CONSTANT from "../constants/questionConstant";

const initialState = {
    questions: [],
    question: [],
    message: null,
    isQuestionLoading: false,
}
const questionReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case QUESTION_CONSTANT.SET_QUESTION_LOADING:
      return {
        ...state,
        isQuestionLoading: payload,
      }
    case QUESTION_CONSTANT.SET_QUESTION_ERROR:
      return {
        ...state,
        questions:[],
        message: payload,
        isQuestionLoading: true,
      }
    case QUESTION_CONSTANT.GET_QUESTION:
      return {
        ...state,
        question: payload,
        isQuestionLoading: true,
      }
    case QUESTION_CONSTANT.GET_QUESTION_BY_QUIZ:
      return {
        ...state,
        question: payload,
        isQuestionLoading: true,
      }
    case QUESTION_CONSTANT.CREATE_QUESTION:
        return {
          ...state,
          question: payload,
          questions: [...state.questions, payload],
        }
    case QUESTION_CONSTANT.EDIT_QUESTION:
          const newQuestions = state.questions.map((question) =>
                question._id === payload._id ? payload : question
          )
          return {
              ...state,
              question: payload,
              questions: newQuestions,
        }
    case QUESTION_CONSTANT.DELETE_QUESTION_BY_QUIZ:
        return {
            ...state,
            questions: state.questions.filter(
            (question) => question.QuizId !== payload
            ),
        }
    case QUESTION_CONSTANT.DELETE_QUESTION:
        return {
            ...state,
            questions: state.questions.filter(
            (question) => question._id !== payload
            ),
        }   
    default:
      return state
  }
}

export default ipaReducer
