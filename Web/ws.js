// 处理 WS 连接

import { getIP } from "../lib/getIP.js";
import { logger } from "../lib/logger.js";


export function serverWS(ws, req){
	let ip = getIP(req);
	logger.info('[ WS ] ['+ ip.join(', ') +'] 建立连接');

	// 收到消息
	ws.on('message', async (m) => {
		logger.info('[ WS ] 收到消息: '+ m);
	});

	// 连接断开
	ws.on('close', async (code) => {
		logger.info('[ WS ] ['+ ip.join(', ') +'] 断开连接: '+ code);
	});

	// 连接丢失
	ws.on('disconnect', async (code) => {
		logger.info('[ WS ] ['+ ip.join(', ') +'] 连接丢失: '+ code);
	});
};


logger.info('[ WS ] WS 服务器启动完成');
