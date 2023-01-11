export default {    
    getSigleEleValue(name, item){
     if('有效波高'== name){
        return item.ybg
     }else if('最大波高'==name){
        return item.zbg
     }else if('有效波周期'==name){
        return item.yzq
     }else if('最大波周期'==name){
        return item.zzq
     }else if('波向'==name){
        return item.bx
     }else if('波高'==name){
        return item.bg
     }else if('周期'==name){
        return item.zq
     }else if('1/10波高'==name){
        return item.tenthbg
     }else if('1/10周期'==name){
        return item.tenthzq
     }else if('风速'==name){
        return item.ws
     }else if('风向'==name){
        return item.wd
     }else if('大气压'==name){
        return item.bp
     }else if('气温'==name){
        return item.at
     }else if('水温'==name){
        return item.wt
     }
     
    // alert("测试，测试！！！")
},
   

}

