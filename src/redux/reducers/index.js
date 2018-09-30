import {combineReducers} from 'redux';
import Modules from './moduleReducer';
import Forms from './formReducer';

export default combineReducers({
  Modules,
  Forms
})
