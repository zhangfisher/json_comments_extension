/**
 * 清空当前文档的所有注释
 * 
 */
import { l10n,ExtensionContext,window } from 'vscode';
import { getCurrentDocument } from '../utils/getCurrentDocument';
import { getDocumentRelativePath } from '../utils/getDocumentRelativePath';
import { clearDocumentComments } from '../utils/clearDocumentComments';

 


export function clearComments(context: ExtensionContext) {
    return async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		//vscode.window.showInformationMessage('translate-markdown-sites file!')
		const doc = getCurrentDocument()
		if(!doc) return
		const docRelPath = getDocumentRelativePath(doc)
		let result =await window.showQuickPick(['Yes', 'No'], {
			title: l10n.t('Are you sure want to clear all comments for {0}?',docRelPath!),	
		})
		if(result && result === 'Yes'){
			clearDocumentComments(docRelPath!)
		}            
	}
}



