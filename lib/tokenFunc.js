// 临时凭据


export let tokenFunc = {
	_tokenArr: [],
};


// 创建并添加一个 token
tokenFunc.add = () => {
	let token = randomString(220);

	tokenFunc._tokenArr.push(token);

	return token;
};


// 删除一个 token
tokenFunc.del = (string) => {
	let index = string.indexOf();
	if(index === -1){
		return false;
	}

	tokenFunc._tokenArr.splice(index, 1);
	return true;
};


// 查询是否存在一个token
tokenFunc.inq = (string) => {
	if(tokenFunc._tokenArr.indexOf(string) !== -1){
		return true;
	}
	return false;
};


// 生成随机字符串
function randomString(leng = 64){
	let chars = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890';
	let charsLength = chars.length;
	let string = '';

	for(let i = 0; i < leng; ++i){
		string += chars.charAt(Math.floor(Math.random() * charsLength));
	}

	return string;
};
