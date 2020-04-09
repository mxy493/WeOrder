$(document).ready(function(){
    $("#admin_password_again").keyup(function(){
        var p1 = admin_password.value;
        var p2 = admin_password_again.value;
        if(p1 == p2){
            $("#admin_password_again").parent().next().text("");
            $("#submit_button").removeAttr("disabled");
        }
        else {
            $("#admin_password_again").parent().next().text("密码不一致！");
            $("#submit_button").attr({"disabled": "true"});
        }
    })
})