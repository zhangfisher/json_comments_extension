import * as vscode from 'vscode';
import { JsonCommentsConfigs } from '../types';


export function getConfig<T=any>(key:JsonCommentsConfigs):T | undefined{
    const config = vscode.workspace.getConfiguration('json-comments');
    return config.get<T>(key);
}