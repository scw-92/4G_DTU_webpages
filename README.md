# 关于该项目

***H-ui.admin***是用*H-ui*前端框架开发的轻量级网站后台模版采用源生 html 语言，完全免费，简单灵活，兼容性好让您快速搭建中小型网站后台

# 关于作者

# 串口功能的使用
  ## web_serial.py的使用
 ```sh
    python web_serial.py 
 ```
  ## 移植Python-websocket-server
 ```sh
    buildroot补丁下载：http://note.youdao.com/noteshare?id=335af89ed486fb5a5ab7fa1a370aa671&sub=8DE7CB7BF5874D1F93784C726C18C986
    cp buildroot-pywebsocket-server.parth   buildroot-xxx/package
    cd buildroot-xxx/package   &&   patch -p1 < buildroot-pywebsocket-server.parth
 ```
## 前端串口发送的数据接口
 ```sh
    注意：本数据接口通过websocket协议发送
    打开串口：
    { 
        'uart_flow_con': 'None', 
        'uart_number': 'ttyO1', 
        'uart_set_time': 1000, 
        'uart_data_send': '', 
        'uart_check_bit': 0, 
        'type': 'uart_on', 
        'uart_stop_bit': 1, 
        'uart_data_bit': 8, 
        'uart_baudrate': 115200, 
        'uart_how_to_send': 'man'
    }
    
    关闭串口：
    {
        'type': 'uart_off'
    }
    
    数据发送（hello）：
    {
        'type': 'uart_send', 
        'uart_data_send': 'hello', 
        'uart_set_time': 1000, 
        'uart_how_to_send': 'man'
    }
    
    数据接收（未使用）：
    {
        'type': 'uart_read'
    }
 ```
# 网页设置
## 前端发送给后台的数据接口
```sh
  注意：本数据接口通过websocket协议发送
  get按钮：
  {
      'net_name': 'eth0', 
      'type': 'net_get'
  }
  
  static_set按钮：
  {
      'net_name': 'eth0', 
      'net_dns': '119.29.29.29', 
      'net_ip': '192.168.4.191', 
      'net_mac': '00112233', 
      'net_gate': '192.168.4.1', 
      'type': 'net_static_set'
  }
  
  dhcpc按钮：
  {   
      'net_name': 'eth0',
      'type': 'net_dhcpc'
  }
```
## 前端接收的后台数据接口
```sh
  接收到的数据接口分为两种：
  1. 连接时的数据接口：包含"connected"的一个字符串
  
  2. 数据通信时的数据接口：
  {
    "type":"net",
    "net_name":"eth0",
    "net_ip":"192.168.4.191",
    "net_mac":"00112233",
    "net_gate":"192.168.4.1",
    "net_dns":"119.29.29.29"
  }
```

# 折线图图像设置
## 前端发送给后台的数据接口
```sh
  注意：本数据接口通过websocket协议发送
  webSocketData=
    {
        "type":"line_chart",
        "line_name":line_name,  line_name是一个包含折线图名字的一个数组
        "line_time":"real_time"  line_time = 'real_time' 表示实时数据；line_time = 'history' 表示历史数据（此功能暂未实现）
    };
    举列说明line_name的值：
      1. 所有折线图全选：
      line_name = [temperature,air_humidity,soil_moisture,light_intensity,CO2_concentration,pressure]
      2. 只选择温度折线图：
      line_name = [temperature]

```
## 前端接收的后台数据接口
```sh
  接收到的数据接口分为两种：
  1. 连接时的数据接口：包含"connected"的一个字符串
  
  2. 数据通信时的数据接口：
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
  2.1 实时数据：
        Python.server.send_message(client,
        '{
            "type":"line_chart",
            "data_type":"real_time",
            "data":{
                    折线图名称:[[y_value,x_date]]
                    }
         }')
         
        采用PC机时间：
        Python.server.send_message(client,
        '{
            "type":"line_chart",
            "data_type":"real_time",
            "data":{
                      "temperature":[[1]],
                     ......
            }
        }')
        
        采用开发板时间：
        Python.server.send_message(client,
        '{
            "type":"line_chart",
             "data_type":"real_time",
             "data":{
                      "temperature":[[1，"5:18:18"]],
                     ......
                      
                     }
        }')
  2.2 历史数据：
   采用开发板时间：
   Python.server.send_message(client,
        '{
            "type":"line_chart",
             "data_type":"history",
             "data":{
                      "temperature":[
                                      [1,"5:18:16"],
                                      [1,"5:18:18"],
                                      [1,"5:18:22"],
                                      [1,"5:18:24"],
                                      [1,"5:18:26"]
                                      ]
                     },
                     ......
         }')

  2.2 历史数据：
      
 
   3. 关于时间采用的问题，目前默认采用前端机器的时间，数据中的date只是预留的接口，其前端功能暂未实现
```

# 防火墙设置
## 白名单数据发送格式
```sh
  data_condig = 
  {
    'type': 'firewall', 
    'opt_type': 'whitelist', 
    'value': ['192.168.4.1', '9901'],
    'protocol': ['tcp', 'udp'], 
    'ip': ['out', 'in'], 
    'port': ['out', 'in']
  }
```

## 黑名单数据发送格式
```sh
  data_condig = 
  {
    'type': 'firewall', 
    'opt_type': 'blacklist', 
    'value': ['192.168.4.1', '9901'],
    'protocol': ['tcp', 'udp'], 
    'ip': ['out', 'in'], 
    'port': ['out', 'in']
  }
```

## 防火墙信息（get）数据发送格式
```sh
  data_condig = 
  {
    'opt_type': 'firewallmessage', 
    'type': 'firewall'
  }
```
