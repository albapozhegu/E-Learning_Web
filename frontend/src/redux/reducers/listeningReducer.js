import LISTEN_CONSTANT from "../constants/listeningConstant";

const initialState = {
  questions: [],
  listen: [],
  listens:[],
  topics:[],
  message: null,
  isListenLoading: false,
}
const listeningReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case LISTEN_CONSTANT.SET_LISTEN_LOADING:
      return {
        ...state,
        isListenLoading: payload,
      }
    case LISTEN_CONSTANT.SET_LISTEN_ERROR:
      return {
        ...state,
        message: payload,
        isListenLoading: true,
      }

    case LISTEN_CONSTANT.GET_LISTENING: 
      return {
        ...state,
        listen: payload.listen,
        questions: payload.questions,
      }
      case LISTEN_CONSTANT.GET_LISTEN_BY_ID:
        return {
          ...state,
          listen: payload,
        }
      case LISTEN_CONSTANT.CREATE_LISTEN:
          return {
            ...state,
            listen: payload,
            listens: [...state.listens, payload],
          }
      case LISTEN_CONSTANT.EDIT_LISTEN:
          const newListens = state.listens.map((listen) =>
                listen._id === payload._id ? payload : listen
          )
          return {
              ...state,
              listen: payload,
              listens: newListens,
          }
      case LISTEN_CONSTANT.DELETE_LISTEN:
          return {
              ...state,
              listens: state.listens.filter(
              (listen) => listen._id !== payload
              ),
          }
      case LISTEN_CONSTANT.GET_ALL_LISTEN:
          return {
              ...state,
              listens: payload,
          }
      case LISTEN_CONSTANT.GET_LISTEN_BY_TOPIC:
          return {
              ...state,
              listens: payload,
          }
      case LISTEN_CONSTANT.GET_LISTEN_TOPICS:
          return {
              ...state,
              topics: payload,
          }
      case LISTEN_CONSTANT.SEARCH_LISTEN:
          return {
              ...state,
              listens: payload,
          }       
      default:
        return state
    }
  }
  
  export default listeningReducer
  