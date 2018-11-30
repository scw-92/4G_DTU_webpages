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
    {'uart_flow_con': 'None', 'uart_number': 'ttyO1', 'uart_set_time': 1000, 'uart_data_send': '', 'uart_check_bit': 0, 'type': 'uart_on', 'uart_stop_bit': 1, 'uart_data_bit': 8, 'uart_baudrate': 115200, 'uart_how_to_send': 'man'}
    
    关闭串口：
    {'type': 'uart_off'}
    
    数据发送（hello）：
    {'type': 'uart_send', 'uart_data_send': 'hello', 'uart_set_time': 1000, 'uart_how_to_send': 'man'}
    
    数据接收（未使用）：
    {'type': 'uart_read'}
 ```
