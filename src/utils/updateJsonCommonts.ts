/**
 * 
 *  
 * updateJsonSchema(schema,"a.b.c",{
 *     description:""
 * })
 * 
 * "a.b.c" -> proprrs
 * 
 * 
 */

import { BaseSchema, JSONSchema } from "fluent-json-schema";
import S from "fluent-json-schema";

import jsonPath from "jsonpath";
import { isNothing } from "flex-tools/typecheck/isNothing"
//@ts-ignore
import fromPath from "json-schema-from-path"
import { assignObject } from "flex-tools/object/assignObject";


export interface  CommentsJsonSchema {
    description?:string
    markdownDescription?:string 
}

 
export interface UpdateJsonSchemaOptions{
    id?:string                              // JSONSchema Id
}

/**
 * 
 * @param schema 
 * @param path         有效的JSON Path
 */
export function updateJsonCommonts(schema:Record<string,any>,jsonpath:string,comments:CommentsJsonSchema,options?:UpdateJsonSchemaOptions):Record<string,any>{
    const opts = assignObject({
        id:""
    },options)

    const paths = jsonpath.split(".")
    
    let current = schema

    for(let i=0;i<paths.length;i++){
        let path = paths[i]
        if(/\[\d+\]$/.test(path)){  // xx[1]形式代表是数组
            current.type='array'
            if(isNothing(current.items)) current.items={}  //anyOf:[]
        }else{              // 对象     
            if(!current.type){
                Object.assign(current,{type:"object"})
            }
            if(current.type === 'array'){                                
                if(!current.items.anyOf) current.items.anyOf=[{type:'object',properties:{}}]
                current = current.items.anyOf[0]
            }
            if(current.type==='object'){
                if(!current.properties) current.properties={}
                if(!(path in current.properties)){
                    current.properties[path] = {type:"object"}
                }
                current = current.properties[path]
            }
        }
        // 最后一个
        if(i===paths.length-1){
            Object.assign(current,comments)
            if((!current.properties || isNothing(current.properties)) && (current.type!=='array')){
                delete current.type
            }            
        }
    }     
    return schema
} 


const schema = {}
updateJsonCommonts(schema,"a.b.c",{
    description:"c注释"
})
console.log("Schema = ",JSON.stringify(schema))

updateJsonCommonts(schema,"a.b",{
    description:"b注释"
})
console.log("Schema = ",JSON.stringify(schema))
updateJsonCommonts(schema,"a",{
    description:"a注释"
})
console.log("Schema = ",JSON.stringify(schema))

updateJsonCommonts(schema,"x",{
    description:"x注释"
})
console.log("Schema = ",JSON.stringify(schema))


updateJsonCommonts(schema,"x.y",{
    description:"y注释"
})
console.log("Schema = ",JSON.stringify(schema))

// 数组

console.log("-----------------Array---------------------")

updateJsonCommonts(schema,"a.l.[0]",{
    description:"数组0"
})
console.log("Schema = ",JSON.stringify(schema))

updateJsonCommonts(schema,"a.l.[0].m",{
    description:"数组[0]=m"
})
console.log("Schema = ",JSON.stringify(schema))

updateJsonCommonts(schema,"a.l.[1].n",{
    description:"数组[1]=n"
})
console.log("Schema = ",JSON.stringify(schema))