
import * as vscode from 'vscode';
import registerCommands from './commands';
import registerHovers from './hovers';
import registerCodeLens from './codeLens';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	registerCommands(context)
	registerHovers(context)
	registerCodeLens(context)

} 
export function deactivate() {}
