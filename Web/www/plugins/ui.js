// 页面流程序

import { pageIDFromURL } from "./lib.js";
import { switchPage } from "./pages.js";


// 配置
export let Config = {
	current_pageID: null,
};


// 为HTML中的按钮生成id
Array.prototype.slice.call(document.getElementById('ui_menubar').getElementsByTagName('a')).forEach(async (e) => {
	if(e){
		e.id = 'btn_'+ e.href.substring(e.href.indexOf('#') + 1);
	}
});


// 初始化程序
// (() => {
// 	// 从url配置中获取当前页面
// 	let pageID = pageIDFromURL();
// 	if(pageID !== ''){
// 		Config.current_pageID = pageID;
// 	}

// 	// 打开配置中的页面
// 	// switchPage(Config.current_pageID);
// })();


// 侧边栏按钮
document.getElementById('btn_open_menubar').addEventListener('click', async () => {
	document.getElementById('ui_menubar').classList.add('-open');
	document.getElementById('btn_open_menubar_full').classList.add('-open');
});
document.getElementById('btn_open_menubar_full').addEventListener('click', async () => {
	document.getElementById('ui_menubar').classList.remove('-open');
	document.getElementById('btn_open_menubar_full').classList.remove('-open');
});



