
var ip_addr = document.location.hostname; //客服端要访问的主机IP地址（列如：192.168.4.250）
window.WebSocket = window.WebSocket || window.MozWebSocket;
//var websocket = new WebSocket('ws://' + '192.168.4.250' +':9988',
//var websocket = new WebSocket('ws://' + ip_addr +':9001');
//                           'dumb-increment-protocol');

var websocket = new WebSocket('ws://' + ip_addr + ':9001');

function isValidIP(ip)   //验证IP的合法性
{   
    var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/   ;
    return reg.test(ip);  
}  

function isValidPort(port)   //验证端口的合法性
{   
    var reg =  /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/ ;
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
    var tmp_name = "";
    var firewall_array = ["_ip_out","_ip_in","_port_out","_port_in","_protocol_tcp","_protocol_udp"];
    var data_config = {};
    data_config["type"] = "firewall";
    data_config["opt_type"]= opt_type;
    data_config["ip"] =[];
    data_config["port"] =[];
    data_config["protocol"] =[];
    data_config["value"] = []; //data_config["value"] = ["ip","port"]数组的第一个元素是 ip地址，第二个元素是port值
    
   

    data_config["value"].push($("#"+opt_type+"_ip").val());
    data_config["value"].push($("#"+opt_type+"_port").val());
    if(isValidIP($("#"+opt_type+"_ip").val()))
    {
        if(isValidPort($("#"+opt_type+"_port").val()))
        {
            ;
        }else
        {
            alert("请输入正确的port")
            return false;
        }
    }else
    {
        alert("请输入正确的IP格式")
        return false;
    }

    for (var i =0 ; i < firewall_array.length ; i++) {
        if(document.getElementById(opt_type +firewall_array[i] ).checked)
        {

           // // whitelist_array[i].split("_")  == ["", "ip", "out"]
           // if (firewall_array[i].split("_")[1] == "ip")
           // {
           //      data_config["ip"].push(firewall_array[i].split("_")[2]) 
           // }else if (firewall_array[i].split("_")[1] == "port") 
           // {
           //      data_config["port"].push(firewall_array[i].split("_")[2])
           // }else if (firewall_array[i].split("_")[1] == "protocol") 
           // {
           //      data_config["protocol"].push(firewall_array[i].split("_")[2])
           // }
           tmp_name = firewall_array[i].split("_")[1];
           data_config[tmp_name].push(firewall_array[i].split("_")[2]);
        }
    }

        console.log(data_config);
        return data_config;
}


function firewallmsg_config(opt_type)//暂未使用
{
    ;
}
function firewall_button_clean(obj)
{
    $("#firewallmessage-div").text("");
}
function firewall_button(obj) 
{
    var button_name = obj.id.split("_")[0];
    var send_data = "";
    
    if(button_name == "whitelist" || button_name == "blacklist")
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
    if(!send_data)
    {
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
