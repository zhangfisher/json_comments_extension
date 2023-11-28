import * as vscode from 'vscode';
import { addComments } from './addComments'
import { clearComments } from './clearComments'
import { editComments } from './editComments'


export default (context: vscode.ExtensionContext) => { 
	context.subscriptions.push(...[
		vscode.commands.registerCommand('json-comments.addComments',addComments(context)),
		vscode.commands.registerCommand('json-comments.clearComments',clearComments(context)),   
		vscode.commands.registerCommand('json-comments.editComments',editComments(context))   
	])
}
