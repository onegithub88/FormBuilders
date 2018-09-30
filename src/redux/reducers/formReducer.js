import {Const} from './../../const/Const';
export default function formReducer(state = {
  dataForm: [],
},action) {
  var {dataForm,data} = state;
  switch (action.type) {
    case `${Const.ADD_FORM}`:
      console.log("FROM ADD FORM");
      console.log(action);
      dataForm = [...dataForm,action.payload];
        return {...state, dataForm};
      break;
    default:
      return state;
  }
}
