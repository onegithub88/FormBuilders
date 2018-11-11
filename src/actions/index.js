import React from 'react';
import api from './../api';

export const dispatchAction = (payload,action,dragStatus)=>({
	type:action,
	payload,
	dragStatus
})

export const dispatchActionTab = (payload,action,index)=>({
	type:action,
	payload,
	index
})

export const commonDispatch=(dispatch,data,status,action)=>{
    dispatch({
      type:`${action}_${SUCCESS_STATUS}`,
      status:status,
      payload:data
    })
}

//------------------------------------------------------------------------------------------------------------------------=>
/*<<apiCall>>*/
//------------------------------------------------------------------------------------------------------------------------=>
export const apiCall = ({
	post : async (endpoint,data,callback,header) => {
		console.log(endpoint, data, callback, header);
			await api.post(endpoint,data,header).then((result) => {
				console.log("FROM POST DATA");
				console.log(result);
				console.log(result);
			callback.call(this,result);
		  
		}).catch(error => {
			var _tempErrDetail = error.response.data.error.error_details ? error.response.data.error.error_details : null;
		    callback.call(this,_tempErrDetail,dispatch);
		});
	},
	get : async (endpoint,header,callback,dispatch) => {
			await api.get(endpoint,header).then((result) => {
			if(header.params && header.params.type!=''){
				callback.call(this,result.data,dispatch);
			}else {
				callback.call(this,result.data.data,dispatch);
			}
		  
		}).catch(error => {
		    var _tempErrDetail = error.response.data.error.error_details ? error.response.data.error.error_details : null;
		    callback.call(this,_tempErrDetail,dispatch);
		});
	}
});

