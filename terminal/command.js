// 控制台命令

import readline from 'readline';
import { readdirSync } from 'fs';
import { EventEmitter } from 'events';
import { logger } from '../lib/logger.js';
import path from 'path';


logger.info('[终端] 正在启动终端命令模块');


// 配置
export let Terminal = {
	// 用户运行指令事件
	RunCommandEvent: new EventEmitter(),
	// 构造函数
	Constructor: function(mainCommand, commandArray){
		this.mainCommand = mainCommand;
		this.commandArray = commandArray;
		this.sendMessage = (message) => {
			console.log(message);
		};
	},
};


// 创建readline接口实例
let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	// prompt: '> ',
	prompt: '',
});

// 完成输入/回车
rl.on('line', (line) => {
	// 获取命令数组
	let commandArray = line.trim().split(' ');

	if(commandArray.length > 0){
		// 触发事件
		let state = Terminal.RunCommandEvent.emit(commandArray[0],
			new Terminal.Constructor(commandArray[0], commandArray));

		if(! state){
			logger.info('没有这个指令');
		}

		rl.prompt();
	}
});

// 关闭
// rl.on('close', () => {
// 	process.exit(0);
// });

// 加载所有指令模块
readdirSync(path.join(path.resolve(), './terminal/plugins/')).map(value => {
	logger.info('[终端] [模块] 正在加载命令模块: '+ value);
	import('./plugins/' + value);
});


// 显示提示字符
// rl.prompt();

logger.info('[终端] 终端命令启动完成');
