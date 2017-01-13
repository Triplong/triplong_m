var express = require('express');
var app = express();

var localhost = {
	qiniuDoname : 'http://medias.triplong.com/',
    mysql: {
		host:'nuo.nuoluan.com',
		user:'root',
		password:'root',
		database:'triplong',
		port:3306
    },
    redis: {
    	ip: '127.0.0.1',
        port: 6379,
        pwd: '12345',
        db: 6,
        prefix: 'session_triplong_m:'
    }
};
var development = {
	qiniuDoname : 'http://medias.triplong.com/',
    mysql: {
		host:'nuo.nuoluan.com',
		user:'root',
		password:'root',
		database:'triplong',
		port:3306
    },
    redis: {
    	ip: '127.0.0.1',
        port: 6379,
        pwd: '12345',
        db: 6,
        prefix: 'session_triplong_m:'
    }

};
var production = {
	qiniuDoname : 'http://medias.triplong.com/',
    mysql: {
		host:'nuo.nuoluan.com',
		user:'root',
		password:'root',
		database:'triplong',
		port:3306
    },
    redis: {
    	ip: '127.0.0.1',
        port: 6379,
        pwd: '12345',
        db: 6,
        prefix: 'session_triplong_m:'
    }

};


//需要在各自的环境运行 export NODE_ENV=localhost
if (app.get('env') == 'development') {
    module.exports = development;
} else if (app.get('env') == 'production') {
    module.exports = production;
} else if (app.get('env') == 'localhost') {
    module.exports = localhost;
}else{
    module.exports = localhost;
}


