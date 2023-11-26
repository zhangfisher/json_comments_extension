/**
 * 使用AST遍历JSON
 */

 

import astParser, { Location,ASTNode,ObjectNode,ArrayNode,PropertyNode,ValueNode } from "json-to-ast";
 

const ABORT = Symbol("abort")


interface TraverseNodeContext {
	parent?:ASTNode
	path: string[];
	index?: string | number; 
}


function traverseAST(this: TraverseJsonContext, ast: ASTNode,context:TraverseNodeContext):typeof ABORT | void{
	if (ast.type === "Array") {
		return traverseArrayNode.call(this, ast as ArrayNode,context);
	} else if (ast.type === "Object") {
		return traverseObjectNode.call(this, ast as ObjectNode,context);
	} else {
		// Handle other types of nodes if needed
	}
}

function traverseArrayNode(this: TraverseJsonContext, node: ArrayNode,context:TraverseNodeContext) {
	context.parent = node

	for (let i=0;i<node.children.length;i++) {
		const element = node.children[i]
		context.path.push(`[${i}]`)
		if(traverseAST.call(this, element,context)===ABORT){
			break
		}
		context.path.pop()
	}
}

function traverseObjectNode(this: TraverseJsonContext, node: ObjectNode,context:TraverseNodeContext) {
	for (const property of node.children) {
		if (property.type === "Property") {
			if(traversePropertyNode.call(this, property,context)===ABORT){
				break
			}
		}
	}
}

function traversePropertyNode(this: TraverseJsonContext, node: PropertyNode,context:TraverseNodeContext):typeof ABORT | void {
	const key = node.key.value;
	const value = node.value;

	context.path.push(key)

    if(typeof(this.callback)==='function'){
        const jsonpath = context.path.reduce((r,cur)=>{
            if(/^\[\d+\]$/.test(cur)){
                return r.length===0 ? cur : r+cur
            }else{
                return r.length===0 ? cur : r + "."+cur
            }
        },"")
        this.callback({
            path:context.path,
            jsonpath,
            value:'value' in value ? value.value :undefined	,
            line:node.loc!.start.line,
            column:node.loc!.start.column
        })
    }

	if(traverseAST.call(this, value,context)===ABORT){
		return 
	}
	context.path.pop()

}
 

export type TraverseJsonCallback = (args:{path:string[],jsonpath:string,value:any,line:number,column:number})=>void

export interface TraverseJsonContext{
    callback:TraverseJsonCallback     
}

 
/**
 * 
 * 返回指定位置的JsonPath
 * 
 * traverseJson(jsonString,({path,line,value,column}=>{
 *      
 * })
 * 
 * @returns
 */
export function traverseJson(json:string,callback:TraverseJsonCallback)  {
	const ast = astParser(json, { loc: true });	
    const context: TraverseJsonContext = { 
        callback 
    }
	traverseAST.call(context, ast,{path:[]});
}

 

import fs from "fs"
import path from "path"

const json = fs.readFileSync(path.join(__dirname,"../../package.json")).toString()

traverseJson(json,({path,jsonpath,value,line,column})=>{
    console.log(line,column,jsonpath,typeof(value)!=="object" ? value : JSON.stringify(value))
}) 