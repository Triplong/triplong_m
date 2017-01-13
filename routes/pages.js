
var express = require('express');
var request = require('request');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config.js');
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

// 默认页
router.get('/',function (req,res,next){
  var renderData = {
    title: "triplong"
  };
  res.render('index/pc', renderData);
});



// 登录/注册
router.get('/login', function (req, res, next) {
	status = req.query.status;
	if (status==undefined||status==null||status=='') {
		status = 1;
	}
	var renderData = {
		title: "登录/注册",
		status:status
	};
	res.render('user/login', renderData);
});




module.exports = router;
