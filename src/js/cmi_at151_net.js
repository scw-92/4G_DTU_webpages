var old_wireless = "ra0"; //设置假设的默认值
var ip_addr = document.location.hostname; //客服端要访问的主机IP地址（列如：192.168.4.250）
window.WebSocket = window.WebSocket || window.MozWebSocket;
//var websocket = new WebSocket('ws://' + '192.168.4.250' +':9988',
//var websocket = new WebSocket('ws://' + ip_addr +':9988',
//                           'dumb-increment-protocol');

var websocket = new WebSocket('ws://' + '192.168.4.101' + ':9001');

function ethx_select(obj) //复选框选择
{
    if (obj.checked) {
        $("#" + obj.id + "_table").show();
    } else {
        $("#" + obj.id + "_table").hide();
    }
}

function wireless_select(obj) //单选框选择
{
    if (obj.checked) {
        $("#" + old_wireless + "_table").hide();
        old_wireless = obj.id;
        $("#" + obj.id + "_table").show();
    }
}

function net_get(obj) //获取网络信息
{
    var net_name = obj.id.split("_")[0];
    //alert(net_name);
    var webSocketData = //将要发送给服务器的数据封装成一定的格式
    {
        "type": "net_get",
        "net_name": net_name
    };
    //alert(JSON.stringify(webSocketData));
    websocket.send(JSON.stringify(webSocketData));
}

function static_set(obj) //设置静态IP
{
    var net_name = obj.id.split("_")[0];
    var net_ip = $("#" + net_name + "_ip").val();
    var net_mac = $("#" + net_name + "_mac").val();
    var net_gate = $("#" + net_name + "_gate").val();
    var net_dns = $("#" + net_name + "_dns").val();
    var net_route = $("#" + net_name + "_route").val();
    var net_mask = $("#" + net_name + "_mask").val();
    //alert(net_ip+":"+net_mac+":"+net_gate+":"+net_dns);
    var webSocketData = //将要发送给服务器的数据封装成一定的格式
    {
        "type": "net_static_set",
        "net_name": net_name,
        "net_ip": net_ip,
        "net_mac": net_mac,
        "net_gate": net_gate,
        "net_dns": net_dns,
        "net_route": net_route,
        "net_mask": net_mask
    };
    //alert(JSON.stringify(webSocketData));
    websocket.send(JSON.stringify(webSocketData));
}

function dhcpc_set(obj) //使用dhcpc设置IP
{
    var net_name = obj.id.split("_")[0];
    var webSocketData = //将要发送给服务器的数据封装成一定的格式
    {
        "type": "net_dhcpc",
        "net_name": net_name
    };
    //alert(JSON.stringify(webSocketData));
    websocket.send(JSON.stringify(webSocketData));
}

websocket.onopen = function() { //注册3个事件
    console.info("WebSocket connect success.");
};
websocket.onerror = function() {
    console.info("WebSocket error.");
    //alert("Please Check WebSocket Server Working Well.");
};
websocket.onmessage = function(message) {

    console.log(message.data);

    // {"net_name":net_name,
    //  "net_ip":net_ip,
    //  "net_mac":net_mac,
    //  "net_gate":net_gate,
    //  "net_dns":net_dns}
    if (message.data.match("connected")) alert(message.data);
    else {

        //alert(message.data);
        var net_data = JSON.parse(message.data);
        //alert(net_data);
        $("#" + net_data['net_name'] + "_ip").val(net_data['net_ip']);
        $("#" + net_data['net_name'] + "_mac").val(net_data['net_mac']);
        $("#" + net_data['net_name'] + "_gate").val(net_data['net_gate']);
        $("#" + net_data['net_name'] + "_dns").val(net_data['net_dns']);
        $("#" + net_data['net_name'] + "_route").val(net_data['net_route']);
        $("#" + net_data['net_name'] + "_mask").val(net_data['net_mask']);
    }
    //root = eval("(" + message.data + ")");
    //$("#uart_recv_date").append(message.data); //将接收到的数据添加到接收区中
}

// 创建一个Socket实例
//var socket = new WebSocket('ws://localhost:8080'); 
// 打开Socket 
//ocket.onopen = function(event) { 
// 发送一个初始化消息
//socket.send('I am the client and I\'m listening!'); 
// 监听消息
//socket.onmessage = function(event) { 
//  console.log('Client received a message',event); 
//}; 
// 监听Socket的关闭
// socket.onclose = function(event) { 
// console.log('Client notified socket has closed',event); 
// }; 
// 关闭Socket.... 
//socket.close() 
//};
