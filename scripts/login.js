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
			var data = {
				"admin_id": id,
				"admin_password": pwd
			};
			XHR(data);//调用XHR函数发起请求
		}
	});
});	


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