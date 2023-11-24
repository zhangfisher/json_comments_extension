
import { ExtensionContext,Position,Range,window } from 'vscode';
import * as vscode from 'vscode'; 
import { getCurrentDocument } from '../utils/getCurrentDocument';


/**
 * 增加注释
 * 
 * @param {string} key  点击时的JSON Key
 * @param {[{}]}  rang 
 * 
 */
export function addComments(context: ExtensionContext) {
    return function({key,rang}:{key:string,rang:any[]}){ 
		const editor = window.activeTextEditor;
		const currentDocument = getCurrentDocument()

 		window.showInformationMessage('添加注释键：'+key,"最近的键：");
	}
}



