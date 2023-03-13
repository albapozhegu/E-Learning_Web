import IPA_CONSTANT from "../constants/ipaConstant";

const initialState = {
    ipas: [],
    ipa: null,
    message: null,
    isIPALoading: false,
}
const ipaReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case IPA_CONSTANT.SET_IPA_LOADING:
      return {
        ...state,
        isIPALoading: payload,
      }
    case IPA_CONSTANT.SET_IPA_ERROR:
      return {
        ...state,
        ipas:[],
        message: payload,
        isIPALoading: true,
      }
    case IPA_CONSTANT.GET_IPA:
      return {
        ...state,
        ipa: payload,
      }
    case IPA_CONSTANT.GET_IPA_RELATIVE:
      return {
        ...state,
        ipas: payload,
      }

    case IPA_CONSTANT.GET_IPA_BY_TYPE:
      return {
        ...state,
        ipas: payload,
      }
    case IPA_CONSTANT.CREATE_IPA:
        return {
          ...state,
          ipa: payload,
          ipas: [...state.ipas, payload],
        }
    default:
      return state
  }
}

export default ipaReducer
