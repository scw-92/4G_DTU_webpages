# -*- coding: utf-8 -*-
from websocket_server import WebsocketServer
import json
import serial
import os
from time import sleep
import threading

class WebSerial(object):
    """this is websocket-serial"""

    _instance_lock = threading.Lock()
    def __init__(self,port,ipaddr):
        self.ipport     = port
        self.ipaddr   = ipaddr
        self.web_server = ""  #websocket服务器对象
        self.web_serial = ""   #串口对象
        self.web_serial_isopen = False
        self.port = "ttyO1"
        self.baudrate = 115200
        self.bytesize = 8
        self.parity = serial.PARITY_NONE
        self.stopbits =1 
        self.timeout = 1
        self.xonxoff = False   #软件流控
        self.rtscts = False    #硬件流控
        self.uart_auto_send = False #串口自动发送标志
        self.uart_set_send_time = 0  #发送时间间隔
        self.uart_recv_thread = ""
        self.uart_mutex = threading.Lock()
        self.uart_auto_send_thread = ""
        self.uart_send_is_auto = False
        self.uart_data = ""   #串口发送的数据
    #串口线程处理函数
    
    def __new__(cls, *args, **kwargs):
        if not hasattr(WebSerial, "_instance"):
            with WebSerial._instance_lock:
                if not hasattr(WebSerial, "_instance"):
                    WebSerial._instance = object.__new__(cls)  
        return WebSerial._instance
    
    def serial_read_thread(self,client):
        while True:
            #print("---pthread----")
            if self.web_serial_isopen :
                try:
                    data=self.web_serial.read(1)
                    if data:
                        n = self.web_serial.inWaiting()
                        if n:
                            data = data + self.web_serial.read(n)
                    self.web_server.send_message(client,data.decode("utf-8"))
                    #print(data.decode("utf-8"))
                    data = ''
                except:
                    break
            else:
                break
            
    
    
    def serial_auto_send_thread(self):
        while True:
            if self.web_serial_isopen :
                if self.uart_send_is_auto:
                    try:
                        sleep(self.uart_set_send_time / 1000)
                        self.web_serial.write(self.uart_data.encode("utf-8"))
                    except:
                        break
                else:
                    self.uart_send_is_auto = True
                    break
            else:
                break
    
    #下面是串口相关函数
    def serial_set(self,client,message):
        serial_data_set = json.loads(message)
        #print(serial_data_set)
        #打开串口
        if serial_data_set["type"] == "uart_on":
            if self.web_serial_isopen :
                self.web_server.send_message(client,self.port+" opened!!!\n")
            else :
                try:
                    self.web_serial = serial.Serial("/dev/"+serial_data_set["uart_number"], serial_data_set["uart_baudrate"],timeout=self.timeout)
                except:
                    self.web_server.send_message(client,serial_data_set["uart_number"]+" open failed")
                    return
                print(serial_data_set["uart_number"])
                if self.web_serial.isOpen() :
                    print("open success")
                    self.web_serial_isopen = True
                    self.uart_recv_thread = threading.Thread(target=self.serial_read_thread,args=(client,))
                    
                    #sleep(0.001)
                    self.uart_recv_thread.start()
                   
                    self.web_server.send_message(client,serial_data_set["uart_number"]+" open success")
                else :
                    print("open failed")
                    self.uart_send_is_auto = False
                    self.web_serial_isopen = False
                    self.web_server.send_message(client,serial_data_set["uart_number"]+" open failed")
        #关闭串口
        elif serial_data_set["type"] == "uart_off":
            #print("uart_off")
            if self.web_serial_isopen :
                self.uart_send_is_auto = False
                self.web_serial_isopen = False
                sleep(0.01)
                self.web_serial.close()
            self.web_server.send_message(client,self.port+" cosled!!!\n")
        #串口发送数据
        elif serial_data_set["type"] == "uart_send":
            if self.web_serial_isopen :
                if serial_data_set["uart_how_to_send"] == "man":
                    self.uart_send_is_auto = False
                    sleep(0.001)
                    self.web_serial.write(serial_data_set["uart_data_send"].encode("utf-8"))
                else:
                    
                    self.uart_set_send_time = serial_data_set["uart_set_time"]
                    self.uart_data = serial_data_set["uart_data_send"]
                    if self.uart_send_is_auto:
                        pass
                    else:
                        self.uart_send_is_auto = True
                        self.uart_auto_send_thread = threading.Thread(target=self.serial_auto_send_thread)
                        self.uart_auto_send_thread.start()
            else:
                self.web_server.send_message(client,self.port+" cosled!!!\n")
        else:
            if self.web_serial_isopen :
                pass
            else:
                self.web_server.send_message(client,self.port+" cosled!!!\n")

    # 下面是websocket相关函数
    def new_client(self,client, server):
        print("New client connected and was given id %d" % client['id'])
        server.send_message(client,"connected!!!\n")
        
    def client_left(self,client, server):
        print("Client(%d) disconnected" % client['id'])
        if self.web_serial_isopen :
            self.uart_send_is_auto = False
            self.web_serial_isopen = False
            sleep(0.001)
            self.web_serial.close()
        self.web_server.send_message(client,self.port+" cosled!!!\n")
        
    def message_received(self,client, server, message):
        self.serial_set(client,message)
        
    def websocket_server(self):
        self.web_server = WebsocketServer(self.ipport,self.ipaddr)
        self.web_server.set_fn_new_client(self.new_client)
        self.web_server.set_fn_client_left(self.client_left)
        self.web_server.set_fn_message_received(self.message_received)
        self.web_server.run_forever()

        
PORT=9001
IPADDR="0.0.0.0"
if __name__ == '__main__':
    myWebSerial = WebSerial(PORT,IPADDR)
    myWebSerial.websocket_server()
    
    