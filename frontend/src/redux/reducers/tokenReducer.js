import USER_CONSTANT from './../constants/userConstant';

const token = ''

const tokenReducer = (state = token, action) => {
    switch(action.type){
        case USER_CONSTANT.GET_TOKEN:
            return action.payload
        default:
            return state
    }
}

export default tokenReducer
