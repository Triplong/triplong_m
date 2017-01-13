
// 定义vue范围及监听的变量
var vm_all = new Vue({
  el: '#select_vue_all',
  data: {
  	qiniuDoname:'',
    search_poems: [],
    search_country: [],
    search_dynasty: [],
    user_info:[]
  },
  methods: {

  }
})
var search_table = [[],[]];

// 显示搜索模块
function showSearchDiv(obj){
	$('.global-search-div').slideToggle();

	var table_array = ['country','dynasty'];
	$.each(table_array,function(i,n){
		var form = {
			targetTable:n,
			targetField:'*'
		}
		var type = 'get',
			url = 'admin/'+form.targetTable,
			data = form;
		if (search_table[i].length==0) {
		    var rs = global_ajax(type,url,data);
		    // console.log(rs); 
			search_table[i] = rs.rows;
		}
	})
	// console.log(search_table);
	if (vm_all.search_country.length==0) {
		vm_all.search_country = search_table[0];
	}
	if (vm_all.search_dynasty.length==0) {
		vm_all.search_dynasty = search_table[1];
	}
}
// 隐藏搜索模块
function hideSearchDiv(obj){
	$(obj).closest('.global-search-div').slideToggle();
}

// 搜索按标题及作者
function search_by_title(obj) {
	var title = $(obj).prev('input').val();
	if (title=='') {
		$('.search_result_tips').text('');
		vm_all.search_poems = [];
		return false;
	}
	console.log(title);
	var type = 'get',
		url = 'admin/poems',
		data = {
			title:title
		};
	var result = global_ajax(type,url,data);
	console.log(result);
	vm_all.search_poems = result.rows;
	if (result.rows.length==0) {
		$('.search_result_tips').text('未搜到你想要的结果');
	}else if(result.rows.length>0){
		$('.search_result_tips').text('搜索到'+result.rows.length+'条结果:');
	}
};


