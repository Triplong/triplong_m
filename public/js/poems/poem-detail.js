
// 比较诗正文的高度判定是否要显示去全屏的按钮
$(document).on('ready',function(){
	var height1 = $('.data-poems-list blockquote').height()+100;
	var height2 = $(window).height();
	// console.log(height1,height2);
	if (height1>height2) {
		$('blockquote .resize-full-btn').hide();
	}else{
		$('blockquote .resize-full-btn').show();	
	}
})


// 获取某个目录下的全部文件->筛选出图片(含jpg,jpeg,png) 
function getImgs(){
	var resultImgs;
	var type = 'get',
		url = 'admin/getFiles',
		data = {
			path:'public/img/qiniu-upload/',
		};
	var rs = global_ajax(type,url,data);
	// console.log(rs);
	var resultImg = [];
	$.each(rs.results,function(i,n){
		if (n.indexOf('T2')>0) {
			resultImg.push(n);
		}
	})
	var resultImgs = {
		resultImg:resultImg,
		path:rs.path
	}
	return resultImgs;
}

console.log(getImgs());
// 获取某目录图片的个数
var imgNumber = getImgs().resultImg.length;
// console.log('imgNumber:',imgNumber);

// 诗全屏 定义背景图片及文字样式
var randomNumber,baseNumber=0,baseNumArr = [];
for (var i = 0; i < imgNumber; i++) {
	baseNumArr.push(i);
}
// console.log(baseNumArr);
baseNumArr = randomArr(baseNumArr);
/** 随机排列数组里的顺序 */
function randomArr(arr) {
    return arr.sort(function(){return Math.random()>.5?1:-1});
}
// console.log(baseNumArr);
var baseColorArr = ['white','rgba(255, 255, 255, 0.75)','#666666','black'];
// console.log(baseColorArr);


// 显示诗全屏页面
function show_resize_full_div(){
	var resultImg = getImgs().resultImg,
		path = getImgs().path.replace(/public\//g,'');
		path = qiniuDoname;
	// console.log(resultImg,path);
	var	i = getRandomNumber(baseNumArr);
	if (randomNumber==i) {
		i = getRandomNumber(baseNumArr);
		return false;
	}else{
		randomNumber = i;
	}  
	// console.log(i); 
	$('.resize-full-div .backupImg').attr('src',path+resultImg[i]);
	$('.resize-full-div').css('background-image','url('+path+resultImg[i]+')');

	$('.resize-full-div').show().addClass('animated zoomIn');
	$('.resize-full-div').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('.resize-full-div').removeClass('animated zoomIn zoomOut');
	});
}
// 隐藏诗全屏页面
function hide_resize_full_div(){
	$('.resize-full-div').removeClass('zoomIn').addClass('animated zoomOut');
	$('.resize-full-div').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('.resize-full-div').removeClass('animated zoomIn zoomOut').hide();
	});
}


// 诗全屏 显示工具栏
function show_resize_full_btn(){
	$('.resize-full-btn').slideDown();
}
// 诗全屏 隐藏工具栏
function hide_resize_full_btn(){
	$('.resize-full-btn').slideUp();
}


// 诗全屏 i随机换背景 j按顺序换背景
function next_resize_full_bg(){
	var resultImg = getImgs().resultImg,
		path = getImgs().path.replace(/public\//g,'');
		path = qiniuDoname;
		
	// console.log(resultImg,path);
	var	i = getRandomNumber(baseNumArr);
	if (randomNumber==i) {
		i = getRandomNumber(baseNumArr);
		return false;
	}else{
		randomNumber = i;
	}  
	// console.log(i); 
	// $('.resize-full-div').css('background-image','url(img/v_bg_0'+i+'.jpg)');
	baseNumber+=1;
	if (baseNumber>baseNumArr.length-1) {
		baseNumber = 0;
	}
	var j = baseNumArr[baseNumber];
	// console.log(j);   
	var imgW = $('.resize-full-div .backupImg').width(),
		imgH = $('.resize-full-div .backupImg').height(),
		a = imgW/imgH;
	var wh100;
	if (a>global_w_h) {
		wh100 = 'height';
	}else{
		wh100 = 'width';
	}
	$('.resize-full-div .backupImg').attr('src',path+resultImg[j]).css(wh100,'100%');
	$('.resize-full-div').css('background-image','url('+path+resultImg[j]+')');
}

// 诗全屏 i随机换字体颜色 j按顺序换字体颜色
function next_resize_full_color(){
	var	i = getRandomNumber(baseColorArr);
	if (randomNumber==i) {
		i = getRandomNumber(baseColorArr);
		return false;
	}else{
		randomNumber = i;
	}  
	// console.log(i); 
	// $('.resize-full-div').css('color',i);
	baseNumber+=1;
	if (baseNumber>baseColorArr.length-1) {
		baseNumber = 0;
	}
	var j = baseColorArr[baseNumber];
	// console.log(j); 
	$('.resize-full-div').css('color',j);
}


// 随机在所给数组中选一项
function getRandomNumber(arr){
	var i;
	var n = Math.floor(Math.random() * arr.length + 1)-1;
	var i = arr[n];
	return i;
}



// 点击截屏 存在模糊 以及 背景图片不会截取的问题 
function toCanvasImg(){
	$('.resize-full-div .backupImg').show();
	$('.resize-full-btn').hide();
	alert('保存快照');
	var width = $(window).width() ; //这是我们准备画的div
	var height =  $(window).height() ;
	html2canvas($('.resize-full-div'), {
	    allowTaint: true,
	    taintTest: false,
	    onrendered: function(canvas) {
	        canvas.id = "mycanvas";
	        // document.body.appendChild(canvas);
	        //生成base64图片数据
	        var dataUrl = canvas.toDataURL();
	        var newImg = document.createElement("img");
	        newImg.src =  dataUrl;
	        document.body.appendChild(newImg);
			$('.resize-full-div .backupImg').hide();
			$('.resize-full-btn').show();
	    }, 
	    width : width , 
	    height : height
	});
}

// end

