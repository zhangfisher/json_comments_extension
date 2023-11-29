/**
 * 
 * 获取指定文件中的
 * 
 */



import * as vscode from 'vscode';
import {  JsonDocComments } from '../types';
import { getCurrentWorkspaceFolder } from './getCurrentWorkspaceFolder';
import { getDocumentRelativePath } from './getDocumentRelativePath';
import { getCommentsConfig } from './getCommentsConfig';
import fs from 'fs';




/**
 * 
 * 获取所有注释内容
 * 
 * @param docOrUri  
 * @param jsonPath  
 */
export function getComments():Record<string,any>{    
    const wsFolder = getCurrentWorkspaceFolder()
    if(!wsFolder) return {};
   
    // 1. 读取注释文件配置信息
    const { entryKey , commentsFile } =  getCommentsConfig()
    if(!fs.existsSync(commentsFile)){
        return {}
    }
    // 2. 读取注释文件
    let comments = JSON.parse(fs.readFileSync(commentsFile).toString())
    
    // 3. 获取注释
    if(entryKey.length>0){
        if(!(entryKey in comments)) comments[entryKey]={}
        comments = comments[entryKey]
    }
    return comments   
}

