$(document).ready(function(){
    //页面加载时就获取一次菜单
    getMenu();

    //点击修改按钮，弹出菜品信息修改模态框
    $("#menu").on("click", ".table-btn", function(){
        //修改模态框默认属性
        $("#modal_title").text("修改菜品信息");
        $("#dishid").parent().parent().show();
        $("#dish_delete").show();
        $("#dish_modify").text("确认修改");

        //默认显示当前菜品信息
        let info = $(this).parent().siblings();
        $("#dishid").text(info[0].innerText);//菜品ID
        $("#dishname").val(info[1].innerText);//菜名
        $("#dishcatg").val(info[2].innerText);//类别
        $("#setprice").val(info[3].innerText);//单价
        $("#quantity").val(info[4].innerText);//库存
        $("#description").val(info[5].innerText);//描述
        // $("#dish_status").val(info[6].innerText);//状态
        if(info[6].innerText == "已上架"){
            $("#status0").attr("class", "btn btn-success btn-status");
            $("#status1").attr("class", "btn btn-default btn-status");
        }
        else {
            $("#status0").attr("class", "btn btn-default btn-status");
            $("#status1").attr("class", "btn btn-success btn-status");
        }
        $("#imgupload").val(info[7].children[0].src);//图片
    })

    //点击添加菜品按钮，弹出添加菜品模态框
    $("body").on("click", "#add_dish", function(){
        //修改模态框默认属性
        $("#modal_title").text("添加菜品");
        $("#dishid").parent().parent().hide();
        $("#dish_delete").hide();
        $("#dish_modify").text("确认添加");

        //清空表格内容
        $("#dishname").val("");//菜名
        $("#dishcatg").val("");//类别
        $("#setprice").val("");//单价
        $("#quantity").val("");//库存
        //状态默认为已上架
        $("#status0").attr("class", "btn btn-success btn-status");
        $("#status1").attr("class", "btn btn-default btn-status");
        $("#imgupload").val("");//图片
        $("#description").val("");//描述
    })

    //点击菜品状态切换按钮
    $(".btn-status").click(function(){
        $(this).attr("class", "btn btn-success btn-status");
        $(this).siblings().attr("class", "btn btn-default btn-status");
    })

    //删除菜品
    $("#dish_delete").click(function(){
        //请求服务器删除该菜品
        var url = "http://orderingmeal.applinzi.com/merchant/index.php/home/view/DeleteMenu";
        var data = {
            "pro_id": $("#dishid").text()
        }
        XHR(url, data);
        //服务器删除成功的前提下，从列表中删除该菜品
    })

    //添加菜品或修改菜品信息
    $("#dish_modify").click(function(){
        //判断上下架状态
        let status = 0;//默认上架
        let str = $("#status0").attr("class");
        if(str.indexOf("success") == -1){
            status = 1;//下架
        }

        //添加或修改菜品
        let url = "http://orderingmeal.applinzi.com/merchant/index.php/home/view/AddMenu";
        let data = {
            "pro_name": $("#dishname").val(),
            "pro_category": $("#dishcatg").val(),
            "pro_price": $("#setprice").val(),
            "pro_quantity": $("#quantity").val(),
            "pro_items": $("#description").val(),
            "image_url": $("#imgupload").val(),
            "display": status
        }
        XHR(url, data);
    })
})

//获取菜单
function getMenu(info){
    var url = "http://orderingmeal.applinzi.com/merchant/index.php/home/view/MouMenu";
    var data = {
        "category": "素菜",
    }
    XHR(url, data);
}

//处理响应数据
function processResponse(response){
    //获取菜品列表
    if(response.function == "MouMenu" && response.request_behave == "select"){
        //数据请求成功
        if(response.error_code == 0){
            //清空列表
            $("#menu").empty();
            let dishes = response.data;
            for(let i = 0; i < dishes.length; i++){
                $("tbody").prepend("<tr></tr>");
                let new_line = $("tbody tr").first();
                let status = dishes[i].display == 0? "已上架":"已下架";
                new_line.append("<td>" + dishes[i].pro_id + "</td>");
                new_line.append("<td>" + dishes[i].pro_name + "</td>");
                new_line.append("<td>" + dishes[i].pro_category + "</td>");
                new_line.append("<td>" + dishes[i].pro_price + "</td>");
                new_line.append("<td>" + dishes[i].pro_quantity + "</td>");
                new_line.append("<td>" + dishes[i].pro_items + "</td>");
                new_line.append("<td>" + status + "</td>");//菜品状态dish.pro_status
                new_line.append('<td><img src="' + dishes[i].image_url + '" alt="' + dishes[i].pro_name + '" class="img-dishes img-thumbnail img-responsive"></td>');
                new_line.append('<td><button type="button" class="btn btn-primary table-btn" data-toggle="modal" data-target="#modal_dish">修改</button></td>');
            }
        }
        else {
            alert("菜品列表获取失败！");
        }
    }

    //这是一个添加菜品的请求的返回数据
    if(response.function == "AddMenu"){
        if(response.error_code == 0 || response.error_code == 10){
            $("#modal_dish").modal('hide');//关闭模态框
            getMenu();//更新菜品列表
        }
        else if(response.request_behave == "add") {
            alert("添加失败！");
        }
        else if(response.request_behave == "alert") {
            alert("修改失败！");
        }
    }

    if(response.function == "DeleteMenu" && response.request_behave == "delete"){
        if(response.error_code == 0){
            $("#modal_dish").modal('hide');//关闭模态框
            getMenu();//更新菜品列表
        }
        else {
            alert("删除失败！");
        }
    }
}