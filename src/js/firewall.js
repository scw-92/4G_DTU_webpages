var firewall_write_config = {};
var firewall_black_config = {};
/*
    firewall_config = {
        "type":"firewall",
        "opt_type":"whitelist",  //whitelist 或者是 blacklist 或者是 firewallmessage
        "data_config":{
            "ip":["192.168.4.1",["out",in]],
            "port":["9908",["out",in]],
            "protocol":["tcp","udp"]
        }

    }
 */
var ip_addr = document.location.hostname; //客服端要访问的主机IP地址（列如：192.168.4.250）
window.WebSocket = window.WebSocket || window.MozWebSocket;
//var websocket = new WebSocket('ws://' + '192.168.4.250' +':9988',
//var websocket = new WebSocket('ws://' + ip_addr +':9001');
//                           'dumb-increment-protocol');

var websocket = new WebSocket('ws://' + '192.168.4.101' + ':9001');

function firewall_select(obj) //复选框选择
{
    if (obj.checked) {
        $("#" + obj.id + "_form").show();
    } else {
        $("#" + obj.id + "_form").hide();
    }
}

function data_direc_select(obj) //复选框选择
{
    // if (obj.checked) {
    //     $("#" + obj.id + "_form").show();
    // } else {
    //     $("#" + obj.id + "_form").hide();
    // }
    // console.log(obj.id);
    ;
}

function firewall_config(opt_type)
{
    var firewall_array = ["_ip_out","_ip_in","_port_out","_port_in","_protocol_tcp","_protocol_udp"];
    var data_config = {};
    data_config["type"] = "firewall";
    data_config["opt_type"]= opt_type;
    data_config["ip"] =[];
    data_config["port"] =[];
    data_config["protocol"] =[];

    for (var i =0 ; i < firewall_array.length ; i++) {
        if(document.getElementById(opt_type +firewall_array[i] ).checked)
        {

           // whitelist_array[i].split("_")  == ["", "ip", "out"]
           if (firewall_array[i].split("_")[1] == "ip")
           {
                data_config["ip"].push(firewall_array[i].split("_")[2]) 
           }else if (firewall_array[i].split("_")[1] == "port") 
           {
                data_config["port"].push(firewall_array[i].split("_")[2])
           }else if (firewall_array[i].split("_")[1] == "protocol") 
           {
                data_config["protocol"].push(firewall_array[i].split("_")[2])
           }
        }
    }

        //console.log(data_config);
        return data_config;
}


function firewallmsg_config(opt_type)
{
    ;
}

function firewall_button(obj) //使用dhcpc设置IP
{
    var button_name = obj.id.split("_")[0];
    var send_data = "";
    // var webSocketData = //将要发送给服务器的数据封装成一定的格式
    //     {
    //         "type": "net_dhcpc",
    //         "net_name": net_name
    //     };
    // //alert(JSON.stringify(webSocketData));
    // websocket.send(JSON.stringify(webSocketData));
    if(button_name == "whitelist")
    {
        
        send_data = firewall_config(button_name);
    }else if (button_name == "blacklist") 
    {
        send_data = firewall_config(button_name);
    }else if (button_name == "firewallmessage") {
        send_data = {
                        "type":"firewall",
                        "opt_type":"firewallmessage"
                    };
    }else{
        return;
    }
    
    //console.log(send_data);
    websocket.send(JSON.stringify(send_data));
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

    
    if (message.data.match("connected")) 
    {
        alert(message.data);
    }else{

        //alert(message.data);
        //var net_data = JSON.parse(message.data);
        //alert(net_data);
        $("#firewallmessage-div").append(message.data); //将接收到的数据添加到接收区中
    }
    //root = eval("(" + message.data + ")");
    
}
