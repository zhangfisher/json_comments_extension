/**
 *
 * 获取当前光标所在位置的json路径
 *
 */

import astParser, { Location,ASTNode,ObjectNode,ArrayNode,PropertyNode } from "json-to-ast";


type Position = {
    line:number
    column:number
}

function inPosition(this: ParseJsonPathContext,loc:Location){
	if(!loc) return false
	return loc.start.line === this.pos.line //&& loc.start.column >= this.pos.column && loc.end.column <= this.pos.column
	
}

const ABORT = Symbol("abort")


interface TraverseContext {
	parent?:ASTNode
	path: string[];
	index?: string | number; 
}


function traverseAST(this: ParseJsonPathContext, ast: ASTNode,context:TraverseContext):typeof ABORT | void{
	if (ast.type === "Array") {
		return traverseArrayNode.call(this, ast as ArrayNode,context);
	} else if (ast.type === "Object") {
		return traverseObjectNode.call(this, ast as ObjectNode,context);
	} else {
		// Handle other types of nodes if needed
	}
}

function traverseArrayNode(this: ParseJsonPathContext, node: ArrayNode,context:TraverseContext) {
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

function traverseObjectNode(this: ParseJsonPathContext, node: ObjectNode,context:TraverseContext) {
	for (const property of node.children) {
		if (property.type === "Property") {
			if(traversePropertyNode.call(this, property,context)===ABORT){
				break
			}
		}
	}
}

function traversePropertyNode(this: ParseJsonPathContext, node: PropertyNode,context:TraverseContext) {
	const key = node.key.value;
	const value = node.value;
	
	if(inPosition.call(this,node.key.loc!)){
		//console.log(`Path = ${context.path.join(".")}.${key}`);
		context.path.push(key)
		const jsonpath = context.path.reduce((r,cur)=>{
            if(/^\[\d+\]$/.test(cur)){
                return r.length===0 ? cur : r+cur
            }else{
                return r.length===0 ? cur : r + "."+cur
            }
        },"")
		this.result = jsonpath
		return ABORT
	}
	//console.log(`Path = ${context.path.join(".")}.${key}`);

	context.path.push(key)
	if(traverseAST.call(this, value,context)===ABORT){
		
	}
	context.path.pop()

}

interface ParseJsonPathContext { 
	pos: Position;
	result?:string
}

/**
 * 
 * 返回指定位置的JsonPath
 * 
 * @returns
 */
export function getPathFromJson(json:string,pos: Position)  {
	const ast = astParser(json, { loc: true });
	const context: ParseJsonPathContext = { 
		pos
	};
	traverseAST.call(context, ast,{path:[]});
	return context.result
}

 
 