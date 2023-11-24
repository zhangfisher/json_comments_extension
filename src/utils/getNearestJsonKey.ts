/**
 * 
 * 向上查找最近的JsonKey
 * 
 */
 import * as vscode from 'vscode';

 interface KeyInfo {
   keyName: string;
   range: vscode.Range;
 }
 
export function getNearestJsonKey(range: vscode.Range): KeyInfo | undefined {
   const activeEditor = vscode.window.activeTextEditor;
   if (activeEditor) {
     const document = activeEditor.document;
     const currentLine = range.start.line;
     const currentCharacter = range.start.character;
 
     for (let line = currentLine; line >= 0; line--) {
       const textLine = document.lineAt(line);
       const lineText = textLine.text;
       const lineOffset = line === currentLine ? currentCharacter : 0;
 
       // 使用正则表达式匹配键名
       const keyMatch = lineText.slice(lineOffset).match(/"([^"]+)":/);
       if (keyMatch) {
         const keyName = keyMatch[1];
         const keyStart = new vscode.Position(line, lineText.indexOf(keyMatch[0]) + lineOffset);
         const keyEnd = new vscode.Position(line, keyStart.character + keyName.length);
         const keyRange = new vscode.Range(keyStart, keyEnd);
         return { keyName, range: keyRange };
       }
     }
   }
 
   return undefined;
 }