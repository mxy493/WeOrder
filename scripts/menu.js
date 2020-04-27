$(document).ready(function(){
    $(".table-btn").click(function(){
        var info = $(this).parent().siblings();
        $("#dishid").text(info[0].innerText);//菜品ID
        $("#dishname").val(info[1].innerText);//菜名
        $("#dishcatg").val(info[2].innerText);//类别
        $("#setprice").val(info[3].innerText);//单价
        $("#quantity").val(info[4].innerText);//库存
        $("#dish_status").val(info[6].innerText);//状态
        // $("#imgupload").val(info[7].innerText);//图片
        $("#description").val(info[5].innerText);//描述
    })

    $(".btn-status").click(function(){
        $(this).attr("class", "btn btn-success btn-status");
        $(this).siblings().attr("class", "btn btn-default btn-status");
    })

    //删除菜品
    $("#dish_delete").click(function(){
        //请求服务器删除该菜品

        //服务器删除成功的前提下，从列表中删除该菜品
        if(rp_status){

        }
    })

    //修改菜品信息
    $("dish_modify").click(function(){

    })
})
