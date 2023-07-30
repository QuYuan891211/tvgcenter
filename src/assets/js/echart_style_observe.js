import {red_warning_color, orange_warning_color, yellow_warning_color, blue_warning_color, no_warning_color} from './color_config_data'
var markline_observe_wave = {
    
        symbol:"none",              //去掉警戒线最后面的箭头
        label:{
                position:"end"   ,       //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
              },
         data : [
                  
                   {
                     
                    silent:false,             //鼠标悬停事件  true没有，false有
                    lineStyle:{               //警戒线的样式  ，虚实  颜色
                        type:"solid",
                        color:no_warning_color,
                        width:1
                         
                    },
                    label:{
                        position:'end',
                        formatter:"2.5",
                        color:no_warning_color,
                        fontSize:'14'
                    },
                    yAxis:2.5           // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
              
                }
                ]

               
    }



    var markline_observe_wind = {
    
    
        symbol:"none",              //去掉警戒线最后面的箭头
        label:{
                position:"end"   ,       //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
              },
         data : [
                  
                   {
                     
                    silent:false,             //鼠标悬停事件  true没有，false有
                    lineStyle:{               //警戒线的样式  ，虚实  颜色
                        type:"solid",
                        color:no_warning_color,
                        width:1
                         
                    },
                    label:{
                        position:'end',
                        formatter:"10.8",
                        color:no_warning_color,
                        fontSize:'12'
                    },
                    yAxis:10.8           // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
              
                }
                ]
               
    }



    export {
        
        markline_observe_wave,
        markline_observe_wind
    }

