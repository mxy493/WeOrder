$(document).ready(function () {
    //非正常登录
    if (localStorage.online == "false" || localStorage.online == undefined) {
        window.parent.location.replace("index.html");
    }

    data_daily_income();
    data_daily_sales();

});

function data_daily_income() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('daily_income'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '日收入'
        },
        tooltip: {},
        legend: {
            data: ['收入'],
        },
        xAxis: {
            data: ["3.21", "3.22", "3.23", "3.24", "3.25", "3.26", "3.27"]
        },
        yAxis: {},
        series: [{
            name: '日收入',
            type: 'line',
            data: [100, 200, 360, 240, 150, 280, 220],
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function data_daily_sales() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('daily_sales'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '日销量'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ["白菜", "萝卜", "莲藕", "牛肉", "猪肉", "莴苣", "生菜"]
        },
        yAxis: {},
        series: [{
            name: '日销量',
            type: 'bar',
            data: [10, 20, 30, 24, 15, 28, 22],
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}