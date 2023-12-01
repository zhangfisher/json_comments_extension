import * as vscode from 'vscode';


export function getCurrentTabSize(): number {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        return activeEditor.options.tabSize as number;
    }
    // 如果没有活动的编辑器，则返回默认值
    return vscode.workspace.getConfiguration().get('editor.tabSize') as number;
}