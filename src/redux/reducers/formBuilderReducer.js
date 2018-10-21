import {Const} from './../../const/Const';
export default function formBuilderReducer(state = {
  dataComponent: [],
  tempdataDrag:[],
},action) {
  var {dataComponent,data} = state;
  switch (action.type) {
    case `${Const.ADD_COMPONENT}`:
        dataComponent=[...dataComponent,action.payload]
        return {...state, dataComponent};
      break;

    case `${Const.ADD_COMPONENT_TAB}`:
      // dataComponent=[...dataComponent,action.payload]
      // return {...state, dataComponent};
      break;

    case `${Const.MOVE_COMPONENT}`:
        dataComponent=action.payload
        return {...state, dataComponent};
      break;
      
    case `${Const.EDIT_COMPONENT}`:
      dataComponent=action.payload
      return {...state, dataComponent};
    break;
    default:
      return state;
  }
}
