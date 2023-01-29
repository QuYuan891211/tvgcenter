<template>
    <!-- 学校基本信息 -->
    <div class="sub-content-info-overview">
        <!-- TODO:标题和时间放到同一行 -->
        <div class="title">最新数据</div>
        <div class="last-data-bar">
        <el-table class="last-data-table"
            :data="this.last_all_data"
            :row-class-name="tableRowClassName"
            :header-cell-style="{
            background: '#003460',
            color: '#ffffff',
            fontWeight: '1500',
            fontSize: '16px',
      }"
      :cell-style="{
            // background: '#003460',
            color: '#ffffff',
            fontWeight: '600',
            fontSize: '14px',
            
      }"

        >
        <el-table-column class="last-data-table-column"  align="center" prop="site" label="名称" />
    <el-table-column class="last-data-table-column" align="center" prop="queryTime" label="时间" />
    <el-table-column class="last-data-table-column" align="center" prop="ybg" label="有效波高（米）" />
    <el-table-column class="last-data-table-column" align="center" prop="zbg" label="最大波高（米）" />
    <el-table-column class="last-data-table-column" align="center" prop="ws" label="风速（米每秒）" />
    <el-table-column class="last-data-table-column" align="center" prop="wd" label="风向"/>
    
  </el-table>
</div>
        <!-- <div class="time">2022年11月18日08时</div> -->
        <!-- <div>
            <div ref="Echarts6" id="barChart" style="width: 100%;height:210px;"></div>
        </div> -->
    </div>
</template>
<script>
export default {
    name: 'subContent6',
    data() {
        return {
            url_last_data : 'http://localhost:8085/buoy/filterlastAll',
            data_wave:null,
            default_time:31,
            last_all_data:[]
        }
    },
    methods: {
        tableRowClassName(val){
            if(val.row.ybg >= 2.5 && val.row.ybg < 3.5){
                return 'blue-level-bg'
            }else if(val.row.ybg >= 3.5 && val.row.ybg < 4.5){
                return 'yellow-level-bg'
            }else if(val.row.ybg >= 4.5 && val.row.ybg < 6){
                return 'orange-level-bg'
            }else if(val.row.ybg >= 6){
                return 'red-level-bg'
            }
            return 'normal-bg'
        },
        getLastAllData(){

            //发送请求，获取选中浮标的最近30天数据
                    axios(
            {
            method: 'get',//提交方法
            url: this.url_last_data,//提交地址
            params: {//提交参数
            // name:this.selected_name,
            days:this.default_time
            }}).then((res) => {
            // console.log('30天' + res.data.buoyDataList[0].site)
            // this.initLineChart()
            if(100 == res.data.commonResultCode.code){
            this.last_all_data = res.data.buoyDataList
            // bus.emit('lastAll', this.last_all_data);
            }else if ("400" == res.data.commonResultCode.code) {
                    common.notification_error(res.data.commonResultCode.message);
                }
                else{
                    common.notification_warning(res.data.commonResultCode.message)
                }

            })
            },
        //取得就业率柱状图数据
        getBarChart() {
            //获取数值
            this.data_wave = [0.7, 0.4, 0.8, 1.7, 1.9, 1.1, 0, 1.6];
            let arr = [0.7, 0.4, 0.8, 1.7, 1.9, 1.1, 0, 1.6];
            let max = arr.sort().reverse()[0];

            // console.log('getBarChart');
            //直接引用进来使用
            var echarts = require('echarts');
            // 基于准备好的dom，获取main节点init初始化echarts实例
            var myChart = echarts.init(this.$refs.Echarts6);

            var option;
            option = {
                //backgroundColor: 'rgba(1,202,217,.2)',
                grid: {
                    left: 60,
                    right: 20,
                    top: 45,
                    bottom: 40
                },
                /**
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    top: 10,
                    textStyle: {
                        fontSize: 10,
                        color: 'rgba(255,255,255,.7)'
                    },
                    data: ['实有人口', '实有房屋', '实有单位']
                },*/
                xAxis: [
                    {
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.2)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.1)'
                            }
                        },
                        axisLabel: {
                            color: "rgba(255,255,255,.7)"
                        },

                        data: ['渤海', '黄海北部', '黄海南部', '东海北部', '东海南部', '南海北部', '南海中部', '南海南部'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {   show:true,
                        position:'left', 
                        offset:0, 
                        type: 'value',
                        name: '米',
                        min: 0,
                        // max: Math.max(this.data_wave),
                        max:max,
                        interval: max/5,
                        axisLine: {
                            show:true,
                            // symbol:['none', 'arrow'],   //---是否显示轴线箭头
                            // symbolSize:[3, 3] ,         //---箭头大小
                            // symbolOffset:[0,3],         //---箭头位置
                            lineStyle: {
                                color: 'rgba(255,255,255,.5)'
                            }
                        },
                        splitLine: {
                            show:true,
                            lineStyle: {
                                color: 'rgba(255,255,255,.5)'
                            }
                        },

                        axisLabel: {


                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: '有效波高',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#00f0ff' },
                                        { offset: 1, color: '#032a72' }
                                    ]
                                )
                            }
                        },
                        data: this.data_wave
                    }
                ],
                tooltip: {
          // 提示框组件
          }
            };

            myChart.clear()
            myChart.setOption(option)
        },
    },
    mounted() {
        this.getLastAllData()
        // this.getBarChart();
    },
}
</script>
<style>
.sub-content-info-overview{
    width: 100%;
    margin-left: 1%;
    /* margin-right: 1%; */
    height: 100%;
    /* 加载背景图 */
    background: url(@/assets/rightcotent1_bg.png) no-repeat;
    /* 背景图垂直、水平均居中 */
    background-size: 100% 100%;
}
.sub-content-info {
    width: 100%;
    margin-left: 1%;
    height: 100%;
    /* 加载背景图 */
    background: url(@/assets/rightcotent1_bg.png) no-repeat;
    /* 背景图垂直、水平均居中 */
    background-size: 100% 100%;
}
.sub-content-info-overview .time{
    margin-top: 0%;
    padding-left: 30px;
    color: white;
}


.sub-content-info-overview .title {
    font-family: SourceHanSansCN-Bold;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 34px;
    letter-spacing: 1px;
    color: #b1eded;
    margin-top: 2px;
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

.sub-content-info-overview .job-data,
.sub-content-info-overview .marjor-rate {
    width: 120px;
    height: 75px;
    background: url(../../assets/job-bg.png);
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
}

.sub-content-info-overview .job-subtitle {
    font-size: 14px;
    letter-spacing: 1px;
    color: #b3f7f4;
}

.sub-content-info-overview .job-icon img {
    width: 7px;
    height: 7px;
}

.sub-content-info-overview .job-text {
    font-size: 12px;
    color: #b3f7f4;
    padding: 0 6px;
}

.sub-content-info-overview .job-num {
    font-size: 12px;
    color: #ffffff;
}

.sub-content-info-overview .static {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.sub-content-info-overview .static img {
    width: 14px;
    height: 14px;
}
.last-data-table{
    width: 100%;
    height:480px;
    max-height: 480px;
    /* 表格字体颜色 */
    /* color:black; */

}
.last-data-bar{
    margin-left: 2%;
    margin-right: 2%;
}
/* 表格内背景颜色
.el-table th, .el-table tr,.el-table td{
border: 0;
background-color: transparent;
}
/* 双数行背景颜色 */
/* .el-table--striped .el-table__body tr.el-table__row--striped td {
 
background-color:#fff;
background-color: rgba(148, 144, 144, 0.3)
} */
/* 使表格背景透明 */
/* .el-table th, .el-table tr {
background-color: transparent;
} */ 

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.el-table .message-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.el-table .blue-level-bg{
  background: #0f98a0;
}
.el-table .yellow-level-bg{
  background: #dcc246;
  /* background: #f89100; */
  /* background: #df433c; */
}
.el-table .orange-level-bg{
  background: orange;
}
.el-table .red-level-bg{
  background: #df433c;
}
.el-table .normal-bg{
  background: #003460;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #003460 !important;
  /* color: #f19944;  */

}
</style>