
        
function line_div_setup()
{
    var i = 0;
    var line_parent_div = $("#"+line_configs["line_parent_div"]);
    var line_sub_div = "";

    for(i=0;i< line_configs["line_names"].length;i++)
    {
        line_sub_div = $('<div id='+line_configs["line_names"][i]+' class='+line_configs["line_style"] + '></div>');
        line_parent_div.append(line_sub_div);
        line_configs["my_echarts_obj"][i] = echarts.init(document.getElementById(line_configs["line_names"][i]));
        line_configs["my_echarts_obj"][i].setOption(echarts_option[line_configs["line_names"][i]]);
    }
}


function myalert()
{
    //var len1 = echarts_option["temperature"]["xAxis"]["data"].length;
    //var len2 = echarts_option["temperature"]["series"]["data"].length;
    //alert(len1);
    echarts_option["temperature"]["xAxis"]["data"][echarts_option["temperature"]["xAxis"]["data"].length] = "周8";
    echarts_option["temperature"]["series"]["data"][echarts_option["temperature"]["series"]["data"].length] = "22";
    line_configs["my_echarts_obj"][0].setOption(echarts_option[line_configs["line_names"][0]]);
}
//alert("coming");
$(function(){

     line_div_setup();
     //var time2 = setInterval(myalert,2000);

});
