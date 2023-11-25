
import { ExtensionContext,Position,Range,window,Selection } from 'vscode';
import * as vscode from 'vscode'; 
import { getCurrentDocument } from '../utils/getCurrentDocument';
import { getPathFromJson } from '../utils/getPathFromJson';
import { getDocumentRelativePath } from '../utils/getDocumentRelativePath';


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
    return function({key,rang}:AddCommentsParams){ 
		const editor = window.activeTextEditor;
		const currentDocument = getCurrentDocument()
		if(!currentDocument){
			return
		}
		// 1. 获取所点击的JSON Key的路径
		const path = getPathFromJson(currentDocument.getText(),{
			line:rang[0].line+1,
			column:rang[0].character+1
		})
		const docRelPath = getDocumentRelativePath(currentDocument)

 		window.showInformationMessage('添加注释键：'+key,"路径:"+path);
	}
}

