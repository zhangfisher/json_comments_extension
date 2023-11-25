/**
 * 
 * 注册一个Hover，当鼠标悬停在JSON的键名时位置时，显示一个提示框
 * 
 * @param context 
 * @param canLanguages 
 */


import {  ExtensionContext, Hover, languages, MarkdownString, Position, Range, TextDocument, window } from "vscode";



export function jsonKeyHover(context: ExtensionContext) {
    let hoverProviderDisposable = languages.registerHoverProvider('json', {
        async provideHover(document, position, token) {             
             // 获取当前鼠标位置的JSON Key
			const jsonKeyRange = document.getWordRangeAtPosition(position, /(?<=")([^"]*)(?="\s*:)/);
			if (!jsonKeyRange) {
				return;
			}
			// 获取 JSON 键的文本
			const jsonKey = document.getText(jsonKeyRange);
			
			const cmds = [
				`[$(keybindings-add)添加注释](command:json-comments.addComments?${encodeURIComponent(JSON.stringify({key:jsonKey,rang:jsonKeyRange}))})`
			]

			// 根据 JSON 键返回相应的 Hover 内容
			const addComments = new MarkdownString(cmds.join(" "),true)
			addComments.isTrusted = true;
			return new Hover(addComments);
 
        }
    });
    context.subscriptions.push(hoverProviderDisposable);
}  