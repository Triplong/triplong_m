

// 发送邮箱验证码
function sendEmailCode(obj) {
	// var timer = Number($.cookie('emailCodeTimer'));
	var userId = $('.login-info-name').attr('userId');
	// if (userId>0) {
	//   //信息框
	//   layer.open({
	//     content: '请在30s以后再发送'
	//     ,btn: '我知道了'
	//   });
	//   return false;
	// }
	var email = $(obj).siblings('.my-email').val();
	var form = {
		act:'send-email',
		email:email,
		type:'邮箱认证',
		targetId:userId
	}
	var type = 'post',
		url = 'email/'+form.act,
		data = JSON.stringify(form);
	var rs = global_ajax(type,url,data);
    // rs = JSON.parse(rs);
    console.log(rs);
    if (rs.message='success') {
    	// $.cookie('emailCodeTimer',1);
    	// setTimeout(function(){
    	// 	$.cookie('emailCodeTimer',0);
    	// },3000)
		//提示
		$(obj).siblings('.some-tips').text('4位数字验证码已发送到你的邮箱，请注意查收，核对以后输入右侧框中，然后点击确认验证');
		// setTimeout(function(){
		// 	$(obj).siblings('.some-tips').text('');
		// },3000)
    }else{

    }

}

// 判断是否已发送验证码
function checkEmailCode(){

}

// 验证输入的验证码是否正确
function verifyEmailCode(obj){
	var myEmailCode = $(obj).prev('.my-email-code').val();
	if (myEmailCode==''||myEmailCode==undefined||myEmailCode==null) {
	  //提示
	  $(obj).siblings('.some-tips').text('请输入您邮箱收到的4位数字验证码');
	  // setTimeout(function(){
	  // 	$(obj).siblings('.some-tips').text('');
	  // },3000)
	  return false;
	}

	myEmailCode = String(myEmailCode).toUpperCase()

	var userId = Number($('.login-info-name').attr('userId'));
	var form = {
		targetTable:'user',
		targetField:'email_code',
		targetId:userId
	}
	var type = 'get',
		url = 'admin/'+form.targetTable,
		data = form;
	var rs = global_ajax(type,url,data);
    // rs = JSON.parse(rs);
    console.log(rs);

    if (rs.rows[0].email_code==myEmailCode) {
	  updateEmailStatus();
    }else{
	  //提示
	  $(obj).siblings('.some-tips').text('您输入的验证码不正确，请核对后重新输入');
	  // setTimeout(function(){
	  // 	$(obj).siblings('.some-tips').text('');
	  // },3000)
    }
}

// 更新邮箱认证状态
function updateEmailStatus () {
	var userId = Number($('.login-info-name').attr('userId'));
	var form = {
		targetTable:'user',
		targetField:'email_status',
		newValue:1,
		targetId:userId
	}
	var type = 'put',
		url = 'admin/'+form.targetTable,
		data = JSON.stringify(form);
	var rs = global_ajax(type,url,data);
    // rs = JSON.parse(rs);
    console.log(rs);
    if (rs.message=='success') {
		//提示
		layer.open({
			content: '您的邮箱已验证成功'
			,skin: 'msg'
			,time: 2 //2秒后自动关闭
		});
    	// window.location.reload();
    	$('.home-email .right-value .badge').addClass('ok').text('已验证');
    }
}



// 修改主要信息
function show_eidt_user_info(){
	$('.eidt-user-info-div').removeClass('hide').addClass('animated fadeInRightBig');
	$('.eidt-user-info-div').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('.eidt-user-info-div').removeClass('animated fadeInRightBig')
	});
}

function hide_eidt_user_info (obj) {
	$('.eidt-user-info-div').addClass('animated fadeOutRightBig');
	$('.eidt-user-info-div').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('.eidt-user-info-div').addClass('hide').removeClass('animated fadeOutRightBig');
	});
}


function logout(){
	$.cookie('loginInfo','');
	window.location.href='login';
}




function edit_info_one(obj){
	var type = $(obj).attr('edit-type'),height;
	if (type=='email') {
		title='编辑邮箱';
	}

	//自定义标题风格
	layer.open({
		title: [
		  title,
		  'background-color: #00BCD4; color:#fff;'
		]
		,content: $('.info-edit-dev').clone(true).removeClass('hide').html()
	});


}










