//导航页面切换
function pageSwitch(id){
    localStorage.time = new Date().getTime();//更新最后一次操作的时间
    id.setAttribute("class", "active");
    var group = id.parentNode.children;
    for(var i =0,pl= group.length;i<pl;i++) {
        if(group[i] !== id) group[i].removeAttribute('class');
    }
    var frame = document.getElementById('main-frame');
    var idname = id.attributes["id"].value;
    switch(idname){
        case 'page-data':
            frame.setAttribute("src", "dataanalysis.html");
            break;
        case 'page-admin':
            frame.setAttribute("src", "administrator.html");
            break;
        case 'page-catg':
            frame.setAttribute("src", "dishcategory.html");
            break;
        case 'page-menu':
            frame.setAttribute("src", "menu.html");
            break;
        case 'page-order':
            frame.setAttribute("src", "orderlist.html");
            break;
        default:
            alert( 'An unknown value' );
    }
}