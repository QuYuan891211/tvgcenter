<template>
    <!-- 学校基本信息 -->
    <div class="sub-content-client3-info">
        <div class=title>最近24小时</div>
        <!-- 搜索条件form -->
        <div class="search-bar">
            <!-- <div>自定义查询</div> -->
            <div class="switch-bar-div">
                <!-- <div class="switch-bar-tips">切换要素</div> -->
            <select class="switch-bar-select" v-model="this.selected_ele" @change="changeElement">

                <option v-for="option in ele_list" v-bind:value="option.name">{{option.name}}</option>


            </select>
        </div>
        
        <div class="search-bar-div">
            <select class="search-bar-select">

                <option value ="volvo">2022-11-17 09</option>

                <option value ="saab">最大波高</option>

                <option value="opel">最大风速</option>

                <option value="audi">平均风速</option>

            </select>
        </div>

        <div class="search-bar-div">
            <!-- <input type="text" class="easyui-datetimebox" id="datetime"> -->


        </div>
        <div class="search-bar-div">
            <el-button>测试</el-button>

            <el-button type="warning">Warning</el-button>
            <!-- <n-button>naive-ui</n-button> -->
            <!-- <a-button>Add</a-button> -->
            <nut-button class="search-button" :loading="isLoading" type="warning" @click="query">自定义时间查询</nut-button>
            <!-- <el-button type="primary">Primary</el-button> -->
            <!-- <v-md-date-range-picker></v-md-date-range-picker> -->
        </div>
        </div>
        <div class="attend" style="padding-left: 10px;">
            <div ref="EchartsClient3" class="line-chart" id="lineChartClient_24" style="width:950px;height:180px;margin-left:2%"></div>
        </div>
    </div>
</template>

<script>

// import { ref } from 'vue';
// import { Datepicker, Timepicker, DatetimePicker, DateRangePicker } from '@livelybone/vue-datepicker';
import bus from '../../utils'
import common from '../../assets/js/common'
// import Button from 'ant-design-vue/lib/button';
// import 'ant-design-vue/lib/button/style';
// const ButtonGroup = Button.Group;
// import { NButton } from 'naive-ui'
// import { ElMessage } from 'element-plus'
// import { defineComponent } from 'vue'
// import {NButton} from 'naive-ui'
// import { ElButton } from 'element-plus'
// import 'element-plus/dist/index.css'
// import common_data from '../../assets/js/common_data'
// import { defineComponent } from 'vue'
// import { NButton } from 'naive-ui'
// import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually
// import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
    name: 'subContent5',
    // components: { DateRangePicker },
    // components:{ Datepicker, Timepicker, DatetimePicker, DateRangePicker },
    // components: {
    //   AButton: Button,
    //   AButtonGroup: ButtonGroup,
    // },
    // components: {
    //   NButton
    // },
    // defineComponent({    
    // components: { ElButton  },
    // }),
    data() {
        return {
            //请求地址
            url_last_single_data:'http://localhost:8081/buoy/lastSingle',
            //观测数据信息
            data_arr_24:[],
            time_arr_24:[],
            unit:null,
            name_ele:null,
            default_time : 1,
            selected_name:null,
            all_ele_data_24:null,
            // isLoading :ref(false),
            ele_list:[
                {
                    'id':1,
                    'name':'有效波高'
                },
                {
                    'id':2,
                    'name':'最大波高'
                },
                {
                    'id':3,
                    'name':'风速'
                },
                {
                    'id':4,
                    'name':'风向'
                },
                {
                    'id':5,
                    'name':'有效波周期'
                },                {
                    'id':6,
                    'name':'最大波周期'
                },
                {
                    'id':7,
                    'name':'大气压'
                },
                {
                    'id':8,
                    'name':'气温'
                },                {
                    'id':9,
                    'name':'水温'
                },                {
                    'id':10,
                    'name':'波高'
                },                {
                    'id':11,
                    'name':'波向'
                },                {
                    'id':12,
                    'name':'周期'
                },                {
                    'id':13,
                    'name':'1/10波高'
                },                {
                    'id':14,
                    'name':'1/10周期'
                }
            ],
            // selected_ele:null,
            // date_format_str: 'dd HH',
            selected_ele : '有效波高'//有效波高


        }
    },
    created () {
        // console.log('重新加载Client3')
        this.selected_ele = this.ele_list[0].name
    },
    // props:
    //     ['selected_name']
    // ,
    methods: {
        query(){
            // let isLoading = ref(false);
            // this.isLoading.value  = true;
            alert('query')
        },
        reloadChart(){
            
                    //清空数组
                    this.data_arr_24=[]
                        // alert(item.queryTime)
                    this.time_arr_24=[]
                    // if(this.se)
                    // alert('1天全要素' + res.data.buoyDataList[0].queryTime)
                    // alert('all_ele_data_24 长度' + this.all_ele_data_24.length)
                    // alert('all_ele_data_24 时间' + this.all_ele_data_24[0].queryTime) 
                    for(var i=0;i<this.all_ele_data_24.length;i++){
                        // common.text()
                       
                        // this.data_arr_24 = this.all_ele_data_24
                        this.data_arr_24.push(common.getSigleEleValue(this.selected_ele, this.all_ele_data_24[i]))
                        // alert(item.queryTime)
                        this.time_arr_24.push(this.all_ele_data_24[i].queryTime)
                        // alert('时间' + item.queryTime)
                    }
                    this.name_ele = this.selected_ele
                    // 重新加载图表
                    this.getLineChart();
                    // alert('time '+this.time_arr_24[0])
                    // alert(this.time_arr_24.length)
                    // alert('data ' + this.data_arr_24[0])
                    // alert(this.data_arr_24.length)
                    
                    // bus.emit('lastAll', this.last_all_data);
        },
        changeElement(){
            bus.emit('changeElement', this.selected_ele)
            // alert(this.selected_ele)
            this.reloadChart()
        },

        createDateList(days) {


            let endTime = new Date()
            let startTime = new Date(Date.parse(endTime) - days * 24 * 60 * 60 * 1000)
            let dateList = []
            let i = 0
            while ((endTime.getTime() - startTime.getTime()) >= 0) {
                let year = startTime.getFullYear()
                let month = startTime.getMonth() + 1
                let day = startTime.getDate()
                dateList[i] = year + '-' +
                            (month > 9 ? month : '0' + month) + '-' +
                            (day > 9 ? day : '0' + day)
                startTime.setDate(startTime.getDate() + 1)
                i++
            }
    return dateList.reverse()
    },
    
        getLineChart(){
            // // alert(this.selected_name)
            // //发送请求，获取选中浮标的最近24H，7天，30天数据
            //                     axios(
            //     {
            // method: 'get',//提交方法
            // url: this.url_last_single_data,//提交地址
            // params: {//提交参数
            //     name:this.selected_name,
            //     days:this.defalut_time
            // }}).then((res) => {

            //     this.initLineChart()
            // })
            this.initLineChart()
        },
        initLineChart() {
            
            //直接引用进来使用
            var echarts = require('echarts');
            // 基于准备好的dom，获取main节点init初始化echarts实例
            var myChart = echarts.init(this.$refs.EchartsClient3);
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: this.unit,
                    top: '10%',
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 14,
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            // interval:1,
                            textStyle: {
                                color: '#FFFFFF',
                            },
                        },
                        data:this.time_arr_24
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        splitLine: { show: true,  lineStyle:{opacity:0.5,type: 'dashed'}},
                        axisLabel: {
                            textStyle: {
                                color: '#FFFFFF',
                            },
                        },
                    }
                ],
                series: [
                    {
                        name: this.name_ele,
                        type: 'line',
                        stack: '总量',
                        areaStyle: {
                            normal: {
                                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(37,113,200,0.5)'
                                }, {
                                    offset: .34,
                                    color: 'rgba(37,113,200,0.25)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(37,113,200,0.00)'
                                }])
                            }
                        },
                        symbol: 'none',
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#67dfe8'
                                }
                            }
                        },
                        data: this.data_arr_24
                    },
                ],
                animation: true,
                animationThreshold: 2500,       // 动画元素阀值，产生的图形原素超过2500不出动画
                addDataAnimation: true,         // 动态数据接口是否开启动画效果
                animationDuration: 3000,
                animationEasing: 'cubicInOut'
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            myChart.clear()
            myChart.setOption(option)
        }
    },
    mounted() {
        // this.ele_list = common_data.element_list
        // alert(this.ele_list[0].name)
        
        // //清空数组
        // this.data_arr_24=[]
        // // alert(item.queryTime)
        // this.time_arr_24=[]
        // console.log('子组件加载')
        //来自地图的鼠标点击Feature选中事件
        // bus.off('select_feature')
        bus.on('select_feature', val =>{
            // alert('client3')
            this.selected_name = val
            // var t = new Date().getTime();
            // alert('client3监听到选中 ' + this.selected_name)
             //发送请求，获取选中浮标的最近1天数据
             axios(
                {
            method: 'get',//提交方法
            url: this.url_last_single_data,//提交地址
            params: {//提交参数
                
                days:this.default_time,
                name:this.selected_name
                // timeStamp:t
            }}).then((res) => {
                // console.log('30天' + res.data.buoyDataList[0].site)
                // this.initLineChart()
                if("100" == res.data.commonResultCode.code){
                    this.all_ele_data_24 = res.data.buoyDataList
                    this.reloadChart()
                }else if("400" == res.data.commonResultCode.code){
                     alert(res.data.commonResultCode.message)
                }else if("500" == res.data.commonResultCode.code){
                    
                }

            })
            // console.log(val)
            // this.selected_name = val
            // console.log('client3监听')
            // console.log('子组件Client3使用公共事务mitt获取的所选Feature: ' + val[0].site + '数据长度： ' + val.length)
            
        })
        this.data_arr_24 = []

        // console.log(this.data_arr_24)
        // console.log(this.data_arr)
        //TODO:动态获取单位
        this.unit = ''
        // this.name_ele = '有效波高'
        // console.log(this.data_arr_24.length)
        // console.log(this.data_arr.length)
        this.getLineChart();
    },
    beforeDestroy () {
            bus.off('select_feature')
        },
    watch:{

    }

}
//日期转换字符串
/**
 * 函数描述：时间格式化工具
 * @param format {String} 格式（y-年，M-月，d-日，H-时[24]，h-时[12]，m-分，s-秒，S-毫秒(3位数)，q-季度，ap，午前am/午后pm）
 * @returns {String}
 */
 Date.prototype.format = function (format) {
    var o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'H+': this.getHours(), // 时（24小时制）
        'h+': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, // 时（12小时制）
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S': this.getMilliseconds(), // 毫秒
        'ap': this.getHours() > 12 ? 'am' : 'pm'
    };
    var week = ['日', '一', '二', '三', '四', '五', '六'];
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(format)) {
        format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[this.getDay()]);
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return format;
};
</script>
<style>
.sub-content-client3-info{
    width: 100%;
    height: 100%;
    /* 加载背景图 */
    background: url(@/assets/rightcotent1_bg.png) no-repeat;
    /* 背景图垂直、水平均居中 */
    background-size:100% 100%;
}
.switch-bar-div{
    display: flex;
    flex-direction: row;
    margin-right: 35%;
}
.switch-bar-tips{
    color: white;
    margin-right: 8%;

}
.switch-bar-select{
    width:100px;
    height: 30px;
}
.sub-content-client3-info .title {
    font-family: SourceHanSansCN-Bold;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 34px;
    letter-spacing: 1px;
    color: #b1eded;
    margin-top: 8px;
    background: url(../../assets/rightcotent1_title_bg.png);
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    width: 221px;
    height: 60px;
    padding-left: 30px;
}

/* 分割线 */
.divider {
    height: 1px;
    background-color: #528693;
    width: 100%;
}
.search-bar{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    justify-content:start;
    margin-left: 5%;

}
.search-bar-div{
      margin-right: 2%;  
    }
.search-bar-select{
    width:150px;
    height: 30px;
    
}

.search-bar-select{
    width:150px;
    height: 30px;
}
.search-button{
    width:150px;
    height: 30px;
    font-size: 16px;
    color:white;
    /* background: #ea9218; */
    background-size: 100%;
    font-family: "微软雅黑";
    border-radius: 10px;
    font-weight:500
    /* color: #ece847; */
}
.sub-content-client3-info .attend .attention-icon img {
    width: 27px;
    height: 27px;
}

.sub-content-client3-info .attend .attention-title {
    font-size: 14px;
    color: #b1eded;
    line-height: 28px;
    margin-left: 1%;
}

.sub-content-client3-info .attend .attention-num {
    font-size: 18px;
    color: #ffffff;
    margin: 0 5px;
}

.sub-content-client3-info .attend .attention-person {
    color: #ffffff;
}

.sub-content-client3-info .static {
    display: flex;
    align-items: center;
    margin-bottom: 15px
}

.sub-content-client3-info .static img {
    width: 14px;
    height: 14px
}
</style>