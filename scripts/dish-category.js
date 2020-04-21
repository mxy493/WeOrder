$(document).ready(function(){
    //点击“修改”按钮将改行菜名替换为输入框
    $("td .btn-primary").on("click", function(){
        var ctg = $(this).parent().parent().prev();
        var str = ctg.html();
        if(str.indexOf("input") == -1){
            ctg.html('<input type="text" placeholder="' + str + '">');
        }
        else {
            ctg.html(ctg.children().val());
            //请求服务器更改该类目名
        }
    })

    //删除该行类目
    $("td .btn-danger").on("click", function(){
        $(this).parents("tr").remove();
        //请求服务器删除该类目
    })
})