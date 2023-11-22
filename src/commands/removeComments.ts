/**
 * 增加注释
 * 
 */
import * as vscode from 'vscode';

 


export function removeComments(context: vscode.ExtensionContext) {
    return () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('translate-markdown-sites file!')
	}
}



