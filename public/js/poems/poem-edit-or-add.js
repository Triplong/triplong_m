// console.log(rows,act_status);

function submit_poem_content(obj) {
	$(obj).attr('disabled','disabled').text('提交中...');
	var poemId = $(obj).attr('poemId')||'',
		act_status = $(obj).attr('act-status'),
		$a = $(obj).closest('.add-new-poem-div'),
		title = $a.find('.poem-title').val(),
		authorName = $a.find('.poem-penName').val(),
		content = $a.find('.poem-content').val()
		form = {
			poemId:poemId,
			title:title,
			authorName:authorName,
			content:content
		}
	if (form.title=='') {
		var placeholder = $a.find('.poem-title').attr('placeholder');
		// layer.msg('诗的名字不能为空');
		$(obj).attr('disabled','disabled').text(placeholder+'不能为空').addClass('animated tada');
		$(obj).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(obj).removeClass('animated tada');
		});
		setTimeout(function(){
			$(obj).removeAttr('disabled').text(msg_tips[4]);
		},2000);
		
		return false;
	}
		// console.log(form);
	if (poemId>0 && act_status==1) { // alert('提交编辑');
		var type = 'put',
			url = 'admin/poems',
			data = JSON.stringify(form);
		var result = global_ajax(type,url,data);
		console.log(result);
		if(result.message==msg_status[0]){
			// layer.msg(msg_tips[1]);
			$(obj).text(msg_tips[1]).addClass('animated pulse');
			$(obj).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(obj).removeClass('animated pulse');
			});
			setTimeout(function(){
				window.location.href='poems?id='+poemId;
			},1000);
		}else{
			$(obj).text(msg_tips[0]);
			setTimeout(function(){
				$(obj).removeAttr('disabled').text(msg_tips[4]);
			},2000);
		}
	}else if(act_status==2){ // alert('提交新增');
		var type = 'post',
			url = 'admin/poems',
			data = JSON.stringify(form);
		var result = global_ajax(type,url,data);
		console.log(result);
		if(result.message==msg_status[0]){
			// layer.msg(msg_tips[2]);
			$(obj).text(msg_tips[2]).addClass('animated pulse');
			$(obj).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(obj).removeClass('animated pulse');
			});
			setTimeout(function(){
				window.location.href='poems?id='+result.resinsert.insertId;
			},1000);
		}else{
			$(obj).text(msg_tips[0]);
			setTimeout(function(){
				$(obj).removeAttr('disabled').text(msg_tips[4]);
			},2000);
		}
	}else if(act_status==3){ // alert('提交纠错')
		// layer.msg(msg_tips[3]);
		$(obj).attr('disabled','disabled').text(msg_tips[3]).addClass('animated tada');
		$(obj).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(obj).removeClass('animated tada');
		});
		setTimeout(function(){
			$(obj).removeAttr('disabled').text(msg_tips[4]);
		},2000);
	}	
};


