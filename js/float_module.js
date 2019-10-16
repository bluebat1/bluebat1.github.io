(function(){
	let float_module_style=`
	/*浮动导航栏*/
		#top_float{
			position: fixed;
			right: 5vh;
			/*width: 5vw;*/
			height: 50vh;
			top: 10vh;
			padding-top: 30vh;
			background: url(img/jian.png);
			background-size: 100% 100%;
			display: none;
		}
		#top_float ul {
		}
		#top_float ul li{
			list-style: none;
			float: left;
			/*padding: 10px;*/
			margin: 1vh;
			margin-right: 2vw;
//			padding: 2vh;
			background: rgba(1,188,188,0.8);
			-webkit-transform: skewX(-10deg);
		}
		#top_float ul li a{
			font-size: 5vh;
			color: white;
		}
		#top_float ul li a:link{
			color: white;
			text-decoration:none;
		}
		#top_float ul li a:visited{
			/*color: black;*/
		}`;
	let float_module = document.createElement("div");
	let float_module_styles = document.createElement("style");
	float_module_styles.innerHTML=float_module_style;
	float_module.innerHTML=`
		<div id="top_float">
			<ul>
				<li><a href="#">首页</a></li><br>
				<li><a href="#">论坛</a></li><br>
				<li><a href="#">技术</a></li><br>
				<li><a href="#">展示</a></li><br>
				<li><a href="#">回頂</a></li><br>
			</ul>
		</div>
	`;
	document.body.appendChild(float_module_styles);
	document.body.appendChild(float_module);
	function scrollFunc () {
		let _top = document.documentElement.scrollTop;
		let continue_buttton = null;
		try{
			continue_buttton = document.getElementById("continue_buttton");
		}catch(e){
			//TODO handle the exception
		}
		if(_top > innerHeight*0.1){
			document.querySelector("#top_float").style.display = "block";
			if(continue_buttton != null){
				continue_buttton.style.display = "none";
			}
		}else{
			document.querySelector("#top_float").style.display = "none";
			if(continue_buttton != null){
				continue_buttton.style.display = "block";
			}
		}
	}
	//给页面绑定滑轮滚动事件 
	if(document.addEventListener){//firefox
		document.addEventListener('DOMMouseScroll', scrollFunc, false);
	}
	//滚动滑轮触发scrollFunc方法ie谷歌
	window.onmousewheel = document.onmousewheel = scrollFunc;
	//常規
	window.onscroll = scrollFunc;
	scrollFunc();
})(null);
