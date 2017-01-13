/**
 * 此模块为代理模块
 */
var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var mysql = require('mysql');
var config = require('../config.js');

/**
 * 配日志
 */
var logger = require('../log4js').logger;
var logger_error = require('../log4js').logger_error;  
// logger.info("=== this is log from admin.js ===");

/**
 * 创建数据库连接
 */
var connection = mysql.createConnection({
	host: config.mysql.host,
	user: config.mysql.user,
	password: config.mysql.password,
	database: config.mysql.database,
	port: config.mysql.port
})



function randomStr(){
	//JS生成随机的由字母数字组合的字符串 http://www.xuanfengge.com/js-random.html
	//方法一 奇妙的写法
	var randomOnce =  Math.random().toString(36).substr(2);
	// 方法二
	// 生成3-32位随机串：randomWord(true, 3, 32)
	// 生成43位随机串：randomWord(false, 43)
	/*
	** randomWord 产生任意长度随机字母数字组合
	** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
	** xuanfeng 2014-08-28
	*/
	function randomWord(randomFlag, min, max){
	    var str = "",
	        range = min,
	        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	 
	    // 随机产生
	    if(randomFlag){
	        range = Math.round(Math.random() * (max-min)) + min;
	    }
	    for(var i=0; i<range; i++){
	        pos = Math.round(Math.random() * (arr.length-1));
	        str += arr[pos];
	    }
	    return str;
	}
	// console.log(randomOnce);
	// console.log(randomWord(true, 36, 49));
	// console.log(randomWord(false, 36));
	return randomWord(true, 36, 49);
}


// 用户注册
router.post('/login', function (req,res) {
	// console.log(req.url,req.body);
	var n = req.body;
	var query = 'insert into user(email,phone,userName,password) values("'+n.email+'","'+n.phone+'","'+n.userName+'","'+n.password+'");';
	// console.log(query);
	connection.query(query,function(errorinsert,resinsert){
		if (errorinsert) {
			// console.log(errorinsert);
			res.json(errorinsert);
		}else{	
			// console.log(resinsert);
			var data = {
				message:'success',
				resinsert:resinsert
			}
			res.json(data);
			// res.jsonp(data);
		}
	})
});

// 用户登录
router.get('/login', function (req,res) {
	// console.log(req.url,req.body);
	var query = 'select id,password from user where email="'+req.query.email+'";';
	// console.log(query);
	connection.query(query,function(error,rows,fields){
		if (error) {
			// console.log(errorupdate);
			res.json(error);
		}else{	
			// console.log(rows[0].password);
			if (rows.length>0 && rows[0].password==req.query.password) {
				// console.log('success');
				var data = {
					message:'success',
					rows:rows
				}
				// 验证通过 去更改token
				update_one_user(req,res,data);
			}else{
				var data = {
					message:'error',
					tips:'用户名或密码不正确'
				}
				res.json(data);
			}

		}
	})
});

// 更改用户信息
function update_one_user(req,res,data){
	// console.log(data,data.rows[0].id);
	var token = randomStr(),userId = data.rows[0].id;
	// console.log(token,userId);
	var update_query = 'update user set token="'+token+'" where id="'+userId+'";'
	connection.query(update_query,function(errorupdate,resupdate){
		if (errorupdate) {
			// console.log(errorupdate);
			res.json(errorupdate);
		}else{	
			// 更改token成功 重新获取用户信息
			var new_user_query = 'select id,email,userName,token from user where id="'+userId+'";'
			connection.query(new_user_query,function(error,rows,fields){
				if (error) {
					// console.log(errorupdate);
					res.json(error);
				}else{	
					var data = {
						message:'success',
						rows:rows
					}
					res.json(data);
					// res.jsonp(data);
				}
			})
			
		}
		
	})
}



module.exports = router;



