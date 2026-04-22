# Legacy 界面重构演示

## 文件说明

### 演示用代码文件

#### `legacy-old.css` - 重构前的旧 CSS
- 典型的 legacy 软件界面样式
- 包含过时的 CSS 写法：
  - `!important` 滥用
  - IE 专有语法（`expression`, `filter`）
  - 硬编码颜色和尺寸
  - 高特异性选择器
  - 冗余的 utility 类

#### `legacy-new.vue` - 重构后的 Vue 3 组件
- 现代 Vue 3 + Vite 风格
- 使用 `<script setup>` 语法
- CSS 变量定义设计系统
- 语义化的类名
- 响应式布局
- 可复用的组件结构

### 界面截图

#### `legacy-ui-old.svg` - 旧界面示意图
展示了一个典型的 legacy 软件界面：
- 黄色渐变的窗口标题栏
- 灰色背景和立体边框
- 密集的数据表格
- 过时的按钮样式

#### `legacy-ui-new.svg` - 重构后界面示意图
展示了现代化的界面设计：
- 蓝色渐变的简洁标题栏
- 圆角和阴影效果
- 清爽的表格设计
- 状态徽章和进度条

## 演示流程

### 1. 多模态附件输入
用户拖入：
- 旧软件的 `.exe` 截图（Image）
- 混乱的旧 CSS 源码（Text）

触发交错序列协议，系统同时处理图像和文本输入。

### 2. VLM 解析与空间锚定
AI 分析截图，提取：
- UI 组件结构（窗口、菜单、按钮、表格）
- 元素的坐标和尺寸
- 颜色方案和样式特征

输出高语义的布局 JSON 描述。

### 3. 动态变量注入
系统通过 AST 提取发现需求模板中的动态变量：
```
目标设计系统：{{ Target_Design_System }}
技术栈：{{ Tech_Stack }}
响应式：{{ Responsive_Required }}
```

自动注入用户预设："Vite + Vue3 极简风格"

### 4. 输出
生成可直接使用的现代前端代码：
- 完整的 Vue 3 单文件组件
- 使用 CSS 变量的设计系统
- 语义化的 HTML 结构
- 响应式布局支持

## 实际演示建议

### 方案 A：使用真实截图
1. 截取实际 legacy 软件界面
2. 复制真实的旧代码
3. 用 AI 重构生成新代码
4. 实时演示效果

### 方案 B：使用提供的 SVG 示意图
1. 幻灯片已内置 `legacy-ui-old.svg` 和 `legacy-ui-new.svg`
2. 代码示例已嵌入幻灯片中
3. 直接播放幻灯片即可演示完整流程

## 代码验证

提供的 `legacy-new.vue` 是一个功能完整的 Vue 3 组件：

```bash
cd slides
bun install
bun run dev
```

访问 `http://localhost:5174`，导航到第 9 张幻灯片（Legacy 界面重构演示）查看效果。
