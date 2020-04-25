$(document).ready(function(){
    //永久注销账户
    $("#btn_logout").click(function(){
        $("#modal_logout").modal('hide');
    })

    $("#modal_modify").on("show.bs.modal", function(){
        var name = $("#name").text();
        $("#modify_name").val(name);
        var phone = $("#phone").text();
        $("#modify_phone").val(phone);
    })

    //修改账户信息
    $("#btn_modify").click(function(){
        $("#modal_modify").modal('hide');
    })
})