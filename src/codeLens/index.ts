/* eslint-disable @typescript-eslint/semi */
import * as vscode from 'vscode';
import { jsonKeyHover } from './jsonCodeLens' 


export default (context: vscode.ExtensionContext) => { 
	jsonKeyHover(context);
};
