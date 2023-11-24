/**
 * 
 * 返回当前文件对象
 * 
 */


import { TextDocument, window } from "vscode";

export function getCurrentDocument():TextDocument | undefined{
    const editor = window.activeTextEditor;
    if (!editor) {
      return 		
    }
    return editor.document;
}