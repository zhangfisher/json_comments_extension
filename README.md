# json-comments

[中文](./README_CN.md) | [English](./README.md) 

Add custom comments to any JSON file with ease.

![](./preview.gif)

![](./preview2.gif)

## Install

Open `VSCode` extension panel,search for `JsonComments`,then install it.

[Link](https://marketplace.visualstudio.com/items?itemName=wxzhang.json-comments&ssr=false#review-details)

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


- **Will the comments modify the original JSON file?**

No, all comments are by default saved in the <json-comments> section of the package.json file. The original JSON file remains unchanged.

- **Will the comments be lost after committing to Git?**

No, as long as you include the file where the comments are saved in the commit, the comments will not be lost.

Can other team members see the comments?
Yes, other team members can see the comments by installing the JsonComments plugin.

- **Will the comments be lost when the JSON file is edited?**

The comments will not be lost as long as the JSON path of the commented key remains unchanged. JsonComments saves the comments based on the JSON path as the key.

- **Will moving the JSON file cause the comments to be lost?**

In the current version, moving the file will cause the comments to become invalid. However, the comment contents are still saved in the package.json file (by default), and you can restore them by manually modifying the corresponding JSON path. The next version will automatically handle this when detecting file movements.


## Recommendations

[VoerkaI18n](https://github.com/zhangfisher/voerka-i18n) - Internationalization solution for 'Javascript/Typescript/Vue/React/Solidjs/SvelteJs/ReactNative'






