$(document).ready(function () {
    $("#admin_password_again").keyup(function () {
        var p1 = admin_password.value;
        var p2 = admin_password_again.value;
        if (p1 === p2) {
            $("#admin_password_again").parent().next().text("");
            $("#submit_button").removeAttr("disabled");
        }
        else {
            $("#admin_password_again").parent().next().text("密码不一致！");
            $("#submit_button").attr({ "disabled": "true" });
        }
    })

    //点击提交按钮
    $("#submit_button").click(function () {
        //检查表单是否填写规范
        var fill = true;
        if (admin_id.value == "" || admin_id.value == undefined || admin_id.value == null) {
            $("#admin_id").parent().next().text("账户ID为必填项！");
            fill = false;
        }
        if (admin_name.value == "" || admin_name.value == undefined || admin_name.value == null){
            $("#admin_name").parent().next().text("昵称为必填项！");
            fill = false;
        }
        if (admin_phone.value == "" || admin_phone.value == undefined || admin_phone.value == null){
            $("#admin_phone").parent().next().text("手机号码为必填项！");
            fill = false;
        }
        if(fill == false){
            return;
        }
        //已规范填写
        else {
            // https://stackoverflow.com/questions/24468459/sending-a-json-to-server-and-retrieving-a-json-in-return-without-jquery
            // Sending and receiving data in JSON format using POST method
            var xhr = new XMLHttpRequest();
            var url = "url";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    //console.log(json.email + ", " + json.password);
                }
            };
        }
    })
})