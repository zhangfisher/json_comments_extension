import * as vscode from 'vscode';
import { JsonCommentsConfigs } from '../types';
import { JSON_COMMENTS_CONFIG_KEY } from '../consts';


export function getConfig<T=any>(key:JsonCommentsConfigs,defaultValue?:T):T | undefined{
    const config = vscode.workspace.getConfiguration(JSON_COMMENTS_CONFIG_KEY);
    let value:any = config.get<T>(key);
    if (typeof value === 'undefined' || value === '') {
        value = defaultValue;
    }
    return value
}