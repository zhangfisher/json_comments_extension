import * as vscode from 'vscode';
import { getConfig } from '../utils/getConfig';
import { JsonCommentsConfigs } from '../types';
import { getDocumentComments } from '../utils/getDocumentComments';
import { traverseJson,ABORT } from '../utils/traverseJson';
import { isNothing } from 'flex-tools/typecheck/isNothing';

/**
 * CodelensProvider
 */
export class jsonCommentsCodeLensProvider implements vscode.CodeLensProvider {

	private codeLenses: vscode.CodeLens[] = [];
	private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
	public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

	constructor() {
		// 监听配置变化
		vscode.workspace.onDidChangeConfiguration((_) => {
			this._onDidChangeCodeLenses.fire();
		});
	}

	public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
		if (getConfig<Boolean>(JsonCommentsConfigs.Enable)) {
			this.codeLenses = [];			
			// 读取当前文档的注释 = {[jsonpath]:comment,...,[jsonpath]:comment}
			const comments = getDocumentComments(document)
			// 遍历注释
			traverseJson(document.getText(), ({jsonpath,line,column}) => {
				if(jsonpath in comments){
					const commentsText = comments[jsonpath]
					if(!commentsText) return					
					const range = new vscode.Range(new vscode.Position(line-1, column-1), new vscode.Position(line-1, column-1));
					this.codeLenses.push(new vscode.CodeLens(range, {
						title: "$(panel-close)",
						command: 'json-comments.removeComments'			// 点击可以修改
					}));
					this.codeLenses.push(new vscode.CodeLens(range, {
						title: commentsText,
						command: 'json-comments.removeComments'			// 点击可以修改
					}));
					
					delete comments[jsonpath]
				}
				if(isNothing(comments))	return ABORT 			  
			})	
			return this.codeLenses;
		}
		return [];
	}

	public resolveCodeLens(codeLens: vscode.CodeLens, token: vscode.CancellationToken) {
		//if (vscode.workspace.getConfiguration("codelens-sample").get("enableCodeLens", true)) {
			codeLens.command = {
				title: "Codelens provided by sample extension",
				tooltip: "Tooltip provided by sample extension",
				command: "codelens-sample.codelensAction",
				arguments: ["Argument 1", false]
			};
			return codeLens;
		//}
		return null;
	}
}
export default (context: vscode.ExtensionContext) => {
	return new jsonCommentsCodeLensProvider()
}