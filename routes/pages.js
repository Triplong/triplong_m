
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
  res.redirect('poems');
});

// 诗列表、详情
router.get('/poems',function (req,res,next){

	var act = req.query.act;
	console.log('act===>'+act);
	var act_status;
	if (req.query.id>0) {
		var query = 'select * from poems where id='+req.query.id+';';
		connection.query(query,function(error,rows,fields){

			if(act=='edit'){
				act_status = 1; //编辑
				title = '编辑';
			}else{
				act_status = 0; //详情
				title = '诗印象'; 
			}
			var renderData = {
				title:title,
				rows:rows,
				act_status:act_status
			};
			// console.log(renderData);
			res.render('poems/poems',renderData);
		})
	}else{
		var query = 'select id,title,authorId,authorName from poems;';
		connection.query(query,function(error,rows,fields){
			if(act=='add'){
				act_status = 2; //新建 
				title = '写个诗';
			}else if(act=='correction'){
				act_status = 3;
				title = '纠错'; //纠错
			}else{
				act_status = -1;
				title = '诗列表'; // 列表
			}
			var renderData = {
				title:title,
				rows:rows,
				act_status:act_status
			};
			console.log('renderData===>'+renderData);
			res.render('poems/poems',renderData);
		})
	}
})


// 个人中心
router.get('/home', function (req, res, next) {
	var n = req.query;
	var query = 'select * from user where id='+n.uid+';';
	connection.query(query,function(error,rows,fields){
		if (rows.length>0) {
			var renderData = {
				title:"个人中心",
				rs:rows[0],
				qiniuDoname:config.qiniuDoname
			};
			// console.log(renderData);
			res.render('home/home', renderData);
		}else{

		}

	})
	
});



// 诗友圈
router.get('/moments', function (req, res, next) {
  var renderData = {
    title: "诗友圈"
  };
  res.render('home/moments', renderData);
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

// 诗笔迹
router.get('/handwriting', function (req, res, next) {
	var poemId = req.query.poemId;
	var rows_files,rows_poems;

	var query = 'select * from handwriting_file where poemId="'+poemId+'";';
	connection.query(query,function(error,rows,fields){
		rows_files = rows;

		var query2 = 'select id,title,content,authorName from poems where id="'+poemId+'";';
		connection.query(query2,function(error2,rows2,fields2){
			rows_poems = rows2;

			var renderData = {
				title:"诗笔迹",
				rows_files:rows_files,
				rows_poems:rows_poems,
				qiniuDoname:config.qiniuDoname
			};
			res.render('handwriting/handwriting', renderData);

		})
	})

});

// 朝代列表
router.get('/dynasty',function (req,res,next){
	var query = 'select * from dynasty;';
	connection.query(query,function(error,rows,fields){
		var renderData = {
			title:'朝代列表',
			rows:rows
		};
		// console.log(renderData);
		res.render('poems/dynasty',renderData);
	})

})


module.exports = router;
