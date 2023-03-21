// 加载数据库


import sqlite3 from 'sqlite3';
import { logger } from './logger.js';

// 连接数据库
export let db = new sqlite3.Database('Data.sqlite3', (err) => {
	if(err) throw err;
});


// 查询出所有数据, 使用等待或回调获取数据
// 出错时返回null
export async function dbGetAll(command, array, callback = null){
	return new Promise((resolve) => {
		db.all(command, array, (err, rows) => {
			if(callback === null){
				resolve(rows);
			}else{
				callback(rows);
			}

			if(err) throw err;
		});
	})
};


// 输出数据库版本号
logger.info(
	'[数据库] 数据库已连接: version = ' +
	(await dbGetAll('W (value) FROM Config WHERE key == ? LIMIT 1;', ['version']))[0]['value']
);
