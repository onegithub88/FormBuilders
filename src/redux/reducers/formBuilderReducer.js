import {Const} from './../../const/Const';
export default function formBuilderReducer(state = {
  dataComponent: [],
  tempdataDrag:[],
  dragStatus:false
},action) {
  var {dataComponent,data} = state;
  switch (action.type) {
    case `${Const.ADD_COMPONENT}`:
        return {...state, dataComponent:action.payload};
      break;
    default:
      return state;
  }
}
