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
