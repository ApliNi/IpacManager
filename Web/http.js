// 处理 HTTP 请求

import { getIP } from "../lib/getIP.js";
import urlMoudule from 'url';
import path from 'path';
import querystring from 'querystring';
import { existsSync } from "fs";
import { logger } from "../lib/logger.js";
import { EventEmitter } from "events";


export let HttpServer = {
	apiList: ['login'],
	RequestHttpApiEvent: new EventEmitter(),
};


// 处理HTTP请求
export async function serverHttp(req, res){
	let ip = getIP(req);
	let requestPath = urlMoudule.parse(req.url).pathname;

	// 如果请求API目录
	if(requestPath.indexOf('/api/') !== -1){
		// res.status(200);
		// res.send('aas');
		httpApi(requestPath, ip, req, res);
	}else{
		httpStaticResources(requestPath, ip, req, res);
	}
};


// API
async function httpApi(requestPath, ip, req, res){
	// 获取请求的API目录名 '/api/login/' -> 'login'
	let apiID = requestPath.substring(5, requestPath.length - 1);
	// 如果不存在这个API
	if(HttpServer.apiList.indexOf(apiID) === -1){
		res.status(404);
		res.end();
		logger.info('[HTTP API] ['+ ip.join(', ') +'] -> [404]: '+ apiID);
		return;
	}

	// 获取 post data
	let post = '';
	req.on('data', (chunk) => {post += chunk});

	req.on('end', async () => {
		post = querystring.parse(post);

		// 触发事件
		let state = HttpServer.RequestHttpApiEvent.emit(apiID,
			apiID,
			post,
			ip,
			req,
			res
		);

		logger.info('[HTTP API] ['+ ip.join(', ') +'] -> [200]: '+ apiID);

		if(! state){
			res.status(500);
			res.end();
			logger.warn('[HTTP API] 未处理的 HttpApi 请求? apiID='+ apiID);
			return;
		}
	});
};


// 提供静态资源
async function httpStaticResources(requestPath, ip, req, res){
	// 转到 index.html
	if(requestPath.split('/').pop() === ''){
		requestPath = path.join(requestPath, './index.html');
	}
	// 获取绝对路径
	requestPath = path.join(path.resolve(), './Web/www/', requestPath);

	// 如果文件不存在
	if(! existsSync(requestPath)){
		res.status(404);
		res.end();
		logger.info('[HTTP] ['+ ip.join(', ') +'] -> [404]: '+ req.url);
		return;
	}

	// 输出
	logger.info('[HTTP] ['+ ip.join(', ') +'] -> [200]: '+ req.url);
	res.status(200);
	res.sendFile(requestPath);
};


// 错误处理
export async function serverHttpError(err, req, res, next){
	let ip = getIP(req);
	console.error(err.stack);
	res.status(500);
	res.end();
	logger.error('[HTTP] ['+ ip.join(', ') +'] -> [500]: '+ req.url);
};


logger.info('[HTTP] HTTP 服务器启动完成');
