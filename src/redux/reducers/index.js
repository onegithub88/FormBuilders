import {combineReducers} from 'redux';
import Modules from './moduleReducer';
import Forms from './formReducer';
import FormBuilders from './formBuilderReducer';

export default combineReducers({
  Modules,
  Forms,
  FormBuilders
})
