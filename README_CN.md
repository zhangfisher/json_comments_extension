# json-comments

[中文](./README_CN.md) | [English](./README.md) 

为任意`JSON`文件添加自定义注释，效果如下：

![](./preview.gif)

## 安装

打开`VSCode`扩展，搜索`JsonComments`，然后安装即可。

[链接](https://marketplace.visualstudio.com/items?itemName=wxzhang.json-comments&ssr=false#review-details)

## 使用方法

- **添加注释**

打开当前工作区任意`JSON`文件，在任意键上悬停，在悬停提示中点击`Add Comment`，即可输入并添加注释。
添加的注释将以`CodeLens`的形式显示在所注释的键上方。

- **删除注释**

直接点击注释内容，选择`删除注释`即可。

- **清空注释**

按下`Ctrl+Shift+P`，输入`Clear All Comments`，即可清空当前文档的所有注释。


## 问题


- **注释内容保存在哪里？**

默认情况下，注释内容保存在当前工作区的`package.json`文件中的`json-comments`中。
如果你想要修改保存位置，可以工作区配置中进行修改。

- **如何更改注释保存位置?**

修改工作区配置`JsonComments`中的`Save File`和`Entry Key`即可。
例如：

```js
// 保存在当前工作区的comments.json文件中
"json-comments": {
    "Save File": "comments.json",
    "Entry Key": ""                
}
```
 
## 推荐

[VoerkaI18n](https://github.com/zhangfisher/voerka-i18n) - Internationalization solution for 'Javascript/Typescript/Vue/React/Solidjs/SvelteJs/ReactNative'

 