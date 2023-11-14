// 目前使用的色带编号
nowColorScheme = 9

// 存储色带变量
colorScheme = [
    ["rgba(239, 243, 255, 1)", "rgba(189, 215, 231, 1)", "rgba(107, 174, 214, 1)", "rgba(49, 130, 189, 1)", "rgba(8, 81, 156, 1)"],
    ["rgba(240, 249, 232, 1)", "rgba(186, 228, 188, 1)", "rgba(123, 204, 196, 1)", "rgba(67, 162, 202, 1)", "rgba(8, 104, 172, 1)"],
    ["rgba(5, 113, 176, 1)", "rgba(146, 197, 222, 1)", "rgba(247, 247, 247, 1)", "rgba(244, 165, 130, 1)", "rgba(202, 0, 32, 1)"],
    ["rgba(77, 119, 153, 1)", "rgba(127, 164, 196, 1)", "rgba(197, 200, 212, 1)", "rgba(212, 142, 149, 1)", "rgba(181, 81, 91, 1)"],
    ["rgba(69, 150, 230, 1)", "rgba(143, 176, 222, 1)", "rgba(196, 188, 199, 1)", "rgba(192, 101, 107, 1)", "rgba(166, 0, 0, 1)"],
    ["rgba(43, 131, 186, 1)", "rgba(171, 221, 164, 1)", "rgba(255, 255, 191, 1)", "rgba(253, 174, 97, 1)", "rgba(215, 25, 28, 1)"],
    ["rgba(255, 238, 153, 1)", "rgba(212, 217, 76, 1)", "rgba(119, 180, 108, 1)", "rgba(61, 135, 153, 1)", "rgba(43, 87, 217, 1)"],
    ["rgba(211, 147, 103, 1)", "rgba(234, 178, 140, 1)", "rgba(245, 235, 212, 1)", "rgba(193, 209, 219, 1)", "rgba(131, 155, 168, 1)"],
    ["rgba(255, 241, 162, 1)", "rgba(225, 214, 170, 1)", "rgba(163, 163, 166, 1)", "rgba(101, 116, 154, 1)", "rgba(0, 68, 159, 1)"],
    ["rgb(65,224,208)", "rgb(143,207,193)", "rgb(203,163,151)", "rgb(241,94,87)", "rgb(255,0,0)"],
];

// 色带改变交互
function changeColorInteractive() {

    var allColorSchemeDiv = document.getElementById("colorSchemes").getElementsByTagName("div");
    var allColorSchemeDivLength = allColorSchemeDiv.length;

    // 批量添加鼠标事件监控
    // 选中第k个色带
    for (let k = 0; k < allColorSchemeDivLength; k++) {
        allColorSchemeDiv[k].addEventListener("mousedown", function (e) { changeColor(k); });
    }
}


// 选择第nowColor个色带
function changeColor(nowColor) {
    nowColorScheme = nowColor;
    var allColorSchemeDiv = document.getElementById("colorSchemes").getElementsByTagName("div");
    var allColorSchemeDivLength = allColorSchemeDiv.length;
    // 在选中色带的外侧浮现边框，其他色带消除边框
    for (var ii = 0; ii < allColorSchemeDivLength; ii++) {
        if (ii == nowColor) {
            allColorSchemeDiv[ii].style.border = "2px solid rgb(221,221,221)";
        }
        else {
            allColorSchemeDiv[ii].style.border = "2px solid rgb(255,255,255)";
        }
    }
    // 逐一改变标签的色带
    var myJsonLength = Object.keys(myJson).length;
    for (var i = 1; i < myJsonLength + 1; i++) {
        if (i < myJsonLength / 5) {
            canvas.item(i).set({ fill: colorScheme[nowColor][0] });
            document.getElementById("legendColor1").style.backgroundColor = colorScheme[nowColor][0];
        }
        else if (i < myJsonLength / 5 * 2) {
            canvas.item(i).set({ fill: colorScheme[nowColor][1] });
            document.getElementById("legendColor2").style.backgroundColor = colorScheme[nowColor][1];
        }
        else if (i < myJsonLength / 5 * 3) {
            canvas.item(i).set({ fill: colorScheme[nowColor][2] });
            document.getElementById("legendColor3").style.backgroundColor = colorScheme[nowColor][2];
        }
        else if (i < myJsonLength / 5 * 4) {
            canvas.item(i).set({ fill: colorScheme[nowColor][3] });
            document.getElementById("legendColor4").style.backgroundColor = colorScheme[nowColor][3];
        }
        else {
            canvas.item(i).set({ fill: colorScheme[nowColor][4] });
            document.getElementById("legendColor5").style.backgroundColor = colorScheme[nowColor][4];
        }
    }
    // 更新画布，重绘
    canvas.renderAll();
}

// 色带窗口初始化
function initcolorScheme() {
    var allColorSchemeDiv = document.getElementById("colorSchemes").getElementsByTagName("div");
    var allColorSchemeDivLength = allColorSchemeDiv.length;

    for (var ii = 0; ii < allColorSchemeDivLength; ii++) {
        var colorSpans = allColorSchemeDiv[ii].getElementsByTagName("span");
        for (var i = 0; i < 5; i++) {
            colorSpans[i].style.backgroundColor = colorScheme[ii][i];
        }
    }
}
