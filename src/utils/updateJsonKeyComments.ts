/**
 * 
 * 获取指定文件中的
 * 
 */



import { l10n } from 'vscode';
import { JsonCommentsConfigs } from '../types';
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
export function updateJsonKeyComments(docRelUri:string,jsonPath:string,comments:string){ 
    const wsFolder = getCurrentWorkspaceFolder()
    if(!wsFolder) return;
    const { entryKey , commentsFile } =  getCommentsConfig()
    updateJsonFile(commentsFile,(jsonComments)=>{
        let docCommects = entryKey.length===0 ? jsonComments : jsonComments[entryKey]
        if(typeof(docCommects)!=='object') docCommects ={}         
        if(Object.keys(docCommects).length===0){
            docCommects.tips = l10n.t("Please install the JsonComments plugin to enable commenting functionality for JSON files, see: https://github.com/zhangfisher/json_comments_extension")
        }
        if(!(docRelUri in docCommects)){
            docCommects[docRelUri] = {}
        }
        docCommects[docRelUri][jsonPath] = comments
        Object.assign(jsonComments,entryKey.length===0 ? docCommects : {[entryKey]:docCommects})
    })
}

