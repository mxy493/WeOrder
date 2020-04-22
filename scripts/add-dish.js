$(document).ready(function(){
    $("#btn_add").on("click",function(){
        //检查信息是否合法

        //提交菜品信息
        // Sending and receiving data in JSON format using POST method
        //
        var xhr = new XMLHttpRequest();
        console.log('UNSENT', xhr.readyState); // readyState 为 0
        if (!xhr) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        var url = "http://orderingmeal.applinzi.com/merchant/index.php/home/user/sign";
        xhr.open("POST", url, true);
        console.log('OPENED', xhr.readyState); // readyState 为 1

        //设置数据格式
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8"); 

        xhr.onprogress = function () {
            console.log('LOADING', xhr.readyState); // readyState 为 3
        };
        
        xhr.onload = function () {
            console.log('DONE', xhr.readyState); // readyState 为 4
        };

        var data = {
            "pro_name": dishname.value,
            "pro_category": dishcatg.value,
            "pro_price": setprice.value,
            "pro_quantity": quantity.value,
            "pro_items": description.value,
            "image_url": imgupload.value,
        };

        console.log(data);
        xhr.send($.param(data));

        xhr.onreadystatechange = function () {
            try{
                console.log("状态改变，当前状态码: "+xhr.readyState);
                switch(xhr.readyState){
                    case 1:
                        console.log("已调用open()方法.");
                        break;
                    case 2:
                        console.log("send()方法已经被调用, 响应头和响应状态已经返回.");
                        break;
                    case 3:
                        console.log("正在下载响应体.");
                        break;
                    case 4:
                        console.log("传输已结束. 状态码: ", xhr.status);
                        if (xhr.status === 200) {
                            console.log("请求成功，XMLHttpRequest.status: 200");
                            console.log(xhr.responseText);
                            //将返回数据转为JSON对象
                            try{
                                var response = JSON.parse(xhr.responseText);
                                processResponse(response);
                            }
                            catch{
                                console.log("接收的数据无法转为JSON对象.");
                            }
                        }
                        break;
                    default: break;
                }                
            }
            catch(e){
                alert('Caught Exception: ' + e.description);
            }
        };
    })


    //处理收到的数据
    function processResponse(response){
        switch(response.error_code){
            case 0:
                console.log("菜品添加成功！");
                //跳转到系统后台页面，思路：带用户ID跳转以验证用户身份
                window.location = "index.html";
                break;
            case 1:
                console.log("参数不足！");
                break;
            case 2:
                console.log("该菜品已添加过了！");
                break;
            case 3:
                console.log("数据插入失败！");
                break;
            default:
                break;
        }
    }
})