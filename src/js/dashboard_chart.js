var ip_addr = document.location.hostname; //客服端要访问的主机IP地址（列如：192.168.4.250）
window.WebSocket = window.WebSocket || window.MozWebSocket;
//var websocket = new WebSocket('ws://' + '192.168.4.250' +':9988',
//var websocket = new WebSocket('ws://' + ip_addr +':9988',
var websocket = new WebSocket('ws://' + ip_addr + ':9001');
var dashboard_names = [ // 折线图对应的div的id名字
    "temperature", //这些名字既是div的id，也是echarts_option的key值。
    "air_humidity",
    "soil_moisture",
    "light_intensity",
    "CO2_concentration",
    "pressure",
    "rainfall"
];
var line_timer;
var dashboard_select_flase = [false, false, false, false, false, false, false];
var JustGage_objs = [];
document.addEventListener("DOMContentLoaded", function(event) {

    JustGage_objs[0] = new JustGage({
        id: "temperature",
        value: 0,
        min: 0,
        max: 100,
        title: "温度(℃)",
        label: "",
        gaugeWidthScale: 0.8,
        // symbol: '℃',
        formatNumber: true,
        humanFriendly: true,
        startAnimationTime: 1000,
        refreshAnimationTime: 1000
    });



    JustGage_objs[1] = new JustGage({
        id: "air_humidity",
        value: 0.0,
        min: 0,
        max: 100,
        title: "空气湿度(%)",
        label: "",
        gaugeWidthScale: 0.8,
        // symbol: '%',
        formatNumber: true,
        humanFriendly: true,
        startAnimationTime: 1000,
        refreshAnimationTime: 1000
    });

    JustGage_objs[2] = new JustGage({
        id: "soil_moisture",
        value: 0,
        min: 0.0,
        max: 100,
        title: "土壤湿度(%RH)",
        label: "",
        gaugeWidthScale: 0.8,
        // symbol: '%',
        formatNumber: true,
        humanFriendly: true,
        startAnimationTime: 1000,
        refreshAnimationTime: 1000
    });

    JustGage_objs[3] = new JustGage({
        id: "light_intensity",
        value: 0,
        min: 0,
        max: 200000,
        title: "光照强度(Lux)",
        label: "",
        gaugeWidthScale: 0.8,
        // symbol: 'Lux',
        formatNumber: true,
        // humanFriendly: true,
        startAnimationTime: 1000,
        refreshAnimationTime: 1000
    });


    JustGage_objs[4] = new JustGage({
        id: "CO2_concentration",
        value: 0,
        min: 0,
        max: 10000,
        title: "CO2浓度(ppm)",
        label: "",
        gaugeWidthScale: 0.8,
        // symbol: 'ppm',
        formatNumber: true,
        // humanFriendly: true,
        startAnimationTime: 1000,
        refreshAnimationTime: 1000
    });
    JustGage_objs[5] = new JustGage({
        id: "pressure",
        value: 0,
        title: "大气压力(Pa)",
        label: "",
        gaugeWidthScale: 0.8,
        //symbol: 'Pa',
        formatNumber: true,
        //humanFriendly: true,
        startAnimationTime: 1000,
        refreshAnimationTime: 1000
    });


    JustGage_objs[6] = new JustGage({
        id: "rainfall",
        value: 0,
        min: 0,
        max: 100,
        title: "降雨量(mm)",
        label: "",
        gaugeWidthScale: 0.8,
        // symbol: 'mm',
        formatNumber: true,
        // humanFriendly: true,
        startAnimationTime: 1000,
        refreshAnimationTime: 1000
    });

    // setInterval(function() {
    //     temperature.refresh(getRandomInt(0, 100));
    //     air_humidity.refresh(getRandomInt(0, 100));
    //     soil_moisture.refresh(getRandomInt(0, 100));
    //     light_intensity.refresh(getRandomInt(0, 100));
    //     CO2_concentration.refresh(getRandomInt(0, 100));
    //     pressure.refresh(getRandomInt(0, 100));
    //     rainfall.refresh(getRandomInt(0, 100));
    // }, 2500);

    // console.log(JustGage_objs);
});



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
                /* 收到的数据结构形式
                line_data = 
                    {
                        "type":"line_chart",
                        "data_type":"real_time",//history
                        "data":{
                                "temperature":[[value,date],[value1,date1]]
                                "air_humidity":[[value,date],[value1,date1]]
                        }
                    ...
                    }
            */


function dashboard_select(obj) //选择显示/不显示仪表盘
{
    var line_count = 0;
    var line_index = dashboard_names.indexOf(obj.id.split("-")[0]); //根据复选框的选择确定line_disable[]数组的下标
    if (obj.checked) {
        //每次选择前清空之前的数据
        dashboard_select_flase[line_index] = true; //根据line_disable[]数组的下标来给对应的变量赋值
        $("#" + obj.id.split("-")[0]).show(); //显示对应的div（折线图）
    } else {
        dashboard_select_flase[line_index] = false;
        $("#" + obj.id.split("-")[0]).hide();
    }

    clearInterval(line_timer);
    for (line_count = 0; line_count < dashboard_select_flase.length; line_count++) {
        if (dashboard_select_flase[line_count]) {
            var line_times = $("#" + "dashboard_time");
            line_timer = setInterval(line_timer_handle, line_times.val() * 1000);
            return;
        }

    }
    clearInterval(line_timer);
}



function line_timer_handle() {
    var line_count = 0;
    var line_real_count = 0;
    var line_name = [];
    // 获取被选中的折线图的名称，发送给目标板
    // line_name[line_count] = 'none',表示此项未选择。line_name[line_count] = 'temperature'，表示温度折线图被选中
    for (line_count = 0; line_count < dashboard_select_flase.length; line_count++) {
        if (dashboard_select_flase[line_count]) {
            line_name[line_real_count] = dashboard_names[line_count];
            line_real_count++;

        } else {
            //line_name[line_count] = "none";
            ;
        }
    }

    //console.log(echarts_option["temperature"]["toolbox"]);
    if (line_name.length == 0) {
        return;
    }
    //console.log(line_name.length);
    //console.log(line_name);
    var webSocketData = {
        "type": "line_chart",
        "line_name": line_name,
        "line_time": "real_time" //line_time = 'real_time' 表示实时数据，line_time = 'history' 表示历史数据
    };
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

    // console.log(message.data);

    if (message.data.match("connected")) alert(message.data);
    else {

        /* 收到的数据结构形式
                line_data = 
                    {
                        "type":"line_chart",
                        "data_type":"real_time",//history
                        "data":{
                                "temperature":[[value,date],[value1,date1]]
                                "air_humidity":[[value,date],[value1,date1]]
                        }
                    ...
                    }
            */
        var line_data = JSON.parse(message.data);

        if (line_data["type"] == "line_chart") {

            if (line_data["data_type"] == "real_time") {
                for (var key in line_data["data"]) {

                    var JustGage_obj_index = dashboard_names.indexOf(key);
                    JustGage_objs[JustGage_obj_index].refresh(line_data["data"][key][0][0]);
                    // temperature.refresh(line_data["data"][key][0][0]);
                    // line_data["data"][key][0][0];   //采集的数据

                    //var x_date = line_data["data"][key][0][1]; 日期
                }
            }
        }

    }
}