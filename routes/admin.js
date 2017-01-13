/**
 * 此模块为代理模块
 */
var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var mysql = require('mysql');
var config = require('../config.js');
var fs=require('fs');

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


// 全局 获取
// 全局 新增
// 全局 更新
function global_reqType_list(req,res,type){
	// console.log(req.url,req.body);
	if(type=='get'){
		var targetExtra='',targetMatch='id';
		var n = req.query,query;
		if (n.targetMatch!=undefined&&n.targetMatch!=null) {
			targetMatch = n.targetMatch;
		}
		if (n.targetExtra!=undefined&&n.targetExtra!=null) {
			targetExtra = n.targetExtra;
		}
		if (n.targetId>0) {
			query = 'select '+n.targetField+' from '+n.targetTable+' where '+targetMatch+'='+n.targetId+' '+targetExtra+';';
		}else{
			query = 'select '+n.targetField+' from '+n.targetTable+';';
		}
		
		// console.log(query);
		connection.query(query,function(error,rows,fields){
			if (error) {
				// console.log(errorupdate);
				res.json(error);
			}else{	
				var data = {
					message:'success',
					rows:rows,
					qiniuDoname:config.qiniuDoname
				}
				res.json(data);
				// res.jsonp(data);
			}
		})
	}else if (type=='post'){
		var n = req.body;
		var query = 'insert into '+n.targetTable+'('+n.targetField+') values('+n.newValue+');';
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
	}else if(type=='put'){
		var n = req.body;
		var query = 'update '+n.targetTable+' set '+n.targetField+'="'+n.newValue+'" where id='+n.targetId+';';
		// console.log(query);
		connection.query(query,function(errorupdate,resupdate){
			if (errorupdate) {
				// console.log(errorupdate);
				res.json(errorupdate);
			}else{	
				var data = {
					message:'success',
					resupdate:resupdate
				}
				res.json(data);
				// res.jsonp(data);
			}
		})
	}
}


// 获取朝代列表
router.get('/dynasty', function (req,res) {
	var type = 'get';
	global_reqType_list(req,res,type);
});
// 获取国家列表
router.get('/country', function (req,res) {
	var type = 'get';
	global_reqType_list(req,res,type);
});


// 获取个人详情
router.get('/user', function (req,res) {
	var type = 'get';
	global_reqType_list(req,res,type);
});
// 修改个人详情
router.put('/user', function (req,res) {
	var type = 'put';
	global_reqType_list(req,res,type);
});


// 获取用户喜欢的诗笔迹列表
router.get('/hw_like', function (req,res) {
	var type = 'get';
	global_reqType_list(req,res,type);
});
// 新增 诗笔记喜欢日志
router.post('/hw_like', function (req,res) {
	var type = 'post';
	global_reqType_list(req,res,type);
});
// 更新喜欢为不喜欢
router.put('/hw_like', function (req,res) {
	var type = 'put';
	global_reqType_list(req,res,type)
});

// 更新 诗笔迹
router.put('/handwriting_file', function (req,res) {
	var type = 'put';
	global_reqType_list(req,res,type)
});








// 获取列表
router.get('/poems', function (req,res) {
	// console.log(req.url,req.body);
	var query = 'select id,title,authorId,authorName from poems where title like "%'+req.query.title+'%" or authorName like "%'+req.query.title+'%";';
	// console.log(query);
	connection.query(query,function(error,rows,fields){
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
});


// 编辑更新
router.put('/poems', function (req,res) {
	// console.log(req.url,req.body);
	var n = req.body;
	// console.log(n.poemId);
	var query = 'update poems set title="'+n.title+'",authorName="'+n.authorName+'",content="'+n.content+'" where id='+n.poemId+';';
	// console.log(query);
	connection.query(query,function(errorupdate,resupdate){
		if (errorupdate) {
			// console.log(errorupdate);
			res.json(errorupdate);
		}else{	
			var data = {
				message:'success',
				resinsert:resupdate
			}
			res.json(data);
			// res.jsonp(data);
		}
	})
});

// 新增
router.post('/poems', function (req,res) {
	// console.log(req.url,req.body);
	var n = req.body;
	var query = 'insert into poems(title,authorName,content) values("'+n.title+'","'+n.authorName+'","'+n.content+'");';
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







// 获取某个目录下文件列表
router.get('/getFiles', function (req,res) {
	// console.log(req.url,req.body);
	var fileDirectory = req.query.path;
	if(fs.existsSync(fileDirectory)){
		fs.readdir(fileDirectory, function (err, files) {
		  if (err) {
		  	logger_error.error(err);
		    console.log(err);
		    return;
		  }
		  var count = files.length;
		  var results = [];
		  files.forEach(function (filename) {
		    fs.readFile(filename, function (data) {
		      // results[filename] = data;
		      // results.push(data);
		      results.push(filename);
		      count--;
		      if (count <= 0) {
		        // 对所有文件进行处理
		        // console.log(results);
		        var rs = {
		        	results:results,
		        	path:fileDirectory
		        }
				res.json(rs);
				// res.jsonp(results);
		      }
		    });
		  });
		});
	}else{
	    logger_error.error(fileDirectory + "  Not Found!");
	    console.log(fileDirectory + "  Not Found!");
	}	
});




module.exports = router;





