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

import { JSONSchema } from "fluent-json-schema";
import jsonPath from "jsonpath";
//@ts-ignore
import fromPath from "json-schema-from-path"

export interface  JsonSchemaData {

}

/**
 * 
 * @param schema 
 * @param path         有效的JSON Path
 */
export function updateJsonSchema(schema:JSONSchema,jsonpath:string,updater:JsonSchemaData):void{
    const paths = jsonpath.split(".")
    for(let i = paths.length-1;i>=0;i--){
        const schema = fromPath()
    }
    
}