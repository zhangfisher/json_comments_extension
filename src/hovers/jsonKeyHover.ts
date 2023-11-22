/**
 * 
 * 注册一个Hover，当鼠标悬停在JSON的键名时位置时，显示一个提示框
 * 
 * @param context 
 * @param canLanguages 
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

			// 获取 JSON 键的文本
			const jsonKey = document.getText(jsonRange);

			// 根据 JSON 键返回相应的 Hover 内容
			const addComments = new MarkdownString(`[添加注释1](command:json-comments.addComments?${encodeURIComponent(JSON.stringify({key:jsonKey,rang:jsonRange}))}): ${jsonKey}`,true)
			addComments.isTrusted = true;
			 return new Hover(addComments);
 
        }
    });
    context.subscriptions.push(hoverProviderDisposable);
}  