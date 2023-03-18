
import { Config } from './pages.js';


// 为按钮生成id
Array.prototype.slice.call(document.getElementById('ui_menubar').getElementsByTagName('a')).forEach(async (e) => {
	if(e){
		e.id = 'btn_'+ e.href.substring(e.href.indexOf('#') + 1);
	}
});


// 侧边栏按钮
document.getElementById('btn_open_menubar').addEventListener('click', async () => {
	document.getElementById('ui_menubar').classList.add('-open');
	document.getElementById('btn_open_menubar_full').classList.add('-open');
});
document.getElementById('btn_open_menubar_full').addEventListener('click', async () => {
	document.getElementById('ui_menubar').classList.remove('-open');
	document.getElementById('btn_open_menubar_full').classList.remove('-open');
});


// 从url中获取当前pageID
export function pageIDFromURL(){
	let u = window.location.hash + '?';
	return u.substring(u.indexOf('#') + 1, u.indexOf('?'));
};


// 切换页面
export async function switchPage(pageID, title = null){
	// 更新页面
	document.getElementById('page_'+ Config.current_pageID)?.classList.remove('-open');
	document.getElementById('page_'+ pageID)?.classList.add('-open');

	// 更新按钮
	document.getElementById('btn_'+ Config.current_pageID)?.classList.remove('-open');
	document.getElementById('btn_'+ pageID)?.classList.add('-open');

	// 更新标题
	document.getElementById('page_title').innerHTML = (title !== null)? title : document.getElementById('page_'+ pageID)?.dataset?.title;

	// 更新配置中的当前页面
	Config.current_pageID = pageID;
};



