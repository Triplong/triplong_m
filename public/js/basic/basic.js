
//           _____                    _____                    _____                    _____          
//          /\    \                  /\    \                  /\    \                  /\    \         
//         /::\____\                /::\    \                /::\    \                /::\    \        
//        /:::/    /                \:::\    \              /::::\    \              /::::\    \       
//       /:::/    /                  \:::\    \            /::::::\    \            /::::::\    \      
//      /:::/    /                    \:::\    \          /:::/\:::\    \          /:::/\:::\    \     
//     /:::/____/                      \:::\    \        /:::/__\:::\    \        /:::/__\:::\    \    
//    /::::\    \                      /::::\    \      /::::\   \:::\    \      /::::\   \:::\    \   
//   /::::::\    \   _____    ____    /::::::\    \    /::::::\   \:::\    \    /::::::\   \:::\    \  
//  /:::/\:::\    \ /\    \  /\   \  /:::/\:::\    \  /:::/\:::\   \:::\____\  /:::/\:::\   \:::\    \ 
// /:::/  \:::\    /::\____\/::\   \/:::/  \:::\____\/:::/  \:::\   \:::|    |/:::/__\:::\   \:::\____\
// \::/    \:::\  /:::/    /\:::\  /:::/    \::/    /\::/   |::::\  /:::|____|\:::\   \:::\   \::/    /
//  \/____/ \:::\/:::/    /  \:::\/:::/    / \/____/  \/____|:::::\/:::/    /  \:::\   \:::\   \/____/ 
//           \::::::/    /    \::::::/    /                 |:::::::::/    /    \:::\   \:::\    \     
//            \::::/    /      \::::/____/                  |::|\::::/    /      \:::\   \:::\____\    
//            /:::/    /        \:::\    \                  |::| \::/____/        \:::\   \::/    /    
//           /:::/    /          \:::\    \                 |::|  ~|               \:::\   \/____/     
//          /:::/    /            \:::\    \                |::|   |                \:::\    \         
//         /:::/    /              \:::\____\               \::|   |                 \:::\____\        
//         \::/    /                \::/    /                \:|   |                  \::/    /        
//          \/____/                  \/____/                  \|___|                   \/____/       

var showtips = "          _____                    _____                    _____                    _____          \n         /\\    \\                  /\\    \\                  /\\    \\                  /\\    \\         \n        /::\\____\\                /::\\    \\                /::\\    \\                /::\\    \\        \n       /:::/    /                \\:::\\    \\              /::::\\    \\              /::::\\    \\       \n      /:::/    /                  \\:::\\    \\            /::::::\\    \\            /::::::\\    \\      \n     /:::/    /                    \\:::\\    \\          /:::/\\:::\\    \\          /:::/\\:::\\    \\     \n    /:::/____/                      \\:::\\    \\        /:::/__\\:::\\    \\        /:::/__\\:::\\    \\    \n   /::::\\    \\                      /::::\\    \\      /::::\\   \\:::\\    \\      /::::\\   \\:::\\    \\   \n  /::::::\\    \\   _____    ____    /::::::\\    \\    /::::::\\   \\:::\\    \\    /::::::\\   \\:::\\    \\  \n /:::/\\:::\\    \\ /\\    \\  /\\   \\  /:::/\\:::\\    \\  /:::/\\:::\\   \\:::\\____\\  /:::/\\:::\\   \\:::\\    \\ \n/:::/  \\:::\\    /::\\____\\/::\\   \\/:::/  \\:::\\____\\/:::/  \\:::\\   \\:::|    |/:::/__\\:::\\   \\:::\\____\\\n\\::/    \\:::\\  /:::/    /\\:::\\  /:::/    \\::/    /\\::/   |::::\\  /:::|____|\\:::\\   \\:::\\   \\::/    /\n \\/____/ \\:::\\/:::/    /  \\:::\\/:::/    / \\/____/  \\/____|:::::\\/:::/    /  \\:::\\   \\:::\\   \\/____/ \n          \\::::::/    /    \\::::::/    /                 |:::::::::/    /    \\:::\\   \\:::\\    \\     \n           \\::::/    /      \\::::/____/                  |::|\\::::/    /      \\:::\\   \\:::\\____\\    \n           /:::/    /        \\:::\\    \\                  |::| \\::/____/        \\:::\\   \\::/    /    \n          /:::/    /          \\:::\\    \\                 |::|  ~|               \\:::\\   \\/____/     \n         /:::/    /            \\:::\\    \\                |::|   |                \\:::\\    \\         \n        /:::/    /              \\:::\\____\\               \\::|   |                 \\:::\\____\\        \n        \\::/    /                \\::/    /                \\:|   |                  \\::/    /        \n         \\/____/                  \\/____/                  \\|___|                   \\/____/         \n";
console.log(showtips,'想加入诗印象开发团队？请发送邮件到 Team@WePoem.com');


/**
 * 解析获取URL中的参数
 */
var queryString = function() {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
            query_string[pair[0]] = arr;
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();



var msg_tips = 	[
					'提交失败！请重新提交',
					'你太棒了！编辑成功',
					'恭喜你！新增成功',
					'开发中！嫑点我',
					'重新提交'
				],
	msg_status= [
					'success',
					'error'
				];

var qiniuDoname = 'http://oe71y3abh.bkt.clouddn.com/';

/**
 * ajax 请求中间层
 */
function global_ajax(type,url,data){
	// console.log(type,url,data);
	var list;
	if (type=='get') { //获取列表
		$.ajax({
		  url : url,
		  dataType : 'json',
		  data: data,
		  type : type,
		  async : false,
		  contentType : "application/json",
		  success : function(data) {
		  	list = data;
		  },
		  error: function(err){
		  	console.log(err);
		  }
		})
	}else if(type=='post'){  //新增
		$.ajax({
		  url : url,
		  dataType : 'json',
		  type : type,
		  data : data,
		  async : false,
		  contentType : "application/json",
		  success : function(data) {
		  	list = data;
		  },
		  error: function(err){
		  	console.log(err);
		  }
		})
	}else if(type=='put'){ //编辑
		$.ajax({
		  url : url,
		  dataType : 'json',
		  type : type,
		  data : data,
		  async : false,
		  contentType : "application/json",
		  success : function(data) {
		  	list = data;
		  },
		  error: function(err){
		  	console.log(err);
		  }
		})
	}else if(type=='delete'){  //删除 暂时不做
		// $.ajax({
		//   url : url,
		//   dataType : 'json',
		//   type : type,
		//   async : false,
		//   contentType : "application/json",
		//   success : function(data) {
		//   	list = data;
		//   },
		//   error: function(err){
		//   	console.log(err);
		//   }
		// })
	}
	return list;
}

// 异步请求
function global_ajax2(type,url,data){
	// console.log(type,url,data);
	var list;
	if (type=='get') { //获取列表
		// 
	}else if(type=='post'){  //新增
		$.ajax({
			type : type,
		  	url : url,
			dataType:'text',
			data: data,
	        async: false,
	        cache: false,
	        processData: false,  // 告诉JSLite不要去处理发送的数据
	        contentType: false,   // 告诉JSLite不要去设置Content-Type请求头
			success : function(data) {
				list = data;
			},
			error: function(err){
				// console.log(err);
				list = err;
			}
		})
	}else if(type=='put'){ //编辑
		// 
	}else if(type=='delete'){  //删除 暂时不做
		// 
	}
	return list;
}




// 获取网络状态
function get_status(){
    // var re_el = document.getElementById("re");
    // var btn_el = document.getElementById("btn");
    var connection = navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:'unknown'};
    var type_text = ['unknown','ethernet','wifi','2g','3g','4g','none'];

    if(typeof(connection.type) == "number"){
        connection.type_text = type_text[connection.type];
    }else{
        connection.type_text = connection.type;
    }
    if(typeof(connection.bandwidth) == "number"){
        if(connection.bandwidth > 10){
            connection.type = 'wifi';
        }else if(connection.bandwidth > 2){
            connection.type = '3g';
        }else if(connection.bandwidth > 0){
            connection.type = '2g';
        }else if(connection.bandwidth == 0){
            connection.type = 'none';
        }else{
            connection.type = 'unknown';
        }
    }
    // var html = 'Type : '+connection.type_text;
    //     html += '<br>Bandwidth : '+connection.bandwidth;
    //     html += '<br>isOnline : '+navigator.onLine;
    //     re_el.innerHTML = html;
    return navigator.onLine;
}
// btn_el.onclick = function(){
//     re_el.innerHTML = 'Waiting...';
//     
// }
var online_status = get_status();
console.log('online_status:'+online_status);
if (!online_status) {
    console.log('网络异常！');
};


// 获取各种高度
// console.log($(window).height()); //浏览器当前窗口可视区域高度 
// console.log($(document).height()); //浏览器当前窗口文档的高度 
// console.log($(document.body).height());//浏览器当前窗口文档body的高度 
// console.log($(document.body).outerHeight(true));//浏览器当前窗口文档body的总高度 包括border padding margin 
// console.log($(window).width()); //浏览器当前窗口可视区域宽度 
// console.log($(document).width());//浏览器当前窗口文档对象宽度 
// console.log($(document.body).width());//浏览器当前窗口文档body的高度 
// console.log($(document.body).outerWidth(true));//浏览器当前窗口文档body的总宽度 包括border padding margin 
var global_my_window_width = $(window).width();
var global_my_window_height = $(window).height();
var global_w_h = global_my_window_width/global_my_window_height;
// console.log('width:'+global_my_window_width,'height:'+global_my_window_height,global_w_h);


$(document).ready(function(){
	// console.log($(window).height(),$('html').height());
	if ($(window).height()>$('html').height()) {
		$('.nav-bottom').addClass('navbar-fixed-bottom');
	}
})






// 时间对象的格式化
Date.prototype.format = function(format) {
  //eg:format="YYYY-MM-dd hh:mm:ss";
  var o = {
      "M+" :this.getMonth() + 1, // month
      "d+" :this.getDate(), // day
      "h+" :this.getHours(), // hour
      "m+" :this.getMinutes(), // minute
      "s+" :this.getSeconds(), // second
      "q+" :Math.floor((this.getMonth() + 3) / 3), // quarter
      "S" :this.getMilliseconds()
  // millisecond
  }
  if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + "")
              .substr(4 - RegExp.$1.length));
  }
  for ( var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                  : ("00" + o[k]).substr(("" + o[k]).length));
      }
  }
  return format;
}

var nowDateTime = new Date().format("yyyy-MM-dd hh:mm:ss");









