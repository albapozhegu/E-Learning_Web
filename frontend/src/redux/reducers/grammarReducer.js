import GRAMMAR_CONSTANT from "../constants/grammarConstant";

const initialState = {
    questions: [],
    grammars: [],
    grammar: [],
    levels:[],
    message: null,
    isGrammarLoading: false,
}
const grammarReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GRAMMAR_CONSTANT.SET_GRAMMAR_LOADING:
      return {
        ...state,
        isGrammarLoading: payload,
      }
    case GRAMMAR_CONSTANT.SET_GRAMMAR_ERROR:
      return {
        ...state,
        grammars:[],
        message: payload,
        isGrammarLoading: true,
      }
    case GRAMMAR_CONSTANT.GET_GRAMMAR:
      return {
        ...state,
        grammar: payload.grammar,
        questions: payload.questions,
      }
     case GRAMMAR_CONSTANT.GET_GRAMMAR_BY_ID:
      return {
        ...state,
        grammar: payload.grammar,
      }
    case GRAMMAR_CONSTANT.CREATE_GRAMMAR:
        return {
          ...state,
          grammar: payload,
          grammars: [...state.grammars, payload],
        }
    case GRAMMAR_CONSTANT.EDIT_GRAMMAR:
        const newGrammars = state.grammars.map((grammar) =>
              grammar._id === payload._id ? payload : grammar
        )
        return {
            ...state,
            grammar: payload,
            grammars: newGrammars,
        }
    case GRAMMAR_CONSTANT.DELETE_GRAMMAR:
        return {
            ...state,
            grammars: state.grammars.filter(
            (grammar) => grammar._id !== payload
            ),
        }
    case GRAMMAR_CONSTANT.GET_ALL_GRAMMAR:
        return {
            ...state,
            grammars: payload,
        }
    case GRAMMAR_CONSTANT.GET_GRAMMAR_BY_LEVEL:
        return {
            ...state,
            grammars: payload,
        }
    case GRAMMAR_CONSTANT.GET_GRAMMAR_LEVELS:
        return {
            ...state,
            levels: payload,
        }      
    default:
      return state
  }
}

export default grammarReducer
