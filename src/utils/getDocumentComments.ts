/**
 * 
 * 获取指定文件中的
 * 
 */



import * as vscode from 'vscode';
import { workspace } from 'vscode';
import { JsonComments, JsonCommentsConfigs } from '../types';
import { getCurrentWorkspaceFolder } from './getCurrentWorkspaceFolder';
import { getConfig } from './getConfig';
import path from 'path';
import fs from 'fs';




/**
 * 
 * 获取指定文档中jsonpath指向的注释
 * 
 * @param docRelUri 文档相对于工作区的路径
 * @param jsonPath  
 */
export async function getDocumentComments(docRelUri:string):Promise<JsonComments>{    
    const wsFolder = getCurrentWorkspaceFolder()
    if(!wsFolder) return {};
    const commentsFileName = getConfig<string>(JsonCommentsConfigs.CommentsSaveFile) || "comments.json"
    const commentsFile =path.join(wsFolder,commentsFileName)
    if(!fs.existsSync(commentsFile)){
        return {}
    }
    const comments = JSON.parse(fs.readFileSync(commentsFile).toString())

    if(docRelUri in comments){
        return  comments[docRelUri] as Record<string,any>
    }else{
        return {}
    }    
}

