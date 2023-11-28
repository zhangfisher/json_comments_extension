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
import { getCommentsConfig } from './getCommentsConfig';

/**
 * 
 * 获取指定文档中jsonpath指向的注释
 * 
 * @param docRelUri 文档相对于工作区的路径
 * @param jsonPath  
 */
export function removeJsonKeyComments(docRelUri:string,jsonPath:string){ 
    const wsFolder = getCurrentWorkspaceFolder()
    if(!wsFolder) return;
    const { entryKey , commentsFile } =  getCommentsConfig()
    updateJsonFile(commentsFile,(jsonComments)=>{
        const docComments = entryKey.length===0 ? jsonComments : jsonComments[entryKey]
        if(docComments){
            if(docRelUri in docComments){
                try{
                    delete docComments[docRelUri][jsonPath]         
                }catch(e){
                    console.log(e)
                }                
            }        
        }        
    })
}

