// 控制台命令

import readline from 'readline';
import { logger } from '../lib/logger.js';


// 创建readline接口实例
let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: '> ',
});

// 等待用户输入
rl.prompt({
	preserveCursor: true
});

// 完成输入/回车
rl.on('line', (line) => {
	switch (line.trim()) {
		case 'test':
			logger.info('test');
			break;
		default:
			logger.info('没有这个指令');
			break;
	}
	rl.prompt();
});

// 关闭
// rl.on('close', () => {
// 	process.exit(0);
// });
