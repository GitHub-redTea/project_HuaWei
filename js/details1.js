$(function(){
	//编写放大镜效果
	/*<div class="zoom-l l">
				<div class="cloude-pic">
					<div class="has-cloud-zoom-big">
						
					</div>
					<img src="images/428_428_1493716205911.jpg" class="cloud-zoom-big"/>
					<div class="position-box">
						
					</div>
					<div class="b-box">
						<div class="b-box-all">
							<img src="images/428_428_1493716205911.jpg" class="b-box-all-pic"/>
						</div>
					</div>
				</div>*/
	//将大图片扩大三遍
	$(".b-box-all-pic")
	.css({width: $(".cloud-zoom-big").outerWidth()*3, height: $(".cloud-zoom-big").outerHeight()*3})
	$(".has-cloud-zoom-big").mouseover(function(){
		$(".position-box").css("display", "block");
		$(".b-box").css("display", "block");
		//return false;
	})
	$(".has-cloud-zoom-big").mouseout(function(){
		$(".position-box").css("display", "none");
		$(".b-box").css("display", "none");
		//return false;
	})
	$(".has-cloud-zoom-big").mousemove(function(evt){
		//console.log($(this).position().left);//取到0
		//console.log($(this).outerWidth())//480
		//console.log(evt.offsetX);
		var left = evt.offsetX - $(".position-box").outerWidth()/2;
		//进行判断
		if(left < 0 ){
			left = 0;
		}else if(left > $(this).outerWidth() - $(".position-box").outerWidth()){
			left = $(this).outerWidth() - $(".position-box").outerWidth();
		}
		var top = evt.offsetY - $(".position-box").outerHeight()/2;
		if(top < 0){
			top = 0;
		}else if(top > $(this).outerHeight() - $(".position-box").outerHeight()){
			top = $(this).outerHeight() - $(".position-box").outerHeight();
		}
		//设置小块位置
		$(".position-box").css({top: top, left: left});
		
		//放大镜移动的是b-box-all
		
		//移动的比例
		var proportionX = left / ($(".has-cloud-zoom-big").outerWidth() - $(".position-box").outerWidth());
		var proportionY = top / ($(".has-cloud-zoom-big").outerHeight() - $(".position-box").outerHeight());
		
		$(".b-box-all").css({top: - proportionY * ($(".b-box-all-pic").outerHeight() - $(".b-box-all").outerHeight() ), left: - proportionX * ($(".b-box-all-pic").outerWidth() - $(".b-box-all").outerWidth() )});
	})
	
	//放大镜下图片的点击
	//<a href="javascript:;" class="pro-gallery-back"></a>
	//<a href="javascript:;" class="pro-gallery-forward"></a>
	var num = 0;
	//li的宽度
	var li_width = $(".pro-gallerys").find($("li")).eq(0).outerWidth(true);
	

	
	//$(".pro-gallery-back").off("click");
	$(".pro-gallery-forward").click(function(){
		num--;
		if(num <= -$(".pro-gallerys").find($("li")).size() + 4){
			num = -$(".pro-gallerys").find($("li")).size() + 4;
		}
		$(".pro-gallerys").stop().animate({left: num *li_width}, 100);
	
	})
			
		
	
	$(".pro-gallery-back").click(function(){
		num++;
		if(num >=0){
			num = 0;
		}
		$(".pro-gallerys").animate({left: num * li_width}, 100);
		
	})
	
	
	
	//console.log($(".pro-gallerys").css("left"))//0px
	
	//ajax调用ajax加载数据
    //给放大镜加下面ui添加数据
    $.ajax({
    	url: "../details.json",
    	
    	type: "GET",
    	success: function(data){
    		var arr = data;
    		//这是大图片展示width为760px
    		var arr_show = arr[0];
    		var arr_small = arr[1];
    		var arr_big = arr[2];
    		//ul pro-gallerys  中的小图片
    		//img cloud-zoom-big  放大图片的展示
    		//img b-box-all-pic  
    		$(".pro-gallerys").html("");
    		//$(".pro-gallerys").css("left", -$(".pro-gallerys").find($("li")).size() + 4);
    		for (var i = 0; i < arr_small.length; i++) {
    			//var li_show = $("<li><img src="+arr_small[i].img+"/></li>");
    			var li_show = $("<li></li>");
    			var img_show = $("<img />")
    			img_show.attr("src", arr_small[i].img).css({width: 68, height: 68});
    			li_show.append(img_show);
    			$(".pro-gallerys").append(li_show);
    		}
    		
    		//给ul创建委托机制给li（ajax并未加载出）
			$(".pro-gallerys").on("click", "li", function(){
				var index = $(this).index();
				$(".cloud-zoom-big").attr("src", arr_big[index].img);
				$(".b-box-all-pic").attr("src", arr_big[index].img);
			})
    	}
    })
    
    
    
    /*加载购物车详情列表*/
	$.ajax({
		url: "../daohan.json",
		type: "GET",
		success: function(data){
			var arr = data[6].goods;
			$(".large_pic").attr("src", arr[0].img);
			$(".grid-title").html("");
			var html = "";
			for (var i = 1; i < arr.length; i++ ) {
				var b = i - 1;
				html += '<li><img src ="'+ arr[i].img+'" class ="grid-pic"/><h3 class="grid-title">'+ arr[i].title+'</h3><p class="grid-desc">'+ arr[i].des+'</p><p class="grid-price">'+ arr[i].price+'</p><div class="include_add"><a href="javascript:;" class="click_add" id = '+b+'><span>加入购物车</span></a><a href="javascript:;" class="click_goto" ><span>立即下单</span></a></div></li>';
			}
			$(".grid-title").html(html);
		}
	})
	
	//点击a的事件委托给ul  a  click_add
	$(".grid-title").on("click", ".click_add", function(){
		var id = this.id;
		//console.log(id);
		var first = $.cookie("goods") == null? true : false;
		//记录是否存在id
		var same = false;
		
		//判断有没有cookie
		if(first){
			var arr = [{id: id, num : 1}];
			$.cookie("goods", JSON.stringify(arr), {express: getNumDay(7)});
			console.log($.cookie("goods"));
		}else{
			var str = $.cookie("goods");
			var arr = JSON.parse(str);
			for (var i in arr) {
				if(arr[i].id == id){
					arr[i].num++;
					//arr[i].num = arr[i].num + 1;
					//加完之后再存入cookie
					$.cookie("goods", JSON.stringify(arr), {express: getNumDay(7)});
					same = true;//遍历中goods中存在id
					console.log($.cookie("goods"));
				}
			}
			
			//判断cookie中是否存在点击的id
			if(!same){
				var obj = {id: id, num: 1};
				arr.push(obj);
				$.cookie("goods", JSON.stringify(arr), {express: getNumDay(7)});
				console.log($.cookie("goods"));
			}
		}
		sc_car();
	})
	sc_car();
	function sc_car(){
		var str = $.cookie("goods");
		if(str){
			var str_obj = JSON.parse(str);
			var sc_num = 0;
			for (var i in str_obj) {
				sc_num += Number(str_obj[i].num);
			}
		}
		//将每次计算的和防到一个地方
		$("#shopping").find($("span")).html(sc_num);
	}
	$(".sc-pro-area").remove();
	//点击下单创建div
	$(".grid-title").on("click", ".click_goto", function(){
		$(".sc-pro-area").remove();
		sc_msg();
	})
	
	function sc_msg(){
		$.ajax({
			type:"get",
			url: "../daohan.json",
			success: function(dota){
				var arr = dota[6].goods;
				var str = $.cookie("goods");
				
				if(str){
					var sc_arr = JSON.parse(str);
					var html = "";
					for ( var i in sc_arr) {
						
						var b = Number(i) + 1;
						//console.log(typeof sc_arr[i].num); number类型
						console.log(typeof arr[b].price.substring(1),  typeof arr[b].price.substring(1))
						html += '<div class="sc-pro-area margin"><table border="0" cellspacing="0" cellpadding="0"><tbody><tr class="sc-pro-area"><td class="tr-checked"><input type="checkbox" name="" id="" value="" /></td><td class="tr-pro lcear"><p class="p-img l"><img src="'+ arr[b].img +'"/></p><p class="p-title l"><span>'+ arr[b].title +'</span><span>'+ arr[b].des +'</span></p></td><td class="tr-price">'+ arr[b].price +'</td><td class="tr-quantity">'+ sc_arr[i].num +'</td><td class="subtotal">￥'+ Number(arr[b].price.substring(1)) * sc_arr[i].num +'</td><td>删除</td></tr></tbody></table></div>'
					}
					//$(html).before($(".sc-list"));
					//$("#service-container").before($(html));
					$(".sc-list").after($(html));
					//$(".sc-list").insertBefore($(html));
				}
				
			}
		});
	}
	
	
	//设置时间
	function getNumDay(n){
		var d = new Date();
		var day = d.getDate();
		d.setDate(day + n);
		return d;
	}
})











































