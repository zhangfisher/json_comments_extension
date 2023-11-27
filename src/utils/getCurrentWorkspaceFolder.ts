/**
 * @description 获取当前工作区路径
 */
import { getCurrentDocument } from "./getCurrentDocument";
import { workspace } from "vscode";
 
export function getCurrentWorkspaceFolder(): string | undefined {
    const doc = getCurrentDocument();
    if(!doc) return;
    return workspace.getWorkspaceFolder(doc.uri)?.uri.fsPath
}