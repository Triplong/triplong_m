/**
 * 此模块为代理模块
 */
var express = require('express'),
	router = express.Router(),
	mysql = require('mysql'),
	config = require('../config.js'),
	multiparty = require('multiparty'),
	fs=require('fs'),
	qiniu = require("qiniu");

/**
 * 配日志
 */
var logger = require('../log4js').logger;
var logger_error = require('../log4js').logger_error;  
logger.info("=== this is log from qiniu-upload.js ===");


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


//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'UtR9-061L8qFst2lvhiBR9Tc9E_u3sprXyOnTbSS';
qiniu.conf.SECRET_KEY = 'huy_QYClFu6AEjVqc24cwX_98UjtWjKczjIAcjpF';
//要上传的空间
bucket = 'wepoem-m';

//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  return putPolicy.token();
}

// 上传图片文件
router.post('/file-upload', function (req,res) {
	// console.log(req.url,req.body);
	var poemId = req.query.poemId;
	console.log('poemId===>'+poemId);
	var form = new multiparty.Form();//实例一个multiparty
	form.uploadDir = "public/img/qiniu-upload/";//设置文件储存路径
	//开始解析前台传过来的文件
	form.parse(req, function(err, fields, files) {
		console.log(fields,files);
		// for (var item in fields){
		// 	console.log(fields[item][0]);
		// }
		var file_id_str = fields.file_id_str;
		console.log('file_id_str===>'+file_id_str);
		// var files = JSON.stringify(files);
		// var files = JSON.parse(files);
		console.log('upload_file.length===>'+files.upload_file.length);
		if(err){
			logger_error.error('parse error: ' + err);
		}else{

			for (var i = 0 ; i < files.upload_file.length ; i++) {
				var inputFile = files.upload_file[i];//获取第一个文件
				// var finalname = inputFile.originalFilename;
				var finalname = ''+file_id_str;
				var old_name = inputFile.path;//获取文件路径
				var new_name = form.uploadDir+finalname;//获取文件名
				fs.renameSync(old_name,new_name);
				// console.log('new_name===>'+new_name+'old_name===>'+old_name);
				//上传到七牛后保存的文件名
				key = finalname;
				//生成上传 Token
				token = uptoken(bucket, key);
				// console.log('key===>'+key);
				// console.log('token===>'+token);

				uploadFile(token, key, new_name);		
			}

		}

	})

	//构造上传函数
	function uploadFile(uptoken, key, localFile) {
		// console.log('uptoken===>'+uptoken+' key===>'+key+' localFile===>'+localFile);
	  	var extra = new qiniu.io.PutExtra();
	    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
	      if(!err) {

	      	fs.unlinkSync(localFile);

	        // 上传成功， 处理返回值
	        console.log(ret);
	        // console.log(ret.hash, ret.key, ret.persistentId);   
			// res.json(ret);

			//构建bucketmanager对象
			var client = new qiniu.rs.Client();
			//获取文件信息
			client.stat(bucket, key, function(err1, ret1) {
			  if (!err1) {
			    console.log(ret,ret1);
			    
			    connectMysql(ret,ret1);
			  } else {
			    console.log(err1);
			  }
			});

			
	      } else {
	      	fs.unlinkSync(localFile);

	        // 上传失败， 处理返回代码
	        // console.log(err);
			res.json(err);
	      }
	  });
	}

	function connectMysql(ret,ret1){
		var file_type = 0;
		if (ret1.mimeType.indexOf('image')>=0) {
			file_type = 1;
		}else if(ret1.mimeType.indexOf('video')>=0){
			file_type = 2;
		}
		var query = 'insert into handwriting_file(file_name,type_name,file_type,poemId) values("'+ret.key+'","'+ret1.mimeType+'",'+file_type+','+poemId+');';
		console.log(query);
		connection.query(query,function(errorinsert,resinsert){
			if (errorinsert) {
				// console.log(errorinsert);
				res.json(errorinsert);
			}else{	
				// console.log(resinsert);
				var data = {
					message:'success',
					resinsert:resinsert,
					ret:ret
				}
				res.json(data);
				// res.jsonp(data);
			}
		})
	}

});


module.exports = router;

