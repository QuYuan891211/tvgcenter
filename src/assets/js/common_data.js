// let baseurl = '128.5.9.127'
let baseurl = 'localhost'



//WebAPI需修改：图层index为2，融合底图的话index为1
//dev
// let layer_point_index = 1
//pro
let layer_point_index = 2

            let TiandiMap_vec = new ol.layer.Tile({
                name: "天地图矢量图层",
                source: new ol.source.XYZ({
                    url: "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                    wrapX: false
                }),
                preload:Infinity
            });

            let TiandiMap_cva = new ol.layer.Tile({
                name: "天地图矢量注记图层",
                source: new ol.source.XYZ({
                    url: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                    wrapX: false
                }),
                preload:Infinity
            });

            let TiandiMap_img = new ol.layer.Tile({
                name: "天地图栅格图层",
                source: new ol.source.XYZ({
                    url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                    // url:"http://" + baseurl + ":8082/geoserver/observer/wms",
                    // params:{
                    //     LAYERS:"observer:geotools_coverage"
                    // },
                    wrapX: false
                }),
                preload:Infinity
            });

            var TiandiMap_cia = new ol.layer.Tile({
                name: "天地图栅格注记图层",
                source: new ol.source.XYZ({
                    url: "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                    wrapX: false
                }),
                preload:Infinity
            });

            //内网自建地图引擎图层
            var GaodeMap_img_wms = new ol.layer.Tile({
                name: "高德影像图层_自建地图引擎",
                source: new ol.source.TileWMS({
                    // url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                    url:"http://" + baseurl + ":8082/geoserver/observer/wms",
                    params:{
                        'FORMAT': 'image/png',
                        'VERSION': '1.1.1',
                        tiled: true,
                        STYLES: '',
                        LAYERS:"observer:gaode_part_imgAndMark"
                    },
                    wrapX: false
                }),
                preload:Infinity
            });


                        //内网自建地图引擎图层
            var GaodeMap_img_wms_old = new ol.layer.Tile({
                name: "高德影像图层_自建地图引擎",
                source: new ol.source.TileWMS({
                                    // url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                url:"http://" + baseurl + ":8082/geoserver/observer/wms",
                params:{
                    LAYERS:"observer:geotools_coverage"
                    },
                    wrapX: false
                    }),
                    preload:Infinity
                            });

export {
    baseurl,
    GaodeMap_img_wms,
    GaodeMap_img_wms_old,
    TiandiMap_img,
    TiandiMap_cia,
    TiandiMap_vec,
    TiandiMap_cva,
    layer_point_index
}