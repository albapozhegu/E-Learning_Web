import WORD_CONSTANT from "../constants/wordConstant";

const initialState = {
  wordData: null,
  words:[],
  topics:[],
  wordpack:[],
  message: null,
  isWordLoading: false,
}
const wordReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case WORD_CONSTANT.SET_WORD_LOADING:
      return {
        ...state,
        isWordLoading: payload,
      }
    case WORD_CONSTANT.SET_WORD_ERROR:
      return {
        ...state,
        message: payload,
        isWordLoading: true,
      }

    case WORD_CONSTANT.GET_WORD:
      return {
        ...state,
        wordData: payload,
      }
      case WORD_CONSTANT.CREATE_WORD:
          return {
            ...state,
            wordData: payload,
            words: [...state.words, payload],
          }
          case WORD_CONSTANT.EDIT_WORD:
            const arr = { ...state };
            const newWords = arr.words.map((word) =>
              word._id === payload._id ? payload : word
            );
            return {
              ...state,
              wordData: payload,
              words: newWords,
            };
      case WORD_CONSTANT.DELETE_WORD:
          return {
              ...state,
              words: state.words.filter(
              (word) => (word.word !== payload.word && word.type!==payload.type)
              ),
          }
      case WORD_CONSTANT.GET_ALL_WORD:
          return {
              ...state,
              words: payload,
          }
      case WORD_CONSTANT.GET_WORD_BY_TOPIC:
          return {
              ...state,
              words: payload,
          }
      case WORD_CONSTANT.GET_WORD_TOPICS:
          return {
              ...state,
              topics: payload,
          }
      case WORD_CONSTANT.SEARCH_WORD:
          return {
              ...state,
              words: payload,
          } 
    case WORD_CONSTANT.GET_WORDPACK:
          return {
              ...state,
              wordpack: payload,
          }       
      default:
        return state
    }
  }
  
  export default wordReducer
  