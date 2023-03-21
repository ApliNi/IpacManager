// 客户端登录模块

import { EventEmitter } from "./event.js";
import { HttpRequest, localData } from "./lib.js";
import { switchPage } from "./pages.js";


// 如果客户端有token, 就使用tokne登录.
// 如果没有或token失效, 就打开登录页面.

// 事件
export let login = {
	LoginEvent: new EventEmitter(),
}

let loginData = localData.get('login');
// 如果存在token
if(loginData){

	HttpRequest({
		url: '/api/token_login/',
		body: {
			token: data.token,
		}
	}, (data) => {
		if(data?.login === true){
			// 登录完成
			login.LoginEvent.emit('ok', data);
		}else{
			// 显示登录页面
			// login.LoginEvent.emit('no_page', data);
			switchPage('/login');
		}
	});

	
}else{
	// 显示登录页面
	// login.LoginEvent.emit('no_page');
	switchPage('/login');
}
