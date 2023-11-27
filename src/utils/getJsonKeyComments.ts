/**
 * 
 * 获取指定文件中的
 * 
 */

import { getDocumentComments } from './getDocumentComments';

/**
 * 
 * 获取指定文档中jsonpath指向的注释
 * 
 * @param docRelUri 文档相对于工作区的路径
 * @param jsonPath  
 */
export function getJsonKeyComments(docRelUri:string,jsonPath:string):string | undefined{ 
    const comments = getDocumentComments(docRelUri)
    if(!(docRelUri in comments)){
        return
    }
    // @ts-ignore
    return comments[docRelUri][jsonPath]
}
