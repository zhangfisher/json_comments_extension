/**
 * 每个文档的json schema均保存在当前工作区的.vscode文件夹下
 * 即settings.json中的json.schemas=[
    * {
			"fileMatch": ["/src/utils/sample.json"],
			"schema": {"type":"object","properties":{"a":{"type":"object","properties":{"b":{"type":"object","properties":{"c":{"description":"c注释"}},"description":"b注释"},"l":{"type":"array","items":{"anyOf":[{"type":"object","properties":{"m":{"description":"数组[0]=m"},"n":{"description":"数组[1]=n"}}}]},"description":"数组0"}},"description":"a注释"},"x":{"description":"x注释","type":"object","properties":{"y":{"description":"y注释"}}}}}
			}
		}
    ]
 */

import { workspace,WorkspaceConfiguration ,languages  }  from 'vscode'
import { updateJsonSchema } from './updateJsonSchema';

interface JSONSchemaSettings {
    fileMatch: string[]; 
    schema?: any; 
}

export interface  Comments {
    description?:string
    markdownDescription?:string 
}

/**

 * @param uri 
 */
export function updateDocumentComments(docUri:string,jsonpath:string,comments:Comments){
    
    const configuration = workspace.getConfiguration();
    // 
    if(!configuration.has("json.schemas") ){
        configuration.update("json.schemas",[])
    }  
    // 读取当前工作区的json.schemas配置  
    const schemas = configuration.get("json.schemas") as JSONSchemaSettings[]
    
    
    let schemaIndex = schemas.findIndex(schema=>schema.fileMatch.includes(docUri))
    if(schemaIndex<0){
        schemas.push({
            fileMatch:[docUri],
            schema:{}
        })
        schemaIndex = 0
    }
    const schema = schemas[schemaIndex].schema

    const newSchema = updateJsonSchema(schema,jsonpath,comments)
    Object.assign(schemas[schemaIndex].schema,schema)
    configuration.update("json.schemas",schemas)
 

}