$(document).ready(function(){
	//点击注册按钮
	$("#register").click(function(){
		window.location.href = "register.html";
	})

	//点击登录按钮
	$("#login").click(function(event) {
		var id = $("#admin_id").val();
		var pwd = $("#admin_password").val();
		if(id=="")
		{
		   alert("用户名不能为空！");
		}
		else if(pwd=="")
		{
		   alert("密码不能为空！");
		}
		else if(id != "" && pwd != "")
		{
			//身份认证
			authentication(id, pwd);
		}
	});

	//请求服务器确认登陆信息
	function authentication(id, pwd) {
		// Sending and receiving data in JSON format using POST method
		//
		var xhr = new XMLHttpRequest();
		console.log('UNSENT', xhr.readyState); // readyState 为 0
		if (!xhr) {
			alert('Giving up :( Cannot create an XMLHTTP instance');
			return false;
		}

		var url = "http://orderingmeal.applinzi.com/merchant/index.php/home/user/denglu";
		xhr.open("POST", url, true);
		console.log('OPENED', xhr.readyState); // readyState 为 1

		//设置数据格式
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8"); 

		xhr.onprogress = function () {
			console.log('LOADING', xhr.readyState); // readyState 为 3
		};
		
		xhr.onload = function () {
			console.log('DONE', xhr.readyState); // readyState 为 4
		};

		var data = {
			"admin_id": id,
			"admin_password": pwd
		};

		console.log(data);
		xhr.send($.param(data));

		xhr.onreadystatechange = function () {
			try{
				console.log("状态改变，当前状态码: "+xhr.readyState);
				switch(xhr.readyState){
					case 1:
						console.log("已调用open()方法.");
						break;
					case 2:
						console.log("send()方法已经被调用, 响应头和响应状态已经返回.");
						break;
					case 3:
						console.log("正在下载响应体.");
						break;
					case 4:
						console.log("传输已结束. 状态码: ", xhr.status);
						if (xhr.status === 200) {
							console.log("请求成功，XMLHttpRequest.status: 200");
							console.log(xhr.responseText);
							//将返回数据转为JSON对象
							try{
								var response = JSON.parse(xhr.responseText);
								processResponse(response);
							}
							catch{
								console.log("接收的数据无法转为JSON对象.");
							}
						}
						break;
					default: break;
				}                
			}
			catch(e){
				alert('Caught Exception: ' + e.description);
			}
		}
	}

	//处理返回数据
	function processResponse(response){
		switch(response.error_code){
			case 0:
				window.location = "main-frame.html";
				break;
			case 1:
				alert("参数不足！");
				break;
			case 2:
				$("#login").popover({
					placement: 'top',
					title: '登陆失败',
					content: '不存在该账号!',
				})
				$("#login").popover('show');
				setTimeout(function(){
					$("#login").popover('hide');
				}, 2000);
				break;
			case 3:
				$("#login").popover({
					placement: 'top',
					title: '登陆失败',
					content: '密码错误!',
				})
				$("#login").popover('show');
				setTimeout(function(){
					$("#login").popover('hide');
				}, 2000);
				break;
			default:
				alert("未知错误！");
		}
	}
});