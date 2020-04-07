//订单状态切换
function statusChange(id){
    if(id.disabled == true){
        return;
    }
    var btns = document.getElementById('status-btn-group');
    var btngroup = btns.children;
    if(id === btngroup[2]){
        id.disabled = true;
    }
    var cur;
    for(var i = 0, l = btngroup.length; i < l; i++){
        if(btngroup[i].className.indexOf("btn-success") >= 0){
            cur = btngroup[i];
            break;
        }
    }
    var attribute;
    switch(cur){
        case btngroup[0]:
            if(id===btngroup[1]){
                attribute = btngroup[0].getAttribute("class");
                btngroup[0].setAttribute("class", attribute.replace("btn-success", "btn-default"));
                btngroup[0].disabled = true;
                
                attribute = id.getAttribute("class");
                id.setAttribute("class", attribute.replace("btn-default", "btn-success"));
            }
            break;
        case btngroup[1]:
            if(id===btngroup[2]){
                attribute = btngroup[1].getAttribute("class");
                btngroup[1].setAttribute("class", attribute.replace("btn-success", "btn-default"));
                btngroup[1].disabled = true;
                
                attribute = id.getAttribute("class");
                id.setAttribute("class", attribute.replace("btn-default", "btn-success"));
            }
            break;
        case btngroup[2]:
            break;
    }
}