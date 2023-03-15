// 从请求中获取IP地址


// 返回数组 [地址, 端口, 来源]
// ['::ffff:127.0.0.1', 1024, 'direct_node']
export function getIP(req){
	let $noIP = ['127.0.0.1', '::ffff:127.0.0.1', '::1'];

	// console.log(req.headers['proxy_protocol_addr']);
	// console.log(req.headers['remote_addr']);
	// console.log(req.connection.remoteAddress);

	// nginx 获取的代理服务器转发的客户端地址
	if(req.headers['proxy_protocol_addr'] && $noIP.indexOf(req.headers['proxy_protocol_addr']) === -1){
		return [req.headers['proxy_protocol_addr'], req.headers['proxy_protocol_port'], 'proxy'];
	}else

	// nginx 获取的地址
	if(req.headers['remote_addr'] && $noIP.indexOf(req.headers['remote_addr']) === -1){
		return [req.headers['remote_addr'], req.headers['remote_port'], 'direct'];
	}else

	// Node.js 获取的地址
	return [req.connection.remoteAddress, req.connection.remotePort, 'direct_node'];
};
