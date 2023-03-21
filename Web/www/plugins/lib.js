
// 从url中获取当前pageID
export function pageIDFromURL(){
	let u = window.location.hash + '?';
	return u.substring(u.indexOf('#') + 1, u.indexOf('?'));
};


//读写 localStorage
export let localData = {
	dataList: {},

	// 获取一个本地存储中的数据
	get: (name = '_Data') => {
		// 将数据保存到内存, 之后可在内存中修改
		if(localData.dataList[name]){
			return localData.dataList[name];
		}else{
			let data = JSON.parse(localStorage.getItem(name));
			if(data){
				localData.dataList[name] = data;
				return localData.dataList[name];
			}
		}
		return null;
	},

	// 将内存中的数据提交到本地存储
	submit: (name = '_Data') => {
		if(localData.dataList?.name){
			localStorage.setItem(name, JSON.stringify(localData.dataList.name));
		}
	},
};


// http 请求
export async function HttpRequest(e, callback, callbackErr){
	let _e = {
		url: e.url,
		method: e.method || 'POST',
		headers: e.headers || {}, //"Content-Type": "multipart/form-data"
		body: e.body || {},
	};

	fetch(_e.url, {
		method: _e.method,
		headers: _e.headers,
		body: _e.body,
	})
	.then((response) => {response.text()})
	.catch((err) => {
		// console.error('[HTTP请求]:', err);
		if(callbackErr) callbackErr(err);
	})
	.then(data => {
		// console.log('[HTTP请求]:', data);
		if(callback) callback(data);
		return data;
	});
};
