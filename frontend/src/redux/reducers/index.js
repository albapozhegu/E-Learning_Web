import { combineReducers } from 'redux';
import authReducer from './authReducer';
import tokenReducer from './tokenReducer';
import messageReducer from './messageReducer';
import listeningReducer from './listeningReducer';
import wordReducer from './wordReducer';
import voiceReducer from './voiceReducer';
import ipaReducer from './ipaReducer';
import grammarReducer from './grammarReducer';


export const rootReducer = combineReducers({
  authReducer,
  tokenReducer,
  messageReducer,
  listeningReducer,
  wordReducer,
  voiceReducer,
  ipaReducer,
  grammarReducer,
})
