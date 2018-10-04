import {Const} from './../../const/Const';
export default function moduleReducer(state = {
  dataModule: [],
},action) {
  var {dataModule,data} = state;
  switch (action.type) {
    case `${Const.ADD_MODULE}`:
      dataModule = [...dataModule,action.payload];
        return {...state, dataModule};
      break;
    default:
      return state;
  }
}
