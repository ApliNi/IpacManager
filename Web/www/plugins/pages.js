// 多页面管理程序

import { EventEmitter, windowEvent } from "./event.js";
import { HttpRequest } from "./lib.js";
import { Config } from "./ui.js";


// 

let pages = {
	pageList: [
		// 'login.js'
		{
			category: '应用',
			list: [
				{
					name: '状态信息',
					// title: '状态信息',
					id: '#/statis',
					class: 'bi bi-radioactive', // bi bi-speedometer
					path: 'statis',
				},
				{
					name: '应用实例',
					id: '#/instances',
					class: 'bi bi-boxes',
					path: 'instances',
				},
				{
					name: '资源管理',
					id: '#/resource',
					class: 'bi bi-folder2',
					path: 'resource',
				},
			],
		},
		{
			category: '管理',
			list: [
				{
					name: '软件配置',
					id: '#/config',
					class: 'bi bi-braces-asterisk',
					path: 'config',
				},
			],
		},
		{
			category: '工具',
			list: [
				{
					name: '记事本 |',
					id: '#/tool_notepad',
					class: 'bi bi-clipboard-check',
					path: 'tool_notepad',
				},
				{
					name: '正则测试',
					id: '#/tool_regex',
					class: 'bi bi-regex',
					path: 'tool_regex',
				},
			],
		},
		{
			category: '文档',
			list: [
				{
					name: 'GitHub',
					id: 'https://github.com/ApliNi/IpacManager/',
					class: 'bi bi-github',
					link: true,
				},
			],
		},
		{
			hide: true,
			list: [
				{
					name: '登录',
					id: '#/login',
					path: 'login',
				},
			]
		}
	],
	document: {
		// 'pageName': document,
	},

	PageOpenEvent: new EventEmitter(), // 页面打开事件
	PageCloseEvent: new EventEmitter(), // 页面关闭事件
};


// 加载所有页面模块
(() => {
	let iM = '';
	
	// 遍历所有类别
	pages.pageList.forEach((pageList) => {

		// 创建类别标题
		if(! pageList?.hide) iM += `<hr /><span class="subtitle">${pageList.category}</span>`;

		// 遍历类别内容
		pageList.list.forEach((page) => {
			// 创建页面按钮
			if(! pageList?.hide) iM += `<a ${(page?.link ? 'target="_blank"' : '')} href="${page.id}"><i class="${page.class}"></i>${page.name}</a>`;

			// 加载页面模块
			if(page?.path){
				loadResource(page);
			}
		});
	});

	document.getElementById('ui_menubar').innerHTML = iM;
})();


function loadResource(page){
	let urlPrefix = '/pages/'+ page.path;
			
	// HTML
	HttpRequest({
		url: urlPrefix +'/this.html',
	}, (htm) => {
		// 创建页面主元素
		let dom = document.createElement('div');
			dom.dataset.title = page.name;
			dom.innerHTML = htm;
		pages.document[page.id] = document.getElementById('page').appendChild(dom);
	});

	// CSS
	let cssDom = document.createElement('link');
		cssDom.rel = 'stylesheet';
		cssDom.href = urlPrefix +'/this.css';
		// cssDom.onload = function(){};
		// cssDom.onerror = function(){};
	document.getElementsByTagName('head')[0].appendChild(cssDom);

	// js
	import(urlPrefix +'/this.js');
};


// 切换页面
export async function switchPage(pageID, title = null){
	// 更新页面
	// document.getElementById('page_'+ Config.current_pageID)?.classList.remove('-open');
	// document.getElementById('page_'+ pageID)?.classList.add('-open');
	pages.document[Config.current_pageID]?.classList.remove('-open');
	pages.document[pageID]?.classList.add('-open');

	// 更新按钮
	document.getElementById('btn_'+ Config.current_pageID)?.classList.remove('-open');
	document.getElementById('btn_'+ pageID)?.classList.add('-open');
	// pages.document[Config.current_pageID]?.classList.remove('-open');
	// pages.document[pageID]?.classList.add('-open');

	// 更新标题
	document.getElementById('page_title').innerHTML = (title !== null)? title : document.getElementById('page_'+ pageID)?.dataset?.title;


	// 页面关闭事件
	pages.PageCloseEvent.emit(Config.current_pageID);
	// 页面打开事件
	pages.PageOpenEvent.emit(pageID);

	// 更新配置中的当前页面
	Config.current_pageID = pageID;
};


// 监听URL改变
windowEvent.on('hashchange', async () => {
	let pageID = window.location.hash +'?';
	pageID = pageID.substring(0, pageID.indexOf('?'));

	// 如果需要切换页面
	if(pageID.substring(0, 1) === '/' && pageID !== Config.current_pageID){
		switchPage(pageID);
	}
});
