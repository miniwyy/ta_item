/*
 * @author: yori
 */

var Page = {

	// 初始化模块
	init : function () {
		this.acceptHead(this.returnHead);
		this.acceptContent(this.returnContent);
		this.listenEvent();
	},		

	// 接收数据模块
	acceptHead : function (callback){
		$.ajax({
			type: "get", 
			dataType: "json",
			url: "http://192.168.1.150/h5/member/get_member_info?uid=9",
			success: function (data){			   
				callback(data);
			},
			error: function(){
				console.log("未接受到数据");
			}
		});	
	}, 
	acceptContent : function (callback){
		$.ajax({
			type: "get",
			dataType: "json",
			url: "http://192.168.1.150/h5/member/get_buy_list?uid=9&state=0",
			success: function (data) {
				callback(data);
			},error: function(){
				console.log("未接受到数据");
		}
		});
	},
	acceptLuck : function (callback){
		$.ajax({
			type: "get",
			dataType: "json",
			url: "http://192.168.1.150/h5/member/get_lucky_list?uid=9",
			success: function (data) {
				callback(data);
			},error: function(){
				console.log("未接受到数据");
		}
		});
	},
	acceptPost : function (callback){
		$.ajax({
			type: "get",
			dataType: "json",
			url: "http://192.168.1.150/h5/member/get_post_list?uid=9",
			success: function (data) {
				callback(data);
			},error: function(){
				console.log("未接受到数据");
		}
		});
	},
		    
	// 展示数据模块
	returnHead : function (obj){
		var html_head = "<div class=\"ta-inner\">"
					  + 	"<div class=\"ta-head js_ta_head\" id=\"ta-head\" style=\"background-image:url('images/test-head.jpg')\"><\/div>"
					  + 	"<div class=\"ta-info\">"
					  + 		"<div class=\"ta-name js_ta_name\">" + obj.userinfo.username + "<\/div>"
					  + 		"<div class=\"ta-id js_ta_id\">" + obj.userinfo.id + "<\/div>"
					  + 	"<\/div>"
					  + "<\/div>";				

		$(".ui-ta").html(html_head);					
	},
	returnContent : function (obj){
		var html_content = "<div class=\"take-record\">" 
						 + "<div class=\"record-con\">" 
						 + "<ul class=\"record-list\" id=\"js_record_item\">";
		for(var i in obj.data){
			html_content += Page.modelContent(obj.data[i]);
		}
		html_content += "<\/ul>" 
					 + "<\/div>" 
					 + "<\/div>";
		$(".ta-con").html(html_content);
		Page.listenData();						
	},
	returnLuck : function (obj){
		var html_luck = "<div class=\"take-record-get\">" 
					  + "<div class=\"record-get\">" 
					  + "<div class=\"record-get-margin\"><\/div>" 
					  + "<ul>";
		for(var i in obj.data){
			html_luck += Page.modelLuck(obj.data[i]);
		}
		html_luck += "<\/li>" 
				  + "<\/ul>" 
				  + "<\/div>" 
				  + "<\/div>";
		$(".ta-con").html(html_luck);							
	},
	returnPost : function (obj){
		var html_post = "<div class=\"show-share\">" 
					  + "<div class=\"show-share-margin\"><\/div>" 
					  + "<div class=\"show-share-inner\">" 
					  + "<ul class=\"show-share-list\">";
		for(var i in obj.data){
			html_post += Page.modelPost(obj.data[i]);
		}
		html_post += "<\/ul>" 
				  + "<\/div>" 
				  + "<\/div>";
		var html_blank = "";
		    html_blank += Page.modelBlank();
		   if (obj.data.length == 0) {
		   		$(".ta-con").html(html_blank);
		   } else{
		   		$(".ta-con").html(html_post);
		   };								
	},		

	// 模版模块
	modelContent : function (obj){
		return "<li class=\"record-item\">"
				+	"<div class=\"record-info\">"
				+		"<div class=\"record-img\" style=\"background-image:url('" + obj.product_image + "');\"><\/div>"
				+  		"<div class=\"record-message\">"
				+ 			"<div class=\"record-title\">" + obj.title + "<\/div>"
				+  			"<div class=\"record-issue\">期号：<span class=\"issue-num\">" + obj.stage_id + "<\/span><\/div>"
				+  			"<div class=\"record-amount\">TA已参与：<span class=\"amount-num\">"+obj.buy_num+"<\/span>人次<a href=\"#\" class=\"check-detail\">查看详情<\/a><\/div>"
				+  			"<\/div>"
				+  	"<\/div>"
				+  	"<div class=\"record-progress\">"
				+   	"<div class=\"ing-con\">"
				+   		"<a href=\"javascript:;\" class=\"btn-follow-buy\" info_id=\""+obj.info_id+"\">跟买<\/a>"
				+  			"<div class=\"ing-progress\">"
				+  				"<div class=\"ing-bar\">"
				+ 					"<div class=\"ing-bar-inner\" style=\"width:33%\"><\/div>"
				+  				"<\/div>"
				+  				"<div class=\"ing-data\">"
				+  					"<p class=\"ing-all\">总需<span class=\"ing-all-num\">"+obj.total_need_num+"<\/span><\/p>"
				+  					"<p class=\"ing-last\">剩余<span class=\"ing-last-num\">"+obj.buy_num+"<\/span><\/p>"
				+  				"<\/div>"
				+  			"<\/div>"
				+  		"<\/div>"
				+  		"<div class=\"end-con\" style=\"display:none\">"
				+  			"<div class=\"end-data\">"
				+  				"<p class=\"end-champion\">获得者：<span class=\"champion-name\">" + obj.lucky_user_name + "<\/span><\/p>"
				+  				"<p class=\"end-num\"><span class=\"join-num\">"+obj.join_num+"<\/span>人次<\/p>"
				+  			"<\/div>"
				+  		"<\/div>"
				+  	"<\/div>"
			    + "<\/li>"								
	},
	modelLuck : function (obj){
		return "<li class=\"record-get-item\">"
				+ 	"<div class=\"record-img\" style=\"background-image:url('" + obj.product_image + "');\"><\/div>"
				+ 	"<div class=\"record-get-info\">"
				+ 			"<p class=\"record-title\">" + obj.title + "<\/p>"
				+ 			"<p class=\"record-issue\">" + obj.stage_id + "<\/span><\/p>"
				+ 			"<p class=\"record-need\">总需：<span>" + obj.total_need_num + "<\/span><\/p>"
				+ 			"<p class=\"record-lucky\">幸运号码：<span>" + obj.lucky_num + "<\/span><\/p>"
				+ 			"<p class=\"join-num\">本期参与：<span>" + obj.times + "<\/span>人次<\/p>"
				+ 			"<p class=\"record-time\">揭晓时间：<span>" + obj.publish_time + "<\/span><\/p>"
				+ 	"<\/div>"
			    + "<\/li>"								
	},
	modelPost : function (obj){
		return "<li class=\"show-share-item\">"
				+ 	"<div class=\"user-info\">"
				+ 		"<div class=\"user-head\" style=\"background-image:url('"+ obj.avatar +"');\"><\/div>"
				+ 		"<div class=\"user-name\">"+ obj.user_name +"<\/div>"
				+ 		"<div class=\"publish-time\">"+ obj.create_time +"<\/div>"
				+ 	"<\/div>"
				+ 	"<div class=\"show-con\">"
				+ 		"<div class=\"show-title\">"+ obj.product_title +"<\/div>"
				+ 		"<div class=\"show-desc\">"+ obj.post_content +"<\/div>"
				+ 		"<div class=\"show-pic\">"
				+ 			"<ul>"
				+ 				"<li class=\"show-pic-item\" style=\"width: 123.333px; height: 123.333px; background-image: url("+ obj.product_image +");\"><\/li>"
				+ 			"<\/ul>"
				+ 		"<\/div>"
				+	 "<\/div>"
				+	 "<div class=\"issue-con\">"
				+	 	"<div class=\"issue-img\" style=\"background-image:url('"+ obj.post_images +"')\"><\/div>"
				+ 		"<div class=\"issue-info\">"
				+ 			"<div class=\"issue-title\">"+ obj.post_title +"<\/div>"
				+ 			"<div class=\"issue-num\">期号："+ obj.stage_id +"<\/div>"
				+ 		"<\/div>"
				+	 "<\/div>"
				+ "<\/li>"								
	},
	modelBlank : function(){
		return "<div class=\"show-share blank-show-share\" style=\"height: 566px;\"> "
			 + 		"<div class=\"show-share-margin\"><\/div>"
			 +		"<div class=\"js_ta_post_content_con\" style=\"height:100%\">"
		     +  		"<div class=\"blank-show-con\">"
		     +  			"<div class=\"blank-area\">"
		     +  				"<div class=\"blank-inner\">"
		     +  					"<span class=\"blank-tag2\"><\/span>"
		     +  					"<p class=\"blank-tip\">该用户尚未共享<\/p>"
		     +  				"<\/div>"
		     +  			"<\/div>"
		     +  		"<\/div>"
		     +  	"<\/div>"
		     + 	"<\/div>"
	},

	// 监听事件模块
	listenEvent : function (){
		$(".js_content").click(function () {
			$(".item").removeClass("cur-item");
			$(this).addClass("cur-item");
			Page.acceptContent(Page.returnContent);
		});
		$(".js_luck").click(function () {
			$(".item").removeClass("cur-item");
			$(this).addClass("cur-item");
			Page.acceptLuck(Page.returnLuck);
		});
		$(".js_c").click(function () {
			$(".item").removeClass("cur-item");
			$(this).addClass("cur-item");
			Page.acceptPost(Page.returnPost);
		});
	},
	listenData : function (){
		var infoId = document.getElementById("js_record_item");
		infoId.addEventListener("click",function (e){
			if (/^a$/i.test(e.target.tagName)) {
				console.log(e.target.getAttribute("info_id"));
			} 	
		},false)
	}
}

	Page.init();	
