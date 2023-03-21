// http 登录数据包


import crypto from 'crypto';


console.log(crypto.createHash('sha256').update('112112_123456').digest("hex"));
