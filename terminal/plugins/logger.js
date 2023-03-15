// 日志记录器

import { LoggerData } from "../../lib/logger.js";
import { Terminal } from "../command.js";

Terminal.RunCommandEvent.on('logger', (e) => {
	if(e.commandArray.length === 1){
		e.sendMessage('Logger Help' +
		'\n  - /logger state - 显示日志记录器统计信息');
		return true;
	}
	else if(e.commandArray.length === 2){
		if(e.commandArray[1] === 'state'){
			e.sendMessage(JSON.stringify(LoggerData.quantity));
		}
	}
});
