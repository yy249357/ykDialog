ykDialog
======

A popover javascript plug-in.

Install
-------

* Clone the repo: `git clone https://github.com/yy249357/ykDialog.git`.

Example
-----------

Here is a simple example.

**页面加载中**

![页面加载中]( https://raw.githubusercontent.com/yy249357/project/master/screenshots/1.jpg)

```js
ykDialog = dialog({
    skin: 1,
    icon: 'ok',
    maskClose: true,
    content: '图片上传中',
    animate: true
})
```
**白色皮肤带按钮**

![页面加载中]( https://raw.githubusercontent.com/yy249357/project/master/screenshots/2.jpg)

```js
ykDialog = dialog({
    width: '90vw',
    skin: 2,
    maskClose: true,
    title: "确认是否删除?",
    buttons: [
        {
            color: "blue",
            text: "取消",
            callback: function(){
                return false
            }
        },
        {
            color: "blue",
            text: "确定",
            callback: function(){
                return true
            }
        }
    ],
    animate: true
})
```
**黑色皮肤prompt**

![页面加载中]( https://raw.githubusercontent.com/yy249357/project/master/screenshots/3.jpg)

```js
ykDialog = dialog({
    width: '90vw',
    title: "身份验证",
    skin: 1,
    maskClose: true,
    content: "为了您的信息安全，请输入身份证号码进行身份验证",
    inputAttr: {
        type: "tel",
        placeholder: "请输入您的身份证号码",
    },
    buttons: [
        {
            color: "green",
            text: "取消",
            callback: function(){
                return true
            }
        },
        {
            color: "red",
            text: "确定",
            callback: function(val){
                return true
            }
        }
    ]
})
```
**白色皮肤文本框**

![页面加载中]( https://raw.githubusercontent.com/yy249357/project/master/screenshots/4.jpg)

```js
ykDialog = dialog({
    width: '90vw',
    skin: 2,
    maskClose: true,
    title: '天地无极',
    content: '挑选股票、债券或基金是一个技术活，却不是一门需要精确的科学。这通常意味着凡事并不是多多益善，我们需要放过一些事实和数据。',
    style: "",
    animate: true
})
```


API Document
--------

**skin: 皮肤**
说明: 1 白色   2黑色
例:
```
skin: 1
```

**width: 弹出框宽度**
说明: 支持px、%、rem、vw等css单位
例:
```
width: "auto"
```

**icon: 图标类型**
说明: "ok" 确定框, "loding" 加载框,  "bubble" 气泡框,  "warning" 警告框
例:
```
icon: "ok"
```

**delay: 自动关闭**
说明: 多少秒后自动关闭弹出框
例:
```
delay: 1
```

**title: 弹出窗标题**
例:
```
title: "天地无极"
```

**content: 弹出窗内容**
例:
```
content: "挑选股票、债券或基金是一个技术活，却不是一门需要精确的科学。这通常意味着凡事并不是多多益善，我们需要放过一些事实和数据。"
```

**style: 内容样式**
说明: 必须和content选项配合使用, 可以通过css自定义样式
例:
```
style: "font-size: 20px;color: red; line-height:30px"
```

**inputAttr: 表单属性**
说明: 可以添加各种input属性, 如placeholder、type、maxlength等
例:
```
inputAttr: {type: "text", maxlength: 10}
```

**maskOpacity: 遮罩层透明度**
说明: 默认0.4
例:
```
maskOpacity: .6
```

**maskClose: 点击遮罩层是否关闭弹出窗**
说明: 默认不关闭
例:
```
maskClose: true
```

**animate: 是否开启弹出动画**
说明: 默认开启
例: animate: true

**delayCallback: 弹出窗自动关闭后的回调函数**
例:
```
delayCallback: function(){
    console.log('我是回调函数')
}
```

**buttons: 按钮组**
说明: buttons类型是数组, 数组成员是对象, 包括color按钮颜色、text按钮文本、callback按钮回调函数等, 其中callback返回值为true时点击按钮弹出窗关闭。
例:
```
buttons: [
    {
        color: "blue",
        text: "取消",
        callback: function(){
            return true
        }
    },
    {
        color: "blue",
        text: "确定",
        callback: function(){
            return true
        }
    }
]
```

