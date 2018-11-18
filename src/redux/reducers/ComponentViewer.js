import {Const} from './../../const/Const';
export default function ComponentViewer(state = {
  dataComponentViewer: [],
},action) {
  var {dataComponentViewer,data} = state;
  switch (action.type) {
    case `${Const.ADD_COMPONENT_VIEWER}`:
        dataComponentViewer=[...dataComponentViewer,action.payload]
        return {...state, dataComponentViewer};
      break;
    case `${Const.EDIT_COMPONENT_VIEWER}`:
      dataComponentViewer=action.payload
      return {...state, dataComponentViewer};
    break;
    default:
      return state;
  }
}
