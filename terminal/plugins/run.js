// 运行程序

import { run } from "../../Manager/run.js";
import parser from 'yargs-parser';
import iconv from 'iconv-lite';
import path from 'path';
import { Terminal } from "../command.js";

let config = {
	parameter: ['p', 'rp', 'c'],
};

Terminal.RunCommandEvent.on('run', (e) => {
	if(e.commandArray.length === 1){
		e.sendMessage('Run Help' +
		'\n运行Shell命令: ' +
		'\n  - /run [--p=<绝对路径> | --rp=<相对路径>] [--coding=<编码, 默认UTF-8>] [--c=<Shell>]');
		return true;
	}

	// 解析参数
	let config = {};
	let pr = parser(e.commandArray.join(' '));

	// path
	let __path = null;
	if(pr?.p){
		__path = path.join(pr.p);
	}
	else if(pr?.rp){
		__path = path.join(path.resolve(), './Manager/defaultDirectory/', pr.rp)
	}
	else{
		__path = path.join(path.resolve(), './Manager/defaultDirectory/');
	}
	// coding
	let __coding = pr?.coding ? pr.coding : 'utf-8';
	// command
	let __command = pr?.c ? pr.c : 'echo Hello World';


	e.sendMessage('[RUN] 运行Shell命令: '+ __command);

	run(__command, __path).stdout.on('data', (data) => {
		process.stdout.write(iconv.decode(data, __coding)); // 不换行输出
	});

	return true;
});
