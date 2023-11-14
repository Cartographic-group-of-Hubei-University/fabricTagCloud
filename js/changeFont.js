// 改变字体事件


// 初始化下拉框
function initFontSelection() {
    var selectElement = document.getElementById("oneFontSize");
    for (var i = 47; i >= 2; i -= 2) {
        var optionElement = document.createElement("option");
        optionElement.value = i;
        optionElement.text = i;
        selectElement.appendChild(optionElement);
    }
    selectElement.selectedIndex = 1;

    var selectElement = document.getElementById("twoFontSize");
    for (var i = 47; i >= 2; i -= 2) {
        var optionElement = document.createElement("option");
        optionElement.value = i;
        optionElement.text = i;
        selectElement.appendChild(optionElement);
    }
    selectElement.selectedIndex = 6;

    var selectElement = document.getElementById("threeFontSize");
    for (var i = 47; i >= 2; i -= 2) {
        var optionElement = document.createElement("option");
        optionElement.value = i;
        optionElement.text = i;
        selectElement.appendChild(optionElement);
    }
    selectElement.selectedIndex = 11;

    var selectElement = document.getElementById("fourFontSize");
    for (var i = 47; i >= 2; i -= 2) {
        var optionElement = document.createElement("option");
        optionElement.value = i;
        optionElement.text = i;
        selectElement.appendChild(optionElement);
    }
    selectElement.selectedIndex = 16;

    var selectElement = document.getElementById("fiveFontSize");
    for (var i = 47; i >= 2; i -= 2) {
        var optionElement = document.createElement("option");
        optionElement.value = i;
        optionElement.text = i;
        selectElement.appendChild(optionElement);
    }
    selectElement.selectedIndex = 20;

    //============================================================================
    var selectElement = document.getElementById("fontWeight");
    for (var i = 1000; i >= 100; i -= 100) {
        var optionElement = document.createElement("option");
        optionElement.value = i;
        optionElement.text = i;
        selectElement.appendChild(optionElement);
    }
    selectElement.selectedIndex = 6;


}

// 字体改变交互
function changeFontInteractive() {
    // 触发改变字号事件
    document.getElementById("oneFontSize").addEventListener("change", changeFontSize);
    document.getElementById("twoFontSize").addEventListener("change", changeFontSize);
    document.getElementById("threeFontSize").addEventListener("change", changeFontSize);
    document.getElementById("fourFontSize").addEventListener("change", changeFontSize);
    document.getElementById("fiveFontSize").addEventListener("change", changeFontSize);


    // 触发改变字体事件
    document.getElementById("typeface").addEventListener("change", changetypeface);


    // 触发改变字重事件
    document.getElementById("fontWeight").addEventListener("change", changeFontWeight);
}

// 改变字号事件
function changeFontSize() {
    var oneFontSize = document.getElementById("oneFontSize").value;
    var twoFontSize = document.getElementById("twoFontSize").value;
    var threeFontSize = document.getElementById("threeFontSize").value;
    var fourFontSize = document.getElementById("fourFontSize").value;
    var fiveFontSize = document.getElementById("fiveFontSize").value;
    // console.log(oneFontSize, twoFontSize, threeFontSize, fourFontSize, fiveFontSize);

    // 更新字号大小
    var myJsonLength = Object.keys(myJson).length;
    for (var i = 0; i < myJsonLength; i++) {
        if (myJson[i].level == "one") {
            myJson[i].fontSize = oneFontSize;
        }
        else if (myJson[i].level == "two") {
            myJson[i].fontSize = twoFontSize;
        }
        else if (myJson[i].level == "three") {
            myJson[i].fontSize = threeFontSize;
        }
        else if (myJson[i].level == "four") {
            myJson[i].fontSize = fourFontSize;
        }
        else {
            myJson[i].fontSize = fiveFontSize;
        }
    }
    // console.log(myJson);
    // 清除canvas已绘制的元素
    canvas.clear();
    // 重新设置其背景
    canvas.setBackgroundColor('rgb(0,0,0)');
    // 开始生成标签云
    // 绘制中心点 
    drawCenter();
    // 初次绘制文本
    initDraw();

    // 使用当前选中的色带
    // console.log(nowColorScheme);
    changeColor(nowColorScheme);

}

// 改变字体事件
function changetypeface() {
    var typeface = document.getElementById("typeface").value;
    // console.log(typeface);
    // 更新字体
    var myJsonLength = Object.keys(myJson).length;
    for (var i = 0; i < myJsonLength; i++) {
        myJson[i].typeface = typeface;
    }
    // console.log(myJson);
    // 清除canvas已绘制的元素
    canvas.clear();
    // 重新设置其背景
    canvas.setBackgroundColor('rgb(0,0,0)');
    // 开始生成标签云
    // 绘制中心点 
    drawCenter();
    // 初次绘制文本
    initDraw();

    // 使用当前选中的色带
    changeColor(nowColorScheme);
}

// 改变字重事件
function changeFontWeight() {
    var theFontWeight = document.getElementById("fontWeight").value;
    // console.log(typeface);
    // 更新字体
    var myJsonLength = Object.keys(myJson).length;
    for (var i = 0; i < myJsonLength; i++) {
        myJson[i].fontWeight = theFontWeight;
        canvas.item(i).set({ fontWeight: theFontWeight });
    }
    // // 清除canvas已绘制的元素
    // canvas.clear();
    // // 重新设置其背景
    // canvas.setBackgroundColor('rgb(0,0,0)');
    // // 开始生成标签云
    // // 绘制中心点 
    // drawCenter();
    // // 初次绘制文本
    // initDraw();

    // // 使用当前选中的色带
    // changeColor(nowColorScheme);
    canvas.renderAll();
}