/**
 *
 * 获取当前光标所在位置的json路径
 *
 */

import { window } from "vscode";
import { getCurrentDocument } from "./getCurrentDocument";
import { getPathFromJson } from "./getPathFromJson"; 

 
/**
 * 提供当前位置的json路径
 * @param json 
 * @param pos 
 */
export function getJsonPathAtPosition()  {
	
	const editor = window.activeTextEditor;
	if(!editor) return;
	const doc = getCurrentDocument();
	if (!doc) return;

	return getPathFromJson(doc.getText(),{
		line:editor.selection.start.line+1,
		column:editor.selection.start.character+1
	})
}
