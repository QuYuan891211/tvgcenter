import { createApp } from 'vue'
// import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
// import 'ant-design-vue/dist/antd.css';
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// import naive from 'naive-ui'
// import * as echarts from 'echarts'
// import { apply } from 'ol/transform'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/index.css'
// import naive from 'naive-ui'
// import ElementUI from 'element-ui'
// import axios from "axios";
// import NutUI from "@nutui/nutui";
// import ArcoVue from '@arco-design/web-vue';
// 采用按需加载时  此全局css样式，需要删除
// import "@nutui/nutui/dist/style.css";
// import '@arco-design/web-vue/dist/arco.css';
// Vue.prototype.axios = axios;
// import TDesign from 'tdesign-vue';
// 引入组件库全局样式资源
// import 'tdesign-vue/es/style/index.css';
import VMdDateRangePicker from "v-md-date-range-picker";
createApp(App).use(router).use(VMdDateRangePicker).mount('#app')
// app.config.globalProperties.$echarts = echarts

