$(document).ready(function(){
    //非正常登录
    if(localStorage.online == "false" || localStorage.online == undefined) {
        window.parent.location.replace("index.html");
    }
    console.log(window.getAdminInfo);
});