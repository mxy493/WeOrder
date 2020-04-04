//导航页面切换
function pageSwitch(id){
    id.setAttribute("class", "active");
    var group = id.parentNode.children;
    for(var i =0,pl= group.length;i<pl;i++) {
        if(group[i] !== id) group[i].removeAttribute('class');
    }
}