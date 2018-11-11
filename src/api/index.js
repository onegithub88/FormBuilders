import axios from 'axios';
import {Const} from './../const/Const';
const api = axios.create({
	baseURL:Const.api
});

export default api;