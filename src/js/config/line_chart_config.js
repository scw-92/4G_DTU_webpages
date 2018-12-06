// 温度，空气湿度，土壤湿度，光照强度，CO2浓度，压强



var echarts_option = {
    
    temperature:
    {
        title : {
            text : '温度采集',
        },
        tooltip : {
            trigger: 'item',
            formatter : function (params) {
                var date = new Date(params.value[0]);
                data = date.getFullYear() + '-'
                       + (date.getMonth() + 1) + '-'
                       + date.getDate() + ' '
                       + date.getHours() + ':'
                       + date.getMinutes() + ':'
                       + date.getSeconds();
                return data + '<br/>'
                       + params.value[1];
            }
        },
        toolbox: {
            show : true,
            feature : {
                dataZoom: { yAxisIndex: 'none'},
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
                
            }
        },
        dataZoom: {
            show: true,
            start : 0
        },
        legend : {
            data : ['温度采集']
        },
        grid: {
            y2: 80
        },
        xAxis : [
            {
                type : 'time',
                splitNumber:5
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                formatter: '{value} °C'
                }
            }
        ],
        series : [
            {
                name: '温度采集',
                type: 'line',
                showAllSymbol: true,
                symbolSize:8,
                data:[

                        ],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    
    },

    air_humidity:
    {
        title : {
            text : '空气湿度',
        },
        tooltip : {
            trigger: 'item',
            formatter : function (params) {
                var date = new Date(params.value[0]);
                data = date.getFullYear() + '-'
                       + (date.getMonth() + 1) + '-'
                       + date.getDate() + ' '
                       + date.getHours() + ':'
                       + date.getMinutes() + ':'
                       + date.getSeconds();
                return data + '<br/>'
                       + params.value[1];
            }
        },
        toolbox: {
            show : true,
            feature : {
                dataZoom: { yAxisIndex: 'none'},
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
                
            }
        },
        dataZoom: {
            show: true,
            start : 0
        },
        legend : {
            data : ['空气湿度']
        },
        grid: {
            y2: 80
        },
        xAxis : [
            {
                type : 'time',
                splitNumber:5
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                formatter: '{value} %'
                }
            }
        ],
        series : [
            {
                name: '空气湿度',
                type: 'line',
                showAllSymbol: true,
                symbolSize:8,
                data:[

                        ],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    
    },

    soil_moisture:
        {
        title : {
            text : '土壤湿度',
        },
        tooltip : {
            trigger: 'item',
            formatter : function (params) {
                var date = new Date(params.value[0]);
                data = date.getFullYear() + '-'
                       + (date.getMonth() + 1) + '-'
                       + date.getDate() + ' '
                       + date.getHours() + ':'
                       + date.getMinutes() + ':'
                       + date.getSeconds();
                return data + '<br/>'
                       + params.value[1];
            }
        },
        toolbox: {
            show : true,
            feature : {
                dataZoom: { yAxisIndex: 'none'},
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
                
            }
        },
        dataZoom: {
            show: true,
            start : 0
        },
        legend : {
            data : ['土壤湿度']
        },
        grid: {
            y2: 80
        },
        xAxis : [
            {
                type : 'time',
                splitNumber:5
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                formatter: '{value} %'
                }
            }
        ],
        series : [
            {
                name: '土壤湿度',
                type: 'line',
                showAllSymbol: true,
                symbolSize:8,
                data:[

                        ],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    
    },
    
        light_intensity:
        {
        title : {
            text : '光照强度',
        },
        tooltip : {
            trigger: 'item',
            formatter : function (params) {
                var date = new Date(params.value[0]);
                data = date.getFullYear() + '-'
                       + (date.getMonth() + 1) + '-'
                       + date.getDate() + ' '
                       + date.getHours() + ':'
                       + date.getMinutes() + ':'
                       + date.getSeconds();
                return data + '<br/>'
                       + params.value[1];
            }
        },
        toolbox: {
            show : true,
            feature : {
                dataZoom: { yAxisIndex: 'none'},
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
                
            }
        },
        dataZoom: {
            show: true,
            start : 0
        },
        legend : {
            data : ['光照强度']
        },
        grid: {
            y2: 80
        },
        xAxis : [
            {
                type : 'time',
                splitNumber:5
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                formatter: '{value} %'
                }
            }
        ],
        series : [
            {
                name: '光照强度',
                type: 'line',
                showAllSymbol: true,
                symbolSize:8,
                data:[

                        ],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    
    },
    
        CO2_concentration:
        {
        title : {
            text : 'CO2浓度',
        },
        tooltip : {
            trigger: 'item',
            formatter : function (params) {
                var date = new Date(params.value[0]);
                data = date.getFullYear() + '-'
                       + (date.getMonth() + 1) + '-'
                       + date.getDate() + ' '
                       + date.getHours() + ':'
                       + date.getMinutes() + ':'
                       + date.getSeconds();
                return data + '<br/>'
                       + params.value[1];
            }
        },
        toolbox: {
            show : true,
            feature : {
                dataZoom: { yAxisIndex: 'none'},
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
                
            }
        },
        dataZoom: {
            show: true,
            start : 0
        },
        legend : {
            data : ['CO2浓度']
        },
        grid: {
            y2: 80
        },
        xAxis : [
            {
                type : 'time',
                splitNumber:5
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                formatter: '{value} %'
                }
            }
        ],
        series : [
            {
                name: 'CO2浓度',
                type: 'line',
                showAllSymbol: true,
                symbolSize:8,
                data:[

                        ],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    
    },
    
        pressure:
        {
        title : {
            text : '大气压强',
        },
        tooltip : {
            trigger: 'item',
            formatter : function (params) {
                var date = new Date(params.value[0]);
                data = date.getFullYear() + '-'
                       + (date.getMonth() + 1) + '-'
                       + date.getDate() + ' '
                       + date.getHours() + ':'
                       + date.getMinutes() + ':'
                       + date.getSeconds();
                return data + '<br/>'
                       + params.value[1];
            }
        },
        toolbox: {
            show : true,
            feature : {
                dataZoom: { yAxisIndex: 'none'},
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
                
            }
        },
        dataZoom: {
            show: true,
            start : 0
        },
        legend : {
            data : ['大气压强']
        },
        grid: {
            y2: 80
        },
        xAxis : [
            {
                type : 'time',
                splitNumber:5
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                formatter: '{value} %'
                }
            }
        ],
        series : [
            {
                name: '大气压强',
                type: 'line',
                showAllSymbol: true,
                symbolSize:8,
                data:[

                        ],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    
    }
};
// 折线图的html元素div的ID = line_names[x]
// y 轴数据 series["data"][1]
// x 轴数据 series["data"][0] 注意：x轴数据是个时间类型（DATA）
var line_configs ={
        line_names:[                                // 折线图对应的div的id名字
                    "temperature",                  //这些名字既是div的id，也是echarts_option的key值。
                    "air_humidity",
                    "soil_moisture",
                    "light_intensity",
                    "CO2_concentration",
                    "pressure"
                    ],
        line_style:"sub_line_div",                //折线图对应的div的样式
        line_parent_div:"line_parent_div",        //折线图对应的div的父容器的id
        my_echarts_obj:[],                        //echarts对象数组，每一个折线图对应一个echarts对象
        my_echarts_value:echarts_option,          //折线图对应的图表数据
        line_disable:[]                           //折线图是否显示（使用）的标志，给定时器请求数据所用
};