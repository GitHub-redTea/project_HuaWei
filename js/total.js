function startMove(obj, json, func){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		//启动
		var bStop = true; //默认这个宝箱所有的钥匙都是集齐的。
		for(var attr in json){
			//<1>获取当前的样式的当前值
			//【注】对于透明度来说，取值的时候应该做区分
			var iCur = 0;
			if(attr == "opacity"){ //透明度
				iCur = parseFloat(getStyle(obj, attr)) * 100;
			}else{
				iCur = parseInt(getStyle(obj, attr));
			}
			var speed = (json[attr] - iCur) / 8;
			//<2>处理速度
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			//<3>判断是否到终点
			if(iCur != json[attr]){
				bStop = false;
			}

			//【注】在赋值的时候也得对透明度进行区分
			if(attr == "opacity"){
				obj.style.filter = "alpha(opacity=" + (iCur + speed) + ");";
				obj.style.opacity = (iCur + speed) / 100;
			}else{
				obj.style[attr] = iCur + speed + "px";
			}
			
		}

		//判断宝箱上是否钥匙齐全
		if(bStop){
			clearInterval(obj.timer);
			if(func){
				func();
			}
		}
	}, 30);
}

function getStyle(element, style){
	return element.currentStyle ? element.currentStyle[style] : getComputedStyle(element)[style];
}
$(function() {
	$.ajax({
		url: "../daohan.json",
		type: "GET",
		success: function(data) {
			var arr = data;
			
			//精品图插入图片
			for (var i = 1; i < arr[3].goods.length; i++) {
				
				var aLi_Boutique = $("#goodsRecommend-recommend").find($(".grid-title")).find($("li"));
				
				aLi_Boutique.find($(".grid-pic")).eq(i).attr("src", "../" + arr[3].goods[i].img);
				aLi_Boutique.find($(".grid-title")).eq(i).html(arr[3].goods[i].title);
				aLi_Boutique.find($(".grid-desc")).eq(i).html(arr[3].goods[i].des);
				aLi_Boutique.find($(".grid-price")).eq(i).html(arr[3].goods[i].price);
			}
			aLi_Boutique.find($(".grid-title")).eq(0).html(arr[3].goods[7].title);
			aLi_Boutique.find($(".grid-desc")).eq(0).html(arr[3].goods[7].des);
			aLi_Boutique.find($(".grid-price")).eq(0).html(arr[3].goods[7].price);
		
			//給菜单栏创建json
			
			$(".category-info").each(function(i, elem) {
				$(elem).find($("h3")).html(arr[i].title);
			})
			//插入info_span 到title_list
			for(var j = 0; j < $(".category-info").size(); j++) {
				//p_title的内容插入
				$(".category-info").eq(j).find($(".p_title")).html(arr[j].title_top);
				for(var i = 0; i < 3; i++) {
					//插入span.info_span
					if(!arr[j].title_list[i]) {
						break;
					}
					var node = $("<span>" + arr[j].title_list[i] + "</span>")
					node.attr("class", "info_span");
					$(".category-info").eq(j).append(node);
				}
				//p_desc的内容插入 title_list
				for(var i = 0; i < arr[j].title_list.length; i++) {
					var node = $("<span>" + arr[j].title_list[i] + "</span>");
					node.attr("class", "p_desc_span");
					$(".category-info").eq(j).find($(".p_desc")).append(node);
				}
				//ul中插入图片展示

				for(var i = 0; i < 4; i++) {
					$(".category-info").eq(j).find($(".transform_pic")).find($("span")).eq(i).html(arr[j].goods[i + 1].title);
					$(".category-info").eq(j).find($(".transform_pic")).find($("em")).eq(i).html(arr[j].goods[i + 1].price);
					$(".category-info").eq(j).find($(".transform_pic")).find($("img")).get(i).src = "../" + arr[j].goods[i + 1].img;//attr属性设置
				}
			}
			/*$(".category-info").eq($(this).index()).find($(".p_title")).html(arr[$(this).index()].title_top)*/
			//绑定mouseenter事件 滑动滑入
			//添加透明度事件
			$(".category-info").mouseenter(function() {
				$(".show_product").css("display", "none");
				$(".show_product").eq($(this).index()).css("display", "block");
				$(".category-info").eq($(this).index()).stop().animate({ opacity: 1 }, 300);
			})
			$(".include-category").mouseleave(function() {
				$(".show_product").css("display", "none");
			})
			$(".category-info").mouseleave(function() {

				$(".category-info").eq($(this).index()).stop().animate({ opacity: 0.8 }, 300);
			});
			
			//添加热销单品
			$(".home-hot-goods").eq(0).find($("h2")).html(arr[6].title);
			$(".home-hot-goods").eq(1).find($("h2")).html("精品推荐");
			$(".home-hot-goods").eq(0).find($("h2")).html(arr[6].title);
			$("#home-recomend-goods").find($(".large_pic")).attr("src", "../" + arr[6].goods[0].img);
			for (var i = 1; i < arr[6].goods.length; i++) {
				$("#home-recomend-goods").find($(".grid-pic")).eq(i).attr("src", "../" + arr[6].goods[i].img);
				$("#home-recomend-goods").find($("li")).find($(".grid-title")).eq(i-1).html(arr[6].goods[i].title);
				$("#home-recomend-goods").find($(".grid-desc")).eq(i-1).html(arr[6].goods[i].des);
				$("#home-recomend-goods").find($(".grid-price")).eq(i-1).html(arr[6].goods[i].price);
			}
			
			//
			
		}
	})
	/*$("#naver-main").find("ul").find("li").mouseenter(function(){
		$(this).find("span").css("border-bottom", "3px solid #ca151d");
	})
	$("#naver-main").find("ul").find("li").mouseleave(function(){
		$(this).find("span").css("border-bottom", "");
	})*/
	//jquery 无法获取伪元素
	
	
	
	//加载轮播背景图
	$.ajax({
		url:"../background_ad.json",
		type: "get",
		success:function(data){
			var arr = data;
			//穿件背景图
			for (var i = 0; i < arr[0].length; i++ ) {
				//创建span标签
				var node_span = $("<span></span>")
				if(i == 0){
					node_span.attr("class", "active_span");
				}
				$(".ec-slider-nav").append(node_span);
				var node_li = $("<li></li>");
				//看需要是否给第一张li图片设置层级
				/*if(i == 0){
					node_li.css("zIndex", 50);
				}*/
				//var node_img = $("<img>");
				node_li.css("background", "url(../" + arr[0][i].img +") no-repeat center");
				//node_img.attr("src", "../" + arr[0][i].img);
				//node_li.append(node_img);
				$(".transform_background").append(node_li);
			}
			$(".transform_background").find($("li")).css("opacity", 0);
			$(".transform_background").find($("li")).eq(0).css("opacity", 1);
			//多余创建一个第一个li
			/*var node_li = $("<li></li>");
			node_li.css("background", "url(../" + arr[0][0].img +") no-repeat center");
			$(".transform_background").append(node_li);*/
			
			var iNow = 0 ;//记录滚动到第几张
			var timer = null;//定时器
			timer = setInterval(timerInner, 3000)
			function timerInner(){
				iNow++;
				tab();
			}
			//div 父级设置滑动事件
			$(".ec-slider-nav").on('mouseenter', "span", function(){
				
					clearInterval(timer);
					iNow = $(this).index();
					//console.log(iNow);
					tab();
			});
			$(".ec-slider-nav").on('mouseleave', "span", function(){
				timer = setInterval(timerInner, 3000);
			});
			
			function tab(){
				//span设置不透明滚动
				$(".ec-slider-nav").find($("span")).attr("class", "");
				$(".ec-slider-nav").find($("span")).eq(iNow).attr("class", "active_span");
				
				var length = $(".transform_background").find($("li")).size();
				if(iNow == length ){
					$(".ec-slider-nav").find($("span")).eq(0).attr("class", "active_span");
				}
				/*$(".transform_background").find($("li")).eq(--iNow).stop()
				.animate_buffer({opacity: 0});
				
				$(".transform_background").find($("li")).eq(++iNow).stop()
				.animate_buffer({opacity: 100}, function(){
					if(iNow == length - 1){
						iNow = 0;
					}
				});*/
				$(".transform_background").find($("li")).stop().animate({opacity: 0}, 1000);
				iNow--;
				$(".transform_background").find($("li")).eq(++iNow).stop()
				.animate({opacity: 1}, 1000, function(){
					if(iNow == length - 1){
						iNow = -1;
					}
				});
				
			}
			//第二个ajax内容四张三无图片
			for (var i in arr[1]) {
				$("#home-promo-list").find($("img")).eq(i).attr("src", "../" + arr[1][i].img);
			}
			//加载第三个数据--------- 第二个轮播图 创建li 和soan//.active_span
			for (var i =0; i < arr[2].length; i++) {
				var node_li_carousel = $("<li></li>");
				var node_img = $("<img />");
				var node_span_carousel = $("<span></span>")
				node_li_carousel.css("opacity", 0);
				if(i == 0){
					node_span_carousel.attr("class", "active_span");
					
				}
				$("#banner-slidesshow").find($(".slidesshow_span")).append(node_span_carousel);
				node_img.attr("src", "../"+ arr[2][i].img);
				node_li_carousel.append(node_img);
				$("#banner-slidesshow").find($("ul")).append(node_li_carousel);
			}
			//多创建一个li
			/*var node_li_carousel = $("<li></li>");
			var node_img = $("<img />");
			node_img.attr("src", "../"+ arr[2][0].img);
			node_li_carousel.append(node_img);
			$("#banner-slidesshow").find($("ul")).append(node_li_carousel);*/
			
			//创建函数
			
			var num = 0;
			var aLi = $("#banner-slidesshow").find($("ul")).find($("li"));
			var aSpan = $("#banner-slidesshow").find($(".slidesshow_span")).find($("span"));
			var timer_carousel = setInterval(tab_carousel, 3000);
			aLi.css("opacity", 0);
			aLi.eq(0).css("opacity", 1);
			
			
			$("#banner-slidesshow").find($(".slidesshow_span")).on("mouseenter", "span", function(){
				clearInterval(timer_carousel);
				
				num = $(this).index();
				carousel();
				
				
			})
			$("#banner-slidesshow").find($(".slidesshow_span")).on("mouseleave", "span", function(){
				timer_carousel = setInterval(tab_carousel, 3000);
			})
			
			function tab_carousel(){
				num++;
				carousel();
			}
			
			function carousel(){
				
				aSpan.attr("class", "");
				aSpan.eq(num).attr("class", "active_span");
				//aLi.css("opacity", 0);
				if(num == arr[2].length ){
					aSpan.eq(0).attr("class", "active_span");
				}
				/*if(num == 0 && aLi.eq(arr[2].length).css("opacity") == 1 ){
					aLi.eq(arr[2].length).animate({opacity: 0}, 1000);
					
				}else{
					aLi.eq(--num).animate({opacity: 0}, 1000);
				}
				
				aLi.eq(++num).animate({opacity: 1}, 1000,function(){
					
					if(num == arr[2].length){
						
						num = -1;
						
					}
				});*/
				aLi.stop().animate({opacity: 0}, 1000);
				num--;
				aLi.eq(++num).stop().animate({opacity: 1}, 1000,function(){
					
					if(num == arr[2].length - 1){
						num = -1;
					}
				});
			}
			
			
			
		}
		
	})
	
	
	//精品图点击有效果
	Boutique();
	function Boutique(){
		var oUl = $("#goodsRecommend-recommend").find($(".grid-title"));
		var Btn_l =  $("#goodsRecommend-recommend").find($(".grid-btn-l"));
		var Btn_r =  $("#goodsRecommend-recommend").find($(".grid-btn-r"));
		
		Btn_r.click(function(){
			oUl.animate_buffer({left:  - 1002});
		})
		Btn_l.click(function(){
			oUl.animate_buffer({left: 0})
		})
		if(oUl.position().left == 0){
			
		}
	}
	 //公告滚动图
	var oUl_notice = $("#accountr").find($(".accountr-r")).find($(".p-notice-content"))
	.find($(".p-notice-list"));
	var timer__notice = null;
	var iNow_notice = 0
	timer__notice = setInterval(tab_notice, 2000);
	
	
	function tab_notice(){
		iNow_notice++;
		
		oUl_notice.animate_buffer({top: - (48 * iNow_notice)}, function(){
			if(iNow_notice >= oUl_notice.find($("li")).length - 1){
			
				oUl_notice.css("top", 0);
				iNow_notice = 0;
			}
		})
	}
	oUl_notice.on("mouseenter", "li", function(){
		clearInterval(timer__notice);
	});
	oUl_notice.on("mouseleave", "li", function(){
		timer__notice = setInterval(tab_notice, 2000);
	})
	
	//窗口滚动事件
	$(window).scroll(function(){
		
		if($(window).scrollTop() >= $(window).width()){
			$(".huangBar_top").css("display", "block");
			$(".huangBar_top").click(function(){
			$(window).scrollTop(0);
		})
		}else{
			$(".huangBar_top").css("display", "none");
		}
	})
	
	///表单元素改变时隐藏a元素
	$("input").blur(function(){
		//失去焦点时
		//console.log($("input").val());
		if(!$("input").val()){
			$(".layout-input").find($("a")).css("display", "block");
		}
	})
	$("input").focus(function(){
		$(".layout-input").find($("a")).css("display", "none");
	})
	//alert($(".input_button").find($("a")).length);
	
	//登陆注册点击设置登陆注册
	var aLogin = $(".login").find($("a")).eq(0);
	var aRegister= $(".login").find($("a")).eq(1);
	aLogin.click(function(){
		$("#login_click").css("display", "block")
	})
	aRegister.click(function(){
		$("#register_click").css("display", "block")
	})
	$(".click_close").click(function(){
		$(".login_click").css("display", "none");
	})
	
})
$.fn.extend({
	animate_buffer : function(json, func){
		var nodes = $(this).get();
		for (var i = 0; i < nodes.length; i++) {
			startMove(nodes[i], json, func)
		}
	}
})






