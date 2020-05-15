$(document).ready(function(){
	//点击注册按钮
	$("#register").click(function(){
		window.location.href = "register.html";
	})

	//点击登录按钮
	$("#login").click(function(event) {
		let id = $("#admin_id").val();
		let pwd = $("#admin_password").val().hashCode();//转哈希值
		console.log(pwd);
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
			//存储账户信息到全局变量，xhr.js
			localStorage.id = id;
			localStorage.pwd = pwd;
			//身份认证
			let url = "http://orderingmeal.applinzi.com/merchant/index.php/home/user/denglu";
			let data = {
				"admin_id": id,
				"admin_password": pwd
			};
			XHR(url, data);//调用XHR函数发起请求
		}
	});
});	

//处理返回数据
function processResponse(response){
	switch(response.error_code){
		case 0:
			localStorage.time = new Date().getTime();//1970年1月1号至今的毫秒数
			localStorage.online = "true";//已登录状态
			window.location = "mainframe.html";
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