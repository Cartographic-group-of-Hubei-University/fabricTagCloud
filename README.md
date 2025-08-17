# 中心型标签云（fabricTagCloud） V1.0

## 📖 项目简介

**fabricTagCloud** 是一个基于 **纯 JavaScript + Fabric.js + 高德地图 API** 的前端可视化项目，旨在提供直观的空间数据分析与可视化展示。  
项目主要功能包括：

- **地图展示 POI**：左侧窗口展示 **高德地图**，并在地图上用点标记 POI（兴趣点）。
- **圆形区域选择**：用户可以在地图上绘制圆形区域，单击【完成绘制】后，自动触发标签云生成。
- **中心型标签云生成**：根据绘制的区域范围，利用 **Fabric.js** 动态生成中心型标签云。
- **标签云样式编辑**：左侧窗口下方提供样式面板，支持实时修改标签云样式：
  - 标签渲染颜色（多种预设渲染）
  - 字号大小（五级字号可选）
  - 字体类型（默认微软雅黑）
  - 字重（100-1000）
- **交互性**：用户可以自由调整样式，实时查看标签云效果，便于数据可视化分析与展示。

该项目目前用于课题组业务场景，可直观展示地理空间数据与语义标签之间的关系，辅助科研分析和可视化演示。

---

## 🛠 技术栈

- **前端框架**：纯 JavaScript（Vanilla JS）
- **绘图工具**：Fabric.js
- **地图服务**：高德地图 API
- **DOM 操作**：jQuery

---

## 📂 项目结构

```text
fabricTagCloud/
│── index.html          # 主入口
│── css/                # 样式文件
│── js/                     # 存放第三方库 & 自定义脚本
│ ├── changeColor.js        # 颜色样式修改
│ ├── changeFont.js         # 字体样式修改
│ ├── dragControllerDiv.js  # 左右窗口拖拽
│ ├── fabric.js             # Fabric 第三方库
│ ├── getPOIs.js            # 获取范围内的 POI 数据
│ ├── initAMAP.js           # 初始化高德地图
│ ├── initTagCloud.js       # 初始化范围内的中心性标签云
│ ├── jquery.js             # jQuery 第三方库
│ └── showDetailsWindow.js  # 展示详情窗口
│── images/         # 图片、图标等资源
│── json/           # 存放 json 数据
│ └── chinapoi.json # POI 数据
│── README.md
```

---

## 🚀 运行方式

### 方式一：VSCode 插件（推荐）

1. 安装 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 插件
2. 在 VSCode 中右键 `index.html` → **Open with Live Server**
3. 浏览器会自动打开项目，支持完整功能（包括高德地图 API 调用）

### 方式二：直接用浏览器打开

- 直接双击 `index.html` 或者拖到浏览器中打开  
  ⚠️ 注意：部分功能（如调用高德 API）可能会因为跨域问题而不可用。

### 方式三：Node.js 本地服务

如果已安装 **Node.js**，可以使用 http-server 运行：

```bash
npm install -g http-server
http-server .
```

默认运行在 http://localhost:8080，可避免跨域问题，同时更适合开发与调试。

---

## 📦 依赖

- **Fabric.js**：用于生成标签云及可视化绘图。

- **高德地图 API**：提供地图服务与地理空间数据展示。

- **jQuery**：用于 DOM 操作和事件绑定。

📌 本项目的依赖库已放在 js/ 文件夹下，无需额外下载。

---

## 💡 功能说明

### 1. 地图展示与 POI 标记

- 左侧地图窗口默认显示指定区域的地图

- POI 信息通过数据点绘制在地图上，支持点击查看详细信息

### 2. 圆形区域选择

- 用户在地图上绘制圆形范围

- 单击完成后，触发 Fabric.js 标签云生成逻辑

- 圆心自动作为标签云的中心点

### 3. 标签云生成

- 根据圆形范围内的数据生成中心型标签云

- 标签根据权重或数量大小进行排布

- 标签云与地图实时联动，可随范围变化更新

### 4. 样式编辑面板

- 支持动态修改标签云的：字体颜色、字体大小、字体类型、字重

- 面板操作即时渲染标签云，无需刷新页面

### 5. 可视化交互

- 标签云可拖拽、缩放

- 支持多次绘制与撤销操作

- 提供良好的交互体验，方便科研分析与演示

---

## 🖼 效果展示

![效果图](./images/graphical_result.png)

## 📜 License

本项目仅供学习和课题组内部使用，禁止未经授权的商用。
