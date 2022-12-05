<template>
    <div class="container" :style="{ 'height': curHeight + 'px' }">
        <!-- 头部模块 -->
        <centerHeader1 />
        <!-- 工具栏模块 -->
        <!-- <toolBar class="left-bar"></toolBar> -->
        <!-- 左侧菜单模块 -->
        <menu1 :showSign="active" ></menu1>

        <!-- 总概览模块 -->
        <div v-show="active === 0" class="right-bar" :class="active === 0 ? 'fromRight' : ''"
            :style="{ right: rightbarRight + '%', height: (curHeight-100) + 'px'}">
            <div class="right-bar-info">
               <div style="display:flex;position:relative;width:100%;height: 33%;">
                        <rightcontent1></rightcontent1>
                        <rightcontent3></rightcontent3>
                    </div>
                    <div style="display:flex;position:relative;width:100%;height: 33%;margin-top: 1%;">
                        <rightcontent5></rightcontent5>
                        <rightcontent2></rightcontent2>
                    </div>
                    <div style="display:flex;position:relative;width:100%;height: 33%;margin-top: 1%;">
                        <rightcontent6></rightcontent6>
                        <rightcontent4></rightcontent4>
                    </div>

            </div>
        </div>
        <!-- 客户概览模块 -->
        <div v-show="active === 1" class="right-bar1" :class="active === 1 ? 'fromRight' : ''"
            :style="{ right: rightbarRight + '%', height: (curHeight-100) + 'px' }">
            <div class="right-bar-info">
                <div style="position:relative;width:100%;height: 33%;">
                <rightcontentClient1></rightcontentClient1>
                </div>
                <div style="position:relative;width:100%;height: 33%;">
                <rightcontentClient2></rightcontentClient2>
                </div>
                <div style="position:relative;width:100%;height: 33%;">
                <rightcontentClient3></rightcontentClient3>
                </div>
            </div>
        </div>
        <!-- 地图模块 -->
        <div id="iframe-map">
            <mapOl1></mapOl1>
        </div>
    </div>
</template>

<script>
import bus from '../utils'
import mapOl1 from '../components/map/mapOl1.vue'
import centerHeader1 from '../components/header/centerHeader1.vue'
import toolBar from '../components/map/toolBar.vue'
import rightcontent1 from '../components/subcontent/rightcontent1.vue'
import rightcontent2 from '../components/subcontent/rightcontent2.vue'
import rightcontent3 from '../components/subcontent/rightcontent3.vue'
import rightcontent4 from '../components/subcontent/rightcontent4.vue'
import rightcontent5 from '../components/subcontent/rightcontent5.vue'
import rightcontent6 from '../components/subcontent/rightcontent6.vue'
import rightcontentClient1 from '../components/subcontent/rightcontentClient1.vue'
import rightcontentClient2 from '../components/subcontent/rightcontentClient2.vue'
import rightcontentClient3 from '../components/subcontent/rightcontentClient3.vue'
import menu1 from '../components//menu/menu1.vue'
export default {
    components: {
        menu1,
        mapOl1,
        centerHeader1,
        toolBar,
        rightcontent1,
        rightcontent2,
        rightcontent3,
        rightcontent4,
        rightcontent5,
        rightcontent6,
        rightcontentClient1,
        rightcontentClient2,
        rightcontentClient3,
    },
    data() {
        return {
            curHeight: document.documentElement.clientHeight, // 屏幕高度
            curWidth: document.documentElement.clientWidth, // 屏幕尺寸
            //screenWidth: document.body.clientWidth, // 屏幕尺寸
            //screenHeight: document.body.clientHeight, 
            rightbarRight: -0,
            leftbarLeft: -9,
            active: 0,
            selectMenu:0, //当前选择的左侧菜单
        }
    },
    created() {

    },
    methods: {
        updateActive(e) {   //声明这个函数
            this.active = e;
        }
    },
    mounted() {
        //来自地图图标点击事件
        bus.off('changeActive')
        bus.on('changeActive', val => {
            this.active = val.active
            console.log('active = ' +val.active)
        })
        //来自左侧菜单点击事件
        bus.off('clickMenu')
        bus.on('clickMenu', val => {
            this.selectMenu = val.index
            console.log('selectMenu = '+val.index)
        })
    }
}
</script>

<style>
body {
    --primary: #007bff;
    --secondary: #6c757d;
    --success: #28a745;
    --danger: #dc3545;
    --warning: #ffc107;
    --info: #17a2b8;
    --light: #f8f9fa;
    --dark: #343a40;
    --muted: #6c757d;
    --white: #fff;
    --borderColor: #dee2e6;
    --lightmuted: #B2B2B2;
    --gray: #f5f5f5;
    --darkgray: #999999;
    --red: #ff4200;
    --orange: #ff611e;
    margin: 0;
    overflow-y: hidden;
    overflow-x: hidden;
}

/* 右边样式 */
.right-bar {
    width: 800px;
    position: absolute;
    top: 90px;
    background: url(../assets/right-cover.png);
    z-index: 5;
}

.right-bar1 {
    width: 500px;
    height: 100%;
    position: absolute;
    top: 90px;
    background: url(../assets/right-cover.png);
    z-index: 5;
}

.right-bar-info {
    text-align: left;
    width: 100%;
    height: 100%;
}

/* 收起右侧 */
.fromRight {
    animation: fr 2000ms;
    -moz-animation: fr 2000ms;
    /* Firefox */
    -webkit-animation: fr 2000ms;
    /* Safari 和 Chrome */
    -o-animation: fr 2000ms;
    /* Opera */
}

@keyframes fr {
    from {
        right: -20%;
    }

    to {
        right: 0;
    }
}

@-moz-keyframes fr

/* Firefox */
    {
    from {
        right: -20%;
    }

    to {
        right: 0;
    }
}

@-webkit-keyframes fr

/* Safari 和 Chrome */
    {
    from {
        right: -20%;
    }

    to {
        right: 0;
    }
}

@-o-keyframes fr

/* Opera */
    {
    from {
        right: -20%;
    }

    to {
        right: 0;
    }
}


#iframe-map {
    width: 100%;
    height: 100%;
    z-index: 1;
}
</style>