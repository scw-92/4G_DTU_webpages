// 温度，空气湿度，土壤湿度，光照强度，CO2浓度，压强
var ip_addr = document.location.hostname; //客服端要访问的主机IP地址（列如：192.168.4.250）
window.WebSocket = window.WebSocket || window.MozWebSocket;
//var websocket = new WebSocket('ws://' + '192.168.4.250' +':9988',
//var websocket = new WebSocket('ws://' + ip_addr +':9988',
var websocket = new WebSocket('ws://' + '192.168.4.101' + ':9001');




var line_timer = ""; //此页面的复选框定时器的引用
var echarts_option = {

    temperature: {
        title: {
            text: '温度采集',
        },
        tooltip: {
            trigger: 'axis',
            title: "temperature",
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {
            data: ['温度采集']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                },
                mark: {
                    show: true
                },
                dataView: {
                    readOnly: true,
                    optionToContent: function(opt) {

                        var axisData = opt.xAxis[0].data;
                        var seriesdata = opt.series[0].data;
                        var table = '<table style="width:100%;text-align:center"><tbody><tr>' + '<td>时间</td>' + '<td>温度</td>' + '</tr>';
                        for (var i = 0,
                        l = axisData.length; i < l; i++) {
                            table += '<tr>' + '<td>' + axisData[i] + '</td>' + '<td>' + seriesdata[i] + '</td>' + '</tr>';
                        }
                        //console.log(opt.toolbox[0]);
                        table += '</tbody></table>';
                        return table;
                    }
                },
                myhistoryData: { //自定义的功能需要以my开头，否则不显示
                    show: true,
                    title: '历史数据',
                    //icon : '../image/24428451.png',
                    icon: " M11.5,2v56H51V14.8L38.4,2.2v12.7H51 M45.4,41.28",
                    onclick: function(obj) {
                            history_data(obj);
                    }
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [{
            type: 'category',
            name: '采样时间',
            boundaryGap: true,

            data: []

        }],
        yAxis: [{
            type: 'value',
            //scale: true,
            name: '温度',
            //max: 30,
            //min: 0,
            boundaryGap: [0.2, 0.2],
            axisLabel: {
                formatter: '{value} °C'
            }
        }],
        series: [{
            name: '温度采集',
            type: 'line',
            data: [],
            markPoint: {
                tooltip: {
                    trigger: 'item',
                    formatter: function(value) {
                        console.log(value);
                        return '温度采集' + '<br/>' + value.data.name + ': ' + value.data.value + ' °C'
                    }
                },
                data: [{
                    type: 'max',
                    name: '最大值'
                },
                {
                    type: 'min',
                    name: '最小值'
                }]
            },
            markLine: {
                tooltip: {
                    trigger: 'item',
                    formatter: function(value) {
                        return '温度采集' + '<br/>' + value.data.name + ': ' + value.data.value + ' °C'
                    }
                },
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
            }
        }]
    },

    air_humidity: {
        title: {
            text: '空气湿度',
        },
        tooltip: {
            trigger: 'axis',
            title: "air_humidity",
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {
            data: ['空气湿度']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                },
                mark: {
                    show: true
                },
                dataView: {
                    readOnly: true,
                    optionToContent: function(opt) {

                        var axisData = opt.xAxis[0].data;
                        var seriesdata = opt.series[0].data;
                        var table = '<table style="width:100%;text-align:center"><tbody><tr>' + '<td>时间</td>' + '<td>空气湿度</td>' + '</tr>';
                        for (var i = 0,
                        l = axisData.length; i < l; i++) {
                            table += '<tr>' + '<td>' + axisData[i] + '</td>' + '<td>' + seriesdata[i] + '</td>' + '</tr>';
                        }
                        //console.log(opt.toolbox[0]);
                        table += '</tbody></table>';
                        return table;
                    }
                },
                myhistoryData: { //自定义的功能需要以my开头，否则不显示
                    show: true,
                    title: '历史数据',
                    //icon : '../image/24428451.png',
                    icon: " M11.5,2v56H51V14.8L38.4,2.2v12.7H51 M45.4,41.28",
                    onclick: function(obj) {
                            history_data(obj);
                    }
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [{
            type: 'category',
            name: '采样时间',
            boundaryGap: true,

            data: []

        }],
        yAxis: [{
            type: 'value',
            //scale: true,
            name: '空气湿度',
            max: 100,
            min: 0,
            boundaryGap: [0.2, 0.2],
            axisLabel: {
                formatter: '{value} %'
            }
        }],
        series: [{
            name: '空气湿度',
            type: 'line',
            data: [],
            markPoint: {
                tooltip: {
                    trigger: 'item',
                    formatter: function(value) {
                        console.log(value);
                        return '空气湿度' + '<br/>' + value.data.name + ': ' + value.data.value + ' %'
                    }
                },
                data: [{
                    type: 'max',
                    name: '最大值'
                },
                {
                    type: 'min',
                    name: '最小值'
                }]
            },
            markLine: {
                tooltip: {
                    trigger: 'item',
                    formatter: function(value) {
                        return '空气湿度' + '<br/>' + value.data.name + ': ' + value.data.value + ' %'
                    }
                },
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
            }
        }]
    },

    soil_moisture: {
       title: {
            text: '土壤湿度',
        },
        tooltip: {
            trigger: 'axis',
            title: "soil_moisture",
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {
            data: ['土壤湿度']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                },
                mark: {
                    show: true
                },
                dataView: {
                    readOnly: true,
                    optionToContent: function(opt) {

                        var axisData = opt.xAxis[0].data;
                        var seriesdata = opt.series[0].data;
                        var table = '<table style="width:100%;text-align:center"><tbody><tr>' + '<td>时间</td>' + '<td>土壤湿度</td>' + '</tr>';
                        for (var i = 0,
                        l = axisData.length; i < l; i++) {
                            table += '<tr>' + '<td>' + axisData[i] + '</td>' + '<td>' + seriesdata[i] + '</td>' + '</tr>';
                        }
                        //console.log(opt.toolbox[0]);
                        table += '</tbody></table>';
                        return table;
                    }
                },
                myhistoryData: { //自定义的功能需要以my开头，否则不显示
                    show: true,
                    title: '历史数据',
                    //icon : '../image/24428451.png',
                    icon: " M11.5,2v56H51V14.8L38.4,2.2v12.7H51 M45.4,41.28",
                    onclick: function(obj) {
                            history_data(obj);
                    }
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [{
            type: 'category',
            name: '采样时间',
            boundaryGap: true,

            data: []

        }],
        yAxis: [{
            type: 'value',
            //scale: true,
            name: '土壤湿度',
            max: 100,
            min: 0,
            boundaryGap: [0.2, 0.2],
            axisLabel: {
                formatter: '{value} %'
            }
        }],
        series: [{
            name: '土壤湿度',
            type: 'line',
            data: [],
            markPoint: {
                tooltip: {
                    trigger: 'item',
                    formatter: function(value) {
                        console.log(value);
                        return '土壤湿度' + '<br/>' + value.data.name + ': ' + value.data.value + ' %'
                    }
                },
                data: [{
                    type: 'max',
                    name: '最大值'
                },
                {
                    type: 'min',
                    name: '最小值'
                }]
            },
            markLine: {
                tooltip: {
                    trigger: 'item',
                    formatter: function(value) {
                        return '土壤湿度' + '<br/>' + value.data.name + ': ' + value.data.value + ' %'
                    }
                },
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
            }
        }]
    },

    light_intensity: {
       title: {
            text: '光照强度',
        },
        tooltip: {
            trigger: 'axis',
            title: "light_intensity",
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {
            data: ['光照强度']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                },
                mark: {
                    show: true
                },
                dataView: {
                    readOnly: true,
                    optionToContent: function(opt) {

                        var axisData = opt.xAxis[0].data;
                        var seriesdata = opt.series[0].data;
                        var table = '<table style="width:100%;text-align:center"><tbody><tr>' + '<td>时间</td>' + '<td>光照强度</td>' + '</tr>';
                        for (var i = 0,
                        l = axisData.length; i < l; i++) {
                            table += '<tr>' + '<td>' + axisData[i] + '</td>' + '<td>' + seriesdata[i] + '</td>' + '</tr>';
                        }
                        //console.log(opt.toolbox[0]);
                        table += '</tbody></table>';
                        return table;
                    }
                },
                myhistoryData: { //自定义的功能需要以my开头，否则不显示
                    show: true,
                    title: '历史数据',
                    //icon : '../image/24428451.png',
                    icon: " M11.5,2v56H51V14.8L38.4,2.2v12.7H51 M45.4,41.28",
                    onclick: function(obj) {
                            history_data(obj);
                    }
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [{
            type: 'category',
            name: '采样时间',
            boundaryGap: true,

            data: []

        }],
        yAxis: [{
            type: 'value',
            //scale: true,
            name: '光照强度',
            //max: 30,
            //min: 0,
            boundaryGap: [0.2, 0.2],
            axisLabel: {
                formatter: '{value} CD'
            }
        }],
        series: [{
            name: '光照强度',
            type: 'line',
            data: [],
            markPoint: {
                tooltip: {
                    trigger: 'item',
                    formatter: function(value) {
                        console.log(value);
                        return '光照强度' + '<br/>' + value.data.name + ': ' + value.data.value + ' CD²'
                    }
                },
                data: [{
                    type: 'max',
                    name: '最大值'
                },
                {
                    type: 'min',
                    name: '最小值'
                }]
            },
            markLine: {
                tooltip: {
                    trigger: 'item',
                    formatter: function(value) {
                        return '光照强度' + '<br/>' + value.data.name + ': ' + value.data.value + ' CD'
                    }
                },
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
            }
        }]
    },

    CO2_concentration: {
       title: {
            text: 'CO2浓度',
        },
        tooltip: {
            trigger: 'axis',
            title: "CO2_concentration",
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {
            data: ['CO2浓度']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                },
                mark: {
                    show: true
                },
                dataView: {
                    readOnly: true,
                    optionToContent: function(opt) {

                        var axisData = opt.xAxis[0].data;
                        var seriesdata = opt.series[0].data;
                        var table = '<table style="width:100%;text-align:center"><tbody><tr>' + '<td>时间</td>' + '<td>CO2浓度</td>' + '</tr>';
                        for (var i = 0,
                        l = axisData.length; i < l; i++) {
                            table += '<tr>' + '<td>' + axisData[i] + '</td>' + '<td>' + seriesdata[i] + '</td>' + '</tr>';
                        }
                        //console.log(opt.toolbox[0]);
                        table += '</tbody></table>';
                        return table;
                    }
                },
                myhistoryData: { //自定义的功能需要以my开头，否则不显示
                    show: true,
                    title: '历史数据',
                    //icon : '../image/24428451.png',
                    icon: " M11.5,2v56H51V14.8L38.4,2.2v12.7H51 M45.4,41.28",
                    onclick: function(obj) {
                            history_data(obj);
                    }
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [{
            type: 'category',
            name: '采样时间',
            boundaryGap: true,

            data: []

        }],
        yAxis: [{
            type: 'value',
            //scale: true,
            name: 'CO2浓度',
            //max: 30,
            //min: 0,
            boundaryGap: [0.2, 0.2],
            axisLabel: {
                formatter: '{value} ppm'
            }
        }],
        series: [{
            name: 'CO2浓度',
            type: 'line',
            data: [],
            markPoint: {
                tooltip: {
                    trigger: 'item',
                    formatter: function(value) {
                        console.log(value);
                        return 'CO2浓度' + '<br/>' + value.data.name + ': ' + value.data.value + ' ppm'
                    }
                },
                data: [{
                    type: 'max',
                    name: '最大值'
                },
                {
                    type: 'min',
                    name: '最小值'
                }]
            },
            markLine: {
                tooltip: {
                    trigger: 'item',
                    formatter: function(value) {
                        return 'CO2浓度' + '<br/>' + value.data.name + ': ' + value.data.value + ' ppm'
                    }
                },
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
            }
        }]
    },

    pressure: {
       title: {
            text: '压强',
        },
        tooltip: {
            trigger: 'axis',
            title: "pressure",
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {
            data: ['压强']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                },
                mark: {
                    show: true
                },
                dataView: {
                    readOnly: true,
                    optionToContent: function(opt) {

                        var axisData = opt.xAxis[0].data;
                        var seriesdata = opt.series[0].data;
                        var table = '<table style="width:100%;text-align:center"><tbody><tr>' + '<td>时间</td>' + '<td>压强</td>' + '</tr>';
                        for (var i = 0,
                        l = axisData.length; i < l; i++) {
                            table += '<tr>' + '<td>' + axisData[i] + '</td>' + '<td>' + seriesdata[i] + '</td>' + '</tr>';
                        }
                        //console.log(opt.toolbox[0]);
                        table += '</tbody></table>';
                        return table;
                    }
                },
                myhistoryData: { //自定义的功能需要以my开头，否则不显示
                    show: true,
                    title: '历史数据',
                    //icon : '../image/24428451.png',
                    icon: " M11.5,2v56H51V14.8L38.4,2.2v12.7H51 M45.4,41.28",
                    onclick: function(obj) {
                            history_data(obj);
                    }
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [{
            type: 'category',
            name: '采样时间',
            boundaryGap: true,

            data: []

        }],
        yAxis: [{
            type: 'value',
            //scale: true,
            name: '压强',
            //max: 30,
            //min: 0,
            boundaryGap: [0.2, 0.2],
            axisLabel: {
                formatter: '{value} Pa'
            }
        }],
        series: [{
            name: '压强',
            type: 'line',
            data: [],
            markPoint: {
                tooltip: {
                    trigger: 'item',
                    formatter: function(value) {
                        console.log(value);
                        return '压强' + '<br/>' + value.data.name + ': ' + value.data.value + ' Pa'
                    }
                },
                data: [{
                    type: 'max',
                    name: '最大值'
                },
                {
                    type: 'min',
                    name: '最小值'
                }]
            },
            markLine: {
                tooltip: {
                    trigger: 'item',
                    formatter: function(value) {
                        return '压强' + '<br/>' + value.data.name + ': ' + value.data.value + ' Pa'
                    }
                },
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
            }
        }]
    }
};
// 折线图的html元素div的ID = line_names[x]
// y 轴数据 series["data"][1]
// x 轴数据 series["data"][0] 注意：x轴数据是个时间类型（DATA）
var line_configs = {
    line_names: [ // 折线图对应的div的id名字
    "temperature", //这些名字既是div的id，也是echarts_option的key值。
    "air_humidity", "soil_moisture", "light_intensity", "CO2_concentration", "pressure"],
    line_style: "sub_line_div",
    //折线图对应的div的样式
    line_parent_div: "line_parent_div",
    //折线图对应的div的父容器的id
    my_echarts_obj: [],
    //echarts对象数组，每一个折线图对应一个echarts对象
    my_echarts_value: echarts_option,
    //折线图对应的图表数据
    line_disable: [] //折线图是否显示（使用）的标志，给定时器请求数据所用
};