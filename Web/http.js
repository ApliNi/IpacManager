// 处理 HTTP 请求

import { getIP } from "../lib/getIP.js";
import urlMoudule from 'url';
import path from 'path';
import { existsSync } from "fs";
import { logger } from "../lib/logger.js";


export function serverHttp(req, res){
	let ip = getIP(req);
	let requestPath = urlMoudule.parse(req.url).pathname;

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
export function serverHttpError(err, req, res, next){
	let ip = getIP(req);
	console.error(err.stack);
	res.status(500);
	res.end();
	logger.error('[HTTP] ['+ ip.join(', ') +'] -> [500]: '+ req.url);
};


logger.info('[HTTP] HTTP 服务器启动完成');
