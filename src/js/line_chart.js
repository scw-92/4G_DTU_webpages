
// 本功能架构介绍：
/*  
    1. 通过line_div_setup函数搭建折线图，并隐藏折线图
    2. 通过line_select函数选择折线图，并且启动定时器功能
    3. 通过定时器和websocket向目标机发送数据请求
    4. 处理从目标机获取的数据，并显示在相应的折线图上。
    5. 发送的数据结构：
                webSocketData=
    {
        "type":"line_chart",
        "line_name":line_name,  line_name是一个包含折线图名字的一个数组
        "line_time":"real_time"  line_time = 'real_time' 表示实时数据，line_time = 'history' 表示历史数据
    };
    6. 收到的数据结构形式：
                line_data = 
                    {
                        "temperature":[value,date],
                        "air_humidity":[value,date],
                    ...
                    }
*/

var ip_addr = document.location.hostname;//客服端要访问的主机IP地址（列如：192.168.4.250）
window.WebSocket = window.WebSocket || window.MozWebSocket;
//var websocket = new WebSocket('ws://' + '192.168.4.250' +':9988',
//var websocket = new WebSocket('ws://' + ip_addr +':9988',
 
var websocket = new WebSocket('ws://' + '192.168.4.100' +':9001');

var line_timer = ""; //此页面的定时器的引用
function line_div_setup()  //根据折线图的数据建立折线图
{
    var i = 0;
    var line_parent_div = $("#"+line_configs["line_parent_div"]);  //获取父类的div
    var line_sub_div = "";

    for(i=0;i< line_configs["line_names"].length;i++)
    {
        line_sub_div = $('<div id='+line_configs["line_names"][i]+' hidden'+' class='+line_configs["line_style"] + '></div>'); //拼接子div（折线图）的html语句
        line_parent_div.append(line_sub_div);
        line_configs["my_echarts_obj"][i] = echarts.init(document.getElementById(line_configs["line_names"][i]));  //创建echarts对象并且绑定显示所用到的div
        line_configs["my_echarts_obj"][i].setOption(echarts_option[line_configs["line_names"][i]]);                 //根据折线图数据来描绘折线图
        line_configs["line_disable"][i] = false;
        //alert(line_configs["line_disable"][i]);
    }
}


function line_select(obj) //选择显示/不显示折线图
{
        var line_count = 0;
        var line_index = line_configs["line_names"].indexOf(obj.id.split("-")[0]); //根据复选框的选择确定line_disable[]数组的下标
        
        if(obj.checked)
        {
            line_configs["line_disable"][line_index] = true; //根据line_disable[]数组的下标来给对应的变量赋值
            
            $("#"+obj.id.split("-")[0]).show(); //显示对应的div（折线图）
        }else
        {
            line_configs["line_disable"][line_index] = false;
            $("#"+obj.id.split("-")[0]).hide();
        }
        //alert(line_configs["line_disable"][line_index]);
        //alert(line_timer);
        clearInterval(line_timer);
        for(line_count=0;line_count < line_configs["line_disable"].length;line_count++)
        {
            if (line_configs["line_disable"][line_count])
            {
                line_timer = setInterval(line_timer_handle,3000);
                return;
            }
            
        }
        clearInterval(line_timer);
}


function  func2 () {
            var date = new Date(new Date(2014, 9, 1, 0, 0,78));
            data = date.getFullYear() + '-'
                   + (date.getMonth() + 1) + '-'
                   + date.getDate() + ' '
                   + date.getHours() + ':'
                   + date.getMinutes() + ':'
                   + date.getSeconds();
                   alert(data);
                   
}

function line_timer_handle()
{
    var line_count = 0;
    var line_name = [];
    // 获取被选中的折线图的名称，发送给目标板
    // line_name[line_count] = 'none',表示此项未选择。line_name[line_count] = 'temperature'，表示温度折线图被选中
    for(line_count=0;line_count < line_configs["line_disable"].length;line_count++)
    {
            if (line_configs["line_disable"][line_count])
            {
                line_name[line_count] = line_configs["line_names"][line_count];
                
            }else
            {
                line_name[line_count] = "none";
            }
    }
    
    var webSocketData=
    {
        "type":"line_chart",
        "line_name":line_name,
        "line_time":"real_time"  //line_time = 'real_time' 表示实时数据，line_time = 'history' 表示历史数据
    };
    websocket.send(JSON.stringify(webSocketData));
}


    websocket.onopen = function () {     //注册3个事件
        console.info("WebSocket connect success.");
    };
    websocket.onerror = function () {
        console.info("WebSocket error.");
        //alert("Please Check WebSocket Server Working Well.");
    };
    websocket.onmessage = function (message) {

        console.log(message.data);

       if( message.data.match("connected"))
            alert(message.data);
        else
        {
            
            /* 收到的数据结构形式
                line_data = 
                    {
                        "temperature":[value,date],
                        "air_humidity":[value,date],
                    ...
                    }
            */
            var line_data = JSON.parse(message.data);
            
            for(var key in line_data)
            {
                var data = line_data[key][1];
                var date = line_data[key][0];
                var index = line_configs["line_names"].indexOf(key);
                echarts_option[key]["series"][0]["data"].push([new Date(),date]);
                line_configs["my_echarts_obj"][index].setOption(echarts_option[line_configs["line_names"][index]]);
                //echarts_option["temperature"]["series"][0]["data"].push([new Date(),count++]);
                //line_configs["my_echarts_obj"][0].setOption(echarts_option[line_configs["line_names"][0]]);
                //console.log(echarts_option["temperature"]["series"][0]["data"]);
                console.log(line_data);
            }
            
            
        }
	} 

$(function(){

     line_div_setup();
     //line_timer = setInterval(line_timer_handle,1000);
     

});
