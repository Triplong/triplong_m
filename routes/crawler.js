/**
 * 
 */
var http = require('http')
var cheerio = require('cheerio')
var Promise = require('bluebird')
var baseUrl = 'http://so.gushiwen.org'
var catUrl = '/gushi/shijing.aspx'

var config = require('../config.js');
var mysql = require('mysql');

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



function filter1(html){
	var $ = cheerio.load(html)
	var span_a = $('.main3 .leftlei .son2 a')
	var hrefArray = []
	span_a.each(function (i,n){
		hrefArray.push($(n).attr('href'))
	})
	return hrefArray
}

function filter2(html){
	var $ = cheerio.load(html)
	var poem = $('.main3 .shileft')
		title = poem.find('.son1 h1').text()
		authorName = poem.find('.son2 p a').text()
		son2 = poem.find('.son2').clone(true)
		son2.find(':nth-child(n)').remove();
		content = son2.text()

		obj = {
			title:title.toString().trim(),
			authorName:authorName.replace(/\n/ig,'').toString().trim(),
			content:content.replace(/\n/ig,'').toString().trim()
		}

	return obj 
}


function getPageAsync (url) {
	return new Promise(function (resolve,reject){
		console.log('正在爬取'+url)

		http.get(url,function (res){
			var html = ''

			res.on('data',function (data){
				html+=data
			})

			res.on('end',function (){
				// console.log(html)
				resolve(html)
			})

		}).on('error',function(e){
			console.log('获取内容出错')
			reject(e)
		})
	})
}


function updateSql(obj){
	var query = 'insert into poems4(title,authorName,content) values("'+obj.title+'","'+obj.authorName+'","'+obj.content+'");';
	connection.query(query,function(errorinsert,resinsert){
		if (errorinsert) {
			console.log(errorinsert);
			// res.json(errorinsert);
		}else{	
			console.log(resinsert);
			var data = {
				message:'success',
				resinsert:resinsert
			}
			// res.json(data);
			// res.jsonp(data);
		}
	})
}


getPageAsync(baseUrl+catUrl)
	.then(function (html){
		return filter1(html)
	})
	.then(function (hrefArray){
		hrefArray.forEach(function(item){
			if (item.indexOf('view_')>0) {
				var objArray = []
				getPageAsync(baseUrl+item)
					.then(function (html){
						return filter2(html)
					})
					.then(function (obj){
						console.log(obj)
						// updateSql(obj)
					})
			}
		})
	})






