import path from "path"
import { JsonCommentsConfigs } from "../types"
import { getConfig } from "./getConfig"
import { getCurrentWorkspaceFolder } from "./getCurrentWorkspaceFolder";
import { DEFAULT_ENTRY_KEY } from "../consts";

export interface GetCommentsConfig{
    entryKey:string             // 注释key
    commentsFile:string         // 注释存储文件
}

/**
 * 获取当前工作区的注释配置参数
 * @returns 
 */
export function getCommentsConfig():GetCommentsConfig{
    const wsFolder = getCurrentWorkspaceFolder()
    if(!wsFolder) return {
        entryKey:'',
        commentsFile:'package.json'
    };

    const commentsFileName = getConfig<string>(JsonCommentsConfigs.SaveFile) || "package.json"
    const commentsFile =path.join(wsFolder,commentsFileName)
    const commentsBaseFile = path.basename(commentsFileName).toLowerCase()
 
    // 
    let entryKey = getConfig<string>(JsonCommentsConfigs.EntryKey,'')!    

    // 如果将注释保存在package.json中，则不能使用整个文件作为注释
    // 而是使用package.json中的某个key来保存注释
    if(commentsBaseFile === 'package.json' ){
        entryKey = entryKey || DEFAULT_ENTRY_KEY 
        if(entryKey.length===0) entryKey = DEFAULT_ENTRY_KEY     
    }
    

    return {
        entryKey,
        commentsFile
    }
}