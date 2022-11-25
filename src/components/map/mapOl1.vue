<template>
    <div class="wrapper">
        <div class="map" id="olMap"></div>
    </div>
</template>
<script>
import { tsThisType } from '@babel/types';
import bus from '../../utils'

export default {
    data() {
        return {
            map: null,
            parser: null,
            //map中的图层数组
            layer: new Array(),
            //图层名称数组
            layerName: new Array(),
            //图层可见属性数组
            layerVisibility: new Array(),
            //客户列表
            userList: [{ 'name': '用户1', 'counts': 100, 'loc': [117.717236, 34.575416] }, 
            { 'name': '用户2', 'counts': 70, 'loc': [113.586944, 22.354913] }, 
            { 'name': '用户3', 'counts': 60, 'loc': [113.255331, 23.420111] }, 
            { 'name': '用户4', 'counts': 5, 'loc': [103.866213, 36.052344] },
            { 'name': '用户5', 'counts': 6, 'loc': [113.569176,22.396203] }]
        };
    },
    mounted() {
        this.initMap();
        this.initMarker();
    },
    methods: {
        /**
            * 创建矢量标注样式函数,设置image为图标ol.style.Icon
            * @param {ol.Feature} feature 要素
            */
        createLabelStyle(feature) {
            return new ol.style.Style({
                image: new ol.style.Icon(
                    /** @type {olx.style.IconOptions} */
                    ({
                        anchor: [0.5, 60],
                        anchorOrigin: 'top-right',
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        offsetOrigin: 'top-right',
                        // offset:[0,10],
                        //图标缩放比例
                        // scale:0.5,
                        //透明度
                        opacity: 1,
                        //图标的url
                        src: './static/images/label/icon.png'
                    })),
                text: new ol.style.Text({
                    //位置
                    textAlign: 'center',
                    //基准线
                    textBaseline: 'middle',
                    //文字样式
                    font: 'normal 14px 微软雅黑',
                    //文本内容
                    text: feature.get('name'),
                    //文本填充样式（即文字颜色）
                    fill: new ol.style.Fill({ color: 'red' }),
                    offsetY: 12,
                    scale: 1,
                    stroke: new ol.style.Stroke({ color: '#ffcc33', width: 2 })
                })
            });
        },
        /**
            * 添加一个新的标注（矢量要素）
            * @param {ol.Coordinate} coordinate 坐标点
            */
        addVectorLabel(coordinate) {
            //新建一个要素 ol.Feature
            var newFeature = new ol.Feature({
                //几何信息
                geometry: new ol.geom.Point(coordinate),
                //名称属性
                name: '新标注'
            });
            //设置要素的样式
            newFeature.setStyle(this.createLabelStyle(newFeature));
            //将新要素添加到数据源中
            this.vectorSource.addFeature(newFeature);
        },
        initMarker() {
            var shanghai = ol.proj.fromLonLat([121.29, 31.14]);

            //矢量标注的数据源
            var vectorSource = new ol.source.Vector({
                features: []
            });

            for (var i = 0; i < this.userList.length; i++) {
                var user = this.userList[i];
                var point = ol.proj.fromLonLat(user.loc);
                //实例化Vector要素，通过矢量图层添加到地图容器中
                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point(point),
                    //名称属性
                    name: user.name,
                    //大概人口数（万）
                    population: 2500
                });
                iconFeature.setStyle(this.createLabelStyle(iconFeature));
                vectorSource.addFeature(iconFeature);
            }

            //矢量标注图层
            var vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });
            this.map.addLayer(vectorLayer);

            /**
        * 为map添加点击事件监听，渲染弹出popup
        */
            var vm=this;
            this.map.on('click', function (evt) {
                //判断当前单击处是否有要素，捕获到要素时弹出popup
                var feature = this.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { return feature; });
                if (feature) {
                    //var coor=features[0].getGeometry().getCoordinates();
                    //var property=features[0].getProperties();
                    //var type=features[0].getGeometry().getType();
                    console.log(feature.getProperties())
                    var name = feature.getProperties().name
                    vm.updateSelectClientInfo(name)
                } else {
                     bus.emit('changeActive', {'active':0, 'name':''} );
                }
            });

            /**
        * 为map添加鼠标移动事件监听，当指向标注时改变鼠标光标状态
        */
            this.map.on('pointermove', function (e) {
                var pixel = this.getEventPixel(e.originalEvent);
                var hit = this.hasFeatureAtPixel(pixel);
                this.getTargetElement().style.cursor = hit ? 'pointer' : '';
            });
        },
        //更新指定用户的数据
        updateSelectClientInfo(name){
            console.log(name)
             for (var i = 0; i < this.userList.length; i++) {
                var user = this.userList[i];
                if(user.name == name){
                    bus.emit('changeActive', {'active':1, 'name':name} );
                    break
                }
             }
        },
        initMap() {
            var TiandiMap_vec = new ol.layer.Tile({
                name: "天地图矢量图层",
                source: new ol.source.XYZ({
                    url: "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                    wrapX: false
                })
            });
            var TiandiMap_cva = new ol.layer.Tile({
                name: "天地图矢量注记图层",
                source: new ol.source.XYZ({
                    url: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                    wrapX: false
                })
            });
            var TiandiMap_img = new ol.layer.Tile({
                name: "天地图影像图层",
                source: new ol.source.XYZ({
                    url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                    wrapX: false
                })
            });
            var TiandiMap_cia = new ol.layer.Tile({
                name: "天地图影像注记图层",
                source: new ol.source.XYZ({
                    url: "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                    wrapX: false
                })
            });

            //实例化Map对象加载地图
            this.map = new ol.Map({
                //地图容器div的ID
                target: 'olMap',
                //地图容器中加载的图层
                layers: [TiandiMap_img, TiandiMap_cia],
                //地图视图设置
                view: new ol.View({
                    //地图初始中心点
                    center: ol.proj.transform([121.29, 31.14], 'EPSG:4326', 'EPSG:3857'),
                    //地图初始显示级别
                    zoom: 5
                })
            });

            //实例化鼠标位置控件（MousePosition）
            var mousePositionControl = new ol.control.MousePosition({
                //坐标格式
                coordinateFormat: ol.coordinate.createStringXY(4),
                //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
                projection: 'EPSG:4326',
                //坐标信息显示样式类名，默认是'ol-mouse-position'
                className: 'custom-mouse-position',
                //显示鼠标位置信息的目标容器
                target: document.getElementById('mouse-position'),
                //未定义坐标的标记
                undefinedHTML: '&nbsp;'
            });
            this.map.addControl(mousePositionControl);


        },
    },
};
</script>

<style scoped>
.map {
    width: 100%;
    height: 100vh;
}
</style>