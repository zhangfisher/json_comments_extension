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

interface JSONSchemaSettings {
    fileMatch: string[]; 
    schema?: any; 
}

/**

 * @param uri 
 */
export function getDocumentJsonSchema(uri:string){
    const configuration = workspace.getConfiguration();
    const schemas = (configuration.get("json.schemas") || []) as JSONSchemaSettings[]
    
    schemas.forEach(schema=>{
        if(schema.fileMatch.includes(uri)){
            return schema.fileMatch
        }
    })

}