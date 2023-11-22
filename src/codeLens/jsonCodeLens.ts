/**
 * 
 * 在JSON的键名位置显示一个CodeLens,显示该键名的注释数量
 * 
 * @param context 
 */


import { CancellationToken, commands, ExtensionContext, Hover, languages, MarkdownString, Position, Range, TextDocument, window } from "vscode";


let working: Set<String> = new Set();

function getHoverId(document: TextDocument, position: Position) {
    return  `${document.uri.toString()}-${position.line}-${position.character}`;
}

export function jsonKeyHover(context: ExtensionContext) {
    let hoverProviderDisposable = languages.registerHoverProvider('json', {
        async provideHover(document, position, token) {             
             // 获取当前鼠标位置的 JSON 令牌
			const jsonRange = document.getWordRangeAtPosition(position, /(?<=")([^"]*)(?="\s*:)/);
			if (!jsonRange) {
				return;
			}

			// 计算当前键所在位置的特征，用于标识当前键
			// 标识该键的特征的方法：
			// 1. 获取当前键在当前文档中的位置，如scripts.build。该方法需要解析整个文档，效率较低,并且如果文档结构不规范时无法解析，但是可以保证唯一性并且比较友好



			// 获取 JSON 键的文本
			const jsonKey = document.getText(jsonRange);

			// 根据 JSON 键返回相应的 Hover 内容
			const addComments = new MarkdownString(`[添加注释](command:json-comments.addComments?${encodeURIComponent(JSON.stringify({key:jsonKey,rang:jsonRange}))}): ${jsonKey}`,true)
			addComments.isTrusted = true;
			 return new Hover(addComments);
 
        }
    });
    context.subscriptions.push(hoverProviderDisposable);
}  