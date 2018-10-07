import {Const} from './../../const/Const';
export default function formReducer(state = {
  dataForm: [],
},action) {
  var {dataForm,data} = state;
  switch (action.type) {
    case `${Const.ADD_FORM}`:
      dataForm = [...dataForm,action.payload];
        return {...state, dataForm};
      break;
    case `${Const.EDIT_FORM}`:
        return {...state, dataForm:action.payload};
      break;
    case `${Const.DELETE_FORM}`:
        return {...state, dataForm:action.payload};
      break;
    default:
      return state;
  }
}
