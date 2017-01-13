var express = require('express');
var app = express();

//需要在各自的环境运行
if (app.get('env') === 'development'){
    //开发环境 export NODE_ENV=development
    filename = '../logs/node-wepoem-m/log'
}else if (app.get('env') === 'production'){
    // 生产环境 export NODE_ENV=production
    filename = '../logs/node-wepoem-m/log'
}else if (app.get('env') === 'localhost'){
    // 本地 export NODE_ENV=localhost
    filename = '../logs/node-wepoem-m/log'
}


var log4js = require('log4js');  
// var log4js_config = require("./log4js.json");
// log4js.configure(log4js_config);

log4js.configure({  
    appenders: [  
        {  
            type: 'console',  
            category: "console"  
        }, //控制台输出  
        {  
            category: 'infoLog',
            type: "dateFile",  
            encoding: 'UTF-8',
            filename: filename,  
            alwaysIncludePattern: true,  
            pattern: "-info-yyyy-MM-dd.log",
        },//日期文件格式
        {
            category:"errorLog",
            type: "file",  
            encoding: 'UTF-8',
            filename: filename+'-error.log',
            maxLogSize:10480000, //10Mb
            backups:20
        }  
    ],  
    replaceConsole: true,   //替换console.log  
    levels:{  
        console: 'ALL',
        infoLog: 'info',
        errorLog: 'error'
    }  
});  
  
// var dateFileLog = log4js.getLogger('dateFileLog');  
// exports.logger = dateFileLog;  
// exports.use = function(app) {  
//     //页面请求日志,用auto的话,默认级别是WARN  
//     // app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));  
//     app.use(log4js.connectLogger(dateFileLog, {level:'info', format:':method :url'}));  
// }  

// console.log("log start!");
var infoLog = log4js.getLogger('infoLog');
var errorLog = log4js.getLogger('errorLog');
exports.logger = infoLog; 
exports.logger_error = errorLog; 
// infoLog.trace('*');
// infoLog.debug('**');
// infoLog.info('***');
// infoLog.warn('****');
// errorLog.error('*****');
// console.log("log end!");

// logger.trace(‘Entering cheese testing’); 追踪
// logger.debug(‘Got cheese.’); 调试
// logger.info(‘Cheese is Gouda.’); 信息
// logger.warn(‘Cheese is quite smelly.’); 警告
// logger.error(‘Cheese is too ripe!’); 错误
// logger.fatal(‘Cheese was breeding ground for listeria.’); 致命的



