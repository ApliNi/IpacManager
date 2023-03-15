
// 配置
let Config = {
	current_pageID: '/welcome',
};


// 初始化
initialization();
function initialization(){
	// 从url配置中获取当前页面
	Config.current_pageID = pageIDFromURL();
	if(Config.current_pageID === ''){
		Config.current_pageID = '/welcome';
	}

	// 打开配置中的页面
	switchPage(Config.current_pageID);
};


// 监听URL改变
window.addEventListener('hashchange', async () => {
	let pageID = window.location.hash +'?';
	pageID = pageID.substring(1, pageID.indexOf('?'));

	// 如果需要切换页面
	if(pageID.substring(0, 1) === '/' && pageID !== Config.pageID){
		switchPage(pageID);
	}
});



