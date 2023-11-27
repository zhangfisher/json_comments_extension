/**
 * 
 * 获取指定文件中的
 * 
 */



import * as vscode from 'vscode';
import { workspace } from 'vscode';
import { JsonComments, JsonCommentsConfigs, JsonDocComments } from '../types';
import { getCurrentWorkspaceFolder } from './getCurrentWorkspaceFolder';
import { getConfig } from './getConfig';
import path from 'path';
import fs from 'fs';
import { DEFAULT_ENTRY_KEY } from '../consts';
import { getDocumentRelativePath } from './getDocumentRelativePath';




/**
 * 
 * 获取指定文档中jsonpath指向的注释
 * 
 * @param docOrUri 文档相对于工作区的路径
 * @param jsonPath  
 */
export function getDocumentComments(docOrUri:string | vscode.TextDocument ):JsonDocComments{    
    const wsFolder = getCurrentWorkspaceFolder()
    if(!wsFolder) return {};

    let docRelPath:string = typeof docOrUri === 'string' ? docOrUri : getDocumentRelativePath(docOrUri)!

    const commentsFileName = getConfig<string>(JsonCommentsConfigs.SaveFile) || "comments.json"
    const commentsFile =path.join(wsFolder,commentsFileName)
    const commentsBaseFile = path.basename(commentsFileName).toLowerCase()

    if(!fs.existsSync(commentsFile)){
        return {}
    }
    let comments = JSON.parse(fs.readFileSync(commentsFile).toString())
    
    /// 
    let entryKey = getConfig<string>(JsonCommentsConfigs.EntryKey) 
    
    // 如果将注释保存在package.json中，则不能使用整个文件作为注释，而是使用package.json中的某个key来保存注释
    if(entryKey){
        if(!(entryKey in comments)) comments[entryKey]={}
        comments = comments[entryKey]
    }else{
        if(commentsBaseFile === 'package.json' ){
            entryKey = entryKey || DEFAULT_ENTRY_KEY 
            if(entryKey.length===0) entryKey = DEFAULT_ENTRY_KEY
            comments = comments[entryKey]
        }
    }

    if(docRelPath in comments){
        return  comments[docRelPath] as Record<string,any>
    }else{
        return {} as Record<string,any>
    }    
}

