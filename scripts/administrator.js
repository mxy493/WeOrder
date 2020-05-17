$(document).ready(function(){
    //非正常登录
    if(localStorage.online == "false" || localStorage.online == undefined) {
        window.parent.location.replace("index.html");
    }

    getAdminInfo();//获取管理员信息

    //退出登录
    $("#btn_signout").on("click", function() {
        localStorage.time = 0;
        localStorage.online = false;
        window.parent.location.replace("index.html");
    });

    //修改信息模态框
    $("#modal_modify").on("show.bs.modal", function(){
        let id = $("#id").text();
        $("#modify_id").text(id);
        let phone = $("#phone").text();
        $("#modify_phone").val(phone);
        let av = $("#avatar").attr("src");
        $("#modify_avatar").val(av);
    });

    //修改账户信息
    $("#btn_modify").on("click", function(){
        if(!isTimeOut()){
            //必须填写原密码
            if($("#modify_oldpsw").val() != ""){
                let url = "http://orderingmeal.applinzi.com/merchant/index.php/home/user/denglu";
                let str_data = '{"admin_id":"' + $("#id").text() + '"';
                //电话不为空且和原电话不相同
                if($("#modify_phone").val() != "" && $("#modify_phone").val() != $("#phone").text()){
                    str_data += ',"newphone":"' + $("#modify_phone").val() + '"';
                }
                //头像不为空且和原头像不相同
                if($("#modify_avatar").val() != "" && $("#modify_avatar").val() != $("#avatar").text()){
                    str_data += ',"newurl":"' + $("#modify_avatar").val() + '"';
                }
                //新密码不为空
                if($("#modify_newpsw").val() != ""){
                    str_data += ',"newpas":"' + $("#modify_newpsw").val().hashCode() + '"';
                }
                str_data += ',"admin_password":"' + $("#modify_oldpsw").val().hashCode() + '"}';

                console.log(str_data);
                let data = JSON.parse(str_data);
                XHR(url, data);
            }
            else {
                alert("请输入原密码以验证身份!");
            }
            //关闭模态框
            $("#modal_modify").modal('hide');
        }
    });
});

//获取管理员信息
function getAdminInfo(){
    let url = "http://orderingmeal.applinzi.com/merchant/index.php/home/user/GetAd";
    let data = {
        "admin_id": localStorage.id,
        "admin_password": localStorage.pwd
    };
    XHR(url, data);
}


//处理多个请求的返回数据,注销账户&修改账户信息
function processResponse(response){
    //获取账户信息
    if(response.function == "GetAd" && response.request_behave == "select"){
        if(response.error_code == 0){
            let adinfo = response.data;
            $("#avatar").attr("src", adinfo.admin_face_url);
            $("#id").text(localStorage.id);
            $("#phone").text(adinfo.admin_phone);
        }
        else {
            alert("存在异常，请重新登陆！");
            localStorage.removeItem("time");
            window.parent.location.href = "index.html";
        }
    }
    //修改账户信息的请求
    if(response.function == "degnlu" && response.request_bahave == "alert"){
        if(response.error_code == 0) {
            //信息修改成功
            let adinfo = response.data;
            $("#avatar").attr("src", adinfo.admin_face_url);
            $("#id").text(localStorage.id);
            $("#phone").text(adinfo.admin_phone);
            $("#modal_modify").modal('hide');
        }
        else if(response.error_code == 3) {
            alert("密码错误，修改失败！");
        }
        else {
            alert("修改失败！");
        }
    }
}
