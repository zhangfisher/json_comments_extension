/**
 * 遍历json schema中的
 * 
 * 
 */


export function forEachJsonComments(schema: Record<string, any>, callback: (path: string, comments: Record<string, any>) => void) {
  const queue: [string, Record<string, any>][] = [["", schema]];

  

  while (queue.length > 0) {
    const [path, schema] = queue.shift()!;
    if (schema.description || schema.markdownDescription) {
      callback(path, schema);
    }
    if (schema.type === "object" && schema.properties) {
      for (const key in schema.properties) {
        queue.push([path ? `${path}.${key}` : key, schema.properties[key]]);
      }
    }
    if (schema.type === "array" && schema.items && schema.items.anyOf) {
      for (const item of schema.items.anyOf) {
        queue.push([path, item]);
      }
    }
  }
}