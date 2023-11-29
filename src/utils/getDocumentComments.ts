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
import { getComments } from './getComments';




/**
 * 
 * 获取指定文档中jsonpath指向的注释
 * 
 * @param docOrUri 文档相对于工作区的路径
 * @param jsonPath  
 */
export function getDocumentComments(docOrUri:string | vscode.TextDocument ):JsonDocComments{    
    let docRelPath:string = typeof docOrUri === 'string' ? docOrUri : getDocumentRelativePath(docOrUri)!
    let comments =getComments()     
    if(docRelPath in comments){
        return comments[docRelPath] as Record<string,any>
    }else{
        return {} as Record<string,any>
    }    
}

