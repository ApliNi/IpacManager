// 运行一个程序

import cp from 'child_process';
import iconv from 'iconv-lite';
import path from 'path';
import { logger } from '../lib/logger.js';


// 配置
export let RunConfig = {
	// 实例 ID: Data
	instances: {
		// 100: {},
	},
	// 实例自增ID
	nextID: 100,
	// 实例构造函数
	Constructor: function(){

	},
};


// 创建一个Run实例
export function newRunInstances(){

};


// 运行 shell 命令
// 返回 child_process.exec 实例
export function run(command, cwd){
	// 工作目录
	cwd = cwd ? path.join(cwd) : path.join(path.resolve(), './Manager/defaultRunDirectory/');

	// 默认使用 binary, 在输出时使用 iconv 转码
	// iconv.decode(data, 'gbk')
	let cmd = cp.exec(command, {
		encoding: 'binary', // 编码
		cwd: cwd, // 运行目录
	});
	return cmd;

	// cmd.stdout.on('data', (data) => {
	// 	process.stdout.write(iconv.decode(data, 'gbk')); // 不换行输出
	// });

	// cmd.stderr.on('data', (data) => {
	// 	process.stdout.write(iconv.decode(data, 'gbk')); // 不换行输出
	// });
};

// 关闭 iconv 的警告
// Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding
iconv.skipDecodeWarning = true;


