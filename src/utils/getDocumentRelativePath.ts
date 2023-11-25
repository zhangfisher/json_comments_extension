/**
 * 
 * 获取文档相对于工作区文件夹的路径
 * 
 */
import * as vscode from 'vscode';


export function getDocumentRelativePath(document: vscode.TextDocument) {
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
  if (workspaceFolder) {
    // 将文档的绝对路径转换为相对于工作区文件夹的路径
    const relativePath = vscode.workspace.asRelativePath(document.uri);
    return relativePath
  }
}