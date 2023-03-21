// 主程序

import { Config } from './config.js';
import { logger } from './lib/logger.js';


// 输出LOGO
console.log('\x1B[34m'+ String.raw`- IpacServerManager v0.0.0
 ______                                                            __
/\__  _\                                                          /\ \
\/_/\ \/    _____     ____     ____   ____    ____ ___     ____   \_\ \
   \ \ \   /\  __ \  / __ \   / ___\ / __ \  /  __  __ \  / __ \  / __ \
    \_\ \__\ \ \/\ \/\ \/\ \_/\ \__//\ \/\ \_/\ \/\ \/\ \/\ \/\ \/\ \/\ \
    /\_____\\ \  __/\ \__/ \_\ \____\ \__/ \_\ \_\ \_\ \_\ \____/\ \_____\
    \/_____/ \ \ \/  \/__/\/_/\/____/\/__/\/_/\/_/\/_/\/_/\/___/  \/____ /
              \ \_\
               \/_/
` + '\x1B[0m');



// 加载数据库
await import('./lib/sqlLoad.js');

// 启动后端服务
// await ManagerStart();

// 启动控制台
await import('./terminal/command.js');

// 启动前端服务
await import('./Web/server.js');

// 结束
logger.info('[MAIN] 服务器启动完成! 耗时 '+ (performance.now() - Config._c.start_time) +'ms');
logger.info('> ----------------------------------------------------- <'); // 57

