/**
 * 
 * 清空所有注释
 * 
 */



import { updateJsonFile } from './updateJsonFile';
import { getCurrentWorkspaceFolder } from './getCurrentWorkspaceFolder';
import { getCommentsConfig } from './getCommentsConfig';

/**
 * 
 * 获取指定文档的所有注释
 * 
 * @param docRelUri 文档相对于工作区的路径
 * @param jsonPath  
 */
export function clearDocumentComments(docRelUri:string){ 
    const wsFolder = getCurrentWorkspaceFolder()
    if(!wsFolder) return;
    const { entryKey , commentsFile } =  getCommentsConfig()
    updateJsonFile(commentsFile,(jsonComments)=>{
        const docComments = entryKey.length===0 ? jsonComments : jsonComments[entryKey]
        if(docComments){
            if(docRelUri in docComments){
                try{
                    delete docComments[docRelUri]   
                }catch(e){
                    console.log(e)
                }                
            }        
        }        
    })
}

