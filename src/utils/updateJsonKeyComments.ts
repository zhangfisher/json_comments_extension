/**
 * 
 * 获取指定文件中的
 * 
 */



import * as vscode from 'vscode';
import { workspace } from 'vscode';
import { getDocumentComments } from './getDocumentComments';
import { JsonCommentsConfigs, JsonKeyComments } from '../types';
import { updateJsonFile } from './updateJsonFile';
import { getConfig } from './getConfig';
import path from 'path';
import { getCurrentWorkspaceFolder } from './getCurrentWorkspaceFolder';




/**
 * 
 * 获取指定文档中jsonpath指向的注释
 * 
 * @param docRelUri 文档相对于工作区的路径
 * @param jsonPath  
 */
export function updateJsonKeyComments(docRelUri:string,jsonPath:string,comments:string){ 
    const wsFolder = getCurrentWorkspaceFolder()
    if(!wsFolder) return;
    const commentsFileName = getConfig<string>(JsonCommentsConfigs.CommentsSaveFile) || "comments.json"
    const  commentsFile =path.join(wsFolder,commentsFileName)
    updateJsonFile(commentsFile,(jsonComments)=>{
        if(!(docRelUri in jsonComments)){
            jsonComments[docRelUri] = {}
        }
        jsonComments[docRelUri][jsonPath] = comments
    })
}

