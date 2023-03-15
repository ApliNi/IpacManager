// 运行一个程序

import cp from 'child_process';
import iconv from 'iconv-lite';
import { logger } from '../lib/logger.js';


// 运行 shell 命令
// 返回 child_process.exec 实例
export function run(command){
	// 默认使用 binary, 在输出时使用 iconv 转码
	let cmd = cp.exec(command, {encoding: 'binary'});
	return cmd;
};

// cmd.stdout.on('data', (data) => {
// 	logger.info(iconv.decode(data, 'gbk'));
// });

// cmd.stderr.on('data', (data) => {
// 	logger.info(iconv.decode(data, 'gbk'));
// });
