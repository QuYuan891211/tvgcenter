<template>
    <!-- 学校基本信息 -->
    <div class="sub-content-info">
        <div class=title>服务统计</div>
        <div>
            <div id="barChart" style="width: 100%;height:210px;"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'subContent6',
    data() {
        return {
        }
    },
    methods: {
        //取得就业率柱状图数据
        getBarChart() {
            console.log('getBarChart');
            //直接引用进来使用
            var echarts = require('echarts');
            // 基于准备好的dom，获取main节点init初始化echarts实例
            var myChart = echarts.init(document.getElementById('barChart'));

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

                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '',
                        min: 0,
                        max: 250,
                        interval: 50,
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.3)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.01)'
                            }
                        },

                        axisLabel: {
                            formatter: '{value} 次'
                        }
                    }
                ],
                series: [

                    /**{
                        name: '实有人口',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#b266ff' },
                                        { offset: 1, color: '#121b87' }
                                    ]
                                )
                            }
                        },
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                    },
                    {
                        name: '实有房屋',
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
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                    },*/
                    {
                        name: '实有单位',
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
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                    }
                ]
            };

            myChart.clear()
            myChart.setOption(option)
        },
    },
    mounted() {
        this.getBarChart();
    },
}
</script>
<style>
.sub-content-info {
    width: 49%;
    margin-left: 1%;
    height: 100%;
    /* 加载背景图 */
    background: url(@/assets/rightcotent1_bg.png) no-repeat;
    /* 背景图垂直、水平均居中 */
    background-size: 100% 100%;
}


.sub-content-info .title {
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

.sub-content-info .job-data,
.sub-content-info .marjor-rate {
    width: 120px;
    height: 75px;
    background: url(../../assets/job-bg.png);
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
}

.sub-content-info .job-subtitle {
    font-size: 14px;
    letter-spacing: 1px;
    color: #b3f7f4;
}

.sub-content-info .job-icon img {
    width: 7px;
    height: 7px;
}

.sub-content-info .job-text {
    font-size: 12px;
    color: #b3f7f4;
    padding: 0 6px;
}

.sub-content-info .job-num {
    font-size: 12px;
    color: #ffffff;
}

.sub-content-info .static {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.sub-content-info .static img {
    width: 14px;
    height: 14px;
}
</style>