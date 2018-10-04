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
    default:
      return state;
  }
}
