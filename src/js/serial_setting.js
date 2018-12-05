	var ip_addr = document.location.hostname;//客服端要访问的主机IP地址（列如：192.168.4.250）
	window.WebSocket = window.WebSocket || window.MozWebSocket;
	//var websocket = new WebSocket('ws://' + '192.168.4.250' +':9988',
	//var websocket = new WebSocket('ws://' + ip_addr +':9988',
     //                           'dumb-increment-protocol');
    
    var websocket = new WebSocket('ws://' + '192.168.4.101' +':9001');
	
	
	function uart_send(obj)
	{
		uart_set();
		//alert(ip_addr);
		
		webSocketData = //将要发送给服务器的数据封装成一定的格式
				{
					"type":"uart_send",
					"uart_data_send":uart_data_send,
					"uart_how_to_send":uart_how_to_send,
					"uart_set_time":parseInt(uart_set_time)
				};
		websocket.send(JSON.stringify(webSocketData));
		
	}
	
	function uart_recv(obj)
	{
		webSocketData = //将要发送给服务器的数据封装成一定的格式
				{
					"type":"uart_read"
				};
		websocket.send(JSON.stringify(webSocketData));
		
	}
	
		function uart_on_or_off(obj)
		{
			uart_set();
			var selectedOption=obj.options[obj.selectedIndex];
			if(selectedOption.value=="ON")
			{
				alert("uart_on");
                /*
				if(obj.options[0].value=="None")
				{	
					obj.options[0].value="ON";
					obj.options[0].innerHTML="ON";
				}
				else if(obj.options[1].value=="None")
				{
					obj.options[1].value="ON";
					obj.options[1].innerHTML="ON";
				}
				else if(obj.options[2].value=="None")
				{	
					obj.options[2].value="ON";
					obj.options[2].innerHTML="ON";
				}
				selectedOption.value="None";
				selectedOption.innerHTML="None";
*/
				webSocketData = 
					{
						"type":"uart_on", 
						"uart_number":uart_number, 
						"uart_baudrate":parseInt(uart_baudrate), 
						"uart_stop_bit":parseInt(uart_stop_bit), 
						"uart_data_bit":parseInt(uart_data_bit),
						"uart_check_bit":parseInt(uart_check_bit),
						"uart_flow_con":uart_flow_con,
						"uart_how_to_send":uart_how_to_send,
						"uart_set_time":parseInt(uart_set_time),
						//"uart_data_recv":uart_data_recv,
						"uart_data_send":uart_data_send
					};
                //alert(webSocketData);
				websocket.send(JSON.stringify(webSocketData));

			}else if(selectedOption.value=="OFF")
			{
				alert("uart_off");
                /*
				if(obj.options[0].value=="None")
				{
					obj.options[0].value="OFF";
					obj.options[0].innerHTML="OFF";
				}
				else if(obj.options[1].value=="None")
				{
					obj.options[1].value="OFF";
					obj.options[1].innerHTML="OFF";
				}
				else if(obj.options[2].value=="None")
				{
					obj.options[2].value="OFF";
					obj.options[2].innerHTML="OFF";
				}
				selectedOption.value="None";
				selectedOption.innerHTML="None";
				*/
				webSocketData = //将要发送给服务器的数据封装成一定的格式
				{
					"type":"uart_off"
				};
				websocket.send(JSON.stringify(webSocketData));
			}
		}
		
		function uart_set()
		{
			
			uart_number = $("#UARTPorts option:selected").text();
			uart_baudrate = $("#UARTBaudRate option:selected").text(); 
			uart_stop_bit = $("#UARTStopBit option:selected").text(); 
			uart_data_bit = $("#UARTDataLen option:selected").text(); 
			uart_check_bit = $("#UARTCheckBit option:selected").val(); 
			uart_flow_con=$("#UARTFlow option:selected").val();
			uart_how_to_send =$("#UARTWaySend option:selected").val();
			uart_set_time=$("#uart_set_time").val();
	
			uart_data_recv = $("#uart_recv_date").text();
			uart_data_send= $("#uart_send_date").text();
			
			//alert(UARTPorts2);
			//console.log(uart_number);
			//console.log(uart_baudrate);
			//console.log(uart_stop_bit);
			//console.log(uart_data_bit);
			//console.log(uart_check_bit);
			//console.log(uart_flow_con);
			//console.log(uart_how_to_send);
			//console.log(uart_set_time);
			//console.log(uart_data_recv);
			//console.log(uart_data_send);
			//$("#uart_set_time").val('1500');
		//	$("#uart_recv_date").append("sjdfoisafijsoa");
			//$("#uart_send_date").append("sfhaslkfjskajf;ljdjsafj");
			var uart_on_or_off=$("#UARTOnOff option:selected").text();
			//alert("uart: "+uart_on_or_off);
		}
		
    websocket.onopen = function () {     //注册3个事件
        console.info("WebSocket connect success.");
    };
    websocket.onerror = function () {
        console.info("WebSocket error.");
        alert("Please Check WebSocket Server Working Well.");
    };
    websocket.onmessage = function (message) {

        console.log(message.data);

       // root = eval("(" + message.data + ")");
	   $("#uart_recv_date").append(message.data); //将接收到的数据添加到接收区中

	} 

// 创建一个Socket实例
//var socket = new WebSocket('ws://localhost:8080'); 

// 打开Socket 
//ocket.onopen = function(event) { 

  // 发送一个初始化消息
  //socket.send('I am the client and I\'m listening!'); 

  // 监听消息
  //socket.onmessage = function(event) { 
  //  console.log('Client received a message',event); 
  //}; 

  // 监听Socket的关闭
 // socket.onclose = function(event) { 
   // console.log('Client notified socket has closed',event); 
 // }; 

  // 关闭Socket.... 
  //socket.close() 
//};
