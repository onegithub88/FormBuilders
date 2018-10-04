import React from 'react';

export const dispatchAction = (payload,action,dragStatus)=>({
	type:action,
	payload,
	dragStatus
})
