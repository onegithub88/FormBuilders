import {combineReducers} from 'redux';
import WorkFlows from './workFlowReducer';
import Forms from './formReducer';
import FormBuilders from './formBuilderReducer';
import ComponentViewer from './ComponentViewer';

export default combineReducers({
  WorkFlows,
  Forms,
  FormBuilders,
  ComponentViewer
})
