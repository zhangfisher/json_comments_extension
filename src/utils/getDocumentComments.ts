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
import { getInitialComments } from './getInitialComments';
import fs from 'fs';




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
    // 4. 获取文档注释
    if(docRelPath in comments){
        return comments[docRelPath] as Record<string,any>
    }else{
        return {} as Record<string,any>
    }    
}

