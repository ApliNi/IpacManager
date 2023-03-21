// http 登录数据包

import { dbGetAll } from "../../lib/sqlLoad.js";
import { HttpServer } from "../http.js";
import crypto from 'crypto';
import { tokenFunc } from '../../lib/tokenFunc.js';


HttpServer.RequestHttpApiEvent.on('login', async (apiID, post, ip, req, res) => {
	// let {apiID, post, ip, req, res} = data;

	// 从post中获取用户名和密码
	let {userName, password} = post;

	let s = await password_ok(userName, password);

	if(s === true){
		// 创建 token
		let token = tokenFunc.add();
		res.status(200);
		res.end(JSON.stringify({
			login: true,
			token: token,
		}));
	}else{
		res.status(200);
		res.end(JSON.stringify({
			login: false,
			// token: null,
		}));
	}
});


//
async function password_ok(userName, password){
	// 在数据库中查询密码和盐
	let dbData = (await dbGetAll('SELECT (userName, sha, salt) FROM user WHERE userName = ? LIMIT 1', [userName]));

	if(dbData.length !== 1){
		return false;
	}

	dbData = dbData[0];

	// 计算密码+盐的哈希
	let password_sha = crypto.createHash('sha256').update(password + dbData['salt']).digest('hex');

	//比对
	if(dbData['sha'] === password_sha){
		return true;
	}

	return false;
};
