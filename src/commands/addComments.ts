
import { ExtensionContext,Position,Range,window,Selection ,l10n} from 'vscode';
import * as vscode from 'vscode'; 
import { getCurrentDocument } from '../utils/getCurrentDocument';
import { getPathFromJson } from '../utils/getPathFromJson';
import { getDocumentRelativePath } from '../utils/getDocumentRelativePath';
import { updateJsonKeyComments } from '../utils/updateJsonKeyComments';
import { getJsonKeyComments } from '../utils/getJsonKeyComments';

 
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
		const currentDocument = getCurrentDocument()
		if(!currentDocument){
			return
		} 
		// 1. 获取所点击的JSON Key的路径
		const jsonpath = getPathFromJson(currentDocument.getText(),{
			line:rang[0].line+1,
			column:rang[0].character+1
		})
		if(!jsonpath) return 

		const docRelPath = getDocumentRelativePath(currentDocument)!

		// 2. 获取当前
		const comments =await  vscode.window.showInputBox({ 
			prompt: l10n.t("Enter Comment Content for <{0}>:",jsonpath),
			placeHolder: l10n.t('Enter Comment'),
			value: getJsonKeyComments(docRelPath,jsonpath)
		});
		if(!comments) return

		// 3. 更新注释到文件
		await updateJsonKeyComments(docRelPath,jsonpath,comments)
  
	}
}

