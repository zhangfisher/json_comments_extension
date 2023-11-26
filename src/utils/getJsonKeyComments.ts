/**
 * 
 * 从当前工作区的JSON Schemas中获取指定路径的JSON Schema的description
 * 
 */



import * as vscode from 'vscode';
import { workspace } from 'vscode';
export function getDocumentComments(docUri:string){
    
     
    // let schemaIndex = schemas.findIndex(schema=>schema.fileMatch.includes(docUri))
    // if(schemaIndex<0){
    //     schemas.push({
    //         fileMatch:[docUri],
    //         schema:{}
    //     })
    //     schemaIndex = 0
    // }
    // return schemas[schemaIndex].schema 

}