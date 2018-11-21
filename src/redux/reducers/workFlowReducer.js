import {Const} from './../../const/Const';
export default function workFlowReducer(state = {
  dataWorkFlow: [],
},action) {
  var {dataWorkFlow,data} = state;
  switch (action.type) {
    case `${Const.ADD_WORKFLOW}`:
      dataWorkFlow = [...dataWorkFlow,action.payload];
        return {...state, dataWorkFlow};
      break;
    case `${Const.EDIT_WORKFLOW}`:
      return {...state, dataWorkFlow:action.payload};
      break;
    case `${Const.DELETE_WOREDIT_WORKFLOW}`:
      return {...state, dataWorkFlow:action.payload};
      break;
    default:
      return state;
  }
}
