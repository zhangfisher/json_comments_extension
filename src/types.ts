

export interface JsonKeyComments{
    comments:string                              // 注释内容    
}

export type JsonComments = Record<string,Record<string,string>>
 

export enum JsonCommentsConfigs{
    CommentsSaveFile="comments.savefile"        // 保存注释的文件
}