

export interface JsonKeyComments{
    comments:string                              // 注释内容    
}

export type JsonDocUri = string
export type JsonDocJSONPath = string
export type JsonDocComments = Record<JsonDocJSONPath,string>
export type JsonComments = Record<JsonDocUri,JsonDocComments>
 

export enum JsonCommentsConfigs{
    // 保存注释的JSON文件
    SaveFile="saveFile",
    // 保存注释的JSON文件中的入口key
    EntryKey="entryKey",
    /// 是否启用注释功能
    Enable="enable"
}