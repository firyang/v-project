# 内容

- 选择器
- 优先级
- 常用属性
- demo

# 选择器
## 常用选择器
```css
*{}
p{}
.wrap{}
div.wrap{}
#wrap{}
div,#main,.mycolor,p{}
ul li{}
div>p{}
:link
:visited
:hover
:active
:focus
```
## 复杂选择器
```css
+ 选择其后紧邻的一个兄弟元素
~ 选择其后所有满足条件的兄弟元素
ex：
<div id="d1">
  <p id="p1"></p>
  <p id="p2"></p>
  <p id="p3"></p>
  <input name="uid" value="">
</div>
#d1 #p1+p => p2
#d1 #p1~p => p2,p3

element[attr[=value]]
[name] => input
[name][value] => input
[id=d1] => d1
p[id=p2] => p2

:target //匹配被激活的锚点，经典应用切换图片
ex：
<div>
  <a href="#img1">图片</a>
  <a href="#img2">图片</a>
</div>
<div id="d2">
  <img id="img1" src="img/x.png">
  <img id="img2" src="img/y.png">
</div>
img{display:none;}
img:target{display:block;}

:first-child
:last-child
:nth-child(n[odd/even][an+b]) //ie不支持
:empty
:only-child

:not(selector)

::first-letter
::first-line
::selection //适用color,backgroud-color,cursor
```

# 优先级
```css
选择器优先级
元素    1
类       10
伪类    10
ID      100
内联    1000
选择器的权值加到一起，大的优先
权值相同，以后定义为主
important
```
# 单位
```css
px
pt=1/72in
em=16px
rem
```

# 颜色
```css
alpha 透明度
rgb(255,0,0)
rgba(255,0,0,.5)
十六进制颜色码 #ffffff
```

# 常用属性

## 尺寸
```css
width   
min-width   
max-width   
height   
min-height  
max-height  

overflow: visible/hidden/scroll/auto 
overflow-x,overflow-y 

页面中哪些元素允许设置尺寸属性？
1. 块级元素 div p h1-h6 ul ol dl 结构标记
2. 本身具备width和heitht属性的行内元素（img、table）
3. 行内块元素（表单控件，radio、checkbox除外）
4.大部分行内元素无法设置尺寸
```

## 边框
```css
border: size style color;   
border: none/0;
border-radius: px / pixe 

阴影
box-shadow: none/h-shadow v-shadow blur spread color inset;  
box-shadow:h v b s c i;
h 水平方向阴影距离
v 垂直方向阴影距离
b 模糊大小
s 阴影大小
c 颜色
i 内阴影

轮廓
outline:width style color;
outline:none/0
```

## 边距
```css
margin 外边距
margin:auto; 控制块级元素水平居中
margin-top/bottom/left/right
margin:v1 v2; -上下、左右
margin:v1 v2 v3; - 上、左右、下
margin:v1 v2 v3 v4; -上、右、下、左

自带外边距的元素：body,h1-h6,p,ul,ol,dl,dd,pre

box-sizing -指定盒模型的计算方式
box-sizing:content-box; - 默认盒模型计算方式
box-sizing:border-box; - 元素的尺寸包含border以及padding的值

解决子元素上外边距溢出问题：
div:before{
  content:"";
  display:table;
}
```

## 背景
```css
background-color:#000;
background-image:url(a.jpg);
background-repeat:repeat/no-repeat/repeat-x/repeat-y
background-size:
	width height;
	width% height%; -元素自己的高宽占比
	cover; - 将背景图等比放大，直到背景图完全覆盖到元素的所有区域为止
	contain; - 将背景图等比放大，直到背景图碰到元素的某一个边缘为止
background-attachment:scroll/fixed
background-position:
	x y;
	x% y%;
	left/center/right top/center/bottom
background:color url() repeat attachment position;

线性渐变/径向渐变/重复渐变
```

## 文本格式化
```css
font-family:Arial "黑体";
font-size: 16px;
font-weight: bold/normal
font-style: normal/italic
font-variant: normal/small-caps
font: style variant weight size family; //family必须
ex:
font: italic small-caps bold 24px "微软雅黑"

color - 文本颜色
text-align: left/right/center/justify - 行内块元素的水平对齐方式
text-decoration: none/underline/overline/line-through
line-height: 20px; - 行高
text-indent: 2em; - 首行缩进
text-shadow: h-shadow v-shadow blur color; 

text-align:justify;
:hover{ text-decoration: underline; }
text-indent:30px;
text-shadow:0 0 5px blue;
```

## 表格
```css
width/height
border
padding
background - color,image,gradient
text-*,font-*,color
vertical-align:top/middle/bottom

---table特殊属性---
border-collapse:separate/collapse
border-spacing:size/h-size v-size;
caption-side:top/bottom;
table-layout:auto/fixed
auto - 单元格的大小会适应内容
fixed - 单元格的尺寸取决于设定的值
```

## 浮动
```css
float:none/left/right;
clear:left/right/both;

解决浮动问题：
1. 父元素加上overflow:auto/hidden 属性
2. div:after{
  content:"";
  display:block;
  clear:both;
}
```

## 显示
```css
块级、行内、行内块
display: none/block/inline/inline-block/table

visibility: visible/hidden
visible, 默认值，元素可见
hidden，元素不可见，但仍占页面空间

透明度 opacity:0.0~1.0;
filter:alpha(opacity=50); //IE

vertical-align:top/middle/bottom/baseline; //img table支持持
```

## 光标
```css
cursor:default/pointer/crosshair/text/help/wait/not-allowed
```

## 列表
```css
list-style:none;
list-style-type:disc/circle/square/none;
list-style-image:url();
list-style-position:outside/inside;
list-style:type image position;
```

## 定位
```css
position:static/relative/absolute/fixed;
static，静态，默认
relative，相对定位
absolute，绝对定位，相对于离它最近的，已定位的元素。
fixed，固定定位，相对于body。
偏移属性：top/bottom/left/right 均为数字，只有定位元素才能使用

z-index:number; 
堆叠顺序，值越大越往上。
```

## before / after
```css
向某元素插入内容
:before/::before
:after/::after
属性：content:"..."/url();
```

## 弹性布局(css3)
```css
display:flex;
1.container attribute
flex-direction:row/row-reverse/column/column-reverse;
flex-wrap:wrap/nowrap;
flex-flow:row nowrap; 为前两个属性的缩写，默认为row nowrap
justify-content:flex-start/flext-end/center/space-around/space-between;
align-items:flex-start/flext-end/center/baseline/stretch;
2.items attribute
order:0; 值为整数, 定义排列顺序, 值越小越靠近起点
flex-grow: 0, 放大, 默认为0不放大
flex-shrink:1/0; 等比缩小
align-self:flex-start/flext-end/center/baseline/stretch/auto;
```
