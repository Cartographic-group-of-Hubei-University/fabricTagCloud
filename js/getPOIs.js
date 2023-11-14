// 获取POI数据
// 主要分为3种方法，分别为读取本地csv/json数据、在线爬取高德POI、读取后台数据库的POI数据
// 目前的框架采用的是第三种方式


// 在线爬取高德地图POI
function getAMAPPOIs(location2, radius) {
    // 定义高德地图API密钥
    apiKey = "a7a5be837d1645cd49c74a601187bc35";

    // 定义请求接口的URL
    url = "https://restapi.amap.com/v3/place/around?";

    // 定义请求参数
    // location2 = "114.340713,30.58292"; // 中心点坐标，例如：经度,纬度
    // radius = 1000;  // 查询半径，单位：米

    types = "110000"; // POI类型，例如：110000景点
    offset = 20; // 单页显示结果数，默认为20，最大为50



    var index = 0;
    var page = 1; // 当前页数，默认为1

    for (var ii = 1; ii < 5; ii++) {
        console.log(ii, "==============");
        // 拼接请求URL
        requestUrl = url + "key=" + apiKey + "&location=" + location2 + "&radius=" + radius + "&types=" + types + "&offset=" + offset + "&page=" + ii;
        console.log(requestUrl);

        // 建立所需的对象
        var httpRequest = new XMLHttpRequest();
        // 打开连接  将请求参数写在url中 
        httpRequest.open('GET', requestUrl, true);
        // 发送请求  将请求参数写在URL中
        httpRequest.send();
        // 获取数据后的处理程序
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                // 获取到json字符串
                var ret = httpRequest.responseText;
                // 转为JSON对象
                var json = JSON.parse(ret);
                console.log(json);
                if (json["status"] == 0) {
                    console.log("请求失败");
                    return;
                }
                else {
                    var pois = json['pois'];
                    // console.log(pois);
                    var poisLen = pois.length;
                    if (poisLen == 0) {
                        console.log("已无POI");
                        return;
                    }
                    for (var j = 0; j < poisLen; j++) {
                        // 遍历某一page的poi数据
                        var poi = pois[j];
                        var temp = {
                            "pname": poi['pname'],  // 名称
                            "score": poi['biz_ext']['rating'],  // 评分
                            "X": poi['location'].split(',')[0],  // X坐标
                            "Y": poi['location'].split(',')[1],  // Y坐标
                            "time": poi['distance'] / 40  // 此处的通行时间是使用距离模拟的，需要再优化
                        }
                        myJson[index] = temp;
                        index++;
                    }

                }
                console.log(myJson);
            }
        }
        // 切换下一页
        page++;
    }
    console.log(myJson);
}


// 读取本地json文件
function readJson(jsonFile) {
    // // 读取本地json文件（方法一）
    // $.ajax({
    //     url: "wuhan.json",//同文件夹下的json文件路径
    //     type: "GET",//请求方式为get
    //     dataType: "json", //返回数据格式为json
    //     success: function (data) {//请求成功完成后要执行的方法 
    //         console.log(data);
    //     }
    // })


    // // 读取本地json文件（方法二）
    // $.getJSON("wuhan.json", function (data) {
    //     console.log(data)
    // });


    // // 读取本地json文件（方法三）
    // var url = "wuhan3.json"
    // // 申明一个XMLHttpRequest
    // var request = new XMLHttpRequest();
    // // 设置请求方法与路径
    // request.open("get", url);
    // // 不发送数据到服务器
    // request.send(null);
    // //XHR对象获取到返回信息后执行
    // request.onload = function () {
    //     // 解析获取到的数据
    //     var myJson = JSON.parse(request.responseText);
    //     console.log(myJson);
    // }


    // 读取本地json文件（方法四）（同步读取）
    const xhr = new XMLHttpRequest();
    xhr.open('GET', jsonFile, false); // 同步请求
    xhr.send();
    var jsonPOI = JSON.parse(xhr.responseText);
    // console.log(jsonPOI);


    //==========================================================================

    // 格式化数据
    var myJsonLength = Object.keys(jsonPOI).length;
    for (var i = 0; i < myJsonLength; i++) {
        var city = jsonPOI[i].city;
        if (city != "苏州") continue;
        if (i == 300) break;
        var pname = jsonPOI[i].pname;
        var X = jsonPOI[i].X_gcj02;
        var Y = jsonPOI[i].Y_gcj02;
        var X_wgs84 = jsonPOI[i].X_wgs84;
        var Y_wgs84 = jsonPOI[i].Y_wgs84;
        var location = [X, Y];
        var rankInCity = jsonPOI[i].rankInCity;
        var rankInChina = jsonPOI[i].rankInChina;
        // console.log(pname,X,Y);
        var newJson = {
            "pname": pname,
            "X": X,
            "Y": Y,
            "X_wgs84": X_wgs84,
            "Y_wgs84": Y_wgs84,
            "lnglat": location,
            "rankInCity": rankInCity,
            "rankInChina": rankInChina
        }
        myJson.push(newJson);
    }
    allPOI = myJson;
    // myJson2 = myJson;

    //=============================================================================

    // 在高德地图展示POI点
    showPOI();

}


// 获取数据库的POI数据(输入坐标系?)
function getDBPOIs(locationX, locationY, radius) {
    //=======================================================
    // 开始向后台请求数据（将中心经纬度与半径传输给后台）
    $.ajax({
        url: "http://localhost:3333/ajaxGet_main2",
        type: "get",
        data: { X: locationX, Y: locationY, radius: radius },
        success: function (db_pois) {
            console.log(db_pois);
            myJson = db_pois;

            // 开始生成中心型标签云
            getTagCloud();
        }
    });
}


// 获取数据库所有的POI
function getDBPOIs2() {
    $.ajax({
        url: "http://localhost:3333/ajaxGet_allPOI",
        type: "get",
        // data: { X: mainLongitude, Y: mainLatitude },
        // data: { X: 114.333507, Y: 30.577343 },
        success: function (db_pois) {
            console.log(db_pois);
            allPOI = db_pois;
            // 在高德地图展示POI点
            showPOI();
        }
    });
}



//构造路线导航类
var driving = new AMap.Driving({
    policy: "AMap.DrivingPolicy.LEAST_TIME",  // 最便捷的驾车策略
    // map: map,
    // panel: "panel"
});

// 输入中心经纬度与当前POI点
function searchDriving(lnglat, poi) {
    return new Promise((resolve, reject) => {
        // 高德驾车路径查询，一天只有5000配额
        driving.search(new AMap.LngLat(lnglat[0], lnglat[1]), new AMap.LngLat(poi.X, poi.Y), (status, result) => {
            // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            if (status === 'complete') {
                resolve(result)
            } else {
                console.log("error", result)
            }
        });
    });
}


// 直接按照中心点与半径进行筛选
// 输入中心点的经纬度坐标（gcj02坐标系）与用户选择的半径（单位m）
async function getCirclePOIs(circleLocation, circleRadius) {


    // 根据中心经纬度与半径获取POI
    var curnum = 0;
    var allPOILength = allPOI.length;
    for (var i = 0; i < allPOILength; i++) {
        // var curLocationX = allPOI[i].X;
        // var curLocationY = allPOI[i].Y;
        var tempDistance = AMap.GeometryUtil.distance(circleLocation, allPOI[i].lnglat);
        if (tempDistance < circleRadius) {
            allPOI[i].distance = tempDistance;

            // // 高德驾车路径，获取通行时间
            // const res = await searchDriving(circleLocation,allPOI[i]);
            // var res_distance = res.routes[0].distance;  //距离单位：m
            // var res_time = res.routes[0].time;  //时间单位：s
            // allPOI[i].distance2 = res_distance;
            // allPOI[i].time = res_time;


            // // 根据起终点经纬度规划驾车导航路线
            // driving.search(new AMap.LngLat(circleLocation[0], circleLocation[1]), new AMap.LngLat(allPOI[i].X, allPOI[i].Y), function (status, result,) {
            //     // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            //     if (status === 'complete') {

            //         var res_distance = result.routes[0].distance;  //距离单位：m
            //         var res_time = result.routes[0].time;  //时间单位：s
            //         console.log(res_distance, res_time);

            //         // console.log(res_distance, res_time);
            //         // log.success('绘制驾车路线完成')
            //     } else {
            //         console.log("error", result)
            //         // log.error('获取驾车数据失败：' + result)
            //     }
            // });


            myJson[curnum] = allPOI[i];
            curnum++;
        }
    }

    // 设置标签大小（此时已经按照评论数降序排列了）
    var myJsonLength = Object.keys(myJson).length;
    for (var i = 0; i < myJsonLength; i++) {
        // 统一字体
        myJson[i].typeface = "Times New Roman";
        // 统一字重
        myJson[i].fontWeight = "400";
        // 开始设置大小
        if (i < myJsonLength / 5) {
            myJson[i].fontSize = 45;
            myJson[i].level = "one";
        }
        else if (i < myJsonLength / 5 * 2) {
            myJson[i].fontSize = 35;
            myJson[i].level = "two";
        }
        else if (i < myJsonLength / 5 * 3) {
            myJson[i].fontSize = 25;
            myJson[i].level = "three";
        }
        else if (i < myJsonLength / 5 * 4) {
            myJson[i].fontSize = 15;
            myJson[i].level = "four";
        }
        else {
            myJson[i].fontSize = 7;
            myJson[i].level = "five";
        }
    }

    // 按距离升序排列
    function up(a, b) {
        return a.distance - b.distance
    }
    // sort 会直接对原数据排序
    myJson.sort(up);


    // 设置标签颜色（此时已经按照距离升序了）（分位数分类法，每一类里要素数量一致）
    for (var i = 0; i < myJsonLength; i++) {
        if (i < myJsonLength / 5) {
            myJson[i].fontColor = "rgb(65,224,208)";  // 绿
        }
        else if (i < myJsonLength / 5 * 2) {
            myJson[i].fontColor = "rgb(143,207,193)";
        }
        else if (i < myJsonLength / 5 * 3) {
            myJson[i].fontColor = "rgb(203,163,151)";
        }
        else if (i < myJsonLength / 5 * 4) {
            myJson[i].fontColor = "rgb(241,94,87)";
        }
        else {
            myJson[i].fontColor = "rgb(255,0,0)";  // 红
        }
    }
    // // 设置标签颜色（此时已经按照距离升序了）（按距离数值分类）
    // for (var i = 0; i < myJsonLength; i++) {
    //     if (myJson[i].distance < 1000) {
    //         myJson[i].fontColor = "rgb(65,224,208)";  // 绿
    //     }
    //     else if (myJson[i].distance < 2000) {
    //         myJson[i].fontColor = "rgb(143,207,193)";
    //     }
    //     else if (myJson[i].distance < 3000) {
    //         myJson[i].fontColor = "rgb(203,163,151)";
    //     }
    //     else if (myJson[i].distance < 4000) {
    //         myJson[i].fontColor = "rgb(241,94,87)";
    //     }
    //     else {
    //         myJson[i].fontColor = "rgb(255,0,0)";  // 红
    //     }
    // }


    console.log(myJson);

}

