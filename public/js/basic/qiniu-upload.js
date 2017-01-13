// var randomOnce =  Math.random().toString(36).substr(20).toUpperCase();
// var nowDateTimeStr = new Date().format("yyyyMMddhhmmss");
// var randomStr = Math.round(Math.random() * 100);
// var file_id = nowDateTimeStr+'R'+randomStr;
// console.log(file_id);

// 获取文件唯一id
function get_file_id(index,type){
    var nowDateTimeStr = new Date().format("yyyyMMddhhmmss");
    var randomStr = Math.round(Math.random() * 100);
    var file_id = nowDateTimeStr+'R'+randomStr+'T'+type+'N'+index;
    // console.log(file_id);
    return file_id;
}

function click_prev_input(obj){    
    $(obj).prev('input').click();
}
function add_img(obj){
    $(obj).parent().find('.upload-file').click();
}

function uploadMyHaddwriting(obj){
    //loading带文字
    layer.open({
        type: 2
        ,content: '上传中'
    });
    var upload_files = $('#qiniu_upload_file')[0].files;
    var upload_length =  upload_files.length;
    // console.log('upload_length:',upload_length);
    if(upload_length >5 ){
        var tips = '上传的文件数量超过5个了！请重新选择！';
        //信息框
        layer.open({
            content: tips
            ,btn: '我知道了'
        });   
        return false;
    }else{
        for(var i=0;i<upload_length;i++){
            if($('#qiniu_upload_file')[0].files[i].size > 2048*2048){
                var tips = $('#qiniu_upload_file')[0].files[i].name + "这个文件大于4M！请重新选择！";
                //信息框
                layer.open({
                    content: tips
                    ,btn: '我知道了'
                });   
                return false;
            }
        }
    }

    var file_type=0,type_name;
    // file_type 0全部  1图片 2视频 3文档
    for (var i = 0; i < upload_length; i++) {
        var upload_file = upload_files[i];

        type_name = String(upload_file.type);
        // console.log(type_name,type_name.indexOf('image'));
        if (type_name.indexOf('image')>=0) {
            file_type=1;
        }else if(type_name.indexOf('video')>=0){
            file_type=2
        }
        // return false;

        file_id_str = get_file_id(i,file_type);
        console.log(file_id_str);

        var fd = new FormData();
        fd.append("upload_file",upload_file);
        // fd.append("name",$('#name').val());
        // fd.append("type_name",type_name);
        fd.append("file_id_str",file_id_str);
        // if (fd.get('upfiles')==undefined || fd.get('upfiles')=='undefined' || fd.get('upfiles')=='') {
        //     // return false;
        // }
        
        var type = 'post',
            url = 'qiniu-upload/file-upload?poemId='+poemId,
            data = fd;
        // layer.msg(url);
        // console.log(type,url,data);
        // return false;
        var rs = global_ajax2(type,url,data);
        
        rs = JSON.parse(rs);
        console.log(rs);
        // layer.msg(rs.ret.key);

        // $('.img-preview').attr('src',qiniuDoname+rs.key+'?imageView2/2/w/600');
        // $('.img-preview').attr('src',qiniuDoname+rs.key+'?imageMogr2/gravity/Center/crop/600x600');
        if (rs.message=='success') {            
            setTimeout(function(){
                window.location.reload();
            },1000)
        }else{
            var tips = '上传错误';
            console.log(tips);
            //信息框
            layer.open({
                content: tips
                ,btn: '我知道了'
            });  
        }

    };

}

