/* eslint-disable @typescript-eslint/semi */
import * as vscode from 'vscode';
import { jsonKeyHover } from './jsonKeyCodeLens' 


export default (context: vscode.ExtensionContext) => { 
	jsonKeyHover(context);
};
