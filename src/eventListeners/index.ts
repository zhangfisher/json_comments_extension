import { workspace ,ExtensionContext} from "vscode";
import { getComments } from "../utils/getComments";
import { updateComments } from "../utils/updateComments";

// 监听文件更名和移动事件
const fileRenameDisposable = workspace.onDidRenameFiles(event => {
    const comments = getComments()
    // 处理文件更名和移动事件
    event.files.forEach(file => {        
         // 原始文件的 Uri
        const oldUri = workspace.asRelativePath(file.oldUri)      
        if(oldUri in comments){
            const newUri = workspace.asRelativePath(file.newUri);
            updateComments((jsonComments)=>{
                if(oldUri in jsonComments){
                    jsonComments[newUri] = Object.assign({},jsonComments[oldUri])
                    delete jsonComments[oldUri]
                }
            })
        }
     });
});
   

export default (context: ExtensionContext) => { 
	context.subscriptions.push(fileRenameDisposable)
}
