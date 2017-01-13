
var poemId = queryString.poemId;
// console.log(poemId);


// 删除文件
function delFile (obj) {
	var fileId = $(obj).closest('h4').attr('fileId');
	// console.log(fileId);
}


// 点赞更新数据库
function changeLikeStatus(obj){
	// console.log(loginInfo);
	if (loginInfo==undefined||loginInfo==null||loginInfo=='') {
		var tips = '需要先登录后才能操作';
		//询问框
		// layer.open({
		// 	content: tips
		// 	,btn: ['去登录','取消']
		// 	,yes: function(index){
		// 		window.location.href='login';
		// 		layer.close(index);
		// 	}
		// });

		//底部对话框
		layer.open({
			content: tips
			,btn: ['去登录', '取消']
			,skin: 'footer'
			,yes: function(index){
				window.location.href='login';
			}
		});

		return false;
	}
	var targetTable = 'handwriting_file',
		targetField = 'like_num',
		newValue = 0,
		targetId = Number($(obj).closest('.img-each').attr('fileId')),
		likeStatus = Number($(obj).attr('status')),
		like_id = Number($(obj).attr('like_id'));
		if (like_id==''||like_id==undefined) {
			like_id = 1;
		}

	$(obj).find('.icon').toggleClass('icon-heart-empty icon-heart animated bounceIn');
	if (likeStatus==0) {
		$(obj).attr({
			status:1,
		    like_id:like_id
		});
		likeStatus = 1;
		newValue = Number($(obj).find('.likeNum').text())+1;
	}else if(likeStatus==1){
		$(obj).attr({
			status:0,
		    like_id:like_id
		});
		likeStatus = 0;
		newValue = Number($(obj).find('.likeNum').text())-1;
	}
	$(obj).find('.likeNum').text(newValue);
	var form = {
		targetTable:targetTable,
		targetField:targetField,
		newValue:newValue,
		targetId:targetId
	}
	// console.log(form);
	updata_hw_like_num(form,likeStatus,like_id,obj);
}

// 更新喜欢状态
function updata_hw_like_num(form,likeStatus,like_id,obj){
	var type = 'put',
		url = 'admin/'+form.targetTable,
		data = JSON.stringify(form);
    var rs = global_ajax(type,url,data);
    // console.log(rs);

    if (rs.message=='success') {
    	like_log(form,likeStatus,like_id,obj);
    }
}

function like_log(form,likeStatus,like_id,obj){
	var targetTable = 'hw_like',
		type,like_form;

	if (like_id>0) { //更新
		type = 'put',
	    like_form = {
	    	targetTable:targetTable,
			targetField:'is_like',
			newValue:likeStatus,
			targetId:like_id
	    }
	}else{ // 新建
		type = 'post',
		like_form = {
			targetTable:targetTable,
			targetField:'hw_fileId,like_userId,is_like',
			newValue:form.targetId+','+loginInfo.id+','+'1'
		};
	}

	// console.log(like_form);
	var type = type,
		url = 'admin/'+like_form.targetTable,
		data = JSON.stringify(like_form);
    var rs = global_ajax(type,url,data);
    // console.log(rs);
    if (type=='pots') {
    	$(obj).attr('like_id',rs.resinsert.insertId);
    }
    
}



// 修改文件
function edit_hw_file(obj){
	var hId = $(obj).attr('thisId');
	console.log(hId);
}








function show_upload_new_hw_div(obj){

	$('.upload-new-hw-div').removeClass('hide').addClass('animated fadeInUpBig');
	$('.upload-new-hw-div').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('.upload-new-hw-div').removeClass('animated fadeInUpBig');
		$('.main-content').addClass('hide');
	});

}

function hide_upload_new_hw_div(obj){

	$('.main-content').removeClass('hide');
	$('.upload-new-hw-div').addClass('animated fadeOutDownBig');
	$('.upload-new-hw-div').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('.upload-new-hw-div').removeClass('animated fadeOutDownBig').addClass('hide');
		
	});
}











