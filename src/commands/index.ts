import * as vscode from 'vscode';
import { addComments } from './addComments'
import { removeComments } from './removeComments'


export default (context: vscode.ExtensionContext) => { 
	context.subscriptions.push(...[
		vscode.commands.registerCommand('json-comments.addComments',addComments(context)),
		vscode.commands.registerCommand('json-comments.removeComments',removeComments(context))   
	])
}
