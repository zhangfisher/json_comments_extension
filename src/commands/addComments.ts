
import { ExtensionContext,Position,Range,window,Selection } from 'vscode';
import * as vscode from 'vscode'; 
import { getCurrentDocument } from '../utils/getCurrentDocument';
import { getPathFromJson } from '../utils/getPathFromJson';
import { getDocumentRelativePath } from '../utils/getDocumentRelativePath';
import { updateDocumentComments } from '../utils/updateDocumentComments';


export interface AddCommentsParams{
	key:string,
	rang:[
		Position,
		Position 
	]
}

/**
 * 增加注释
 * 
 * @param {string} key  点击时的JSON Key
 * @param {[{}]}  rang 
 * 
 */
export function addComments(context: ExtensionContext) {
    return async function({key,rang}:AddCommentsParams){ 
		const editor = window.activeTextEditor;
		const currentDocument = getCurrentDocument()
		if(!currentDocument){
			return
		} 


		// 1. 获取所点击的JSON Key的路径
		const jsonpath = getPathFromJson(currentDocument.getText(),{
			line:rang[0].line+1,
			column:rang[0].character+1
		})
		
		const comments = await vscode.window.showInputBox({ placeHolder: `为<${jsonpath}>输入注释内容：` });
		if(!comments) return

		const docRelPath = getDocumentRelativePath(currentDocument)
		// 2. 更新当前文档的json schema
		updateDocumentComments(docRelPath!,jsonpath!,{
			markdownDescription: comments
		})

		// 4. 更新到当前文档的指定 jsonpath 的注 


 		//window.showInformationMessage(`添加注释成功：${jsonpath}：${comments}`);
	}
}

