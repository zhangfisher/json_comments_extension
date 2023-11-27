/* eslint-disable @typescript-eslint/semi */
import * as vscode from 'vscode';
import jsonCommentsCodeLens from './jsonCommentsCodeLens' 


export default (context: vscode.ExtensionContext) => { 
	context.subscriptions.push(...[
		vscode.languages.registerCodeLensProvider(
			{ language: 'json' },
			jsonCommentsCodeLens(context)
		)
	])
};
