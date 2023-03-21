// http token 登录数据包

import { HttpServer } from "../http.js";
import crypto from 'crypto';
import { tokenFunc } from '../../lib/tokenFunc.js';


HttpServer.RequestHttpApiEvent.on('token_login', async (apiID, post, ip, req, res) => {
	// let {apiID, post, ip, req, res} = data;

	// 从post中获取tokne
	let {token} = post;

	let s = tokenFunc.inq(token);

	if(s === true){
		res.status(200);
		res.end(JSON.stringify({
			login: true,
		}));
	}else{
		res.status(200);
		res.end(JSON.stringify({
			login: false,
		}));
	}
});
