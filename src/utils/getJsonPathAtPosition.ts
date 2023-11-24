/**
 *
 * 获取当前光标所在位置的json路径
 *
 */

import astParser, { Location } from "json-to-ast";
// import { Position } from "vscode";
import {
	ASTNode,
	ObjectNode,
	ArrayNode,
	PropertyNode,
	IdentifierNode,
	LiteralNode,
} from "json-to-ast";


type Position = {
    line:number
    column:number
}

function inPosition(this: ParseJsonPathContext,loc:Location){
	if(loc){
		return loc.start.line === this.pos.line
	}	
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
		console.log(`Path = ${context.path.join(".")}.${key}`);
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
}

/**
 * 解析当前位置所有JsonPath
 * @returns
 */
export function getPathFromJson(json:string,pos: Position)  {
	const ast = astParser(json, { loc: true });
	const context: ParseJsonPathContext = { 
		pos,
	};
	traverseAST.call(context, ast,{path:[]});
}

export function getJsonPathAtPosition(json:string,pos: Position)  {
	// const doc = getCurrentDocument();
	// if (!doc) return;

	const ast = astParser(json, { loc: true });

	const context: ParseJsonPathContext = { 
		pos,
	};
	traverseAST.call(context, ast,{path:[]});
}


import fs from "fs"
import path from "path"

const json = fs.readFileSync(path.join(__dirname,"../../package.json")).toString()

getPathFromJson(json,{line:2,column:5})
getPathFromJson(json,{line:23,column:5})
getPathFromJson(json,{line:30,column:5})
getPathFromJson(json,{line:33,column:5})