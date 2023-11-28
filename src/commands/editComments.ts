/**
 * 增加注释
 * 
 */
import * as vscode from 'vscode';
import { l10n } from "vscode"
import { getJsonKeyComments } from '../utils/getJsonKeyComments';
import { updateJsonKeyComments } from '../utils/updateJsonKeyComments';
import { removeJsonKeyComments } from '../utils/removeJsonKeyComments';

export interface EditCommentsParams{
	jsonpath:string
	document:string
}

/**
 * 选择操作
 */
async function selctOperation() {
	
	  
  }

export function editComments(context: vscode.ExtensionContext) {
    return async ({jsonpath,document}:EditCommentsParams) => { 
		//vscode.window.showInformationMessage('jsonpath='+jsonpath,'document='+document);

	const options = [l10n.t('Edit This Comment'), l10n.t('Delete This Comment')];  
	const selectedOption = await vscode.window.showQuickPick(options,{
		placeHolder: l10n.t('Select Operate'),
		title: l10n.t('Select How to Handle This Comment')
	})
	  	if (selectedOption ===options[0]) {
			const comments =await  vscode.window.showInputBox({ 
				prompt:l10n.t('Enter Comment Content for <{0}>:',jsonpath),
				placeHolder: l10n.t('Enter Comment'),
				value: getJsonKeyComments(document,jsonpath)
			});
			if(!comments) return
			await updateJsonKeyComments(document,jsonpath,comments)
		}else if (selectedOption === options[1]) {
			removeJsonKeyComments(document,jsonpath)
		}
	}
}



