/**
 * 增加注释
 * 
 */
import { ExtensionContext,Range,window } from 'vscode';

 


export function addComments(context: ExtensionContext) {
    return function({key,rang}:{key:string,rang:Range}){
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		console.log("rang=",rang)
		window.showInformationMessage('添加注释键：'+key);
	}
}



