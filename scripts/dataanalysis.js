$(document).ready(function () {
    //非正常登录
    if (localStorage.online == "false" || localStorage.online == undefined) {
        window.parent.location.replace("index.html");
    }

    getData();
});

function getData() {
    //近7日销售额
    var url = "http://orderingmeal.applinzi.com/merchant/index.php/home/view/weeksale";
    var data = {};
    XHR(url, data);

    //今日各菜品销量
    url = "http://orderingmeal.applinzi.com/merchant/index.php/home/view/todaysale";
    data = {};
    XHR(url, data);
   
    //今日各时间段下单量
    url = "http://orderingmeal.applinzi.com/merchant/index.php/home/view/jieDuan";
    data = {};
    XHR(url, data);
}

//近7天收入折线图
function data_daily_income(response_data) { 
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('daily_income'));
    console.log(response_data);
    
    //数据格式化
    var date = [];
    var income = [];
    for (var x in response_data){
        // 格式为"2020-06-03"
        split_x = x.split("-");
        date.push(parseInt(split_x[1]).toString() + '.' + parseInt(split_x[2]).toString());
        income.push(response_data[x]);
    }

    // 指定图表的配置项和数据
    var option = {
        title: {
            show: true,
            text: '最近收入',
        },
        tooltip: {},
        legend: {
            data: ['收入'],
        },
        xAxis: {
            name: '日期',
            // data: ["3.21", "3.22", "3.23", "3.24", "3.25", "3.26", "3.27"]
            data: date.reverse()
        },
        yAxis: {
            name: '金额'
        },
        grid: {
            show: false
        },
        series: [{
            name: '日收入（元）',
            type: 'line',
            // data: [100, 200, 360, 240, 150, 280, 220],
            data: income.reverse(),
            symbol: 'emptyCircle',
            symbolSize: 8,
            lineStyle: {
                color: "#3fb1e3",
                width: 4
            },
            smooth: false  // 平滑
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

//今日销量饼状图
function data_daily_sales(response_data) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('daily_sales'));

    var sales = [];
    for(var i = 0; i < response_data.length; i++){
        var obj = {
            name: response_data[i].name,
            value: response_data[i].num
        };
        sales.push(obj);
    }

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '日销量'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        series: [{
            name: '日销量',
            type: 'pie',
            // data: [
            //     {name: "白菜", value: 2},
            //     {name: "萝卜", value: 20},
            //     {name: "莲藕", value: 30},
            //     {name: "牛肉", value: 24},
            //     {name: "猪肉", value: 15},
            // ],
            data: sales,
            minAngle: 30
        }],
        color:['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8']
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

//今日各时间段下单量走势图
function data_order_trend(response_data){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('order_trend'));
    
    //数据格式化
    var val = [];
    for (var i = 0; i < response_data.length; i++){
        var value = response_data[i].cost;
        // console.log(key + ":" + value);
        val.push(value);
    }
    // console.log(format_data);

    // 指定图表的配置项和数据
    var option = {
        title: {
            show: true,
            text: '今日销售情况',
            textAlign: 'auto'
        },
        tooltip: {},
        legend: {
            data: ['收入'],
        },
        xAxis: {
            name: '时间',
            data: [2,4,6,8,10,12,14,16,18,20,22,24]
        },
        yAxis: {
            name: '金额'
        },
        grid: {
            show: true
        },
        series: [{
            name: '日收入（元）',
            type: 'line',
            // data: [100, 200, 360, 240, 150, 280, 220],
            data: val,
            symbol: 'emptyCircle',
            symbolSize: 8,
            lineStyle: {
                color: "#3fb1e3",
                width: 4
            },
            smooth: true  // 平滑
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

//处理返回数据
function processResponse(response){
    //近7天收入的请求
    if(response.function == "weeksale" && response.request_behave == "select"){
        if(response.error_code == 0){
            data_daily_income(response.data);
        }
        else {
            alert("近7日收入数据获取失败！");
        }
    }

    //当天各菜品销量的请求
    if(response.function == "todaysale" && response.request_behave == "select"){
        if (response.error_code == 0){
            data_daily_sales(response.data);
        }
        else {
            alert("今日各菜品销量获取失败！");
        }
    }

    //今日各时间段下单量的请求
    if(response.function == "jieDuan" && response.request_behave == "select"){
        if (response.error_code == 0){
            data_order_trend(response.data);
        }
        else {
            alert("各时间段下单量请求失败！");
        }
    }
}