$(document).ready(function () {
    //点击提交按钮
    $("#submit_button").click(function(){
        if(checkInfo()){
            //发送数据
            request();
        }
    })

    //检查信息是否符合要求
    function checkInfo(){
        var accord = true;//所有信息是否符合要求
        if($("#admin_id").val() == "" || $("#admin_name").val() == "" || $("#admin_phone").val() == "" || $("#admin_password").val() == "" || $("#admin_password_again").val() == ""){
            accord = false;
            alert("请将信息填写完整！");
            return;
        }

        //匹配电话号码
        // var phone = /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[0-35-9]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|6[2567]\d{2}|4(?:[14]0\d{3}|[68]\d{4}|[579]\d{2}))\d{6}$/;
        var phone = /^[1-9][0-9]*/;//匹配任意1-9开头的数字串
        var ph = $("#admin_phone").val();
        if(!phone.test(ph)) {
            $("#admin_phone").parent().next().text("手机号码格式不正确!");
            accord = false;
        }
        else {
            $("#admin_phone").parent().next().text("");
        }

        //密码是否一致
        if (admin_password.value !== admin_password_again.value) {
            accord = false;
        }

        return accord;
    }

    //检查密码是否一致
    $("#admin_password_again").keyup(function(){
        if (admin_password.value === admin_password_again.value) {
            $("#admin_password_again").parent().next().text("");
            // $("#submit_button").removeAttr("disabled");
        }
        else {
            accord = false;
            $("#admin_password_again").parent().next().text("密码不一致！");
            // $("#submit_button").attr({ "disabled": "true" });
        }
    })
    
    //发起请求
    function request() {
        // Sending and receiving data in JSON format using POST method
        //
        var xhr = new XMLHttpRequest();
        console.log('UNSENT', xhr.readyState); // readyState 为 0
        if (!xhr) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        var url = "http://orderingmeal.applinzi.com/merchant/index.php/home/user/sign";
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
            "admin_id": admin_id.value,
            "admin_name": admin_name.value,
            "admin_password": admin_password.value,
            "admin_password_again": admin_password_again.value,
            "admin_phone": admin_phone.value
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
        };
    }

    //处理收到的数据
    function processResponse(response){
        switch(response.error_code){
            case 0:
                console.log("注册成功！");
                //跳转到系统后台页面，思路：带用户ID跳转以验证用户身份
                //延迟2秒跳转登陆页面
                $("#submit_button").popover({
                    placement: 'top',
                    title: '注册成功',
                    content: '随后将跳转到登陆页面!',
                    triger: 'click'
                })
                $("#submit_button").popover('show');
                //延迟2秒跳转到添加菜品页面
                setTimeout(function() { 
                    window.location = "index.html";
                }, 2000);
                break;
            case 1:
                console.log("参数不足！");
                break;
            case 2:
                console.log("密码不一致！");
                break;
            case 3:
                console.log("数据插入失败！");
                break;
            default:
                break;
        }
    }
})