$(document).ready(function(){
    //永久注销账户(进阶功能)
    $("#btn_logout").click(function(){
        // var data = {
        //     "admin_id": "admin",
        //     "logout": "true"
        // }
        // XHR(data);
        // // 注销成功后跳转到登陆页面
        $("#modal_logout").modal('hide');
    })

    $("#modal_modify").on("show.bs.modal", function(){
        var id = $("#id").text();
        $("#modify_id").text(id);
        var name = $("#name").text();
        $("#modify_name").val(name);
        var phone = $("#phone").text();
        $("#modify_phone").val(phone);
    })

    //修改账户信息
    $("#btn_modify").click(function(){
        if($("#modify_oldpsw").val() != ""){
            var url = "";
            var data = {
                "admin_id": $("#modify_id").text(),
                "admin_name": $("#modify_name").val(),
                "admin_phone": $("#modify_phone").val(),
                "admin_new_password": $("#modify_oldpsw").val(),
                "admin_old_password": $("#modify_newpsw").val()
            }
            XHR(url, data);
        }
        else {
            alert("请输入原密码以验证身份!");
        }
        //关闭模态框
        $("#modal_modify").modal('hide');
    })
})


//处理多个请求的返回数据,注销账户&修改账户信息
function processResponse(response){

}
