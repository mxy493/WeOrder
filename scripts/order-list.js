$(document).ready(function(){
    //实时订单和历史订单切换
    $(".head-button").on("click", function(){
        $(this).siblings().attr("class", "btn btn-default head-button");
        $(this).attr("class", "btn btn-success head-button");
    })

    //订单状态切换
    $(".compact-button").on("click", function(){
        if($(this).hasClass("disabled")){
            return;
        }
        $(this).prevAll().attr("class", "btn btn-default compact-button");
        $(this).prevAll().addClass("disabled");
        $(this).attr("class", "btn btn-success compact-button");
        if($(this).eq(2)){
            $(this).addClass("disabled");
        }
    })
})
