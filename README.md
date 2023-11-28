# json-comments

[中文](./README_CN.md) | [English](./README.md) 

Add custom comments to any JSON file with ease.

![](./preview.gif)

## Usage

- Add comments

Open any JSON file in your current workspace, hover over any key, and click on Add Comment in the hover tooltip. You can then input your comment, and it will be added. The comments will be displayed above the commented keys in the form of CodeLens.

- Remove comments

Simply click on the comment content and select Remove Comment to delete it.- Clear all commentsPress Ctrl+Shift+P, type Clear All Comments, and select it to remove all comments in the current document.

## Questions

- **Where are the comment contents saved?**

By default, the comment contents are saved in the json-comments section of the package.json file in your current workspace. If you want to modify the save location, you can do so in the workspace configuration.

- **How can I change the comment save location?**

Modify the Save File and Entry Key in the workspace configuration for JsonComments.
 For example:js
 
 ```js
 // Save comments in a file named comments.json in the current workspace
 "json-comments": {    
    "Save File": "comments.json",    
    "Entry Key": ""
 }

 ```
## Recommendations

[VoerkaI18n](https://github.com/zhangfisher/voerka-i18n) - Internationalization solution for 'Javascript/Typescript/Vue/React/Solidjs/SvelteJs/ReactNative'






