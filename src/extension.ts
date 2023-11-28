
import * as vscode from 'vscode';
import registerCommands from './commands';
import registerHovers from './hovers';
import registerCodeLens from './codeLens';
import * as l10n from '@vscode/l10n';

// Load the translations for the current locale
if (process.env['EXTENSION_BUNDLE_PATH']) {
	l10n.config({
		fsPath: process.env['EXTENSION_BUNDLE_PATH']
	});
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	registerCommands(context)
	registerHovers(context)
	registerCodeLens(context)

} 
export function deactivate() {}
