var ip_addr = document.location.hostname; //客服端要访问的主机IP地址（列如：192.168.4.250）
window.WebSocket = window.WebSocket || window.MozWebSocket;
//var websocket = new WebSocket('ws://' + '192.168.4.250' +':9988',
//var websocket = new WebSocket('ws://' + ip_addr +':9001');
//                           'dumb-increment-protocol');




var websocket = new WebSocket('ws://' + ip_addr + ':9001');

function data_direc_show(obj) {
    //blacklist_protocol_tcp
    //whitelist_protocol_output
    var idtcp = obj.id.split("_")[0] + "_protocol_tcp";
    var idudp = obj.id.split("_")[0] + "_protocol_udp";
    var divshow = obj.id.split("_")[0] + "_protocol_div";
    if (document.getElementById(idtcp).checked || document.getElementById(idudp).checked) {
        $("#" + divshow).show();
    } else {
        $("#" + divshow).hide();
    }

}

function isValidIP(ip) //验证IP的合法性
{
    if (ip == "")
        return true;
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    return reg.test(ip);
}

function isValidPort(port) //验证端口的合法性
{
    if (port == "")
        return true;
    var reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
    return reg.test(port);
}

function firewall_select(obj) //复选框选择
{
    if (obj.checked) {
        $("#" + obj.id + "_form").show();
    } else {
        $("#" + obj.id + "_form").hide();
    }
}

function data_direc_select(obj) //暂时不使用
{

    ;
}

function firewall_config(opt_type) //黑白名单的配置数据
{
    // 发送数据接口：
    // {
    //         "opt_type" : "witelist",
    //         "type" : "firewall",
    //         "ip" : "",
    //         "ip_direction" : "input", // "output" , "all"
    //         "port" : 7777,
    //         "port_direction" : "input", // "output" , "all"
    //         "protocol" : "tcp", // "udp" "all"
    //         "protocol_direction" : "input" // "output" "all"
    // }
    var tmp_name = "";
    var firewall_array = {
        "ip_direction": ["_ip_output", "_ip_input"],
        "port_direction": ["_port_output", "_port_input"],
        "protocol": ["_protocol_tcp", "_protocol_udp"],
        "protocol_direction": ["_protocol_output", "_protocol_input"]
    };

    var data_config = {};
    data_config["type"] = "firewall";
    data_config["opt_type"] = opt_type;
    data_config["ip"] = "";
    data_config["port"] = "";
    data_config["protocol"] = "";
    data_config["ip_direction"] = "";
    data_config["port_direction"] = "";
    data_config["protocol_direction"] = "";



    data_config["ip"] = ($("#" + opt_type + "_ip").val());
    data_config["port"] = ($("#" + opt_type + "_port").val());

    if (isValidIP($("#" + opt_type + "_ip").val())) {;
    } else {
        alert("请输入正确的IP格式")
        return false;
    }

    if (isValidPort($("#" + opt_type + "_port").val())) {;
    } else {
        alert("请输入正确的port")
        return false;
    }

    if ($("#" + opt_type + "_ip").val() == "" && $("#" + opt_type + "_port").val() == "") {
        alert("please input ip or port ");
        return false;
    }

    for (key in firewall_array) {

        if (key == "protocol_direction") { //当没有操作协议的时候，则协议方向选项没有意义，赋值为空
            //whitelist_protocol_div
            var div_id = opt_type + "_" + key.split("_")[0] + "_div";
            var show_flags = document.getElementById(div_id).style.display;
            if (document.getElementById(div_id).style.display == "none")
                continue;
        }

        if (key == "ip_direction") { //当没有操作IP的时候，则IP方向选项没有意义，赋值为空
            if (data_config["ip"] == "") {
                continue;
            }
        }

        if (key == "port_direction") { //当没有操作port的时候，则port方向选项没有意义，赋值为空
            if (data_config["port"] == "") {
                continue;
            }
        }

        if (document.getElementById(opt_type + firewall_array[key][0]).checked && document.getElementById(opt_type + firewall_array[key][1]).checked) {
            data_config[key] = "all";
            //alert(2);
        } else if (document.getElementById(opt_type + firewall_array[key][0]).checked) {
            data_config[key] = firewall_array[key][0].split("_")[2]
            //alert(1);
        } else if (document.getElementById(opt_type + firewall_array[key][1]).checked) {
            data_config[key] = firewall_array[key][1].split("_")[2]
        } else {
            data_config[key] = "";
        }
    }
    console.log(data_config);
    return data_config;
}


function firewallmsg_config(opt_type) //暂未使用
{;
}

function firewall_button_clean(obj) {
    $("#firewallmessage-div").text("");
}

function firewall_button(obj) {
    var button_name = obj.id.split("_")[0];
    var send_data = "";

    if (button_name == "whitelist" || button_name == "blacklist") {

        send_data = firewall_config(button_name);
    } else if (button_name == "firewallmessage") {
        send_data = {
            "type": "firewall",
            "opt_type": "firewallmessage"
        };
    } else {
        return;
    }

    //console.log(send_data);
    if (!send_data) {
        return;
    }
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


    if (message.data.match("connected")) {
        alert(message.data);
    } else {

        //alert(message.data);
        //var net_data = JSON.parse(message.data);
        //alert(net_data);
        $("#firewallmessage-div").append(message.data); //将接收到的数据添加到接收区中
    }
    //root = eval("(" + message.data + ")");

}