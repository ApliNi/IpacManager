// 主配置

import { readFileSync } from 'fs';


// 用户配置
export let Config = {
	// http 以及 ws 服务器的配置
	http_server: {
		port: 17072, // 端口
		cert: { // SSL证书
			// key:  readFileSync('./Web/cert/key.key'),
			// cert: readFileSync('./Web/cert/pem.pem'),
		},
	},

	_c: {}, // 程序配置
};


Config._c.start_time = performance.now();

