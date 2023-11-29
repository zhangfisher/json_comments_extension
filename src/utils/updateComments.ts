/**
 * 
 * 获取指定文件中的
 * 
 */



import { l10n } from 'vscode';
import { JsonComments } from '../types';
import { updateJsonFile } from './updateJsonFile';
import { getCommentsConfig } from './getCommentsConfig';




/**
 * 
 * 更新指定文档所有注释
 * 
 * @param docRelUri 文档相对于工作区的路径
 * @param jsonPath  
 */
export function updateComments(updater:(comments:JsonComments)=>void){ 
    const { entryKey , commentsFile } =  getCommentsConfig()
    updateJsonFile(commentsFile,(jsonComments)=>{
        let docCommects = entryKey.length===0 ? jsonComments : jsonComments[entryKey]
        if(typeof(docCommects)!=='object') docCommects ={}                 
        if(Object.keys(docCommects).length===0){
            docCommects.tips = l10n.t("Please install the JsonComments plugin to enable commenting functionality for JSON files, see: https://github.com/zhangfisher/json_comments_extension")
        }
        updater(docCommects)                
        Object.assign(jsonComments,entryKey.length===0 ? docCommects : {[entryKey]:docCommects})
    })
}

