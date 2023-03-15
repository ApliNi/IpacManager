// 前端

import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import { Config } from '../config.js';
import { serverHttp, serverHttpError } from './http.js';
import { serverWS } from './ws.js';
import { logger } from '../lib/logger.js';

// express
const app = express();

// HTTP Server
app.use(serverHttp);
app.use(serverHttpError);

// WS Server, 共用端口
const wss = new WebSocketServer({ noServer: true });
const server = http.createServer(app).listen(Config.http_server.port);

// 仅在请求指定目录时交给ws处理
server.on('upgrade', (req, socket, head) => {
	if(req.url === '/ws/'){
		wss.handleUpgrade(req, socket, head, (ws) => {
			wss.emit('connection', ws, req);
		});
		return;
	}
	// 关闭连接
	socket.destroy();
});

wss.on('connection', serverWS);


logger.info('[前端] WEB 服务器启动完成');
