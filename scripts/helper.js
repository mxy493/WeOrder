//每一步操作之前判断是否超时
function isTimeOut(){
    let time_spent = new Date().getTime();
    time_spent -= localStorage.time;
    //超过1分钟
    if(time_spent > 60000){
        //超时则跳转到登陆页面
        window.location.replace("index.html");
        return true;
    }
    else {
        //未超时则更新最后一次操作的时间为当前时间
        localStorage.time = new Date().getTime();
        return false;
    }
}

//获取哈希值
String.prototype.hashCode = function(){
    if (Array.prototype.reduce){
        return this.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
    } 
    var hash = 0;
    if (this.length === 0) return hash;
    for (var i = 0; i < this.length; i++) {
        var character  = this.charCodeAt(i);
        hash  = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
