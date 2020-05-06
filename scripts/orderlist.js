var LASTORDER = -1;

$(document).ready(function(){
    //页面加载完毕获取一次订单
    getOrder();
    //订单刷新
    setTimeout('getOrder()', 30000);//30s刷新一次

    //实时订单和历史订单切换
    $(".head-button").on("click", function(){
        $(this).siblings().attr("class", "btn btn-default head-button");
        $(this).attr("class", "btn btn-success head-button");
    })

    //订单状态切换
    $("tbody").on("click", "#status-btn-group button", function(){
        //当且仅当前一个按钮为选中样式时点击才有效
        let str = new String($(this).prev().attr("class"));
        if(str.indexOf("success") != -1){
            $(this).prev().attr("class", "btn btn-default compact-button");
            $(this).prev().addClass("disabled");
            $(this).attr("class", "btn btn-success compact-button");

            let url = "http://lcalhost/merchant/index.php/home/view/ChangeOrderSta";
            let id = $(this).parent().parent().parent().children()[2].innerText();
            let data = {
                "order_id": id
            }
            XHR(url, data);
        }
        else return;
    })
})

//获取订单列表
function getOrder(){
    let url = "http://orderingmeal.applinzi.com/merchant/index.php/home/view/GetOrder";
    let data = {
        "order_id": LASTORDER
    };
    XHR(url, data);
}

//处理返回数据
function processResponse(response){
    //这是一个订单获取的请求
    if(response.function == "HistoryOrder" && response.request_behave == "select"){
        if(response.error_code == 0){
            //请求成功
            LASTORDER = response.data.end;//更新最后的订单ID
            let orders = response.data.order;
            for(let i = 0; i < orders.length; i++){
                $("tbody").prepend("<tr></tr>");
                let new_line = $("tbody tr").first();
                new_line.append("<td>" + orders[i].order_id + "</td>");//订单ID
                new_line.append("<td>" + orders[i].create_time + "</td>");//下单时间
                new_line.append("<td>" + orders[i].user_id + "</td>");//用户ID
                new_line.append("<td>" + orders[i].table_id + "</td>");//桌号
                //菜品列表
                new_line.append("<td></td>");
                let newOrder = new_line.children();
                let dishes = orders[i].menu;
                for(let j = 0; j < dishes.length; j++){
                    let str = "<p>【" + (j + 1) + "】" + dishes[j].num + "×" + dishes[j].food.pro_name + "(￥" + dishes[j].cost + ")</p>";
                    $(newOrder[4]).append(str);
                }

                new_line.append("<td>" + orders[i].user_remark + "</td>");//备注
                new_line.append("<td>" + orders[i].pro_amount + "</td>");//总额
                new_line.append("<td>" + (orders[i].commont == null? "" : orders[i].commont.user_commont) + "</td>");//评价
                //订单状态按钮默认添加为默认样式，后面再更改样式
                new_line.append(
                `                <td>
                    <div id="status-btn-group" class="btn-group" role="group" aria-label="...">
                        <button id="status0" type="button" class="btn btn-default compact-button">待接单</button>
                        <button id="status1" type="button" class="btn btn-default compact-button">制作中</button>
                        <button id="status2" type="button" class="btn btn-default compact-button">已完成</button>
                    </div>
                </td>`
                );
                if(orders[i].order_staus == "待接单"){
                    $("#status0").attr("class", "btn btn-success compact-button");
                }
                else if(orders[i].order_staus == "制作中"){
                    $("#status1").prevAll().attr("class", "btn btn-default compact-button");
                    $("#status1").prevAll().addClass("disabled");
                    $("#status1").attr("class", "btn btn-success compact-button");
                }
                else {
                    $("#status2").prevAll().attr("class", "btn btn-default compact-button");
                    $("#status2").prevAll().addClass("disabled");
                    $("#status2").attr("class", "btn btn-success compact-button");
                }
            }
        }
        else {
            alert("订单获取失败！");
        }
    }

    //这是订单状态切换的请求
    if(response.function == "" && response.request_behave == ""){

    }

}