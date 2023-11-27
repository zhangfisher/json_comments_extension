/**
 * 
 * updateJsonFile("package.json","version.a.b.c","1.0.0")
 * 
 * 支持键名中包括.的情况
 * 
 * {
 *  "version":{
 *      "config.dfault":{
 *        "a":{
 *          }
 *  }}
 * }
 * 
 * 
 * 
 * @param filename 
 * @param key 
 * @param value 
 */

import fs from 'fs'

export function updateJsonFile(filename:string,updater:(json:Record<string,any>)=>void){
    fs.readFile(filename,(err,data)=>{
        let jsonConents = {}
        if(err){
            if(err.code === 'ENOENT'){
                jsonConents={}
            }else{
                throw err
            }            
        }else{
            jsonConents = JSON.parse(data.toString())
        }        
        updater(jsonConents)
        fs.writeFile(filename,JSON.stringify(jsonConents,null,4),{
            encoding:'utf-8'
        },(err)=>{
            console.error(err)
        })    
    })
}