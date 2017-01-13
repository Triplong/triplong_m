/**
 * MySQL connection demo
 */

var http = require('http');
var mysql = require('mysql');
// var mysql = require('/usr/local/lib/node_modules/mysql');

/**
 * 创建数据库连接
 */
var connection = mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	database:'triplong',
	port:3306
})

/**
 * 创建HTTP服务器
 */
http.createServer(function(req,res){
	// res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
	// res.write('<h3>测试nodejs-mysql数据库连接</h3><br/>');
	/**
	 * 连接数据库
	 */
	// connection.connect(function(err){
	// 	if(err){
	// 		res.end('<p>Connection to MySQL ERROR!</p>');
	// 		return;
	// 	}else{
	// 		res.end('<p>Connection to MySQL SUCCESS!</p>');
	// 	}
	// })
	connection.query('select * from poems;',function(error,rows,fields){
		res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
		res.write('<h3>查询数据库：</h3><br/>');
		res.end(JSON.stringify(rows));
	})
	
}).listen(6868);