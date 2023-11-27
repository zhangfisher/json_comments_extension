import { workspace } from "vscode";
import { getConfig } from "./getConfig";
import { JSON_COMMENTS_CONFIG_KEY } from '../consts';
import { JsonCommentsConfigs } from "../types";

export function onConfigChange<T>(key:JsonCommentsConfigs,callback:(newValue:T)=>void) {
    workspace.onDidChangeConfiguration((eventNames)=>{
        if(eventNames.affectsConfiguration(`${JSON_COMMENTS_CONFIG_KEY}.${key}`)) {
            let newValue:T = getConfig(key) as T;
            callback(newValue);
        }   
    });
}