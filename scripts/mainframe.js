//导航页面切换
$(document).ready(function(){
    $("nav li").on("click", function(){
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        var idname = this.id;
        switch(idname){
            case 'page-data':
                $("#main_frame").attr("src", "dataanalysis.html");
                break;
            case 'page-admin':
                $("#main_frame").attr("src", "administrator.html");
                break;
            case 'page-catg':
                $("#main_frame").attr("src", "dishcategory.html");
                break;
            case 'page-menu':
                $("#main_frame").attr("src", "menu.html");
                break;
            case 'page-order':
                $("#main_frame").attr("src", "orderlist.html");
                break;
            default:
                alert( 'An unknown value' );
        }
    });
});