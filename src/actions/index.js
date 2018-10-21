import React from 'react';

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
