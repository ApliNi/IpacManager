// 用于格式化输出日志的模块

import { EventEmitter } from 'events';


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


// 配置
export let LoggerData = {
	quantity: {
		info: 0,
		warn: 0,
		error: 0,
	},
	EventOutLog: new EventEmitter(),
};


export async function logger(evel, origin, text){
	// 更新统计信息
	LoggerData.quantity[evel] ++;

	// 触发事件
	let eData = {
		evel: evel,
		origin: origin,
		text: text,
	};
	LoggerData.EventOutLog.emit(evel, eData);

	// 输出日志
	console.log(text);
};


// 输出普通日志 灰色
logger.info = async (text, origin = null) => {
	logger('info', origin, '\x1B[0m[' + time() + ' INFO]: '+ text +'\x1B[0m');
};

// 输出表示正常/正确的日志 绿色
logger.correct = async (text, origin = null) => {
	logger('info', origin, '\x1B[92m[' + time() + ' INFO]: '+ text +'\x1B[0m');
};

// 输出警告 黄色
logger.warn = async (text, origin = null) => {
	logger('warn', origin, '\x1B[93m[' + time() + ' WARN]: '+ text +'\x1B[0m');
};

// 输出错误 红色
logger.error = async (text, origin = null) => {
	logger('error', origin, '\x1B[91m[' + time() + ' ERROR]: '+ text +'\x1B[0m');
};
