// 用于格式化输出日志的模块

import { Config } from "../config.js";


// 获取时间 时:分:秒
function time(){
	let $t = new Date();
	return (
		$t.getHours().toString().padStart(2, '0')
		+':'+
		$t.getMinutes().toString().padStart(2, '0')
		+':'+
		$t.getSeconds().toString().padStart(2, '0')
	);
};


export async function logger(){};

// 配置
Config._t.logger = {
	quantity: {
		all: 0,
		info: 0,
		warn: 0,
		error: 0,
	},
}

// 统计信息
logger._statis = async function(key){
	Config._t.logger.quantity.all ++;
	Config._t.logger.quantity[key] ++;
};

// 输出普通日志 灰色
logger.info = (text) => {
	logger._statis('info');
	console.log('\x1B[0m[' + time() + ' INFO]: '+ text +'\x1B[0m');
};

// 输出表示正常/正确的日志 绿色
logger.correct = (text) => {
	logger._statis('info');
	console.log('\x1B[92m[' + time() + ' INFO]: '+ text +'\x1B[0m');
};

// 输出警告 黄色
logger.warn = (text) => {
	logger._statis('warn');
	console.log('\x1B[93m[' + time() + ' WARN]: '+ text +'\x1B[0m');
};

// 输出错误 红色
logger.error = (text) => {
	logger._statis('error');
	console.log('\x1B[91m[' + time() + ' ERROR]: '+ text +'\x1B[0m');
};


